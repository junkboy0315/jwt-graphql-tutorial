import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../MyContext';

export const isAuthorizedMiddleware: MiddlewareFn<MyContext> = (
  { context },
  next,
) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (e) {
    console.log(e);
    throw new Error('not authenticated');
  }

  return next();
};
