import openSocket from 'socket.io-client';
const  socket = openSocket('http://10.183.28.154:8000');
function sendChat(msg) {
  console.log('asd');
  socket.emit('sendChat', msg);
}
function recieveChat(toFront){
  socket.on('recieveChat', message => toFront(null,message));
}
export { sendChat ,recieveChat};
