import React from "react";
import useKeycloak from "./auth/useKeycloak";
import Landing from "./Components/landing";
import User from "./Components/user";

const App = () => {
  const { authenticated } = useKeycloak();

  return (
    <div>
      <h1>Welcome to Humanitech</h1>

      {!authenticated ? <Landing /> : <User />}
    </div>
  );
};

export default App;
