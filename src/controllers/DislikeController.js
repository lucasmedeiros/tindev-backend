const Developer = require('../models/Developer');

/**
 * Controlador dos dislikes que desenvolvedores dão um no outro na aplicação.
 * 
 * @author: lucasmedeiros
 */

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(devId);

    if (!targetDeveloper) {
      return res.status(404).json({ error: 'Dev not found!'});
    }

    loggedDeveloper.dislikes.push(targetDeveloper._id);

    await loggedDeveloper.save();

    return res.json(loggedDeveloper);
  }
};