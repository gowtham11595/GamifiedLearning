const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
      type: Number,
      required: true
    },
    university:{
      type: String,
      required: true
    },
    class:{
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    scope:{
        type:String,
        default: "Student"
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
