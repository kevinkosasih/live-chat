const mongoose = require('mongoose');

const LikeModel = mongoose.Schema({
  postId:{type:String,require:true},
  likerId:{type:String,require:true}
})

module.exports = mongoose.model('Like', LikeModel);
