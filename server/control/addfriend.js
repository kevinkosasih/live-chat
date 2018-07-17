const Account = require('../models/accountmodel');
const AccountSession = require('../models/accountsessionmodel');

module.exports.addFriends = (req,res) =>{
  const {body,query} = req;
  const {
    friendlist,
  } = body;

  const {token} = query

  AccountSession.find({
    _id:token,
    isDeleted:false
  },(err,currentAccount) =>{
    if(err){
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if(currentAccount.length != 1){
      return res.send({
        success: false,
        message: 'Error: invalid data.'
      });
    }
    }
  )
};
