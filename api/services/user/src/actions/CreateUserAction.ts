import { Parents, Container, Exceptions } from '@pdc/core';
import { CryptoProviderInterfaceResolver } from '@pdc/provider-crypto';

import { User } from '../entities/User';
import { UserRepositoryProviderInterfaceResolver } from '../interfaces/UserRepositoryProviderInterface';
import { UserDbInterface } from '../interfaces/UserInterfaces';
import { UserPermissionsProviderInterfaceResolver } from '../interfaces/UserPermissionsProviderInterface';


interface NewUserRequestInterface {
  email: string;
  lastname: string;
  firstname: string;
  phone: string;
  group: string;
  role: string;
  password: string;
  aom?: string;
  operator?: string;
}

@Container.handler({
  service: 'user',
  method: 'create',
})
export class CreateUserAction extends Parents.Action {
  public readonly middlewares: (string|[string, any])[] = [
    ['validate', 'user.create'],
    ['scopeIt', [['user.create'], [
      (params, context) => {
        if ('aom' in params && params.aom === context.call.user.aom) {
          return 'aom.users.add';
        }
      },
      (params, context) => {
        if ('operator' in params && params.aom === context.call.user.aom) {
          return 'operator.users.add';
        }
      },
    ]]],
  ];
  constructor(
    private userRepository: UserRepositoryProviderInterfaceResolver,
    private cryptoProvider: CryptoProviderInterfaceResolver,
    private userPermissions: UserPermissionsProviderInterfaceResolver,
  ) {
    super();
  }


  // todo: fix all comments
  public async handle(request: NewUserRequestInterface , context: { call?: { user: UserDbInterface } }): Promise<UserDbInterface> {
    // check if the user exists already
    const foundUser = await this.userRepository.findByEmail(request.email);
    if (foundUser) {
      throw new Exceptions.DDBConflictException('email conflict');
    }

    if (request.operator && request.aom) {
      throw new Exceptions.InvalidRequestException('Cannot assign operator and AOM at the same time');
    }


    // todo: create fullname ?
    const payload: any = {
      email: request.email,
      firstname : request.firstname,
      lastname : request.lastname,
      group : request.group,
      role : request.role,
      phone: request.phone,
      status : 'invited',
      password : await this.cryptoProvider.cryptPassword(request.password),
      requester : context.call.user.fullname,
    };


    const op = request.operator;
    const ao = request.aom;

    if (op) {
      // todo: replace with what is in comment
      payload.operator = op;

      // const operator = await operatorService.findOne(op);

      // if (operator) {
      //   payload.operator = operator._id;
        // payload.organisation = operator.name;
      // }
    } else if (ao) {
      // todo: replace with what is in comment
      payload.aom = ao;
      // const aom = await aomService.findOne(ao);

      // if (aom) {
      //   payload.aom = aom._id;
      //   payload.organisation = aom.name;
      // }
    }

    // create the new user
    let user = new User(payload);
    user.permissions = this.userPermissions.getFromRole(user.group, user.role);

    user = await this.userRepository.create(user);
    // generate new token for a password reset on first access
    return this.forgottenPassword(
      {
        email: payload.email,
        invite: {
          requester: payload.requester,
          organisation: payload.organisation,
        },
      },
      user,
    );
  }

  // todo: put this in authentification ?
  private async forgottenPassword({ email, invite }, userCache = null) {
    // search for user
    const user = userCache || (await this.userRepository.findByEmail(email));
    if (!user) {
      throw new Exceptions.DDBNotFoundException();
    }
    const reset = this.cryptoProvider.generateToken();
    const token = this.cryptoProvider.generateToken();

    user.forgottenReset = reset;
    user.forgottenToken = token;
    user.forgottenAt = new Date();
    const updatedUser = await this.userRepository.update(user);

    // send the email
    // user.invite(reset, token, invite.requester, invite.organisation);

    return updatedUser;
  }

  // todo: put this in authentification ?
  private async forgottenPassword({ email, invite }, userCache = null) {
    // search for user
    const user = userCache || (await this.userRepository.findByEmail(email));
    if (!user) {
      // throw new NotFoundError();
    }

    const reset = this.randomProvider.generateToken();
    const token = this.randomProvider.generateToken();

    user.forgottenReset = reset;
    user.forgottenToken = token;
    user.forgottenAt = new Date();
    const updatedUser = await this.userRepository.update(user);

    // send the email
    // user.invite(reset, token, invite.requester, invite.organisation);

    return updatedUser;
  }
}
