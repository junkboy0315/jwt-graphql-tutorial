import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Bye } from './features/bye/Bye';
import { Header } from './features/header/Header';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login';
import { Register } from './features/register/Register';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/bye">
          <Bye />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
