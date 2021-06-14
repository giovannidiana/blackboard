var express = require("express");
var socket = require("socket.io");
var app = express();
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT);
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
