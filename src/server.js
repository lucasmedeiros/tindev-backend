import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
import config from './config';
import io from 'socket.io';
import http from 'http';

const { baseUrl, port } = config.host;
const { mongoDBUri } = config.mongoDB;

const httpServer = express(); // Inicia um servidor express
const server = http.Server(httpServer);
const socketServer = io(server);

const connectedUsers = {};

socketServer.on('connection', (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

mongoose.connect(mongoDBUri, { useNewUrlParser: true });
// Faz conexão com o banco de dados

httpServer.use((req, res, next) => {
  req.socketServer = socketServer;
  req.connectedUsers = connectedUsers;

  return next();
});

httpServer.use(cors());
httpServer.use(express.json()); // Diz que o servidor precisa reconhecer JSON.
httpServer.use(routes); // Aplica as rotas definidas em routes.js.

server.listen({ port }, () => {
  console.log(`Server listening on ${baseUrl}:${port}`);
}); // Roda o servidor no endereço especificado.