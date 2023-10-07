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
import { UsersResolver } from '../users.resolver'; // Adjust the import path as needed
import { KeycloakService } from '../../../auth/keycloak.service';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let keycloakService: KeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: KeycloakService,
          useValue: {
            getUser: jest.fn() // Mock the keycloakService.getUser method
          }
        }
      ]
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
    keycloakService = module.get<KeycloakService>(KeycloakService);
  });

  it('should return user data based on the provided token', async () => {
    // Mock the keycloakService.getUser method to return sample data
    const mockUserData = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      username: 'johndoe'
    };
    const token = 'YOUR_SAMPLE_TOKEN';

    // Set up the mock behavior
    (keycloakService.getUser as jest.Mock).mockResolvedValue(mockUserData);

    // Call the resolver function
    const result = await usersResolver.getUser(token);

    // Expect the result to match the mock user data
    expect(result).toEqual(mockUserData);
  });
});
