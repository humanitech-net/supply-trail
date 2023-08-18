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

import { UsersService } from '../users.service';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({ id: Number, ...user })),
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve({ id: Number, username: 'test', email: 'test@gmail.com' })
    })
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });


  it('should define service', () => {
    expect(service).toBeDefined()
  })

  it('it shoudl define repository', () => {
    expect(repository).toBeDefined()
  })

  describe('get Users', () => {
    it('should return an object of user"', async () => {

      expect(await service.getUsers()).toEqual({
        id: Number,
        username: 'test',
        email: 'test@gmail.com'
      })

      expect(repository.find).toBeCalled();
    });
  });

  describe('create users', () => {
    const dto = {
      username: 'test',
      email: 'test@gmail.com'
    }
    it('should create an object of user"', async () => {
      expect(await service.createUser({
        ...dto
      })).toEqual({
        id: Number, ...dto
      })
    });
  });
});
