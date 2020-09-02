import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './page/Login';
import Home from './page/Home/Home';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
