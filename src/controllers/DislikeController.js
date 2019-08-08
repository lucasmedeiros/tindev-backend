import Developer from '../models/Developer';

/**
 * Controlador dos likes que desenvolvedores dão um no outro na aplicação.
 * 
 * @author: lucasmedeiros
 */

const DislikeController = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(devId);

    if (!targetDeveloper)
      return res.status(404).json({ error: 'Dev not found!'});

    if (loggedDeveloper._id.equals(targetDeveloper._id))
      return res.status(400).json({ error: 'Logged dev equals to target dev.' });

    if (!loggedDeveloper.dislikes.includes(targetDeveloper._id)) {
      loggedDeveloper.dislikes.push(targetDeveloper._id);
      await loggedDeveloper.save();
    }

    return res.json(loggedDeveloper);
  }
}

export default DislikeController;
