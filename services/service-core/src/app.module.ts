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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakAuthGuard } from './auth/keycloak.guard';
import { configuration } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        })
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),

    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        authServerUrl: configService.get('keycloakServerUrl'),
        realm: configService.get('keycloak.realm'),
        resource: configService.get('keycloak.nestClientId'),
        secret: configService.get('KEYCLOAK_SECRET'),
        'public-client': true,
        verifyTokenAudience: true,
        'confidential-port': 0
      }),
      inject: [ConfigService]
    }),

    DatabaseModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, KeycloakAuthGuard]
})
export class AppModule {}
