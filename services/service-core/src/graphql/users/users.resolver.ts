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
import { KeycloakService } from '../../auth//keycloak.service';
import { JwtPayload } from '../../auth/jwt-payload'; // Import the JwtPayload type or use the appropriate import

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => Users)
  async findAll(@Args('token') token: string | JwtPayload) {
    try {
      let user: JwtPayload;

      if (typeof token === 'string') {
        // If token is a string, call KeycloakService to verify it
        user = await this.keycloakService.getUser(token);
      } else {
        // If token is already JwtPayload, use it directly
        user = token;
      }

      if (!user || !user.sid) {
        throw new Error('Invalid Token');
      }

      // Return the user data along with any other data you want
      return {
        id: user.sid,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        username: user.preferred_username
      };
    } catch (error) {
      // Handle any errors that may occur during token verification
      throw new Error('Invalid Token'); // Or handle the error accordingly
    }
  }
}
