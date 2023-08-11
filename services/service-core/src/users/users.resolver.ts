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
import { Users } from '../entities/users.entity';

@Resolver(() => Users)
export class UsersResolver {
  @Query(() => Users)
  findAll() {
    return { id: '123', firstName: 'Test' };
  }
}
