const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  description: {
    type: String,
    required:true
  },
  createdDate: {
      type: Date,
      default: Date.now
  }
});

const Quest = mongoose.model('Quests', QuestSchema);

module.exports = Quest;
