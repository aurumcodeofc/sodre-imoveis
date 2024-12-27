import styles from "./styles.module.scss"
import Shortcuts from "../../components/Shortcuts/Shortcuts"
import { RegisterIcon } from "../../icons"

export default function Home(){
    return(
        <div className={styles.container}>
            <h1>Bem-vindo a Sodré Imóveis Admin, João Sodré!</h1>

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