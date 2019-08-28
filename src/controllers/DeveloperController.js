import axios from 'axios';
import Developer from '../models/Developer';

const GITHUB_API_USER_URL = 'https://api.github.com/user';
/**
 * Controlador dos desenvolvedores cadastrados no sistema.
 * 
 * @author: lucasmedeiros
 */

const DeveloperController = {
  /**
   * Retorna um usuário específico, a partir de seu ID.
   * 
   * @param {Request} req 
   * @param {Response} res 
   */
  async get(req, res) {
    const { user } = req.headers;
    try {
      const loggedDev = await Developer.findById(user);
      
      if (!loggedDev)
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado!',
        });
      
      return res.status(200).json(loggedDev);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'ID informado inválido!',
      });
    }
  },
  /**
   * Retorna os usuários disponíveis para um usuário dar likes ou dislikes.
   * 
   * @param {Request} req 
   * @param {Response} res 
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
   * @param {Request} req 
   * @param {Response} res 
   */
  async store(req, res) {
    const { token } = req.body;

    try {
      const githubApiResponseFromToken = await axios.get(GITHUB_API_USER_URL,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        }
      });

      const { data } = githubApiResponseFromToken;

      const { login: user } = data;

      let developer = await Developer.findOne({ user });

      if (developer)
        return res.status(200).json(developer);
      
      const { name, bio, avatar_url: avatar } = data;

      developer = await Developer.create({
        name: name || user,
        user,
        bio,
        avatar,
      });
      
      return res.status(200).json(developer);
    } catch(err) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Github token!',
      })
    }
  },
};

export default DeveloperController;