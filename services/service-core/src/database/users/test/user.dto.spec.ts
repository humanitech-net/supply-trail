/**
 * Humanitech Supply Trail
 *
 * Copyright (c) Humanitech, Peter Rogov and Contributors
 *
 * Website: https://humanitech.net
 * Repository: https://github.com/humanitech-net/supply-trail
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateSync } from 'class-validator';
import { CreateUserDto } from '../users.dto';

const testUser = "test"
const testEmail = "test@gmail.com"

describe('CreateUserDto', () => {
  
  it('should validate a valid user DTO', () => {
    const userDto = new CreateUserDto();
    userDto.username = testUser;
    userDto.email = testEmail;

    const errors = validateSync(userDto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation when username is empty', () => {
    const userDto = new CreateUserDto();
    userDto.username = '';
    userDto.email = testEmail;

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation when username length is less than 3', () => {
    const userDto = new CreateUserDto();
    userDto.username = 'te';
    userDto.email = testEmail;

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation when email is not valid', () => {
    const userDto = new CreateUserDto();
    userDto.username = testUser;
    userDto.email = 'test@gmail';

    const errors = validateSync(userDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });
});
