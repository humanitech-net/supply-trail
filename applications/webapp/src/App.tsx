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

import React from 'react';
import './App.css';
import GraphQlButton from './Components/Button';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";


const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

const httpLink = new HttpLink({ uri: "http://localhost:8080/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorLink,
    httpLink
  ]),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello</h1>
        <GraphQlButton />
      </div>
    </ApolloProvider>
  );
}

export default App;
