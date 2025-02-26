import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate
import { HomeIcon, PanelIcon, ClientIcon, FaturaIcon, VistoriaIcon, ContractIcon, MaintenanceIcon, AccessIcon, LogoFull, LogoMin, ExitIcon } from '../../icons';
import { useAuth } from '../../context/AuthContext';

type SidebarItem = {
  label: string;
  icon: JSX.Element;
  link: string;
};

const Sidebar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Inicializando useNavigate para redirecionamento

  const items: SidebarItem[] = [
    { label: 'Início', icon: <HomeIcon />, link: "/inicio"},
    { label: 'Painel', icon: <PanelIcon />, link: "#" },
    { label: 'Clientes', icon: <ClientIcon />, link: "#" },
    { label: 'Faturas', icon: <FaturaIcon />, link: "#" },
    { label: 'Vistorias', icon: <VistoriaIcon />, link: "#" },
    { label: 'Contratos', icon: <ContractIcon />, link: "#" },
    { label: 'Manutenção', icon: <MaintenanceIcon />, link: "#" },
    { label: 'Controle de Acesso', icon: <AccessIcon />, link: "/acesso" }
  ];

  const handleLogout = () => {
    logout(); // Chama o logout para limpar o estado
    navigate('/'); // Redireciona o usuário para a página de login
  };

  return (
    <div
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.logo}>
        {isExpanded ? <LogoFull /> : <LogoMin />}
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            {isExpanded && (
              <Link to={item.link} style={{ textDecoration: 'none', color: "white" }}>
                <span className={styles.label}>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
        
        {/* Botão de Logout */}
        {isAuthenticated && (
          <li className={`${styles.item} ${styles.exit}`} onClick={handleLogout}>
            <span className={styles.icon} style={{ display: "flex", cursor: "pointer" }}>
              <ExitIcon />
              {isExpanded && (
                <span className={styles.label} style={{ color: "#FF474D", textAlign: "center" }}>
                  SAIR
                </span>
              )}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
