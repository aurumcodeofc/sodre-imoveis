import styles from "./styles.module.scss"

import { ArrowBack } from "../../icons"
import { Link } from "react-router-dom";
interface TitlePageProps{
    text:string;
    link?:string
}
const TitlePage: React.FC<TitlePageProps> = ({text,link}) => {
    return(
        <div className={styles.title}>
            <span>
        {link ? (
          <Link to={link}>
            <ArrowBack />
          </Link>
        ) : (
          <ArrowBack />
        )}
      </span>
        <h1>{text}</h1>
        </div>
    )
}

export default TitlePage