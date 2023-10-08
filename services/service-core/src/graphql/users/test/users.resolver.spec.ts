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

const mockKeycloakService = {
  getUser: jest.fn(async (token) => {
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
  let resolver: UsersResolver;

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

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should return the user data', async () => {
    const req = {
      headers: { authorization: 'Bearer token' }
    } as Request<{}, any, any, {}, {}>; // Type assertion

    const context = { req };
    const user = await resolver.getUser(context);

    expect(user).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      username: 'johndoe'
    });
  });
});
