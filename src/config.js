// Toda a configuração do servidor deve ser feita aqui
const config = {};
const DEFAULT_PORT = 3333;

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : null;

config.mongoDB = {
  mongoDBUri: `${ process.env.MONGODB_URI }`,
}

config.github = {
  outhAppClientId: `${process.env.GITHUB_OAUTH_APP_CLIENT_ID}`,
  outhAppClientSecret: `${process.env.GITHUB_OAUTH_APP_CLIENT_SECRET}`,
  callbackUrl: `${process.env.GITHUB_OAUTH_APP_CALLBACK_URL}`,
}

config.client = {
  baseUrl:
    `${process.env.CLIENT_BASE_URL}:${process.env.CLIENT_PORT}` ||
    'http://localhost:3000',
  successPath: process.env.CLIENT_AUTH_SUCCESS_PATH || '/auth',
  errorPath: process.env.CLIENT_AUTH_FAIL_PATH || '/error',
}

config.host = {
  baseUrl: process.env.SERVER_BASE_URL || 'http://localhost',
  port: port || process.env.SERVER_PORT || DEFAULT_PORT,
  production: process.env.NODE_ENV === 'production',
}

export default config;