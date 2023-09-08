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

import { Query, Resolver } from '@nestjs/graphql';
import { Users } from './users.entity';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Users)
export class UsersResolver {
  @Query(() => Users)
  @UseGuards(KeycloakAuthGuard) //protects the end point using the KeyclaokAuthGuard class
  findAll() {
    return { id: '123', firstName: 'Test' };
  }
}
