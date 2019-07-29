const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegisteredCoursesSchema = new Schema({
  courseId: {
      type: String,
      required: true
  },
  courseTitle: {
    type: String,
    required:true
  },
  suid:{
    type: String,
    required:true
  }
});

const RegisteredCourses = mongoose.model('RegisteredCourses', RegisteredCoursesSchema);

module.exports = RegisteredCourses;
