import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import styles from "./styles.module.scss";

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  type: 'birthday' | 'payment'
  
}

interface NotificationIconProps {
  notifications: Notification[]; 
  onUpdateNotifications: (updatedNotifications: Notification[]) => void; 
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  notifications,
  onUpdateNotifications,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBellClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 
  const totalUnread = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.notificationIcon}>
      <div
        className={styles.bellContainer}
        onClick={handleBellClick}
        role="button"
        aria-label="Abrir notificações"
      >
        <IoIosNotificationsOutline size={30} color="#000" />
        {totalUnread > 0 && (
          <span className={styles.notificationCount}>{totalUnread}</span>
        )}
      </div>

      {isModalOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={handleCloseModal}
          onUpdateNotifications={onUpdateNotifications} 
        />
      )}
    </div>
  );
};

export default NotificationIcon;
