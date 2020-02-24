import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { FacebookProvider } from 'react-facebook';

import Header from './Header/Header';
import MainPage from './MainPage/MainPage';
import Footer from './Footer/Footer';
import Post from './Post/Post';

import './App.scss';

function App() {
  return (
    <Router>
      <FacebookProvider appId="431500727519846">
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/post/:id/" component={Post} />
        </Switch>
        <Footer />
      </FacebookProvider>
    </Router>
  );
}

export default App;