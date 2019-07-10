import chai from 'chai';
import nock from 'nock';
import * as _ from 'lodash';

import { MockFactory } from './mocks/normalizationMockFactory';
import { journey } from './mocks/journey';
import { positionPaths } from '../src/config/normalization';
import { Transport } from './transport/transport';

const { expect } = chai;

const mockFactory = new MockFactory();

const request = mockFactory.request();
const transport = new Transport();

let nockGeoRequest;
let nockTerritoryRequest;
let nockFindTerritoriesByInseeRequest;
let nockFindTerritoriesByLatLonRequest;

describe('SERVICE NORMALIZATION', () => {
  before(() => {
    transport.start();
    // nock.recorder.rec();
  });

  after(() => {
    transport.stop();
  });

  beforeEach(async () => {
    nockGeoRequest = nock(/127.0.0.1/)
      .post('/', /normalization:geo/)
      .reply(200);
    nockTerritoryRequest = nock(/127.0.0.1/)
      .post('/', /normalization:territory/)
      .reply(200);
    nockFindTerritoriesByInseeRequest = nock(/127.0.0.1/)
      .post('/', /territory:listByInsee/)
      .reply(200);
    nockFindTerritoriesByLatLonRequest = nock(/127.0.0.1/)
      .post('/', /territory:listByLatLon/)
      .reply(200);
  });

  afterEach(async () => {
    nock.cleanAll();
  });

  const journeyMarseilleLyon = { ...journey };
  describe('normalize geo', () => {
    // it('marseille - lyon : should enrich position of passenger & driver', async () => {
    //   positionPaths.map((path:string) => {
    //     _.set(journeyMarseilleLyon, `${path}.lon`, 5.3682);
    //     _.set(journeyMarseilleLyon, `${path}.lat`, 43.2392);
    //   });
    //
    //   nockGeoRequest.on('request', (req, interceptor, body) => {
    //     console.log('geo', body);
    //     const params = JSON.parse(body).params;
    //
    //     expect(params.params.journey).to.eql({
    //       ...journeyMarseilleLyon,
    //     });
    //   });
    //   nockTerritoryRequest.on('request', (req, interceptor, body) => {
    //     console.log('territory', body);
    //     const params = JSON.parse(body).params;
    //
    //     expect(params.params.journey).to.eql({
    //       ...journeyMarseilleLyon,
    //     });
    //   });
    //   nockFindTerritoriesByInseeRequest.on('request', (req, interceptor, body) => {
    //     console.log('find territories by insee', body);
    //     const params = JSON.parse(body).params;
    //     console.log(params);
    //   });
    //
    //
    //   try {
    //     const { status, data } = await request.post(
    //       '/',
    //       mockFactory.call(
    //         'normalization:geo',
    //         {
    //           journey: journeyMarseilleLyon,
    //         },
    //       ),
    //     );
    //     console.log(status, data);
    //   } catch (e) {
    //     if ('response' in e) {
    //       console.log(e.response.data);
    //     }
    //   }
    // });
    // it('marseille - lyon : should enrich territories of passenger & driver', async () => {
    //   nockTerritoryRequest.on('request', (req, interceptor, body) => {
    //     const params = JSON.parse(body).params;
    //
    //     expect(params.params.journey).to.eql({
    //       ...journeyMarseilleLyon,
    //     });
    //   });
    //
    //   const { status, data} = await request.post(
    //     '/',
    //     mockFactory.notify(
    //       'normalization:territory',
    //       {
    //         journey: journeyMarseilleLyon,
    //       },
    //     ),
    //   );
    //
    //   console.log(status, data);
    // });
  });
});
