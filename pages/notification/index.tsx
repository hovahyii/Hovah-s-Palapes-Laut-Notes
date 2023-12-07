// pages/notification/index.tsx

import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/Notification/NotificationCard';
import { io } from 'socket.io-client';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch initial notifications
    fetch('/api/notification')
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
      });

    // Check if the browser supports the Notification API
    if ('Notification' in window) {
      // Request notification permission when the component mounts
      if (Notification.permission === 'default') {
        Notification.requestPermission()
          .then((permission) => {
            if (permission === 'granted') {
              // Permission granted, you can now send notifications
              console.log('Notification permission granted');
            } else {
              console.log('Notification permission denied');
            }
          });
      }
    }

    // Create a WebSocket connection to the server
    const socket = io('/api/socketServer');

    // Handle the 'connect' event when the WebSocket connection is established
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    // Handle the 'notification' event when a new notification is received
    socket.on('notification', (newNotification) => {
      console.log('Notification received:', newNotification);

      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

      // Check if permission is granted for displaying notifications
      if (Notification.permission === 'granted') {
        // Display a browser notification with the notification title
        new Notification(newNotification.title);
      }
    });

    // Cleanup: Disconnect the WebSocket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        {notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
