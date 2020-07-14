import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import { createAccessToken, createRefreshToken } from './tokenCreator';

export const refreshTokenHander: RequestHandler = async (req, res) => {
  // refresh tokenが有効であることを確認する
  // (ここでは、refreshTokenのみcookieの`jid`に格納されている前提とする)
  const refreshToken = req.cookies.jid;
  if (!refreshToken) {
    return res.send({ ok: false, accessToken: '' });
  }
  let refreshTokenPayload: any = null;
  try {
    refreshTokenPayload = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    );
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  // refresh tokenが復元できた場合に以下の処理が行われる

  const user = await User.findOne({ id: refreshTokenPayload.userId });
  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  // refresh tokenのバージョンが古い場合はエラーとする
  if (refreshTokenPayload.tokenVersion !== user.tokenVersion) {
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
