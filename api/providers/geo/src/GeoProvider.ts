import * as _ from 'lodash';
import { Container, Exceptions, Interfaces } from '@ilos/core';
import { ValidatorInterfaceResolver } from '@pdc/provider-validator';

import { GeoInterface } from './interfaces/GeoInterface';
import { PositionInterface } from './interfaces/PositionInterface';

import { DeKomootPhoton } from './providers/de.komoot.photon';
import { FrGouvDataApiAdresse } from './providers/fr.gouv.data.api-adresse';
import { FrGouvApiGeo } from './providers/fr.gouv.api.geo';
import { OrgOpenstreetmapNominatim } from './providers/org.openstreetmap.nominatim';
import { GeoProviderInterfaceResolver } from './interfaces/GeoProviderInterface';

@Container.provider({
  identifier: GeoProviderInterfaceResolver,
})
export class GeoProvider implements Interfaces.ProviderInterface {
  constructor(protected validator: ValidatorInterfaceResolver) {
    //
  }

  public async getTown(position: GeoInterface): Promise<PositionInterface> {
    // await this.validator.validate(position, 'position'); // todo: add schema for position in validator

    const { lon, lat, insee, literal } = position;

    if (!_.isNil(lon) && !_.isNil(lat)) {
      // beurk...
      try {
        const { citycode, city, postcode, country } = await FrGouvDataApiAdresse.reverse({
          lon,
          lat,
        });
        return {
          lon,
          lat,
          country,
          insee: citycode,
          town: city,
          postcodes: this.cleanPostcodes(postcode),
        };
      } catch (e) {
        try {
          const { citycode, city, postcode, country } = await FrGouvApiGeo.reverse({
            lon,
            lat,
          });
          return {
            lon,
            lat,
            country,
            insee: citycode,
            town: city,
            postcodes: this.cleanPostcodes(postcode),
          };
        } catch (f) {
          try {
            const { citycode, city, postcode, country } = await OrgOpenstreetmapNominatim.reverse({ lon, lat });
            return {
              lon,
              lat,
              country,
              insee: citycode,
              town: city,
              postcodes: this.cleanPostcodes(postcode),
            };
          } catch (g) {
            return {
              lon,
              lat,
              insee: null,
              town: null,
              postcodes: [],
              country: null,
            };
          }
        }
      }
    }

    if (!_.isNil(insee)) {
      // beurk...
      try {
        const { city, citycode, postcode, country } = await FrGouvApiGeo.insee(insee);

        return {
          country,
          lon: null,
          lat: null,
          insee: citycode,
          town: city,
          postcodes: this.cleanPostcodes(postcode),
        };
      } catch (e) {
        try {
          const { city, citycode, postcode, country } = await FrGouvDataApiAdresse.insee(insee);
          return {
            country,
            lon: null,
            lat: null,
            insee: citycode,
            town: city,
            postcodes: this.cleanPostcodes(postcode),
          };
        } catch (f) {
          return {
            lon: null,
            lat: null,
            insee: null,
            town: null,
            postcodes: [],
            country: null,
          };
        }
      }
    }

    if (!_.isNil(literal) && literal !== '') {
      // beurk...
      try {
        // use international search first
        const res = await DeKomootPhoton.search(literal);
        return {
          lon: res.lon,
          lat: res.lat,
          insee: null,
          town: res.city,
          postcodes: this.cleanPostcodes(res.postcode),
          country: res.country,
        };
      } catch (e) {
        try {
          const { citycode, city, postcode, country } = await FrGouvDataApiAdresse.search(literal);
          return {
            lon,
            lat,
            country,
            insee: citycode,
            town: city,
            postcodes: this.cleanPostcodes(postcode),
          };
        } catch (f) {
          return {
            lon,
            lat,
            insee,
            town: null,
            postcodes: [],
            country: null,
          };
        }
      }
    }

    throw new Exceptions.InvalidParamsException();
  }

  private cleanPostcodes(p) {
    return (Array.isArray(p) ? p : [p].filter((i) => !!i)) || [];
  }
}
