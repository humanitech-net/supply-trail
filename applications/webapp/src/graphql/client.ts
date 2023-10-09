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
  fetch: fetch,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
