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
import { UsersResolver } from '../users.resolver';
import { KeycloakService } from '../../../auth/keycloak.service';
import { Request } from 'express';
import { UpdateUser } from 'src/graphql/users/users.entity';

const mockKeycloakService: Partial<KeycloakService> = {
  getUser: jest.fn(async () => {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe'
    };
  }),
  editUser: jest.fn(async () => {
    return 'Successfully Updated';
  })
};

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;

  const context = {
    req: { headers: { authorization: 'Bearer token' } } as Request
  };

  const MockUser = {
    id: 'id',
    firstName: 'firstname',
    lastName: 'lastname',
    username: 'name',
    email: 'name@email.com'
  } as UpdateUser;

  const MockToken = 'token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: KeycloakService,
          useValue: mockKeycloakService
        }
      ]
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
  });

  describe('getUser', () => {
    it('should return user data', async () => {
      const user = await usersResolver.getUser(context);
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith(MockToken);
      expect(user).toEqual({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        username: 'johndoe'
      });
    });
  });

  describe('editUser', () => {
    it('should call getUser and return Successfully Updated', async () => {
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith(MockToken);
      const editUser = await usersResolver.editUser(context, MockUser);
      expect(mockKeycloakService.editUser).toHaveBeenCalledWith(
        expect.any(String),
        MockUser
      );
      expect(editUser).toEqual('Successfully Updated');
    });

    it('should return "Try again failed to update"', async () => {
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith(MockToken);
      jest
        .spyOn(mockKeycloakService, 'editUser')
        .mockResolvedValue('Try again, failed to update');

      const editUser = await usersResolver.editUser(context, MockUser);
      expect(mockKeycloakService.editUser).toHaveBeenCalledWith(
        expect.any(String),
        MockUser
      );
      expect(editUser).toEqual('Try again, failed to update');
    });
  });
});
