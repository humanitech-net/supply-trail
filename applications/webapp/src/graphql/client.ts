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

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
  fetch,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
