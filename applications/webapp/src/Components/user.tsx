/**
 * Humanitech Supply Trail
 *
 * Copyright (c) Humanitech, Peter Rogov and Contributors
 *
 * Website: https://humanitech.net
 * Repository: https://github.com/humanitech-net/supply-trail
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../client";
import useKeycloak from "../auth/useKeycloak";
import GraphQlButton from "./button";

function User() {
  const { logout } = useKeycloak();

  return (
    <ApolloProvider client={client}>
      <div className="User">
        <p>User is authenticated</p>
        <button onClick={logout}>Logout</button>

        <GraphQlButton />
      </div>
    </ApolloProvider>
  );
}

export default User;
