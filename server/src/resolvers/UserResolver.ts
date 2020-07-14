import { compare, hash } from 'bcryptjs';
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware';
import { createAccessToken, createRefreshToken } from '../auth/tokenCreator';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';

@ObjectType()
class LoginRespone {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @Query(() => String)
  @UseMiddleware(isAuthorizedMiddleware)
  bye(@Ctx() { payload }: MyContext) {
    return `bye! user id is ${payload?.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokens(@Arg('userId', () => Int) userId: number) {
    // `user`テーブルのid===userIdのレコードについて、
    // `tokenVersion`列の値を1つ上げる
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);
    return true;
  }

  @Mutation(() => LoginRespone) // 成功したかどうかを返す
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext,
  ): Promise<LoginRespone> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw Error('bad password');
    }

    // reflesh token
    res.cookie('jid', createRefreshToken(user), {
      httpOnly: true,
    });

    // access token
    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean) // 成功したかどうかを返す
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
