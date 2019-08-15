import 'dotenv/config';
import { generateRandomString } from '../util/util';
import querystring from 'querystring';
import config from '../config';

const { outhAppClientId, callbackUrl } = config.github;
const GITHUB_BASE_AUTH_URL = 'https://github.com/login/oauth/authorize';

export const loginRequestHandler = (_req, res) => {
  const state = generateRandomString(16);
  res.cookie('github-auth-state', state);

  const query = querystring.stringify({
    client_id: outhAppClientId,
    scope: 'read:user user:email',
    redirect_uri: callbackUrl,
    state,
  });

  const url = `${GITHUB_BASE_AUTH_URL}?${query}`;
  res.redirect(url);
};
