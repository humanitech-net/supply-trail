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
import "./App.css";
import GraphQlButton from "./Components/Button";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import { Button } from "@mui/material";
import { logout } from "./Authentication/Keycloak";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://dev.supply-trail.humanitech.net/api/graphql",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h3>Hello User you can...</h3>
        <GraphQlButton />
        <Button variant="contained" color="warning" onClick={logout}>
          Logout
        </Button>
      </div>
    </ApolloProvider>
  );
}

export default App;
