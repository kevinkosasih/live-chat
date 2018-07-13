const mongoose = require('mongoose');

const PostAndCommentModel =  mongoose.Schema({
  title:{type:String,require:true},
  ownerId:{type:String},
  postId:{type:String},
  commentId:{type:String},
  datePublish:{type:Date,require:true},
  like:[{
    id:{type:string},
    username:{string}
  }]
})

module.exports =  mongoose.model('PostAndComment',PostAndCommentModel);
