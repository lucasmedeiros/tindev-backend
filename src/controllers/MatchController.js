import Developer from '../models/Developer';

const MatchController = {
  async index(req, res) {
    const { devId } = req.params;
    try {
      const loggedDev = await Developer.findById(devId);
      
      if (!loggedDev)
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado!',
        });
      
      const matchedUsers = await Developer.find({
        $and: [
          { _id: { $ne: devId } },
          { _id: { $in: loggedDev.matches } },
        ]
      });

      return res.status(200).json(matchedUsers);
    } catch(err) {
      return res.status(400).json({
        success: false,
        message: 'ID informado inválido!',
      });
    }
  }
}

export default MatchController;