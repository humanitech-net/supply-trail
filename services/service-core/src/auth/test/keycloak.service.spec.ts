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
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;

  const errorMessage = 'Failed to fetch Public Key';

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakService, ConfigService]
    }).compile();

    keycloakService = module.get<KeycloakService>(KeycloakService);
  });

  describe('getPublicKey', () => {
    it('should fetch and return public key', async () => {
      const mockPublicKey = 'your_mocked_public_key';
      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      const publicKey = await keycloakService.getPublicKey();

      expect(axios.get).toHaveBeenCalledWith(keycloakService.realmUrl);
      expect(publicKey).toBe(
        `-----BEGIN PUBLIC KEY-----\n${mockPublicKey}\n-----END PUBLIC KEY-----`
      );
    });

    it('should throw an error if fetching public key fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(keycloakService.getPublicKey()).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe('getUser', () => {
    it('should decode a valid token and return user data', async () => {
      const mockToken = 'your_mocked_valid_token';
      const mockPublicKey = 'your_mocked_public_key';

      // Mock the axios response for fetching the public key
      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      // Mock the jwt.verify function to return a decoded token
      const decodedToken = {
        sub: 'sample_sid',
        given_name: 'John',
        family_name: 'Doe',
        email: 'john.doe@example.com',
        preferred_username: 'johndoe'
      };
      (verify as jest.Mock).mockReturnValue(decodedToken);

      const userData = await keycloakService.getUser(mockToken);

      expect(axios.get).toHaveBeenCalledWith(keycloakService.realmUrl);
      expect(verify).toHaveBeenCalledWith(
        mockToken,
        `-----BEGIN PUBLIC KEY-----\n${mockPublicKey}\n-----END PUBLIC KEY-----`,
        {
          algorithms: ['RS256']
        }
      );

      expect(userData).toEqual({
        id: 'sample_sid',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      });
    });

    it('should throw an error for an invalid token', async () => {
      const mockToken = 'your_mocked_invalid_token';
      const mockPublicKey = 'your_mocked_public_key';

      // Mock the axios response for fetching the public key
      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      // Mock the jwt.verify function to throw an error
      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid Token');
      });

      await expect(keycloakService.getUser(mockToken)).rejects.toThrow(
        'Invalid Token'
      );
    });

    it('should throw an error if fetching public key fails', async () => {
      const mockToken = 'your_mocked_valid_token';

      // Mock axios to reject with an error
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(keycloakService.getUser(mockToken)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe('getAdminToken', () => {
    it('returns access token when fetch is successful', async () => {
      const MockSuccessResponse = {
        json: jest.fn().mockResolvedValue({
          access_token: 'access-token',
          refresh_token: 'refresh-token'
        })
      } as unknown as Response;

      jest.spyOn(global, 'fetch').mockResolvedValue(MockSuccessResponse);

      expect(fetch).toHaveBeenCalled;

      const result = await keycloakService.getAdminToken();
      expect(result).toBe('access-token');
    });

    it('throws error when it fails to fetch', async () => {
      const mockError = new Error('Error: Fetch error');

      jest.spyOn(global, 'fetch').mockRejectedValue(mockError);
      expect(fetch).toBeCalled;

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        mockError
      );
    });
  });

  describe('editUser', () => {
    const MockID = 'ID';
    const MockToken = 'mock-token';
    const MockUserInput = {
      firstName: 'user'
    };
    const MockSuccesfullResponse = new Response(null, {
      status: 200,
      statusText: 'OK'
    });

    const MockFailedResponse = new Response(null, {
      status: 500,
      statusText: ''
    });

    it('calls getAdminToken and update user', async () => {
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(MockToken);
      jest.spyOn(global, 'fetch').mockResolvedValue(MockSuccesfullResponse);

      const editUser = await keycloakService.editUser(MockID, MockUserInput);

      expect(keycloakService.getAdminToken).toHaveBeenCalled();

      expect(editUser).toBe('Successfully Updated');
    });

    it('returns Try again failed to update if fails to update', async () => {
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(MockToken);
      jest.spyOn(global, 'fetch').mockResolvedValue(MockFailedResponse);

      const editUser = await keycloakService.editUser(MockID, MockUserInput);

      expect(keycloakService.getAdminToken).toHaveBeenCalled();

      expect(editUser).toBe('Try again failed to update');
    });
  });
});
