import { describe } from 'mocha';
import { expect } from 'chai';
import { ConfigProviderInterfaceResolver } from '@ilos/provider-config';
import { MongoProvider } from '@ilos/provider-mongo';

import { Journey } from '../entities/Journey';
import { JourneyRepositoryProvider } from './JourneyRepositoryProvider';
import { CreateJourneyParamsInterface } from '../interfaces/CreateJourneyParamsInterface';

class FakeConfigProvider extends ConfigProviderInterfaceResolver {
  protected conf = {};
  get(key: string, fb?: string): any {
    return key in this.conf ? this.conf[key] : fb;
  }

  set(key: string, value: any): void {
    this.conf[key] = value;
  }
}

let mongoClient;
let repository;

const journey1: CreateJourneyParamsInterface = {
  journey_id: '1',
  operator_journey_id: '1',
  operator_class: 'A',
  operator_id: '5d10c5ec63214bba0f9fa2d4',
  passenger: {
    identity: { phone: '+33612345678' },
    start: { datetime: '2019-05-01T10:00:00Z', literal: 'Paris' },
    end: { datetime: '2019-05-01T11:00:00Z', literal: 'Evry' },
    seats: 1,
    expense: 1,
    contribution: 1,
    incentives: [],
    distance: 10,
    duration: 10,
  },
  driver: {
    identity: { phone: '+33687654321' },
    start: { datetime: '2019-05-01T10:00:00Z', literal: 'Paris' },
    end: { datetime: '2019-05-01T11:00:00Z', literal: 'Evry' },
    expense: 1,
    revenue: 1,
    incentives: [],
    distance: 10,
    duration: 10,
  },
};

const journey2: CreateJourneyParamsInterface = {
  journey_id: '2',
  operator_journey_id: '2',
  operator_class: 'B',
  operator_id: '5d10c5ec63214bba0f9fa2d4',
  passenger: {
    identity: { phone: '+33687652134' },
    start: { datetime: '2019-05-01T10:00:00Z', literal: 'Paris' },
    end: { datetime: '2019-05-01T11:00:00Z', literal: 'Evry' },
    seats: 1,
    expense: 1,
    contribution: 1,
    incentives: [],
    distance: 10,
    duration: 10,
  },
  driver: {
    identity: { phone: '+33687654321' },
    start: { datetime: '2019-05-01T10:00:00Z', literal: 'Paris' },
    end: { datetime: '2019-05-01T11:00:00Z', literal: 'Evry' },
    expense: 1,
    revenue: 1,
    incentives: [],
    distance: 10,
    duration: 10,
  },
};

const config = new FakeConfigProvider();

describe('Journey repository', () => {
  before(async () => {
    process.env.APP_MONGO_DB = 'pdc-test-' + new Date().getTime();

    config.set('mongo.url', process.env.APP_MONGO_URL);
    config.set('mongo.db', process.env.APP_MONGO_DB);
    config.set('acquisition.db', process.env.APP_MONGO_DB);

    mongoClient = new MongoProvider(config);
    await mongoClient.boot();
    repository = new JourneyRepositoryProvider(config, mongoClient);
  });

  after(async () => {
    await mongoClient.getDb(process.env.APP_MONGO_DB).then((db) => db.dropDatabase());
    await mongoClient.close();
  });

  it('works', async () => {
    const result = await repository.createMany([new Journey(journey1), new Journey(journey2)]);
    expect(result).to.be.a('array');
    expect(result.length).to.eq(2);
    expect(
      result.map((r) => {
        const { _id, ...j } = r;
        return j;
      }),
    ).to.deep.members([journey1, journey2]);
  });
});