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
import { Config } from '../config';
import { Users } from 'src/graphql/users/users.entity';

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;
  const notGetToken = "Couldn't get token";
  const mockUserToken = 'mock-user-token';
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
      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: 'your_mocked_public_key' }
      });

      const publicKey = await keycloakService.getPublicKey();

      expect(axios.get).toHaveBeenCalledWith(
        'https://dev.supply-trail.humanitech.net/auth/realms/humanitech'
      );
      expect(publicKey).toBe(
        '-----BEGIN PUBLIC KEY-----\nyour_mocked_public_key\n-----END PUBLIC KEY-----'
      );
    });

    it('should throw an error if fetching public key fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(keycloakService.getPublicKey()).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe('getAdminToken', () => {
    it('returns access token when fetch is successful', async () => {
      const mockSuccessResponse = new Response(
        JSON.stringify({
          access_token: 'access-token',
          refresh_token: 'refresh-token'
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: new Headers({ 'Content-Type': 'application/json' })
        }
      );

      jest.spyOn(global, 'fetch').mockResolvedValue(mockSuccessResponse);

      const result = await keycloakService.getAdminToken();
      expect(result).toBe('access-token');
    });

    it('throws an error when it fails to fetch', async () => {
      const mockFailedResponse = new Response(null, {
        status: 400,
        statusText: notGetToken
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockFailedResponse);

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        notGetToken
      );
    });

    it('throws an error with the status text when fetch is not OK', async () => {
      const mockErrorResponse = new Response(null, {
        status: 500,
        statusText: notGetToken
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockErrorResponse);

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        notGetToken
      );
    });
  });

  describe('editUser', () => {
    const mockToken = 'mock-token';

    it('calls getAdminToken, getDecodedToken, fetch, and getUser', async () => {
      // Mock getAdminToken
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(mockToken);

      // Mock getDecodedToken
      const mockDecodedToken = { sub: 'user123', name: 'John Doe' };
      jest
        .spyOn(keycloakService, 'getDecodedToken')
        .mockResolvedValue(mockDecodedToken);

      // Mock fetch
      const mockUserInput = {
        firstName: 'user',
        lastName: 'lastName',
        username: 'username'
      };
      const mockID = 'user123';
      const mockSuccessfulResponse = new Response(null, {
        status: 200,
        statusText: 'OK'
      });
      jest.spyOn(global, 'fetch').mockResolvedValue(mockSuccessfulResponse);

      // Mock getUser
      jest.spyOn(keycloakService, 'getUser').mockResolvedValue({
        id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email'
      });

      // Call the method
      const editUser = await keycloakService.editUser(mockToken, mockUserInput);

      // Assertions
      expect(keycloakService.getAdminToken).toHaveBeenCalled();
      expect(keycloakService.getDecodedToken).toHaveBeenCalledWith(mockToken);
      expect(global.fetch).toHaveBeenCalledWith(
        `${Config.adminUrl}/users/${mockID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`
          },
          body: JSON.stringify(mockUserInput)
        }
      );
      expect(keycloakService.getUser).toHaveBeenCalledWith(mockToken);
      expect(editUser).toEqual({
        id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email'
      });
    });

    it('throws an error if userInput validation fails', async () => {
      // Mock getAdminToken
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(mockToken);

      // Mock getDecodedToken
      const mockDecodedToken = { sub: 'user123', name: 'John Doe' };
      jest
        .spyOn(keycloakService, 'getDecodedToken')
        .mockResolvedValue(mockDecodedToken);

      // Mock invalid userInput
      const mockInvalidUserInput = {
        firstName: '',
        lastName: 'lastName',
        username: 'username'
      };

      // Call the method and expect it to throw an error
      await expect(
        keycloakService.editUser(mockToken, mockInvalidUserInput)
      ).rejects.toThrowError('"firstName" is not allowed to be empty');
    });
  });

  describe('getDecodedToken', () => {
    it('should decode a valid token and return it', async () => {
      const mockToken = 'your_mocked_valid_token';
      const mockPublicKey = 'your_mocked_public_key';

      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      const decodedToken = {
        exp: 555,
        iat: 555,
        auth_time: 555,
        jti: 'jti',
        iss: 'origin',
        aud: ['realm-management', 'account'],
        sub: 'id',
        typ: 'Bearer',
        azp: 'app',
        nonce: 'nonce',
        session_state: 'states',
        acr: '0',
        'allowed-origins': ['allowed origin'],
        realm_access: {
          roles: [
            'offline_access',
            'uma_authorization',
            'default-roles-humanitech'
          ]
        },
        resource_access: {
          'realm-management': { roles: [Array] },
          account: { roles: [Array] }
        },
        scope: 'openid profile email',
        sid: 'sid',
        email_verified: true,
        name: 'name',
        preferred_username: 'nick name',
        given_name: 'name',
        family_name: 'lastname',
        email: 'email'
      };

      (verify as jest.Mock).mockReturnValue(decodedToken);

      const userData = await keycloakService.getDecodedToken(mockToken);

      expect(axios.get).toHaveBeenCalledWith(
        'https://dev.supply-trail.humanitech.net/auth/realms/humanitech'
      );
      expect(verify).toHaveBeenCalledWith(
        mockToken,
        `-----BEGIN PUBLIC KEY-----\n${mockPublicKey}\n-----END PUBLIC KEY-----`,
        {
          algorithms: ['RS256']
        }
      );

      expect(userData).toEqual({
        exp: 555,
        iat: 555,
        auth_time: 555,
        jti: 'jti',
        iss: 'origin',
        aud: ['realm-management', 'account'],
        sub: 'id',
        typ: 'Bearer',
        azp: 'app',
        nonce: 'nonce',
        session_state: 'states',
        acr: '0',
        'allowed-origins': ['allowed origin'],
        realm_access: {
          roles: [
            'offline_access',
            'uma_authorization',
            'default-roles-humanitech'
          ]
        },
        resource_access: {
          'realm-management': { roles: [Array] },
          account: { roles: [Array] }
        },
        scope: 'openid profile email',
        sid: 'sid',
        email_verified: true,
        name: 'name',
        preferred_username: 'nick name',
        given_name: 'name',
        family_name: 'lastname',
        email: 'email'
      });
    });

    it('should throw an error for an invalid token', async () => {
      const mockToken = 'your_mocked_invalid_token';
      const mockPublicKey = 'your_mocked_public_key';

      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid Token');
      });

      await expect(keycloakService.getDecodedToken(mockToken)).rejects.toThrow(
        'Invalid Token'
      );
    });

    it('should throw an error if fetching public key fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(
        keycloakService.getDecodedToken('your_mocked_valid_token')
      ).rejects.toThrow(errorMessage);
    });
  });

  describe('getUser', () => {
    it('should return user data on successful API request', async () => {
      // Mock getUser token and decoded token
      jest
        .spyOn(keycloakService, 'getAdminToken')
        .mockResolvedValue('mock-admin-token');
      jest
        .spyOn(keycloakService, 'getDecodedToken')
        .mockResolvedValue({ sub: 'mock-sub' });

      // Mock a successful fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: 'mock-id',
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com'
        } as Users)
      });

      // Call the method
      const result: Users = await keycloakService.getUser(mockUserToken);

      // Ensure the fetch function was called with the correct parameters
      expect(global.fetch).toHaveBeenCalledWith(
        'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech/users/mock-sub',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer mock-admin-token',
            'Content-Type': 'application/json'
          }
        }
      );

      // Ensure the result matches the expected user data
      expect(result).toEqual({
        id: 'mock-id',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com'
      });
    });

    it('should throw an error on unsuccessful API request', async () => {
      // Mock getUser token and decoded token
      jest
        .spyOn(keycloakService, 'getAdminToken')
        .mockResolvedValue('mock-admin-token');
      jest
        .spyOn(keycloakService, 'getDecodedToken')
        .mockResolvedValue({ sub: 'mock-sub' });

      // Mock an unsuccessful fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        text: jest.fn().mockResolvedValue('Not Found')
      });

      // Ensure the function throws the expected error
      await expect(keycloakService.getUser(mockUserToken)).rejects.toThrowError(
        'Keycloak API request failed with status 404. Details: Not Found'
      );
    });

    it('should throw an error if fetch throws an exception', async () => {
      // Mock getUser token and decoded token
      jest
        .spyOn(keycloakService, 'getAdminToken')
        .mockResolvedValue('mock-admin-token');
      jest
        .spyOn(keycloakService, 'getDecodedToken')
        .mockResolvedValue({ sub: 'mock-sub' });

      // Mock an exception thrown by fetch
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      // Ensure the function throws the expected error
      await expect(keycloakService.getUser(mockUserToken)).rejects.toThrowError(
        'Keycloak API request failed: Network error'
      );
    });
  });
});
