var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000);
const io = socket(server)

app.use(express.static("public"))

console.log("socket running!")

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log(socket.id);
  socket.on('mousePressed', function(data){
    console.log(`broadcast ${data} from ${socket.id}`);
    socket.broadcast.emit('mousePressed',data);
  })
}
