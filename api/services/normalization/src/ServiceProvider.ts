import { Parents, Container, Interfaces, Extensions } from '@ilos/core';
import { GeoProvider } from '@pdc/provider-geo';
import { ConfigExtension } from '@ilos/config';
import { ValidatorExtension, ValidatorMiddleware } from '@ilos/validator';

import { NormalizationGeoAction } from './actions/NormalizationGeoAction';
import { NormalizationTerritoryAction } from './actions/NormalizationTerritoryAction';
import { normalizationGeoSchema } from './schemas/normalizationGeoSchema';

@Container.serviceProvider({
  config: __dirname,
  handlers: [NormalizationGeoAction, NormalizationTerritoryAction],
  providers: [GeoProvider],
  middlewares: [['validate', ValidatorMiddleware]],
  validator: [['normalizationGeo', normalizationGeoSchema]],
})
export class ServiceProvider extends Parents.ServiceProvider {
  readonly extensions: Interfaces.ExtensionStaticInterface[] = [
    ConfigExtension,
    ValidatorExtension,
    Extensions.Providers,
    Extensions.Handlers,
  ];
}
