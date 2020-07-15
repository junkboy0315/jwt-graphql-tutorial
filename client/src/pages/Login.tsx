import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

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
        const response = await login({
          variables: {
            email,
            password,
          },
        });
        console.log('login success', response);
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
