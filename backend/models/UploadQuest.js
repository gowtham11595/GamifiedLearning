const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UploadQuestSchema = new Schema({

  comments: {
      type: String
  },
  courseTitle: {
      type: String,
      required: true
  },
  questId: {
      type: String,
      required: true
  },
  teamId: {
      type: String
  },
  fileName: {
      type: String
  },
  createdBy: {
      type: String,
      required: true
  },
  createdDate: {
      type: Number,
      required:true
  },
  givenPoints: {
      type: Number
  },
});

const UploadQuest = mongoose.model('UploadQuest', UploadQuestSchema);

module.exports = UploadQuest;
