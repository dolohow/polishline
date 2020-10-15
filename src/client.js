import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  uri: process.env.REACT_APP_GRAPHQL_URL,
  ssrForceFetchDelay: 100,
});

export default apolloClient;
