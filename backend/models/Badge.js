const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BadgeSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  avatar: {
      type: String
  },
  courseTitle:{
      type:String
  },
  createdDate: {
      type: Date,
      default: Date.now
  }
});

const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;
