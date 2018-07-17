const ChatHistory = require('../models/chathistorymodel')

module.exports.savechat = (req,res) =>{
  const{body} = req;
  const {
    chatId,
    message,
    sender,
    time
  }=body;
  console.log(body);
  if(!chatId){
    return res.send({
      success:false,
      message:'Error: cannot be blank'
    })
  }
  if(!message){
    return res.send({
      success:false,
      message:'Error: cannot be blank'
    })
  }if(!sender){
    return res.send({
      success:false,
      message:'Error: cannot be blank'
    })
  }if(!time){
    return res.send({
      success:false,
      message:'Error: cannot be blank'
    })
  }

  const newChatHistory = new ChatHistory();

  newChatHistory.chatId = chatId;
  newChatHistory.message = message;
  newChatHistory.sender = sender;
  newChatHistory.time = time;

  console.log(newChatHistory);
  // newChatHistory.save((err) =>{
  //   if(err){
  //     return res.send({
  //       success:false,
  //       message:'Error: server error'
  //     })
  //   }
  //
  //   return res.send({
  //     success:true,
  //     message:'Message sent'
  //   })
  // })
};
