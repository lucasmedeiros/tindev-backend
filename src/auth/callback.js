import 'dotenv/config';
import config from '../config';
import querystring from 'querystring';
import request from 'request';

const GITHUB_BASE_AUTH_URL = 'https://github.com/login/oauth';

const requestAccessToken = (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.send({
      success: false,
      message: 'Error: no code returned from Github.',
    });
  }

  const { callbackUrl, oauthAppClientId, oauthAppClientSecret } = config.github;

  const requestOptions = {
    url: `${GITHUB_BASE_AUTH_URL}/access_token`,
    json: true,
    form: {
      code,
      redirect_uri: callbackUrl,
      client_id: oauthAppClientId,
      client_secret: oauthAppClientSecret,
    },
  };

  request.post(requestOptions, (error, response, body) => {
    let url;

    if (!error && response.statusCode === 200) {
      const { access_token: accessToken } = body;
      const { successPath } = config.client;
      url = `${successPath}/${accessToken}`;
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
  const { state } = req.query;

  if (state)
    requestAccessToken(req, res);
  else {
    const query = querystring.stringify({
      error: 'state_mismatch',
    });
    const url = 'http://localhost:3000/errofeio';
    res.redirect(url);
  }
};
