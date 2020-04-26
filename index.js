var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', `<<BOT>> HELLO: ${socket.id}`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', `Server forward: ${msg}`);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});