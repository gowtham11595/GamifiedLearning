const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  teamName: {
      type: String,
      required: true
  },
  teamDetails: {
    type:Array,
    required:true
  },
  courseId:{
    type: String,
    required: true
  },
  createdDate: {
      type: Date,
      default: Date.now
  }
});

const Team = mongoose.model('teams', TeamSchema);

module.exports = Team;
