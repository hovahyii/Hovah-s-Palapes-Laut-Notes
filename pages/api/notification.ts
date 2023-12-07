import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { connectedSockets } from '../server';

const notificationsFilePath = path.join(process.cwd(), 'pages/notification/notifications.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const notificationsData = JSON.parse(await fs.promises.readFile(notificationsFilePath, 'utf-8'));
      res.status(200).json(notificationsData);
    } catch (error) {
      console.error('Error reading notifications file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newNotification = req.body;

      const notificationsData = JSON.parse(fs.readFileSync(notificationsFilePath, 'utf-8'));
      notificationsData.push(newNotification);
      fs.writeFileSync(notificationsFilePath, JSON.stringify(notificationsData, null, 2));

      // Emit a 'notification' event to all connected clients
      for (const socket of connectedSockets.values()) {
        socket.emit('notification', newNotification);
      }

      console.log('Notification added and emitted:', newNotification);

      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
