import { injectable, ConfigInterfaceResolver, EnvInterfaceResolver } from '@ilos/common';
import { ParentMigration } from '@ilos/repository';
import { MongoConnection } from '@ilos/connection-mongo';

import { UserRepositoryProviderInterfaceResolver } from '../interfaces/UserRepositoryProviderInterface';

@injectable()
export class SuperAdminMigration extends ParentMigration {
  readonly signature = '201909041634.superAdminMigration';

  constructor(
    private mongo: MongoConnection,
    protected env: EnvInterfaceResolver,
    protected config: ConfigInterfaceResolver,
    protected userRepository: UserRepositoryProviderInterfaceResolver,
  ) {
    super();
  }

  async up() {
    console.log('migration UP start', this.signature);
    return;

    if (['production', 'staging'].indexOf(this.env.get('APP_ENV')) > -1) {
      return console.log('[migration] SuperAdminMigration skipped in', this.env.get('APP_ENV'));
    }

    // TODO inject repository for user creation

    const db = await this.mongo.getClient().db(this.config.get('user.db'));
    const collection = await db.collection(this.config.get('user.collectionName'));
    // await collection.updateOne(
    //   {
    //     email: 'admin@example.com',
    //   },
    //   {
    //     email: 'admin@example.com',
    //     password: 'admin1234',
    //   },
    //   { upsert: true },
    // );

    console.log('migration UP end', this.signature);
  }

  async down() {
    // TODO remove user
  }
}
