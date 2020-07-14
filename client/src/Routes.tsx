import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <div>
          <Link className="mr-5" to="/">
            home
          </Link>
          <Link className="mr-5" to="/login">
            login
          </Link>
          <Link className="mr-5" to="/register">
            register
          </Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" render={Home}></Route>
        <Route exact path="/register" render={Register}></Route>
        <Route exact path="/login" render={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
};
