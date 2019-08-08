import Developer from '../models/Developer';

/**
 * Controlador dos likes que desenvolvedores dão um no outro na aplicação.
 * 
 * @author: lucasmedeiros
 */

const LikeController = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(devId);

    if (!targetDeveloper)
      return res.status(404).json({ error: 'Dev not found!'});

    if (loggedDeveloper._id.equals(targetDeveloper._id))
      return res.status(400).json({ error: 'Logged dev equals to target dev.' });

    if (!loggedDeveloper.likes.includes(targetDeveloper._id)) {
      loggedDeveloper.likes.push(targetDeveloper._id);
      await loggedDeveloper.save();

      if (targetDeveloper.likes.includes(loggedDeveloper._id))
        console.log("MATCH!");
    }

    return res.json(loggedDeveloper);
  }
}

export default LikeController;