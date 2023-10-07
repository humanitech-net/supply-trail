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
import { Users } from './users.entity'; // Assuming you rename your entity to 'user.entity' to match the type name
import { KeycloakService } from '../../auth/keycloak.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => Users)
  async getUser(@Args('token') token: string) {
    const data = await this.keycloakService.getUser(token);
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username
    };
  }
}
