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

      expect(axios.get).toHaveBeenCalledWith(
        'https://dev.supply-trail.humanitech.net/auth/realms/humanitech'
      );
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

  describe('getAdminToken', () => {
    it('returns access token when fetch is successful', async () => {
      const mockSuccessResponse = {
        json: jest.fn().mockResolvedValue({
          access_token: 'access-token',
          refresh_token: 'refresh-token'
        })
      } as unknown as Response;

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
