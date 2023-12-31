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

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "humanitech",
  url: `https://dev.supply-trail.humanitech.net/auth`,
  clientId: "supply-trail-app",
});

export const initKeycloak = () => {
  return new Promise<void>((resolve, reject) => {
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then(() => {
        if (keycloak.token) {
          localStorage.setItem("token", keycloak.token);
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const refreshToken = () => {
  const updateTokenStates = 300;
  keycloak
    .updateToken(updateTokenStates)
    .then(() => {
      if (keycloak.token) {
        localStorage.setItem("token", keycloak.token);
      }
    })
    .catch((error) => {
      console.log(`Failed to refresh token:, ${error}`);
    });
};

export const logout = () => {
  keycloak.logout();
  localStorage.removeItem("token");
};
