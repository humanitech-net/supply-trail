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

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/public')
  @Unprotected()
  getpublic(): string {
    return `${this.appService.getHello()} from public`;
  }
  @Get('/user')
  @Roles({ roles: ['user'] })
  getUser(): string {
    return `${this.appService.getHello()} from user`;
  }
  @Get('/admin')
  @Roles({ roles: ['admin'] })
  getAdmin(): string {
    return `${this.appService.getHello()} from admin`;
  }
}
