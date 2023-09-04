import React, { useEffect, useState } from "react";
import keycloak from "./keycloak";

const App = () => {
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
    keycloak.logout();
  };

  return (
    <div>
      <h1>Welcome to Humanitech</h1>
      {authenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <p>User is {authenticated ? "authenticated" : "not authenticated"}</p>
    </div>
  );
};

export default App;
