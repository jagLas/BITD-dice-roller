import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { join } from 'node:path';

const app = express();
const httpServer = createServer(app);

app.use('/assets', express.static(join(__dirname, 'dist/assets')))

app.get(['/', '/*'], (req, res) => {
  res.sendFile(join(__dirname, '/dist/index.html'))
});

const io = new Server(httpServer, {} )

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});