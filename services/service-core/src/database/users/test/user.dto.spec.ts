import { validateSync } from 'class-validator';
import { CreateUserDto } from '../users.dto';

describe('CreateUserDto', () => {
  it('should validate a valid user DTO', () => {
    const userDto = new CreateUserDto();
    userDto.username = 'test';
    userDto.email = 'test@gmail.com';

    const errors = validateSync(userDto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation when username is empty', () => {
    const userDto = new CreateUserDto();
    userDto.username = '';
    userDto.email = 'test@gmail.com';

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation when username length is less than 3', () => {
    const userDto = new CreateUserDto();
    userDto.username = 'te';
    userDto.email = 'test@gmail.com';

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation when email is not valid', () => {
    const userDto = new CreateUserDto();
    userDto.username = 'john_doe';
    userDto.email = 'test@gmail';

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });
});
