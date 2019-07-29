const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  description: {
    type: String
  },
  submissionDate:{
    type:Date
  },
  fileName:{
    type:String
  },
  courseTitle:{
    type:String
  },
  fName:{
    type: String
  },
  points:{
    type:Number
  },
  createdDate: {
      type: Number,
      required:true
  }
});

const Quest = mongoose.model('Quests', QuestSchema);

module.exports = Quest;
