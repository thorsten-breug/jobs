import Keycloak from "keycloak-js";

const keycloak: Keycloak = new Keycloak({
  url: "http://localhost:8090",
  realm: "test",
  clientId: "jobs",
});

export default keycloak;