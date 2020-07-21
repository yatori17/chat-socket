let express = require('express');
let app = express();
var cors = require('cors');
app.use(cors());
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('new-message', (message) =>{
        io.emit('new-message',message);
    })
    socket.on('status',(status)=>{
        io.emit('status',status);
    })
});

server.listen(port, ()=>{
    console.log(`server running on port: ${port}`);

})