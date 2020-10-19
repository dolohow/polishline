import React from 'react';
import {
  Route, Switch
} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { FacebookProvider } from 'react-facebook';


import Header from './Header/Header';
import MainPage from './MainPage/MainPage';
import Footer from './Footer/Footer';
import Post from './Post/Post';
import Product from './Product/Product';
import Store from './Store/Store';
import Cart from './Cart/Cart';
import Loader from './Loader';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APPID}>
          <Header />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/tag/:tag/" component={MainPage} />
            <Route path="/store/cart" component={Cart} />
            <Route path="/store" component={Store} />
            <Route path="/product/:slug/" component={Product} />
            <Route path="/:slug/" component={Post} />
          </Switch>
          <Footer />
        </FacebookProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
