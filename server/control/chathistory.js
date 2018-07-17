const ChatHistory = require('../model/chathistorymodel')

module.exports.savechat = (req,res) =>{
  const{body} = req;
  const {
    chatId,
    message,
    sender,
    time
  }=body;

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
};
