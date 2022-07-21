const { Schema, model } = require('mongoose');

const DoorprizeSchema = new Schema({
  name: {
    type: String,
  },
  rarity: {
    type: String,
  },
  weight: {
    type: Number,
  }
},
{
  timestamps: true,
}
);

module.exports = Doorprize = model('prizes', DoorprizeSchema);
