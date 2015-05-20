var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os');
var ifaces = os.networkInterfaces();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('play audio', function(){
    io.emit('play audio');
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0
    ;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
        
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
  });
});
