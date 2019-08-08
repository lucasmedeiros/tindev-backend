import axios from 'axios';
import Developer from '../models/Developer';

const GITHUB_API_USERS_URL = 'https://api.github.com/users/';

/**
 * Controlador dos desenvolvedores cadastrados no sistema.
 * 
 * @author: lucasmedeiros
 */

const DeveloperController = {
  /**
   * Retorna os usuários disponíveis para um usuário dar likes ou dislikes.
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Developer.findById(user);

    const availableUsersForLikes = await Developer.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return res.json(availableUsersForLikes);
  },
  /**
   * Armazena um novo desenvolvedor no banco de dados. Caso já exista um usuário
   * cadastrado com o mesmo username, não adiciona uma nova linha ao banco de
   * dados.
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async store(req, res) {
    const { username: user } = req.body;

    let developer = await Developer.findOne({ user });

    if (developer)
      return res.json(developer);
    
    const githubUrl = GITHUB_API_USERS_URL + user;
    const response = await axios.get(githubUrl);
    const { name, bio, avatar_url: avatar } = response.data;

    developer = await Developer.create({ 
      name: name || user,
      user,
      bio,
      avatar,
    });
    
    return res.json(developer);
  },
};

export default DeveloperController;