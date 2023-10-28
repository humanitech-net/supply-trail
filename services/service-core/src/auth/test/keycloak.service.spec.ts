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

    keycloakService['keycloak'] = {
      grantType: 'your-grant-type',
      clientId: 'your-client-id',
      realmUrl: 'your-realm-url'
      // Add other properties as needed for your test
    };
  });

  describe('getPublicKey', () => {
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
      const mockError = new Error('Error: Fetch error');

      jest.spyOn(global, 'fetch').mockRejectedValue(mockError);

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        mockError
      );
    });
  });

  describe('editUser', () => {
    it('calls getAdminToken and updates the user', async () => {
      jest
        .spyOn(keycloakService, 'getAdminToken')
        .mockResolvedValue('mock-token');

      const mockUserInput = {
        firstName: 'user',
        lastName: 'lastName',
        username: 'username'
      };

      const mockID = 'ID';
      const mockSuccessfulResponse = new Response(null, {
        status: 200,
        statusText: 'OK'
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockSuccessfulResponse);

      const editUser = await keycloakService.editUser(mockID, mockUserInput);

      expect(keycloakService.getAdminToken).toHaveBeenCalled();
      expect(editUser).toBe('Successfully Updated');
    });

    it('returns "Try again, failed to update" if the update fails', async () => {
      jest
        .spyOn(keycloakService, 'getAdminToken')
        .mockResolvedValue('mock-token');

      const mockUserInput = {
        firstName: 'user',
        lastName: 'lastName',
        username: 'username'
      };

      const mockID = 'ID';
      const mockFailedResponse = new Response(null, {
        status: 500,
        statusText: ''
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockFailedResponse);

      const editUser = await keycloakService.editUser(mockID, mockUserInput);

      expect(keycloakService.getAdminToken).toHaveBeenCalled();
      expect(editUser).toBe('Try again, failed to update');
    });
  });

  describe('getUser', () => {
    it('should throw an error for an invalid token', async () => {
      const mockToken = 'your_mocked_invalid_token';
      const mockPublicKey = 'your_mocked_public_key';

      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      (verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid Token');
      });

      await expect(keycloakService.getUser(mockToken)).rejects.toThrow(
        'Invalid Token'
      );
    });

    it('should throw an error if fetching public key fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(
        keycloakService.getUser('your_mocked_valid_token')
      ).rejects.toThrow(errorMessage);
    });
  });
});
