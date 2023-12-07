// pages/api/socketServer.js
import { Server } from 'socket.io';

export default (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      
        socket.on('notification', (newNotification) => {
          console.log('Notification received:', newNotification);
        });
      });
      

    res.socket.server.io = io;
  }

  res.end();
};
