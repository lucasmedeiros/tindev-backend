const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const MongoAuth = require('./MongoAuth');
/* Você deve criar um aquivo MongoAuth.js e colocar no module.exports o 
mongoString com a string de autenticação do seu banco de dados do Mongo Atlas */

const server = express(); // Inicia um servidor express

mongoose.connect(MongoAuth.mongoString, { useNewUrlParser: true });
// Faz conexão com o banco de dados

server.use(cors());
server.use(express.json()); // Diz que o servidor precisa reconhecer JSON.
server.use(routes); // Aplica as rotas definidas em routes.js

server.listen(3333); // Roda o servidor em https://localhost:3333/