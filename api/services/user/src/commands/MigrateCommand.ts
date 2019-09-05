import { command, KernelInterfaceResolver, ConfigInterfaceResolver } from '@ilos/common';
import { ParentMigrateCommand } from '@ilos/repository';
import { MongoConnection } from '@ilos/connection-mongo';

import { SuperAdminMigration } from '../migrations/SuperAdminMigration';

@command()
export class MigrateCommand extends ParentMigrateCommand {
  entity = 'user';
  migrations = [SuperAdminMigration];

  constructor(
    protected db: MongoConnection,
    protected kernel: KernelInterfaceResolver,
    protected config: ConfigInterfaceResolver,
  ) {
    super(kernel, db, config);
  }
}
