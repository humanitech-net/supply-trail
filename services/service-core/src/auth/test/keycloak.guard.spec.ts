import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeycloakAuthGuard } from '../keycloak.guard';

describe('KeycloakAuthGuard', () => {
  let keycloakAuthGuard: KeycloakAuthGuard;
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
    keycloakAuthGuard = new KeycloakAuthGuard(configService);
  });

  describe('canActivate', () => {
    it('should return false when there is no header', () => {
      const context: ExecutionContext = {
        getType: jest.fn().mockReturnValue('http'),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {}
          })
        }),
        getClass: jest.fn(),
        getHandler: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn()
      } as ExecutionContext;

      expect(keycloakAuthGuard.canActivate(context)).toBe(false);
    });

    it('should return false when there is a header and the token is invalid in the HTTP context', () => {
      const context: ExecutionContext = {
        getType: jest.fn().mockReturnValue('http'),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer invalid_token'
            }
          })
        }),
        getClass: jest.fn(),
        getHandler: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn()
      } as ExecutionContext;

      expect(keycloakAuthGuard.canActivate(context)).toBe(false);
    });
  });
});
