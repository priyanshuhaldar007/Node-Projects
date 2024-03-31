const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const PORT =  5050;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});


io.on('connection', (socket)=>{
    console.log('User connected', socket.id);
    socket.on('send', (message)=>{
        console.log(message);
        if(message.toId){
            console.log(`DM to ${message.toId}`);
            io.to(message.toId).emit('message',[message.msg, message.time])
        }
        else{
            console.log('grp');
            io.emit('message', [socket.id, message] );
        }
    });

    io.emit('user joined', {userId:socket.id})

    
})


server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});