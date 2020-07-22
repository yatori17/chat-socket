let express = require('express');
let app = express();
var cors = require('cors');
app.use(cors());
let http = require('http');
let server = http.Server(app);

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/utils');

let socketIO = require('socket.io');
let io = socketIO(server);


const port = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    socket.on('joinRoom', ({username, room})=>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        console.log(user)


        //Messages to the actual user
        socket.emit('new-message', formatMessage('', "Welcome to the chat"));
        //message to the people of the chat
        socket.broadcast.to(user.room)
        .emit(
            'new-message',formatMessage(user.username, "has joined the meeting"));

        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //Listening for messages 
    socket.on('new-message', (message) =>{
        const user = getCurrentUser(socket.id);
        console.log(message)
        
        io.to(user.room).emit('new-message',formatMessage(user.username, message));
    });

    //Disconnect the chat
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit(
                'new-message', formatMessage(user.username, 'has left the chat')
            );
            io.to(user.room).emit('roomUsers',{
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }

        
    })
    socket.on('status',(status)=>{
        io.emit('status',status);
    })
});

server.listen(port, ()=>{
    console.log(`server running on port: ${port}`);

})