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

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

const MinUsernameLength = 3;

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(MinUsernameLength)
  username: string;

  @IsEmail()
  email: string;
}
