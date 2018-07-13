const AccountSession = require('../models/accountsessionmodel');
const Account = require('../models/accountmodel');
const io = require('socket.io')();


module.exports.verify = (req,res) => {
  const {query} = req
  const {token} = query

  AccountSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });

      } else {
        const {accountid} = sessions[0]
        Account.find({
          _id:accountid
        },{password:0},(err,account) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Good',
            akun:account[0]
          });
        })
      }
    });
}

module.exports.coba = (req,res) =>{
  console.log('msk');
  io.on('connection',(socket) => {
    console.log('connect');
    socket.emit('msg','demo')
  })
  io.listen(8001);

}
