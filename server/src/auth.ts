import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

export const createAccessToken = (user: User) => {
  return {
    accessToken: sign({ userId: user.id }, 'asdfasdfasd', {
      expiresIn: '15m',
    }),
  };
};

export const createRefreshToken = (user: User) => {
  return {
    accessToken: sign({ userId: user.id }, 'qwerqwer', {
      expiresIn: '7d',
    }),
  };
};
