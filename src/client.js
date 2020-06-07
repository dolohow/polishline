import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  }),
  ssrForceFetchDelay: 100,
});

export default apolloClient;
