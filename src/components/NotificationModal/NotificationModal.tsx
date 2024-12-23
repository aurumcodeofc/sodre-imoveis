import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CloseIcon, BirthdayIconUnread, PaymentIconUnread, BirthdayIconRead, PaymentIconRead } from "../../icons";

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  type: 'birthday' | 'payment';
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
  onUpdateNotifications: (updatedNotifications: Notification[]) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onUpdateNotifications,
}) => {
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    onUpdateNotifications(updatedNotifications);
  };

  const handleMarkAll = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    onUpdateNotifications(updatedNotifications);
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  const filteredUnreadNotifications = unreadNotifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReadNotifications = readNotifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </button>
        <div className={styles.header}>
          <h2>Notificações</h2>
          <p onClick={handleMarkAll} style={{ cursor: "pointer" }}>
            Marcar como lidas
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('unread')}
            className={`${styles.tabButton} ${activeTab === 'unread' ? styles.activeTab : ''}`}
          >
            Não Lidas
          </button>
          <button
            onClick={() => setActiveTab('read')}
            className={`${styles.tabButton} ${activeTab === 'read' ? styles.activeTab : ''}`}
          >
            Lidas
          </button>
        </div>
        <div className = {styles.results}>

        
        <div className={styles.searchBox}>
          <input
           
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por notificações..."
            className={styles.searchInput}
          />
        </div>

    
        {activeTab === 'unread' && (
          <div className={styles.section}>
            {filteredUnreadNotifications.length > 0 ? (
              <ul>
                {filteredUnreadNotifications.map((notification) => (
                  <li
                    style={{ color: "#0B0076", display: "flex", alignItems: "center", gap: "10px" }}
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    {notification.type === 'birthday' && <BirthdayIconUnread />}
                    {notification.type === 'payment' && <PaymentIconUnread />}
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Todas as notificações foram lidas.</p>
            )}
          </div>
        )}

        {activeTab === 'read' && (
          <div className={styles.section}>
            {filteredReadNotifications.length > 0 ? (
              <ul>
                {filteredReadNotifications.map((notification) => (
                  <li
                    style={{ color: "#444444", cursor: "default", display: "flex", alignItems: "center", gap: "10px" }}
                    key={notification.id}
                  >
                    {notification.type === 'birthday' && <BirthdayIconRead />}
                    {notification.type === 'payment' && <PaymentIconRead />}
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#444444" }}>Nenhuma notificação lida.</p>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
