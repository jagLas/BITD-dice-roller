import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { makeIoServer } from './ioServer';

const app = express();
const httpServer = createServer(app) as any;

app.use('/assets', express.static(join(__dirname, 'dist/assets')))

app.get(['/*', '/'], (req, res) => {
  console.log(join(__dirname, '/dist/index.html'))
  res.sendFile(join(__dirname, '/dist/index.html'))
});

makeIoServer(httpServer);

httpServer.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});