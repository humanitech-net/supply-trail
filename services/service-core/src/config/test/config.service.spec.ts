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
import * as yaml from 'js-yaml';

jest.mock('js-yaml', () => ({
  load: jest.fn()
}));

const commonConfig = {
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USERNAME: 'my-username',
  DB_PASSWORD: 'my-password',
  DB_DATABASE: 'my-database',
  POSTGRES_DATA: '/var/lib/postgresql/data',
  KEYCLOAK_ADMIN: 'admin',
  KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
  KEYCLOAK_DATA: '/opt/keycloak/data',
  ADMIN_CLIENT_SECRET: 'my-client-secret'
};

const mockConfig = {
  authServerUrl: 'http://localhost:8080/auth',
  clientId: 'my-client-id',
  realm: 'my-realm',
  nestClientId: 'my-nest-client-id',
  realmUrl: 'http://localhost:8080/auth/realms/my-realm',
  adminUrl: 'http://localhost:8080/auth/admin/realms/my-realm',
  grantType: 'password'
};

const setMockYamlLoad = (mock) => {
  const mockYamlLoad = yaml.load as jest.Mock;
  mockYamlLoad.mockReturnValue({ keycloak: mock });
};

describe('ConfigService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = {
      ...originalEnv,
      ...commonConfig
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should load configuration properly', () => {
    setMockYamlLoad(mockConfig);
    const configService = new CustomConfigService();

    expect(yaml.load).toHaveBeenCalledWith(expect.any(String));
    expect(configService.getKcConfig()).toEqual(mockConfig);
  });

  it('should throw error on invalid configuration', () => {
    setMockYamlLoad({ invalidKey: 'invalidValue' });
    expect(() => new CustomConfigService()).toThrow('Config validation error');
  });

  it('should get local configuration properly', () => {
    setMockYamlLoad(mockConfig);
    const configService = new CustomConfigService();
    const result = configService.getLocalConfig();

    expect(result).toEqual(commonConfig);
  });

  it('should throw error on invalid local configuration', () => {
    process.env = {
      DB_HOST: ''
    };

    setMockYamlLoad(mockConfig);
    expect(() => new CustomConfigService()).toThrow('Config validation error');
  });
});
