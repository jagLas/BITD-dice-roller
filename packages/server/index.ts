import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'node:path';

const app = express();
const httpServer = createServer(app);

app.use('/assets', express.static(join(__dirname, 'dist/assets')))

app.get(['/*', '/'], (req, res) => {
  console.log(join(__dirname, '/dist/index.html'))
  res.sendFile(join(__dirname, '/dist/index.html'))
});

const io = new Server(httpServer, {} )

interface Rooms {
  [key: string]: {
    roomId: string;
    password: string;
    users: string[];
  }
}

interface Users {
  [key: string]: {
    id: string;
    roomId?: string;
  }
}

const rooms: Rooms = {};
const users: Users = {};

io.on("connection", (socket) => {
  users[socket.id] = {id: socket.id}
  console.log('a user connected');
  socket.on('joinRoom', ({roomId, password}) => {
    // add users to the room in rooms list if it exists
    if (rooms[roomId]) {
      rooms[roomId] = {...rooms[roomId], users: [...rooms[roomId].users, socket.id]}
    }

    // make the room in rooms list if it does not exist
    if (!rooms[roomId]) {
      rooms[roomId] = {roomId, password, users: [socket.id]};
    }

    // join the socket room
    socket.join(roomId);

    socket.to(roomId).emit('playerJoined')

    // add room to user for future lookup
    users[socket.id].roomId = roomId;

    console.log(rooms)
    console.log(users)
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected')
    // get room the user is in
    const {roomId} = users[socket.id];
    const room = roomId ? rooms[roomId] : null;

    // if user's in a room, remove the user
    if (room){
      room.users = [...room.users.filter(user => user !== socket.id)]
    }

    // if no users left delete room
    if (room?.users.length === 0 && roomId) {
      delete rooms[roomId]
    }
    delete users[socket.id];
  })

  socket.on("roll", (roll) => {
    console.log(roll)
    console.log(rooms)
    console.log(socket.id)
  })
});


httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});