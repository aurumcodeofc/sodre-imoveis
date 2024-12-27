import TitlePage from "../../components/TitlePage/TitlePage"
import FileUploader from "../../components/FileUploader/FileUploader"
import { FileIcon } from "../../icons"
import styles from "./styles.module.scss"

export default function ImportEmployee(){

return(
    <div className={styles.container}>
     <TitlePage text="Importar funcionários"/>
    <div className={styles.file}>
        <div className={styles.listContainer}>
        <h2>Atenção!</h2>
        <ul className={styles.list}>
            <li><FileIcon/> Baixe o arquivo do modelo de importação;</li>
            <li>Enviar arquivo com extensão .xls ou .xslx apenas;</li>
            <li>E-mails inexistentes serão cadastrados e o convite de acesso será enviado para o email;</li>
            <li>E-mails já cadastrados e os novos da lista serão inseridos no sistema;</li>
            <li>Limite máximo de importação pelo tempo: 1000 e-mails.</li>
        </ul>
        </div>
    </div>
    <FileUploader/>
    </div>

)
}