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
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: Repository
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'testuser@example.com'
      };

      const createdUser = { id: 1, ...createUserDto };

      jest.spyOn(service, 'createUser').mockResolvedValue(createdUser);

      const result = await controller.createUsers(createUserDto);

      expect(result).toBe(createdUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
  
  describe('getUsers', () => {
    const users: User[] = [
      {
        id: 1,
        username: 'test1',
        email: 'test1@gmail.com' 
      },
      {
        id: 2,
        username: 'test2',
        email: 'test2@gmail.com'
      }
    ]
    
    it('should return an array of users', async ()=>{
      jest.spyOn(service, 'getUsers').mockResolvedValue(users);
      expect(await service.getUsers()).toHaveBeenCalled();
      expect(await service.getUsers()).toEqual(users)
    })
  })
});
