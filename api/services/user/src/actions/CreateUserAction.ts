import { Parents, Container } from '@pdc/core';
import { UserRepositoryProvider } from '../providers/UserRepositoryProvider';
import { User } from '../entities/User';

@Container.handler({
  service: 'user',
  method: 'create',
})
export class CreateUserAction extends Parents.Action {
  constructor(
    private userRepository: UserRepositoryProvider,
  ) {
    super();
  }

  public async handle(request: {user: User}): Promise<void> {
    return this.userRepository.create(request.user);
  }
}
