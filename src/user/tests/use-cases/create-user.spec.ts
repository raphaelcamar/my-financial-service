import { CreateUser } from '@user/data';
import { CryptoRepositoryData } from '@user/infra';
import { User } from '../../domain/entities/user';
import { UserRepositoryMock } from '../mocks/user-repository-mock';

describe('CreateUser', () => {
  it('should create a user', async () => {
    const user: User = {
      _id: '1',
      name: 'Raphael',
      lastname: 'Santantonio',
      email: 'raphaelcamar@outlook.com',
      password: '123456',
      token: 'token',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userRepositoryMock = new UserRepositoryMock();
    const cryptoRepository = new CryptoRepositoryData();
    const useCase = new CreateUser(user, userRepositoryMock, cryptoRepository);

    const result = await useCase.execute();

    expect(result).toBe(Promise);
  });
});
