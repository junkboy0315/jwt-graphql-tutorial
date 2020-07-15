import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import { Authenticator } from './features/auth/Authenticator';
import { getAccessToken } from './features/auth/authUtils';
import { Routes } from './Routes';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
  request: (operation) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      });
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Authenticator>
        <Routes />
      </Authenticator>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
