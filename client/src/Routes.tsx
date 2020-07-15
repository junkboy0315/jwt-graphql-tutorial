import { css } from 'emotion';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Bye } from './pages/Bye';
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
