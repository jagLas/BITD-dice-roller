import { Server } from "socket.io";
import { rollDice } from "./utils/utils";


interface Rooms {
    [key: string]: {
        roomId: string;
        password: string;
        users: User[];
    }
}

interface User {
    id: string;
    username: string;

}



export function makeIoServer(server: Server) {
    const io = new Server(server as any, {});

    const rooms: Rooms = {};

    io.on("connection", (socket) => {
        console.log('a user connected', socket.id);
        socket.on('joinRoom', ({ roomId, password, username }: {username: string, roomId: string, password: string}) => {
            console.log(username)
            const newUser = {
                username,
                id: socket.id
            };

            const sharedRoom = rooms[roomId];
            // add users to the room in rooms list if it exists
            if (sharedRoom) {
                sharedRoom.users = [...sharedRoom.users, newUser];
            }

            // make the room in rooms list if it does not exist
            if (!sharedRoom) {
                rooms[roomId] = { roomId, password, users: [newUser] };
            }

            // join the socket room
            socket.join(roomId);

            socket.to(roomId).emit('playerJoined', socket.id)

            console.log('AllRooms', rooms)
        })

        socket.on('disconnecting', () => {
            console.log(socket.id, 'disconnecting from ', socket.rooms)
            //for each room socket is in
            socket.rooms.forEach(roomId => {
                // Find the shared room and delete it if they're the last user
                const sharedRoom = rooms[roomId];

                if (sharedRoom) {
                    // remove user from list
                    sharedRoom.users = sharedRoom.users.filter(user => {
                        return user.id !== socket.id
                    })
                    console.log('last user leaving, deleting', roomId);

                    // delete the room if users is empty
                    if (!sharedRoom.users.length) {
                        delete rooms[roomId];
                    }
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(socket.id, 'disconnected')
        })

        socket.on("roll", ({numDice, roomId}) => {
            const roll = rollDice(numDice);
            if (socket.rooms.has(roomId)) {
                console.log('transmitting', roll, 'to', roomId)
                io.in(roomId).emit('broadCastRoll', roll)
            }
        })
    })

    return io;
};