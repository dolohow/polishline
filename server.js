import 'isomorphic-fetch';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import Html from './Html';
import App from './src/App';
import assets from './assets';

const app = express();

app.use(express.static(path.resolve(__dirname, '../build'), { index: false }));

app.use(async (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });
  const app = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </ApolloProvider>
  );
  await getDataFromTree(app);
  const state = client.extract();
  const content = ReactDOMServer.renderToStaticMarkup(app);
  const helmet = Helmet.renderStatic();
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html content={content} helmet={helmet} assets={assets} state={state} />,
  );
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
  res.end();
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on ${port} port`);
});
