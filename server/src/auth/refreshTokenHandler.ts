import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import { createAccessToken, createRefreshToken } from './tokenCreator';

export const refreshTokenHander: RequestHandler = async (req, res) => {
  // refresh tokenが有効であることを確認する
  const refreshToken = req.cookies.jid;
  if (!refreshToken) {
    return res.send({ ok: false, accessToken: '' });
  }
  let payload: any = null;
  try {
    payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  // refresh tokenが正しい場合は以下の処理が行われる
  const user = await User.findOne({ id: payload.userId });
  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  // ローカルのrefresh tokenを毎回最新化しておく
  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });

  return res.send({
    ok: true,
    accessToken: createAccessToken(user),
  });
};
