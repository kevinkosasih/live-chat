const mongoose = require('mongoose');

const ChatHistory  = mongoose.Schema({
  chatId:{type:String,require:true,default:''},
  message:{type:String,require:true,default:''},
    
})

module.exports = mongoose.model('ChatHistory',ChatHistory);
