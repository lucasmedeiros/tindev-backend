import Developer from '../models/Developer';

/**
 * Controlador dos likes que desenvolvedores dão um no outro na aplicação.
 * 
 * @author: lucasmedeiros
 */

export default {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(devId);

    if (!targetDeveloper) {
      return res.status(404).json({ error: 'Dev not found!'});
    }

    if (targetDeveloper.likes.includes(loggedDeveloper._id)) {
      console.log("MATCH!");
    }

    loggedDeveloper.likes.push(targetDeveloper._id);

    await loggedDeveloper.save();

    return res.json(loggedDeveloper);
  }
};