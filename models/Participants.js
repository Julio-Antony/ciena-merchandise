const { Schema, model } = require('mongoose');

const ParticipantsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
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
    required: true
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
