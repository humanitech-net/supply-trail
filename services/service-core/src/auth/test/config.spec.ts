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
import { Config } from '../config';

describe('Config', () => {
  it('should have the correct realmUrl', () => {
    expect(Config.realmUrl).toBe(
      'https://dev.supply-trail.humanitech.net/auth/realms/humanitech'
    );
  });

  it('should have the correct adminUrl', () => {
    expect(Config.adminUrl).toBe(
      'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech'
    );
  });

  it('should have the correct grantType', () => {
    expect(Config.grantType).toBe('password');
  });

  it('should have the correct clientId', () => {
    expect(Config.clientId).toBe('admin-cli');
  });

  it('should have the correct adminClientSecret', () => {
    expect(Config.adminClientSecret).toBe('ADMIN_CLIENT_SECRET');
  });

  it('should have the correct keycloakAdmin', () => {
    expect(Config.keycloakAdmin).toBe('KEYCLOAK_ADMIN');
  });

  it('should have the correct keycloakAdminPassword', () => {
    expect(Config.keycloakAdminPassword).toBe('KEYCLOAK_ADMIN_PASSWORD');
  });
});
