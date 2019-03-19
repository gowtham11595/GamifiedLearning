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
  submissionDate:{
    type:Date
  },
  courseTitle:{
    type:String,
    required:true
  },
  createdDate: {
      type: Number
  }
});

const Quest = mongoose.model('Quests', QuestSchema);

module.exports = Quest;
