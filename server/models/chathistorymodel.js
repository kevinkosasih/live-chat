const mongoose = require('mongoose');

const ChatHistory  = mongoose.Schema({
  chatId:{type:String,require:true,default:''},
  message:{type:String,require:true,default:''},
  sender:{type:String,require:true,default:''},
  time:{type:String,require:true,default:''},
  notification:{type:String}
})

module.exports = mongoose.model('ChatHistory',ChatHistory);
