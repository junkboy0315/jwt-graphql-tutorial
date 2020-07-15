import React, { useEffect, useState } from 'react';
import { setAccessToken } from './authUtils';

interface IProps {
  children: React.ReactElement;
}

export const Authenticator: React.FC<IProps> = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // refresh tokenがcookieに保存されている前提
    fetch('http://localhost:8080/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setIsAuthenticating(false);
    });
  }, []);

  if (isAuthenticating) {
    return <div>authenticating...</div>;
  }

  return children;
};
