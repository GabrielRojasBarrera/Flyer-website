const express = require ('express');
const config = require ('./server/config')

//database
require('./database');
require('./config/passport')
//config
const app = config(express());
//starting server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
//socket
const SocketIo = require("socket.io");
const io = SocketIo(server)
require('./socket')(io);