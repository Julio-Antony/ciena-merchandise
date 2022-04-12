const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  startdate: {
    type: String,
  },
  deadline: {
    type: String,
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
  attachment: [
    {
      name: {
        type: String
      },
      filename:{
        type: String
      },
      user: {
        type : String
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model("card", CardSchema);
