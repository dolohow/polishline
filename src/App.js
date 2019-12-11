import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Header from './Header';
import MainPage from './MainPage';
import Footer from './Footer';

import './App.scss';

function App() {
  return (
    <Router>
      <Header />
      <MainPage />
      <Footer />
		</Router>
  );
}

export default App;