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
import { CustomConfigService } from '../config.service';
import { AppConfigDto } from '../config.dto';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

jest.mock('fs');
jest.mock('js-yaml');

describe('CustomConfigService', () => {
  // Reset the mocked functions before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load the configuration from the config.yaml file', () => {
    // Arrange
    const configData: AppConfigDto = {
      keycloak: {
        authServerUrl: 'https://example.com/auth',
        realm: 'humanitech',
        nestClientId: 'nest-application',
        realmUrl:
          'https://dev.supply-trail.humanitech.net/auth/realms/humanitech',
        adminUrl:
          'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech',
        grantType: 'password',
        clientId: 'admin-cli'
      },
      local: {
        DB_HOST: 'localhost',
        DB_PORT: '5432',
        DB_USERNAME: 'myuser',
        DB_PASSWORD: 'mypassword',
        DB_DATABASE: 'mydb',
        POSTGRES_DATA: '/path/to/postgres/data',
        KEYCLOAK_ADMIN: 'admin-user',
        KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
        KEYCLOAK_DATA: '/path/to/keycloak/data',
        ADMIN_CLIENT_SECRET: 'client-secret'
      }
    };

    // Mock fs.readFileSync to return the YAML data
    (fs.readFileSync as jest.Mock).mockReturnValue('yaml content');

    // Mock js-yaml.load to return the expected config data
    (yaml.load as jest.Mock).mockReturnValue(configData);

    // Act
    const configService = new CustomConfigService();

    // Assert
    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('config.yaml'),
      'utf8'
    );
    expect(yaml.load).toHaveBeenCalledWith('yaml content');
    expect(configService.get()).toEqual(configData);
  });

  it('should override the configuration values from environment variables', () => {
    // Arrange
    const configData: AppConfigDto = {
      keycloak: {
        authServerUrl: 'https://example.com/auth',
        realm: 'humanitech',
        nestClientId: 'nest-application',
        realmUrl:
          'https://dev.supply-trail.humanitech.net/auth/realms/humanitech',
        adminUrl:
          'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech',
        grantType: 'password',
        clientId: 'admin-cli'
      },
      local: {
        DB_HOST: 'localhost',
        DB_PORT: '5432',
        DB_USERNAME: 'myuser',
        DB_PASSWORD: 'mypassword',
        DB_DATABASE: 'mydb',
        POSTGRES_DATA: '/path/to/postgres/data',
        KEYCLOAK_ADMIN: 'admin-user',
        KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
        KEYCLOAK_DATA: '/path/to/keycloak/data',
        ADMIN_CLIENT_SECRET: 'client-secret'
      }
    };

    // Mock fs.readFileSync to return the YAML data
    (fs.readFileSync as jest.Mock).mockReturnValue('yaml content');

    // Mock js-yaml.load to return the expected config data
    (yaml.load as jest.Mock).mockReturnValue(configData);

    // Set environment variables
    process.env.DB_HOST = 'env_db_host';
    // Add other environment variables as needed

    // Act
    const configService = new CustomConfigService();

    // Assert
    expect(configService.get().local.DB_HOST).toBe('env_db_host');
    // Add assertions for other environment variables as needed
  });
});
