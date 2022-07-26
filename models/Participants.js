const { Schema, model } = require('mongoose');

const ParticipantsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  jabatan: {
    type: String
  },
  isUsefull: {
    type: Boolean
  },
  need: {
    type: String,
  },
  prize: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
}
);

module.exports = Participant = model('participants', ParticipantsSchema);
