import React from 'react';
import { useByeQuery } from '../../generated/graphql';

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { data, loading, error } = useByeQuery();
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>err</div>;
  }
  return <div>bye, {data?.bye}</div>;
};
