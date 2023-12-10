import React from 'react';
import Link from 'next/link';
import styles from './NotificationCard.module.css';

interface NotificationCardProps {
  notification: {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    authorName: string;
  };
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  if (!notification) {
    // Handle the case where notification is undefined
    return null;
  }

  return (
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
};

export default NotificationCard;
