import { Container, Interfaces } from '@pdc/core';
import bcrypt from 'bcrypt';

@Container.provider()
export class CryptoProvider implements Interfaces.ProviderInterface {
  async boot() {
//
  }


  async cryptPassword(plainPassword:string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword, saltRounds);
  }
  async comparePassword(plainPwd:string, hashedPwd:string): Promise<boolean> {
    return bcrypt.compare(plainPwd, hashedPwd);
  }

  async compareForgottenToken(plainToken:string, hashedToken:string): Promise<boolean> {
    return bcrypt.compare(plainToken, hashedToken);
  }

  generateToken(length:number = 12):string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // eslint-disable-next-line no-plusplus no-increment-decrement
    for (let i = 0; i < Math.abs(length || 32); i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
