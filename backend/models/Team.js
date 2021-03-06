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
  courseTitle:{
    type: String,
    required: true
  },
  createdDate: {
      type: Date,
      default: Date.now
  },
  createdBy: {
      type: String
  }
});

const Team = mongoose.model('teams', TeamSchema);

module.exports = Team;
