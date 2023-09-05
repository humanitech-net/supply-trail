import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Humanitech",
  clientId: "supply-trail-app",
});

export default keycloak;
