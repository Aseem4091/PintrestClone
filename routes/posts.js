const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
 imageText: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'
  },
  likes: {
    type: Array,
    default: [], // Default to zero likes
}, 
});

// Create a Post model using the schema
module.exports= mongoose.model('post', postSchema);

 