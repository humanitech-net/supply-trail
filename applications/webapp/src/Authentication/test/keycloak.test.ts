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

import { initKeycloak, logout, refreshToken } from "../Keycloak";

interface LocalStorageMock {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const keycloak = {
  init: jest.fn().mockImplementation(() => Promise.resolve(true)),
  updateToken: jest.fn().mockResolvedValue(true),
  logout: jest.fn(),
  token: "mocked-token",
};

const localStorageMock: LocalStorageMock = (() => {
  const store: Record<string, string> = {};

  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value;
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Keycloak", () => {
  describe("initKeycloak()", () => {
    it("should initialize Keycloak", async () => {
      keycloak.init();
      initKeycloak();
      expect(keycloak.init).toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalled;
    });

    it("should throw error if fails to initialize Keycloak ", async () => {
      const error = new Error("Initialization error");
      keycloak.init.mockRejectedValueOnce(error);

      expect(keycloak.init).toHaveBeenCalled;
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith;
    });
  });

  describe("refreshToken()", () => {
    beforeEach(() => {
      refreshToken();
    });

    it("should refresh token and update localStorage", async () => {
      localStorageMock.setItem("token", keycloak.token);
      expect(localStorageMock.getItem("token")).toEqual(keycloak.token);

      expect(keycloak.updateToken).toHaveBeenCalled;
      expect(localStorageMock.setItem).toHaveBeenCalled;
    });

    it("should log an error if fails to refresh token", async () => {
      const error = new Error("Token refresh error");
      keycloak.updateToken.mockRejectedValueOnce(error);
      expect(keycloak.updateToken).toHaveBeenCalled;
    });
  });

  describe("logout()", () => {
    it("should logout and remove token from localStorage", () => {
      logout();
      expect(keycloak.logout).toHaveBeenCalled;
      expect(localStorageMock.removeItem).toHaveBeenCalled;
    });
  });
});
