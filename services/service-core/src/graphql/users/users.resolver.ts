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

import { Query, Resolver, Args } from '@nestjs/graphql';
import { Users } from './users.entity';
import { KeycloakService } from '../../auth/keycloak.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => Users)
  async findAll(@Args('token') token: string) {
    return this.keycloakService.getUser(token);
  }
}
