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

// Mock KeycloakService
const mockKeycloakService: Partial<KeycloakService> = {
  getUser: jest.fn(async () => ({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    username: 'johndoe'
  })),
  editUser: jest.fn(async () => ({
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email'
  }))
};

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;

  const context = {
    req: { headers: { authorization: 'Bearer token' } } as Request
  };

  const mockUser = {
    id: 'id',
    firstName: 'firstname',
    lastName: 'lastname',
    username: 'name',
    email: 'name@email.com'
  } as UpdateUser;

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
      // Act
      const user = await usersResolver.getUser(context);

      // Assert
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith('token');
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
    it('should call getUser and return "Successfully Updated"', async () => {
      // Act
      const result = await usersResolver.editUser(context, mockUser);

      // Assert
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith('token');
      expect(mockKeycloakService.editUser).toHaveBeenCalledWith(
        'token',
        mockUser
      );
      expect(result).toEqual({
        email: 'email',
        firstName: 'firstName',
        id: 'id',
        lastName: 'lastName',
        username: 'username'
      });
    });

    it('should return "Try again, failed to update"', async () => {
      // Arrange
      jest.spyOn(mockKeycloakService, 'editUser').mockResolvedValue(undefined);

      // Act
      const result = await usersResolver.editUser(context, mockUser);

      // Assert
      expect(mockKeycloakService.getUser).toHaveBeenCalledWith('token');
      expect(mockKeycloakService.editUser).toHaveBeenCalledWith(
        'token',
        mockUser
      );
      expect(result).toEqual(undefined);
    });
  });
});
