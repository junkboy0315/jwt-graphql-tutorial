import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../../generated/graphql';

interface Props {}

export const Register: React.FC<Props> = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await register({
          variables: {
            email,
            password,
          },
        });
        console.log(response);
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
      <button type="submit">register</button>
    </form>
  );
};
