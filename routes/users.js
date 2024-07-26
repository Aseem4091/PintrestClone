const mongoose = require('mongoose');

const plm=require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/nayaappforgolus");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Example: Minimum length for password
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],
  dp: {
    type: String, // URL to the display picture
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
}, );
userSchema.plugin(plm);
// Create a User model using the schema
module.exports = mongoose.model('User', userSchema);


