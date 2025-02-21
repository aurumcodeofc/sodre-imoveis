
import { useState } from "react";
import styles from "./styles.module.scss";

interface TabsProps {
  userContent: React.ReactNode;
  notificationsContent: React.ReactNode;
}

const Tab: React.FC<TabsProps> = ({ userContent, notificationsContent }) => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className={styles.containerTab}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "user" ? styles.active : ""}
          onClick={() => setActiveTab("user")}
        >
          Dados do Usuário
        </button>
        <button
          className={activeTab === "notifications" ? styles.active : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notificações
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "user" && <div className={styles.tabPanel}>{userContent}</div>}
        {activeTab === "notifications" && <div className={styles.tabPanel}>{notificationsContent}</div>}
      </div>
    </div>
  );
};

export default Tab;
