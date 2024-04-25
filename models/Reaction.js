const { Schema, ObjectId } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
    defaut: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
    description: "reaction can not be lnger than 280 chaacters",
  },
  unsername: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

model.exports = reactionSchema;