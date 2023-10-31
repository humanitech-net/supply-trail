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
import { CustomConfigService } from '../../config/config.service';
import * as dotenv from 'dotenv';

dotenv.config();

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('KeycloakService', () => {
  let keycloakService: KeycloakService;

  const errorMessage = 'Failed to fetch Public Key';

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakService, CustomConfigService]
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
        statusText: "Couldn't get token"
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockFailedResponse);

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        "Couldn't get token"
      );
    });

    it('throws an error with the status text when fetch is not OK', async () => {
      const mockErrorResponse = new Response(null, {
        status: 500,
        statusText: "Couldn't get token"
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockErrorResponse);

      await expect(keycloakService.getAdminToken()).rejects.toThrowError(
        "Couldn't get token"
      );
    });
  });

  describe('editUser', () => {
    const mockToken = 'mock-token';

    it('calls getAdminToken and updates the user', async () => {
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(mockToken);

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
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(mockToken);

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

    it('firstName is not allowed to be empty', async () => {
      jest.spyOn(keycloakService, 'getAdminToken').mockResolvedValue(mockToken);

      const mockUserInput = {
        firstName: '',
        lastName: 'lastName',
        username: 'username'
      };

      const mockID = 'ID';

      const mockSuccessfulResponse = new Response(null, {
        status: 200,
        statusText: 'OK'
      });

      jest.spyOn(global, 'fetch').mockResolvedValue(mockSuccessfulResponse);

      await expect(
        keycloakService.editUser(mockID, mockUserInput)
      ).rejects.toThrowError('"firstName" is not allowed to be empty'); // Modify the error message to match the required string
    });
  });

  describe('getUser', () => {
    it('should decode a valid token and return user data', async () => {
      const mockToken = 'your_mocked_valid_token';
      const mockPublicKey = 'your_mocked_public_key';

      (axios.get as jest.Mock).mockResolvedValue({
        data: { public_key: mockPublicKey }
      });

      const decodedToken = {
        sub: 'sample_sid',
        given_name: 'John',
        family_name: 'Doe',
        email: 'john.doe@example.com',
        preferred_username: 'johndoe'
      };

      (verify as jest.Mock).mockReturnValue(decodedToken);

      const userData = await keycloakService.getUser(mockToken);

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
