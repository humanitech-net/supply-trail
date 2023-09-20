import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "realm-name",
  url: process.env.KEYCLOAK_SERVER_URL,
  clientId: "client-id",
});

export default keycloak;
