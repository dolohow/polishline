import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(),
        }
      }
    }
  }).restore(window.__APOLLO_STATE__),
  uri: process.env.REACT_APP_GRAPHQL_URL,
  ssrForceFetchDelay: 100,
});

export default apolloClient;
