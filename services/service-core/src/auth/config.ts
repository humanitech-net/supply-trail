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
  adminClientSecret: string;
  keycloakAdmin: string;
  keycloakAdminPassword: string;
}> = {
  adminClientSecret: 'ADMIN_CLIENT_SECRET',
  keycloakAdmin: 'KEYCLOAK_ADMIN',
  keycloakAdminPassword: 'KEYCLOAK_ADMIN_PASSWORD'
};
