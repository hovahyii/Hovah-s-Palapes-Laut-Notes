import React from 'react';
import { useRouter } from 'next/router';
import notificationsData from './notifications.json';

const NotificationDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Ensure id is a valid number
  const notificationId = Number(id);

  // Find the notification by id
  const notification = notificationsData.find((item) => item.id === notificationId);

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
