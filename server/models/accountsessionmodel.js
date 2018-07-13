const mongoose = require('mongoose')

const AccountSessionModel = mongoose.Schema({
  accountid:{type:String, default:''},
  timestamp:{type:Date,default:Date.now()},
  isDeleted:{type:Boolean, default: false},
  deleted:{type:Date, default:Date.now()}
})

module.exports = mongoose.model('AccountSessionModel', AccountSessionModel)
