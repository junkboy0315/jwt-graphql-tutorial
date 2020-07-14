import React from 'react';
import { useHelloQuery } from './generated/graphql';

export const App: React.FC = () => {
  const { data, loading } = useHelloQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
