import React from "react";
import useKeycloak from "../auth/useKeycloak";

function User() {
  const { logout } = useKeycloak();
  return (
    <div>
      <p>User is authenticated</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default User;
