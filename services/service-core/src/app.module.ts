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
import { UsersModule } from './database/users/users.module';
import { TypeormConfig } from './typeorm/typeormconfig';

@Module({
  imports: [TypeormConfig, UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
