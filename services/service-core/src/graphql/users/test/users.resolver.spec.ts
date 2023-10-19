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
// Import necessary modules and dependencies
// Import necessary modules and dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';
import { KeycloakService } from '../../../auth/keycloak.service';
import { Request } from 'express';

const mockKeycloakService: Partial<KeycloakService> = {
  getUser: jest.fn(async () => {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe'
    };
  })
};

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;

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

  it('should return user data', async () => {
    const context = {
      req: { headers: { authorization: 'Bearer token' } } as Request
    };

    const user = await usersResolver.getUser(context);
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
