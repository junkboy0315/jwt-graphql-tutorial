import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { setAccessToken } from '../auth/authUtils';

interface Props {}

export const Login: React.FC<Props> = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const { data } = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null;
            }
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.login.user,
              },
            });
          },
        });
        if (data?.login.accessToken) {
          setAccessToken(data?.login.accessToken);
        }
        history.push('/');
      }}
    >
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          value={email}
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          value={password}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};
