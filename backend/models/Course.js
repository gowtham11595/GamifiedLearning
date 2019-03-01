const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseTitle: {
      type: String,
      required: true
  },
  description: {
    type: String,
    required:true
  },
  startDate:{
    type: Date
  },
  endDate:{
    type: Date
  },
  createdDate: {
      type: Date,
      default: Date.now
  }
});

const Course = mongoose.model('Courses', CourseSchema);

module.exports = Course;
