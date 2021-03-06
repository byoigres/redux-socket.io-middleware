
var value = 0;

var http = require('http');
var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ value: value }));
});


app.listen(44500);

var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
  socket.on('INCREMENT', function(data) {
    console.log('increment', data);
    value += 1;
    socket.emit('SET_VALUE_FROM_SERVER', { value: value });
  });
  socket.on('DECREMENT', function(data) {
    console.log('decrement', data);
    value -= 1;
    socket.emit('SET_VALUE_FROM_SERVER', { value: value });
  });
});
