import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';

export const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
