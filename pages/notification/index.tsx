// notifications/index.tsx
import React from 'react';
import NotificationCard from '../components/Notification/NotificationCard';
import notificationsData from './notifications.json';

const Notifications: React.FC = () => (
  <div className="flex justify-center items-center h-screen p-4 bg-gray-100">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {notificationsData.map((notification, index) => (
            <NotificationCard notification={{ ...notification, id: index.toString() }} />
      ))}
    </div>
  </div>
);

export default Notifications;