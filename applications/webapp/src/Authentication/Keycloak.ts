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
  realm: "Humanitech",
  url: process.env.KEYCLOAK_SERVER_URL,
  clientId: "supply-trail-app",
});

export const initKeycloak = () => {
  return new Promise<void>((resolve, reject) => {
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((authenticated) => {
        if (authenticated) {
          localStorage.setItem("token", JSON.stringify(keycloak.token));
        }
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const refreshToken = () => {
  keycloak
    .updateToken(300)
    .then((refreshed) => {
      if (refreshed) {
        localStorage.setItem("token", JSON.stringify(keycloak.token));
      }
    })
    .catch((error) => {
      console.log("Failed to refresh token:", error);
    });
};

export const logout = () => {
  keycloak.logout();
  localStorage.removeItem("token");
};
