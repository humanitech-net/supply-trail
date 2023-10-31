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

import { keycloakConfigSchema, localConfigSchema } from '../config.validator';

const validateConfig = (schema, config) => {
  const { error } = schema.validate(config);
  return error;
};

describe('keycloakConfigSchema', () => {
  const validKeycloakConfig = {
    authServerUrl: 'http://localhost:8080/auth',
    clientId: 'my-client-id',
    realm: 'my-realm',
    nestClientId: 'my-nest-client-id',
    realmUrl: 'http://localhost:8080/auth/realms/my-realm',
    adminUrl: 'http://localhost:8080/auth/admin/realms/my-realm',
    grantType: 'password'
  };

  it('should validate a valid keycloak configuration', () => {
    const error = validateConfig(keycloakConfigSchema, validKeycloakConfig);
    expect(error).toBeUndefined();
  });

  it('should not validate a keycloak configuration with missing required fields', () => {
    const invalidKeycloakConfig = {
      ...validKeycloakConfig,
      grantType: ''
    };
    const error = validateConfig(keycloakConfigSchema, invalidKeycloakConfig);
    expect(error).toBeDefined();
  });

  it('should not validate a keycloak configuration with invalid fields', () => {
    const invalidKeycloakConfig = {
      ...validKeycloakConfig,
      grantType: 123
    };
    const error = validateConfig(keycloakConfigSchema, invalidKeycloakConfig);
    expect(error).toBeDefined();
  });
});

describe('localConfigSchema', () => {
  const validLocalConfig = {
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

  it('should validate a valid local configuration', () => {
    const error = validateConfig(localConfigSchema, validLocalConfig);
    expect(error).toBeUndefined();
  });

  it('should not validate a local configuration with missing required fields', () => {
    const invalidLocalConfig = {
      ...validLocalConfig,
      KEYCLOAK_DATA: ''
    };
    const error = validateConfig(localConfigSchema, invalidLocalConfig);
    expect(error).toBeDefined();
  });

  it('should not validate a local configuration with invalid fields', () => {
    const invalidLocalConfig = {
      ...validLocalConfig,
      ADMIN_CLIENT_SECRET: 123
    };
    const error = validateConfig(localConfigSchema, invalidLocalConfig);
    expect(error).toBeDefined();
  });
});
