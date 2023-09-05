import { useEffect, useState } from "react";
import keycloak from "./keycloak";

const useKeycloak = () => {
  const [authenticated, setAuthenticated] = useState(keycloak.authenticated);

  useEffect(() => {
    const checkAuthentication = () => {
      setAuthenticated(keycloak.authenticated);
    };

    keycloak.onAuthSuccess = checkAuthentication;
    keycloak.onAuthError = checkAuthentication;
    keycloak.onAuthRefreshSuccess = checkAuthentication;
    keycloak.onAuthRefreshError = checkAuthentication;

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthError = undefined;
      keycloak.onAuthRefreshSuccess = undefined;
      keycloak.onAuthRefreshError = undefined;
    };
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    localStorage.removeItem("token");
    keycloak.logout();
  };

  return { authenticated, login, logout };
};

export default useKeycloak;
