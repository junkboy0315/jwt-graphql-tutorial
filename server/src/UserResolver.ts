import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from './entity/User';

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

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginRespone) // 成功したかどうかを返す
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<LoginRespone> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('could not find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw Error('bad password');
    }

    return {
      accessToken: sign({ userId: user.id }, 'asdfasdfasd', {
        expiresIn: '15m',
      }),
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
