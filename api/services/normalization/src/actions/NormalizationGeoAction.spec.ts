// tslint:disable max-classes-per-file
import chai from 'chai';
import * as _ from 'lodash';
import { Container, Interfaces, Types } from '@ilos/core';
import { GeoProviderInterfaceResolver } from '@pdc/provider-geo';
import { ConfigInterfaceResolver } from '@ilos/config';

import { journey } from '../../tests/mocks/journey';
import { positionPaths } from '../config/normalization';
import { NormalizationGeoAction } from './NormalizationGeoAction';

const { expect } = chai;

@Container.provider()
class FakeKernelProvider extends Interfaces.KernelInterfaceResolver {
  async notify(method: string, params: any[] | { [p: string]: any }, context: Types.ContextType): Promise<void> {
    return;
  }
}

@Container.provider()
class FakeGeoProvider extends GeoProviderInterfaceResolver {
  public async getTown({ lon, lat, insee, literal }: any): Promise<any> {
    return {
      lon: 5.3682,
      lat: 43.2392,
      country: 'France',
      insee: '13208',
      town: 'Marseille',
      postcodes: ['13008'],
    };
  }
}

@Container.provider()
class FakeConfigProvider extends ConfigInterfaceResolver {
  async boot(): Promise<void> {
    return;
  }
  get(_key, fallback) {
    return fallback;
  }
}

const journeyMarseilleLyon = { ...journey };

positionPaths.map((path: string) => {
  _.set(journeyMarseilleLyon, `${path}lon`, 5.3682);
  _.set(journeyMarseilleLyon, `${path}lat`, 43.2392);
});

const normalizationProcessAction = new NormalizationGeoAction(
  new FakeKernelProvider(),
  new FakeGeoProvider(),
  new FakeConfigProvider(),
);

const mockProcessNormalizationParams = {
  journey,
};

describe('NORMALIZATION ACTION - geo', () => {
  before(() => {});
  // it('should find town and complete passenger & driver position', async () => {
  //   const result = await normalizationProcessAction.handle({
  //     journey: journeyMarseilleLyon,
  //   }, { call: {} });
  //
  //   const expectedResult = { ...journeyMarseilleLyon };
  //
  //
  //   positionPaths.map((path:string) => {
  //     _.set(expectedResult,
  //       path,
  //       {
  //       lon: 5.3682,
  //         lat: 43.2392,
  //       country: 'France',
  //       insee: '13208',
  //       town: 'Marseille',
  //       postcodes: ['13008'],
  //     });
  //   });
  //
  //   expect(result).to.eql(expectedResult);
  // });
});
