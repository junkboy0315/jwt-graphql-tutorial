import { css } from 'emotion';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { setAccessToken } from '../auth/authUtils';

interface IProps {}

export const Header: React.FC<IProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout, { client: apolloClient }] = useLogoutMutation();

  const styles = {
    linkButton: css`
      margin-right: 0.5rem;
    `,
  };

  let userInfo: React.ReactNode = null;

  if (loading) {
    userInfo = null;
  } else if (data?.me) {
    userInfo = <div>you are logged in as: {data.me.email}</div>;
  } else {
    userInfo = <div>not logged in</div>;
  }

  return (
    <header>
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
      <button
        onClick={async () => {
          await logout();
          setAccessToken('');
          apolloClient?.resetStore();
        }}
      >
        logout
      </button>
      {userInfo}
    </header>
  );
};
