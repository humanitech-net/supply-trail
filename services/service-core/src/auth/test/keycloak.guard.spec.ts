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

import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { KeycloakAuthGuard } from '../keycloak.guard';

describe('KeycloakAuthGuard', () => {
  let keycloakGuard: KeycloakAuthGuard;
  let configService: jest.Mocked<ConfigService>;
  let httpContext: ExecutionContext;
  let graphqlContext: ExecutionContext;
  let graphqlContextMock: GqlExecutionContext;
  const mockPublicKey = 'Public Key';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        KeycloakAuthGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    }).compile();

    keycloakGuard = moduleRef.get<KeycloakAuthGuard>(KeycloakAuthGuard);
    configService = moduleRef.get<ConfigService>(
      ConfigService
    ) as jest.Mocked<ConfigService>;

    httpContext = {
      getType: () => 'http',
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'token'
          }
        })
      })
    } as ExecutionContext;

    graphqlContext = {
      getType: jest.fn().mockReturnValue('graphql'),
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn()
    } as unknown as ExecutionContext;

    graphqlContextMock = {
      getContext: jest.fn().mockReturnValue({
        req: {
          headers: {
            authorization: 'token'
          }
        }
      })
    } as unknown as GqlExecutionContext;
  });

  it('should be defined', () => {
    expect(keycloakGuard).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('canActivate for http context', () => {
    it('should return false if there is no header', () => {
      httpContext.switchToHttp().getRequest().headers.authorization = null;
      expect(keycloakGuard.canActivate(httpContext)).toBeFalsy();
    });

    it('should return true if token is valid', () => {
      jest.spyOn(configService, 'get').mockReturnValue(mockPublicKey);
      jest.spyOn(keycloakGuard, 'validateToken').mockReturnValue(true);

      expect(keycloakGuard.canActivate(httpContext)).toBeTruthy();
      expect(configService.get).toHaveBeenCalledWith('PUBLIC_KEY');
      expect(keycloakGuard.validateToken).toHaveBeenCalledWith(
        'token',
        mockPublicKey
      );
    });

    it('should return false if token is invalid', () => {
      jest.spyOn(configService, 'get').mockReturnValue(mockPublicKey);
      jest.spyOn(keycloakGuard, 'validateToken').mockReturnValue(false);

      expect(keycloakGuard.canActivate(httpContext)).toBeFalsy();
      expect(configService.get).toHaveBeenCalledWith('PUBLIC_KEY');
      expect(keycloakGuard.validateToken).toHaveBeenCalledWith(
        'token',
        mockPublicKey
      );
    });
  });

  describe('canActivate for Graphql context', () => {
    it('should return false when there is no header', () => {
      graphqlContextMock = {
        getContext: jest.fn().mockReturnValue({
          req: {
            headers: {}
          }
        })
      } as unknown as GqlExecutionContext;

      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(graphqlContextMock);

      const result = keycloakGuard.canActivate(graphqlContext);

      expect(result).toBeFalsy();
    });

    it('should return true when token is valid', () => {
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(graphqlContextMock);
      jest.spyOn(configService, 'get').mockReturnValue(mockPublicKey);
      jest.spyOn(keycloakGuard, 'validateToken').mockReturnValue(true);

      expect(keycloakGuard.canActivate(graphqlContext)).toBeTruthy();
      expect(configService.get).toHaveBeenCalledWith('PUBLIC_KEY');
      expect(keycloakGuard.validateToken).toHaveBeenCalledWith(
        'token',
        mockPublicKey
      );
    });

    it('should return false when token is invalid', () => {
      jest
        .spyOn(GqlExecutionContext, 'create')
        .mockReturnValue(graphqlContextMock);

      jest.spyOn(configService, 'get').mockReturnValue(mockPublicKey);
      jest.spyOn(keycloakGuard, 'validateToken').mockReturnValue(false);

      expect(keycloakGuard.canActivate(graphqlContext)).toBeFalsy();
      expect(configService.get).toHaveBeenCalledWith('PUBLIC_KEY');
      expect(keycloakGuard.validateToken).toHaveBeenCalledWith(
        'token',
        mockPublicKey
      );
    });
  });
});
