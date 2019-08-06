const express = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

/**
 * Definição das rotas que serão utilizadas pelo servidor.
 * 
 * @author: lucasmedeiros
 */

const routes = express.Router();

/**
 * Método para pegar argumentos passados na URL nas requisições.
 * 
 * @param {JSON} query parâmetro, cuja existência na barra de URL será verificada.
 * @param {String} defaultMessage mensagem que deve ser mostrada caso não tenha
 * sido passado nenhum argumento.
 */
const getQueryResult = (query, defaultMessage) => {
  return query ? query : defaultMessage;
}

// DEFINIÇÃO DAS ROTAS DE GET

routes.get('/', (req, res) => {
  const message = `Hello, ${getQueryResult(req.query.name, 'World')}!`;
  return res.json({ message });
});
routes.get('/devs', DeveloperController.index);

// DEFINIÇÃO DAS ROTAS DE POST

routes.post('/devs', DeveloperController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;