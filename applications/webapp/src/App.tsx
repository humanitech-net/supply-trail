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
import logo from './logo.svg';
import './App.css';
import { ApolloClient,InMemoryCache,ApolloProvider,HttpLink,from } from '@apollo/client';
import {onError} from "@apollo/client/link/error"
import { GraphQLError } from 'graphql';
import GetUsers from './GetUsers';
const errorLink=onError(({graphqlErrors,networkErrors}))
const link =from({
  errorLink,
  new HttpLink({uri:"http://localhost:3000/graphql"})=>
  {
    if(graphQLErrors){
      graphqlErrors.map(({message,location,path})=>{
       alert(`graphql erro ${message}`) 
      })
    }
  }
});
const link=from({
  cache:new InMemoryCache();
  link:link,
})
function App() {
  return (
    <div className="App">
     <ApolloProvider client={client}>
      
<GetUsers/>
     </ApolloProvider>
    </div>
  );
}

export default App;
