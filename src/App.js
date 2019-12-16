import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { FacebookProvider } from 'react-facebook';

import Header from './Header';
import MainPage from './MainPage';
import Footer from './Footer';

import './App.scss';

function App() {
  return (
    <Router>
      <FacebookProvider appId="431500727519846">
        <Header />
        <MainPage />
        <Footer />
      </FacebookProvider>
    </Router>
  );
}

export default App;