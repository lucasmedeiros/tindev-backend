import express from 'express';
import DeveloperController from './controllers/DeveloperController';
import LikeController from './controllers/LikeController';
import DislikeController from './controllers/DislikeController';
import { loginRequestHandler } from './auth/login';
import { callbackRequestHandler } from './auth/callback';
import MatchController from './controllers/MatchController';

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
const getParametersResult = (query, defaultMessage) => {
  return query ? query : defaultMessage;
}

// DEFINIÇÃO DAS ROTAS DE GET
routes.get('/', (req, res) => {
  const message = `Hello, ${getParametersResult(req.query.name, 'World')}!`;
  return res.json({ message });
});
routes.get('/devs/:devId/matches', MatchController.index);
routes.get('/dev', DeveloperController.get);
routes.get('/devs', DeveloperController.index);
routes.get('/auth/login', loginRequestHandler);
routes.get('/auth/callback', callbackRequestHandler);

// DEFINIÇÃO DAS ROTAS DE POST
routes.post('/devs', DeveloperController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

export default routes;