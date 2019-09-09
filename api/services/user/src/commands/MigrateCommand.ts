import { command, ConfigInterfaceResolver, ServiceContainerInterfaceResolver } from '@ilos/common';
import { ParentMigrateCommand } from '@ilos/repository';
import { MongoConnection } from '@ilos/connection-mongo';

import { SuperAdminMigration } from '../migrations/SuperAdminMigration';

@command()
export class MigrateCommand extends ParentMigrateCommand {
  static get signature(): string {
    return 'migrate.user';
  }
  migrations = [SuperAdminMigration];

  constructor(
    protected container: ServiceContainerInterfaceResolver,
    protected db: MongoConnection,
    protected config: ConfigInterfaceResolver,
  ) {
    super(container, db, config);
  }
}
