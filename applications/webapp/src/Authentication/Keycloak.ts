import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "realm-name",
  url: "https://keycloak-server/auth",
  clientId: "client-id",
});

export default keycloak;
