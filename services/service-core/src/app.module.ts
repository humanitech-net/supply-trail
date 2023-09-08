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

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './graphql/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { KeycloakConnectModule, AuthGuard } from 'nest-keycloak-connect';
import { KeycloakAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),

    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/',
      realm: 'Humanitech',
      resource: 'nest-app',
      secret: 'bJ8rWgqAjP22IWU7u0USGZd58BKodkpt',
      'public-client': true,
      verifyTokenAudience: true,
      'confidential-port': 0
    })
  ],

  controllers: [AppController],
  providers: [AppService, KeycloakAuthGuard]
})
export class AppModule {}
