const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamDiscussionSchema = new Schema({
  teamId: {
      type: String,
      required: true
  },
  courseTitle: {
    type:String,
    required:true
  },
  data:{
    type: Array,
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

const TeamDiscussion = mongoose.model('teamDiscussions', TeamDiscussionSchema);

module.exports = TeamDiscussion;
