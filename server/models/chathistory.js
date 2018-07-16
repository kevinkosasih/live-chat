const mongoose = require('mongoose');

const ChatHistory  = mongoose.Schema({
  chatId:{type:String,require:true,default:''},
  user:[
    userid:{type:String},
    username:{type:String},
    name:{type:String}
  ]
})

module.exports = mongoose.model('ChatHistory',ChatHistory);
