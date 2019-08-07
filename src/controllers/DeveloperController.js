import axios from 'axios';
import Developer from '../models/Developer';

/**
 * Controlador dos desenvolvedores cadastrados no sistema.
 * 
 * @author: lucasmedeiros
 */

export default {
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

    const userExists = await Developer.findOne({ user });

    if (userExists)
      return res.json(userExists);

    const response = await axios.get(`https://api.github.com/users/${user}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const developer = await Developer.create({ 
      name,
      user,
      bio,
      avatar,
    });
    
    return res.json(developer);
  },
};
