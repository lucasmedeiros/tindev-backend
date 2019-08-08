// Toda a configuração do servidor deve ser feita aqui
const config = {};
const DEFAULT_PORT = 3333;

const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : null;

config.mongoDB = {
  mongoDBUri: `${ process.env.MONGODB_URI }`,
}

config.host = {
  baseUrl: process.env.SERVER_BASE_URL || 'http://localhost',
  port: port || process.env.SERVER_PORT || DEFAULT_PORT,
  production: process.env.NODE_ENV === 'production',
}

export default config;