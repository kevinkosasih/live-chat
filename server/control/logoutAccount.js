const AccountSession = require('../models/accountsessionmodel');

module.exports.logout = (req,res) => {
  const {query} = req
  const {token} = query

  AccountSession.findOneAndUpdate({
    _id:token,
    isDeleted:false
  }, {
      $set: {
        isDeleted:true,
        deleted:Date.now()
      }
    }, null,(err,accountToken) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    })
}
