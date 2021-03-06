import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { refreshTokenHander } from './auth/refreshTokenHandler';
import { UserResolver } from './resolvers/UserResolver';

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000', // 最後にスラッシュをつけてはダメよ
      credentials: true,
    }),
  );

  app.get('/', (_, res) => res.send('hello'));
  app.post('/refresh_token', refreshTokenHander);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(8080, () => {
    console.log('express started');
  });

  // createConnection()
  //   .then(async (connection) => {
  //     console.log('Inserting a new user into the database...');
  //     const user = new User();
  //     user.firstName = 'Timber';
  //     user.lastName = 'Saw';
  //     user.age = 25;
  //     await connection.manager.save(user);
  //     console.log('Saved a new user with id: ' + user.id);
  //     console.log('Loading users from the database...');
  //     const users = await connection.manager.find(User);
  //     console.log('Loaded users: ', users);
  //     console.log(
  //       'Here you can setup and run express/koa/any other framework.',
  //     );
  //   })
  //   .catch((error) => console.log(error));
})();
