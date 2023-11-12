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
import { DatabaseModule } from './database/database.module';
import { User } from './database/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakAuthGuard } from './auth/keycloak.guard';
import { CustomConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true
        })
      ],
      useFactory: () => {
        const configService = new CustomConfigService();
        const { database } = configService.get();
        return {
          type: 'postgres',
          host: database.DB_HOST,
          port: Number(database.DB_PORT),
          username: database.DB_USERNAME,
          password: database.DB_PASSWORD,
          database: database.DB_DATABASE,
          entities: [User],
          synchronize: true
        };
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),

    KeycloakConnectModule.registerAsync({
      useFactory: async () => {
        const configService = new CustomConfigService();
        const { keycloak } = configService.get();

        return {
          authServerUrl: keycloak.authServerUrl,
          realm: keycloak.realm,
          resource: keycloak.nestClientId,
          secret: keycloak.ADMIN_CLIENT_SECRET,
          'public-client': true,
          verifyTokenAudience: true,
          'confidential-port': 0
        };
      }
    }),

    DatabaseModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, KeycloakAuthGuard]
})
export class AppModule {}
