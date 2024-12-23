import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { HelpIcon } from "../../icons";
import Avatar from "../../ui/Avatar/Avatar";
import NotificationIcon from "../../ui/Notifications/NotificationIcon";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Hoje é aniversário de Maria Silva", isRead: false,type:"payment"  },
    { id: 2, message: "José Souza realizou o pagamento", isRead: false,type:"birthday"  },
    { id: 3, message: "José Souza realizou o pagamento", isRead: true, type:"birthday" },
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

  const handleUpdateNotifications = (updatedNotifications: typeof notifications) => {
    setNotifications(updatedNotifications);
  };

  return (
    <div className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.icons}>
        <NotificationIcon
          notifications={notifications}
          onUpdateNotifications={handleUpdateNotifications} 
        />
        <HelpIcon />
        <Avatar name="Vanessa Martins Gomes" />
      </div>
    </div>
  );
};

export default Header;
