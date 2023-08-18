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
import { CreateUserDto } from '../users.dto';
import {getRepositoryToken} from "@nestjs/typeorm"
import { Repository} from 'typeorm';
import { User } from '../users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,{
        provide: getRepositoryToken(User),
        useClass:Repository,
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    repository = module.get<Repository<User>>(getRepositoryToken(User))
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'testuser@example.com',
      };

      const createdUser = {id: 1, ...createUserDto};

      jest.spyOn(service, 'createUser').mockResolvedValue(createdUser);

      const result = await controller.createUsers(createUserDto);

      expect(result).toBe(createdUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});