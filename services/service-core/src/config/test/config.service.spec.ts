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
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

jest.mock('fs');
jest.mock('js-yaml');

describe('CustomConfigService', () => {
  // Reset the mocked functions before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const yamlContent = 'yaml-content';

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
      clientId: 'admin-cli',
      KEYCLOAK_ADMIN: 'admin-user',
      KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
      KEYCLOAK_DATA: '/path/to/keycloak/data',
      ADMIN_CLIENT_SECRET: 'client-secret'
    },
    database: {
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USERNAME: 'myuser',
      DB_PASSWORD: 'mypassword',
      DB_DATABASE: 'mydb',
      POSTGRES_DATA: '/path/to/postgres/data'
    }
  };

  it('should load the configuration from the config.yaml file', () => {
    // Mock fs.readFileSync to return the YAML data
    (readFileSync as jest.Mock).mockReturnValue(yamlContent);

    // Mock js-yaml.load to return the expected config data
    (load as jest.Mock).mockReturnValue(configData);

    // Act
    const configService = new CustomConfigService();

    // Assert
    expect(readFileSync).toHaveBeenCalledWith(
      expect.stringContaining('config.yaml'),
      'utf8'
    );
    expect(load).toHaveBeenCalledWith(yamlContent);
    expect(configService.get()).toEqual(configData);
  });

  it('should override the configuration values from environment variables', () => {
    // Arrange

    // Mock fs.readFileSync to return the YAML data
    (readFileSync as jest.Mock).mockReturnValue(yamlContent);

    // Mock js-yaml.load to return the expected config data
    (load as jest.Mock).mockReturnValue(configData);

    // Set environment variables
    process.env.DB_HOST = 'env_db_host';
    // Add other environment variables as needed

    // Act
    const configService = new CustomConfigService();

    // Assert
    expect(configService.get().database.DB_HOST).toBe('env_db_host');
    // Add assertions for other environment variables as needed
  });
});
