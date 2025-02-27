import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Avatar from "../../ui/Avatar/Avatar";
import NotificationIcon from "../../ui/Notifications/NotificationIcon";
import { useAuth } from "../../context/AuthContext";

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  type: "birthday" | "payment";
}

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Hoje é aniversário de Maria Silva", isRead: false, type: "payment" },
    { id: 2, message: "José Souza realizou o pagamento", isRead: false, type: "birthday" },
    { id: 3, message: "José Souza realizou o pagamento", isRead: true, type: "birthday" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUpdateNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
  };

  return (
    <div className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.icons}>
        <NotificationIcon
          notifications={notifications}
          onUpdateNotifications={handleUpdateNotifications}
        />
        <Avatar
          name={user?.name ?? "Usuário"}
          title={user?.name ?? "Usuário"}
          navigateTo="/meu-perfil"
          variant="header"
        />
      </div>
    </div>
  );
};

export default Header;
