import React from "react";
import useKeycloak from "../auth/useKeycloak";

function Landing() {
  const { login } = useKeycloak();
  return (
    <div>
      <p>User is not authenticated</p>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Landing;
