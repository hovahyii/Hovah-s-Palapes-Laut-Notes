// NotificationCard.tsx
import React from 'react';
import Link from 'next/link';
import styles from './NotificationCard.module.css';

interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    content: string;
    date: string; // Assuming "date" is the new field in your notifications.json
    authorName: string;
  };
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => (
  <div className={styles['notification-card-container']}>
    <Link href={`/notification/${notification.id}`} passHref>
     
        <div className={styles['notification-card']}>
          <h2 className={styles['notification-title']}>{notification.title}</h2>
          <p>{notification.excerpt}</p>
          <p>
            <span className={styles['notification-date']}>{notification.date}</span>
            {' · '}
            <span className={styles['notification-author']}>{notification.authorName}</span>
          </p>
        </div>
     
    </Link>
  </div>
);

export default NotificationCard;
