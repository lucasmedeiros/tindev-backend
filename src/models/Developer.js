const { Schema, model } = require('mongoose');

/**
 * Modelo que representa um desenvolvedor cadastrado no banco de dados da
 * aplicação.
 * 
 * @author: lucasmedeiros
 */
const DeveloperSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  bio: String,
  avatar: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Developer',
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Developer',
  }],
}, {
  timestamps: true,
});

module.exports = model("Developer", DeveloperSchema);