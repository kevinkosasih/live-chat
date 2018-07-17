const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
const compression = require("compression");
const helmet = require('helmet')
const app = express();
const io = require('socket.io')();

app.use(morgan('common'))
app.use (helmet())
//middleware using cors and bodyParser
app.use(cors({origin:'http://10.183.28.154:3000'}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(compression());

//import database
const config = require('./config/database');
//connect to mongoDB
mongoose.connect(config.database);
// validate connection to mongoDB
mongoose.connection.on('connected',() => {
  console.log('Connected to '+config.database)
  console.log(Date.now());
})
mongoose.connection.on('error',(err) => {
  console.log('Database error '+err);
})
//import controller
const loginAccount  = require('./control/loginAccount')
const regisAccount = require('./control/regisAccount')
const logoutAccount = require('./control/logoutAccount')
const verify = require('./control/verify')
//routing API
app.post('/login',loginAccount.login)
app.get('/getdata',loginAccount.dataToken)
app.post('/regisnew',regisAccount.newRegis)
app.get('/logout',logoutAccount.logout)
app.get('/verify',verify.verify)

//port API (can be change)
const port = 3001;
//openconnection for socket.io
io.on('connection', (client) => {
  console.log("connected");
  client.on('sendChat', (message) => {
    client.broadcast.emit(message.reciever,{message,send:1});
    client.emit(message.sender,{message,send:0});
  });
});
io.listen(8000);
//API hosted @ port
app.listen(port, () => {
  console.log('Server start at '+port)
});

module.exports = app;
