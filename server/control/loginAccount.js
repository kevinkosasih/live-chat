 var Account = require('../models/accountmodel');
 var AccountSession = require('../models/accountsessionmodel');

module.exports.login = (req,res) => {
  const { body } = req;
  const {
    username,
    password
  } = body;

  if (!username) {
      return res.send({
        success: false,
        message: 'Error: username cannot be blank.'
      });
    }
  if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
  }

  Account.find({
    username:username
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
        message: 'Error: Username or password is wrong.'
      });
    }

    const user = currentAccount[0];
    if(!user.validPassword(password)){
      return res.send({
        success: false,
        message: 'Error: Username or password is wrong.'
      });
    }

    const session = new AccountSession();
    session.accountid = user._id;
    session.timestamp = Date.now()
    session.deleted =Date.now()

    session.save((err,doc) => {
      if(err){
        res.send(err)
      }
      return res.send({
        success: true,
        message: 'Logged in',
        token:doc._id
      });
    })

  })
}

module.exports.dataToken = (req,res) =>{
  const {query} = req;
  const {token} = query;

  AccountSession.find({
    _id:token,
    isDeleted:false
  },(err,data) =>{
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    Account.find({
      _id:data[0].accountid
    },{password:0,_id:0},(err,account)=>{
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        akun:account[0]
      })

    })
  })

}
