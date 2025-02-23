import styles from "./styles.module.scss"
import Shortcuts from "../../components/Shortcuts/Shortcuts"
import { RegisterIcon } from "../../icons"
import { useAuth } from "../../context/AuthContext"


export default function Home(){
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
      return <div>Carregando...</div>; 
    }
  



    return(
        <div className={styles.container}>
            <h1>Bem-vindo a Sodré Imóveis Admin, {user?.name}</h1>

            <div className = {styles.shortcutsContainer}>
                <h2>Atalhos</h2>
                <div className={styles.shortcuts}>
                <Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />
                     <Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />
                     <Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />
                     <Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />

<Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />

<Shortcuts
                text="Upload de Arquivo"
                link="/upload"
                icon={RegisterIcon}
            />
                </div>
            </div>
        </div>
    )
}