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

export const Config: Readonly<{
  realmUrl: string;
  adminUrl: string;
  grantType: string;
  clientId: string;
  adminClientSecret: string;
  keycloakAdmin: string;
  keycloakAdminPassword: string;
}> = {
  realmUrl: 'https://dev.supply-trail.humanitech.net/auth/realms/humanitech',
  adminUrl:
    'https://dev.supply-trail.humanitech.net/auth/admin/realms/humanitech',
  grantType: 'password',
  clientId: 'admin-cli',
  adminClientSecret: 'ADMIN_CLIENT_SECRET',
  keycloakAdmin: 'KEYCLOAK_ADMIN',
  keycloakAdminPassword: 'KEYCLOAK_ADMIN_PASSWORD'
};
