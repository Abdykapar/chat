var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000)

app.get('/',function(request,response){
    response.sendFile(__dirname+'/index.html');
});
var count = 0;
io.on('connection', function(socket){
    count++;
    console.log(count+' User connected');
    socket.on('chat.message', function(message){
        io.emit('chat.message', message);
    });
    socket.on('disconnect',function(){
        count--;
        console.log('User was disconnected');
       io.emit('chat.message','User was disconnected'); 
    });
    
});