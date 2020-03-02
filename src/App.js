import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { FacebookProvider } from 'react-facebook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Header from './Header/Header';
import MainPage from './MainPage/MainPage';
import Footer from './Footer/Footer';
import Post from './Post/Post';

const client = new ApolloClient({
  uri: 'https://api.polishline.pl/graphql',
});

function App() {
  return (
    <Router>
      <FacebookProvider appId="431500727519846">
        <ApolloProvider client={client}>
          <Header />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/post/:id/" component={Post} />
          </Switch>
          <Footer />
        </ApolloProvider>
      </FacebookProvider>
    </Router>
  );
}

export default App;