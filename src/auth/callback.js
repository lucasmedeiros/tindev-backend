import 'dotenv/config';
import config from '../config';
import querystring from 'querystring';
import request from 'request';

const GITHUB_BASE_AUTH_URL = 'https://github.com/login/oauth/authorize';

const requestAccessToken = (req, res) => {
  res.clearCookie('github-auth-state');
  const { code } = req.query;

  const requestOptions = {
    url: `${GITHUB_BASE_AUTH_URL}/access_token`,
    json: true,
    form: {
      code,
      redirect_uri: config.github.callbackUrl,
      client_id: config.github.outhAppClientId,
      clent_secret: config.github.outhAppClientSecret,
    },
  };

  request.post(requestOptions, (error, response, body) => {
    let url;

    if (!error && response.statusCode === 200) {
      const { access_token: accessToken } = body;
      url = `http://localhost:3000/${accessToken}`;
    } else {
      const query = querystring.stringify({
        error: 'invalid token',
      });
      url = 'http://localhost:3000/error';
    }

    res.redirect(url);
  });
};

export const callbackRequestHandler = (req, res) => {
  const storedState = req.cookies ? req.cookies['github-auth-state'] : null;
  const { state } = req.query;

  console.log('stored_state', storedState);
  console.log('state', state);

  if (state && storedState)
    requestAccessToken(req, res);
  else {
    const query = querystring.stringify({
      error: 'state_mismatch',
    });
    const url = 'http://localhost:3000/errofeio';
    res.redirect(url);
  }
};