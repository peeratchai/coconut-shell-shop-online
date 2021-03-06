import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './page/Login';
import Home from './page/Home/Home';
import History from './page/History/History';
import Products from './page/Products/Products';
import Cart from './page/Cart/Cart';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cart from './redux/reducers/'
const store = createStore(cart)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
