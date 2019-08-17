import 'dotenv/config';
import { generateRandomString } from '../util/util';
import querystring from 'querystring';
import config from '../config';

const { oauthAppClientId, callbackUrl, scope } = config.github;
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

export const loginRequestHandler = (_req, res) => {
  const state = generateRandomString(16);
  // res.cookie('github-auth-state', state);

  const query = querystring.stringify({
    client_id: oauthAppClientId,
    scope,
    redirect_uri: callbackUrl,
    state,
  });

  const url = `${GITHUB_AUTHORIZE_URL}?${query}`;
  res.redirect(url);
};
