import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000' || 'https://palapes-laut-notes.vercel.app/', // Replace with your client URL
    methods: ['GET', 'POST'],
  },
});

const connectedSockets: Map<string, Socket> = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Store the socket with a unique identifier (e.g., socket.id)
  connectedSockets.set(socket.id, socket);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove the socket when a user disconnects
    connectedSockets.delete(socket.id);
  });
});

export { httpServer, io, connectedSockets };
