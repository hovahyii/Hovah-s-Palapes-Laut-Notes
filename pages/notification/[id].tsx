// pages/notifications/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import notificationsData from './notifications.json';

const NotificationDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Convert id to number before comparison
  const notification = notificationsData.find((item) => item.id === Number(id));

  if (!notification) {
    // Handle the case where the notification is not found
    return <div>Notification not found</div>;
  }

  return (
    <div>
      <h2>{notification.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: notification.content }} />
      <p>
        Posted at {notification.date} by {notification.authorName}
      </p>
    </div>
  );
};

export default NotificationDetails;
