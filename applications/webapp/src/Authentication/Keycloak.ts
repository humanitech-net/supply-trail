import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "Humanitech",
  url: "http://localhost:8080",
  clientId: "supply-trail-app",
});

export const initKeycloak = () => {
  return new Promise<void>((resolve, reject) => {
    keycloak
      .init({
        onLoad: "check-sso",
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
