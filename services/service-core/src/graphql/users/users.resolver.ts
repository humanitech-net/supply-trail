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
import { Query, Resolver, Context, Args, Mutation } from '@nestjs/graphql';
import { Users, UpdateUser } from './users.entity';
import { KeycloakService } from '../../auth/keycloak.service';
import { Request } from 'express';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Query(() => Users)
  async getUser(@Context() context: { req: Request }) {
    const { req } = context;

    const token = req.headers['authorization'].split(' ')[1];

    return this.keycloakService.getUser(token);
  }

  @Query(() => [Users])
  async getUserList(@Context() context: { req: Request }) {
    const { req } = context;

    const token = req.headers['authorization'].split(' ')[1];

    return this.keycloakService.getUserList(token);
  }

  @Mutation(() => String)
  async editUser(
    @Context() context: { req: Request },
    @Args('userInput') userInput: UpdateUser
  ): Promise<string> {
    const user = await this.getUser(context);
    const ID = user.id.toString();
    return this.keycloakService.editUser(ID, userInput);
  }
}
