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
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';


const client = new ApolloClient({
  uri:'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h3>Hello User you can...</h3>
        <GraphQlButton />
      </div>
    </ApolloProvider>
  );
}

export default App;
