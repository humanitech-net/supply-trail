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
import { KeycloakService } from '../keycloak.service';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

// Mock axios.get to simulate API calls
jest.mock('axios');

// Mock jwt.verify using jest.spyOn
const jwtVerify = jest.spyOn(jwt, 'verify');

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakService]
    }).compile();

    keycloakService = module.get<KeycloakService>(KeycloakService);
  });

  afterEach(() => {
    // Clear the mock after each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(keycloakService).toBeDefined();
  });

  it('should decode a valid token', async () => {
    const validToken = 'valid_token';
    const publicKey = 'mocked_public_key';

    // Mock the axios.get function to return a specific response
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: { public_key: publicKey }
    });

    // Mock jwt.verify to return a decoded token
    jwtVerify.mockReturnValue({ someData: 'example' });

    const result = await keycloakService.getUser(validToken);

    // Verify that the axios.get and jwt.verify functions were called
    expect(axios.get).toHaveBeenCalledWith(keycloakService.realmUrl);
    expect(jwtVerify).toHaveBeenCalledWith(
      validToken,
      `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
      { algorithms: ['RS256'] }
    );

    // Verify that the result matches the decoded token
    expect(result).toEqual({ someData: 'example' });
  });

  it('should throw an error for an invalid token', async () => {
    const invalidToken = 'invalid_token';
    const publicKey = 'mocked_public_key';

    // Mock the axios.get function to return a specific response
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: { public_key: publicKey }
    });

    // Mock jwt.verify to throw an error
    jwtVerify.mockImplementation(() => {
      throw new Error('Invalid Token');
    });

    try {
      await keycloakService.getUser(invalidToken);
    } catch (error) {
      expect(axios.get).toHaveBeenCalledWith(keycloakService.realmUrl);
      expect(jwtVerify).toHaveBeenCalledWith(
        invalidToken,
        `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
        { algorithms: ['RS256'] }
      );
      expect(error.message).toBe('Invalid Token');
    }
  });
});
