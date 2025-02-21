import Avatar from "../../ui/Avatar/Avatar";
import TitlePage from "../../components/TitlePage/TitlePage";
import { useAuth } from "../../context/AuthContext";
import Tab from "../../ui/Tab/Tab";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.scss";
import ProfileField from "../../ui/ProfileFIeld/ProfileField";
import { formatDate, formatHour, formatCEP } from "../../utils/helpers";

export default function Profile() {
    const { user } = useAuth();
    console.log(user)
    const dateHour = `${formatDate(user.created_at)} ${formatHour(user.created_at)}`;
    const birthDate = formatDate(user.birth_date);
    const userCep = formatCEP(user?.address?.postalCode)
    const userContent = (
      <div className={styles.userContainer}>
        <div className = {styles.firstStep}>

        
        <div className={styles.userInfo}>
          <ProfileField label="Data de cadastro" value={dateHour} />
          <ProfileField label="Email" value={user?.email} />
        </div>
        <div className={styles.userInfo}>
          <ProfileField label="Pessoa" value={user?.person_type} />
          <ProfileField label="Senha" value="123456" />
        </div>
        </div>
        <h2>Informações Pessoais</h2>
        <div className={styles.personInfo}>
          <div className={styles.leftColumn}>
            <div className={styles.userInfo}>
              <ProfileField label="Nome Completo" value={user?.name} />
              <ProfileField label="CPF" value={user?.cpf} />
              <ProfileField label="Data de nascimento" value={birthDate} />
              <ProfileField label="Telefone" value={user?.phone} />
            </div>
          </div>
          <div className={styles.rightColumn}>
        
            <div className={styles.subColumn}>
              <div className={styles.userInfo}>
                <ProfileField label="CEP" value={userCep} />
                <ProfileField label="Estado" value={user?.address.state} />
              </div>
              <div className={styles.userInfo}>
                <ProfileField label="Cidade" value={user?.address.city} />
              </div>
            </div>
  
            <div className={styles.subColumn}>
              <div className={styles.userInfo}>
                <ProfileField label="Bairro" value={user?.address.district} />
                <ProfileField label="Rua" value={user?.address.street} />
              </div>
              <div className={styles.userInfo}>
                <ProfileField label="Número" value={user?.address.addressNumber} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
    const notificationsContent = (
      <div>
        <h2>Notificações</h2>
        <p>Aqui estão as notificações.</p>
      </div>
    );
  
    return (
      <div className={styles.container}>
        <TitlePage text="Meu Perfil" />
        <div className={styles.headerProfile}>
          <div className={styles.profileIcon}>
            <Avatar name={user.name} title={user?.name} variant="profile" />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileStatus}>
              <span className={styles.status}>VERIFICADO</span>
              <p>{user?.name}</p>
            </div>
            <span>{user?.email}</span>
            <span>ADMINISTRADOR MASTER</span>
          </div>
        </div>
        <Tab userContent={userContent} notificationsContent={notificationsContent} />
      </div>
    );
  }
  
