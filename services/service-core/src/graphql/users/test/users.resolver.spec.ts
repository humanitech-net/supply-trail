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
import { UsersService } from '../users.service';
import { KeycloakService } from '../../../auth/keycloak.service';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let keycloakService: KeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        KeycloakService // Mock or provide a stub if necessary
      ]
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
    keycloakService = module.get<KeycloakService>(KeycloakService);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      // Mock the behavior of keycloakService.getUser
      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'testuser'
      };
      jest.spyOn(keycloakService, 'getUser').mockResolvedValue(mockUser);

      // Call the resolver method
      const result = await usersResolver.getUser('token');

      // Verify that the result matches the expected user
      expect(result).toEqual(mockUser);
    });
  });
});
