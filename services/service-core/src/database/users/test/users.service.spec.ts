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
import { Repository} from 'typeorm';
import { User } from '../users.entity';
import {getRepositoryToken} from "@nestjs/typeorm"
import { Test } from '@nestjs/testing';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useClass:Repository
      }]
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })
    

  describe('get Users', () => {
    it('should return an object of user"', async () => {
      const mockUsers: User[] = [
        {id: 1, username: 'test', email: 'test@test.com'}
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockUsers)
      
      const result = await service.getUsers()
      expect(result).toBe(mockUsers);
    });
  })

  describe('create users', ()=>{
    it('should create an object of user"', async () => {
      const userDTO ={
        username: 'test', 
        email: 'test@test.com'
      }

      const savedUser = {
        id: 1, 
        username: 'test',
        email: 'test@test.com'
      }

      jest.spyOn(repository, 'create').mockReturnValue(savedUser)
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser)
      
      const result = await service.createUser(userDTO)
      
      expect(result).toEqual(savedUser);
      expect(repository.create).toHaveBeenCalledWith(userDTO);
      expect(repository.save).toHaveBeenCalledWith(savedUser);
    });
  })
})
