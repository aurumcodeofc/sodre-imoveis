import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { HomeIcon, PanelIcon, ClientIcon, FaturaIcon, VistoriaIcon, ContractIcon, MaintenanceIcon, AccessIcon, LogoFull, LogoMin, ExitIcon } from '../../icons';

type SidebarItem = {
  label: string;
  icon: JSX.Element;
  link: string;
};

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
             <div className={styles.logo}>
          {isExpanded? <LogoFull/> : <LogoMin/>}
        </div>
      <ul>
 
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span  className={styles.icon}>{item.icon}</span> 
            {isExpanded && <Link to = {item.link} style={{textDecoration:'none', color:"white"}}><span className={styles.label}>{item.label}</span></Link>}
          </li>
          
        ))}
        <div className={styles.exit}>
        <li className={styles.item}>
          <span className={styles.icon} style={{display:"flex"}}><ExitIcon/>
          {isExpanded && <Link to = {"#"} style={{textDecoration:'none', color:"white", textAlign:"center"}}><span className={styles.label} style={{color:"#FF474D", textAlign:"center"}}>SAIR</span></Link>}

          </span>
        </li>
      </div>
      </ul>

    </div>
  );
};

export default Sidebar;
