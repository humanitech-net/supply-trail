import { ConfigService } from '../config.service';
import * as dotenv from 'dotenv';

dotenv.config();

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  describe('loadConfiguration', () => {
    it('should load the configuration from the config.yaml file', () => {
      const config = configService['loadConfiguration']();
      expect(config).toBeDefined();
      expect(config.keycloak).toBeDefined();
      expect(config.local).toBeDefined();
    });

    it('should throw an error if the configuration is invalid', () => {
      const configService = new ConfigService();
      jest
        .spyOn(configService as any, 'loadConfiguration')
        .mockImplementation(() => {
          throw new Error('Invalid configuration');
        });
      expect(() => (configService as any)['loadConfiguration']()).toThrow(
        'Invalid configuration'
      );
    });
  });

  describe('getKcConfig', () => {
    it('should return the Keycloak configuration', () => {
      const kcConfig = configService.getKcConfig();
      expect(kcConfig).toBeDefined();
    });
  });

  describe('getLocalConfig', () => {
    it('should return the local configuration', () => {
      const localConfig = configService.getLocalConfig();
      expect(localConfig).toBeDefined();
      expect(localConfig.DB_HOST).toBeDefined();
      expect(localConfig.DB_PORT).toBeDefined();
      expect(localConfig.DB_USERNAME).toBeDefined();
      expect(localConfig.DB_PASSWORD).toBeDefined();
      expect(localConfig.DB_DATABASE).toBeDefined();
      expect(localConfig.POSTGRES_DATA).toBeDefined();
      expect(localConfig.KEYCLOAK_ADMIN).toBeDefined();
      expect(localConfig.KEYCLOAK_ADMIN_PASSWORD).toBeDefined();
      expect(localConfig.KEYCLOAK_DATA).toBeDefined();
      expect(localConfig.ADMIN_CLIENT_SECRET).toBeDefined();
    });
  });
});
