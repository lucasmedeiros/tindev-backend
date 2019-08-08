import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
import config from './config';

const { baseUrl, port } = config.host;
const { mongoDBUri } = config.mongoDB;

const server = express(); // Inicia um servidor express

mongoose.connect(mongoDBUri, { useNewUrlParser: true });
// Faz conexão com o banco de dados

server.use(cors());
server.use(express.json()); // Diz que o servidor precisa reconhecer JSON.
server.use(routes); // Aplica as rotas definidas em routes.js.

server.listen({ port }, () => {
  console.log(`Server listening on ${baseUrl}:${port}`);
}); // Roda o servidor no endereço especificado.