import styles from "./styles.module.scss"
import { Link } from "react-router-dom"
interface ShortcutsProps{
    text: string,
    link:string,
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
const Shortcuts: React.FC<ShortcutsProps> = ({ text, link, icon: Icon}) => {
    return(
        <div className = {styles.container}>
                <Link to={link}>
            <div className={styles.box}>
                <Icon width={40} height={27} fill="currentColor" />
                <span>{text}</span>
            </div>
                </Link>
        </div>
    )
}

export default Shortcuts