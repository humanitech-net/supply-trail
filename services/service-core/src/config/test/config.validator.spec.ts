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

describe('keycloakConfigSchema', () => {
  it('should validate a valid keycloak configuration', () => {
    const validConfig = {
      authServerUrl: 'http://localhost:8080/auth',
      clientId: 'my-client-id',
      realm: 'my-realm',
      nestClientId: 'my-nest-client-id',
      realmUrl: 'http://localhost:8080/auth/realms/my-realm',
      adminUrl: 'http://localhost:8080/auth/admin/realms/my-realm',
      grantType: 'password'
    };
    const { error } = keycloakConfigSchema.validate(validConfig);
    expect(error).toBeUndefined();
  });

  it('should not validate a keycloak configuration with missing required fields', () => {
    const invalidConfig = {
      authServerUrl: 'http://localhost:8080/auth',
      clientId: 'my-client-id',
      realm: 'my-realm',
      nestClientId: 'my-nest-client-id',
      realmUrl: 'http://localhost:8080/auth/realms/my-realm',
      adminUrl: 'http://localhost:8080/auth/admin/realms/my-realm',
      // grantType is missing
      grantType: ''
    };
    const { error } = keycloakConfigSchema.validate(invalidConfig);
    expect(error).toBeDefined();
  });

  it('should not validate a keycloak configuration with invalid fields', () => {
    const invalidConfig = {
      authServerUrl: 'http://localhost:8080/auth',
      clientId: 'my-client-id',
      realm: 'my-realm',
      nestClientId: 'my-nest-client-id',
      realmUrl: 'http://localhost:8080/auth/realms/my-realm',
      adminUrl: 'http://localhost:8080/auth/admin/realms/my-realm',
      grantType: 123 // grantType should be a string
    };
    const { error } = keycloakConfigSchema.validate(invalidConfig);
    expect(error).toBeDefined();
  });
});

describe('localConfigSchema', () => {
  it('should validate a valid local configuration', () => {
    const validConfig = {
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
    const { error } = localConfigSchema.validate(validConfig);
    expect(error).toBeUndefined();
  });

  it('should not validate a local configuration with missing required fields', () => {
    const invalidConfig = {
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USERNAME: 'my-username',
      DB_PASSWORD: 'my-password',
      DB_DATABASE: 'my-database',
      POSTGRES_DATA: '/var/lib/postgresql/data',
      KEYCLOAK_ADMIN: 'admin',
      KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
      // KEYCLOAK_DATA is missing
      ADMIN_CLIENT_SECRET: 'my-client-secret',
      KEYCLOAK_DATA: ''
    };
    const { error } = localConfigSchema.validate(invalidConfig);
    expect(error).toBeDefined();
  });

  it('should not validate a local configuration with invalid fields', () => {
    const invalidConfig = {
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USERNAME: 'my-username',
      DB_PASSWORD: 'my-password',
      DB_DATABASE: 'my-database',
      POSTGRES_DATA: '/var/lib/postgresql/data',
      KEYCLOAK_ADMIN: 'admin',
      KEYCLOAK_ADMIN_PASSWORD: 'admin-password',
      KEYCLOAK_DATA: '/opt/keycloak/data',
      ADMIN_CLIENT_SECRET: 123 // ADMIN_CLIENT_SECRET should be a string
    };
    const { error } = localConfigSchema.validate(invalidConfig);
    expect(error).toBeDefined();
  });
});
