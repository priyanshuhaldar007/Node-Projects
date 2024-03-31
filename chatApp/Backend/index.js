const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const PORT =  5050;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});


io.on('connection',(socket)=>{
    console.log('User connected', socket.id);
    socket.on('send',(message)=>{
        console.log('a new user-message',message);
        io.emit('message', message);
    });
})


server.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});