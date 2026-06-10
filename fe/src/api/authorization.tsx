import keycloak from "../keycloak";

export default () => ({ Authorization: `Bearer ${keycloak?.token}` });