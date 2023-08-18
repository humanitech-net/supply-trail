import { User } from '../../database/users/users.entity';

describe('User Entity', () => {
  it('should create user entity', () => {
    const user = new User();
    user.username = 'test';
    user.email = 'test@test.com';

    expect(user.username).toBe('test');
    expect(user.email).toBe('test@test.com');
  });
});
