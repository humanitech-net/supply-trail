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
import { UsersController } from '../user.controller';
import { UsersService } from '../users.service';
import { User } from '../../../typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have UsersController', () => {
    const controller = module.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  it('should have UsersService', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });
});