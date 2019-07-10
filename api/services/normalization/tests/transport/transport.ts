import path from 'path';

import { bootstrap } from '../../src/bootstrap';

export class Transport {
  port = '8084';
  transport;
  kernel;

  public async start(): Promise<any> {
    process.env.APP_URL = `http://localhost:${this.port}`;
    const configDir = process.env.APP_CONFIG_DIR ? process.env.APP_CONFIG_DIR : './config';
    process.env.APP_CONFIG_DIR = path.join('..', 'dist', configDir);
    this.transport = await bootstrap.boot('http', this.port);
  }

  public async stop(): Promise<void> {
    await this.transport.down();
  }
}
