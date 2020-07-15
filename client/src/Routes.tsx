import { css } from 'emotion';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Bye } from './features/bye/Bye';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login';
import { Register } from './features/register/Register';

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
          <Link className={styles.linkButton} to="/bye">
            bye
          </Link>
        </div>
      </header>
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
