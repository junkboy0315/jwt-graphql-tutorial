import { css } from 'emotion';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Routes: React.FC = () => {
  const styles = {
    linkButton: css`
      margin-right: 0.5rem;
    `,
  };

  return (
    <BrowserRouter>
      <header>
        <div>
          <Link className={styles.linkButton} to="/">
            home
          </Link>
          <Link className={styles.linkButton} to="/login">
            login
          </Link>
          <Link className={styles.linkButton} to="/register">
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
