import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Header from './Header';
import MainPage from './MainPage'

import './App.scss';

function App() {
  return (
    <Router>
      <Header />
      <MainPage />
		</Router>
  );
}

export default App;