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

import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';

describe('UsersModule', () => {
  let usersModule: TestingModule;

  beforeEach(async () => {
    usersModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).compile();
  });

  it('', () => {
    const usersService = usersModule.get<UsersService>(UsersService);
    const usersResolver = usersModule.get<UsersResolver>(UsersResolver);
    expect(usersService).toBeDefined();
    expect(usersResolver).toBeDefined();
  });
});
