import { useEffect, useState } from "react";
import keycloak from "./keycloak";

const useKeycloak = () => {
  const [authenticated, setAuthenticated] = useState(keycloak.authenticated);

  useEffect(() => {
    const checkAuthentication = () => {
      setAuthenticated(keycloak.authenticated);
    };

    // Set up event listeners
    keycloak.onAuthSuccess = checkAuthentication;
    keycloak.onAuthError = checkAuthentication;
    keycloak.onAuthRefreshSuccess = checkAuthentication;
    keycloak.onAuthRefreshError = checkAuthentication;

    // Clean up event listeners
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
