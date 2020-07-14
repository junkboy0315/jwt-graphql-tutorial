import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export interface MyContext extends ExpressContext {
  payload?: { userId: string };
}
