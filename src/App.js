import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Header';
import MainPage from './MainPage'

import './App.scss';

function App() {
  return (
    <Router>
      <Header />
      <MainPage />
	    <Switch>
	      <Route exact path="/">
	      </Route>
      </Switch>
		</Router>
  );
}

export default App;