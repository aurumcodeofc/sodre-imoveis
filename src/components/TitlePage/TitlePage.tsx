import styles from "./styles.module.scss"

import { ArrowBack } from "../../icons"
import { useNavigate } from "react-router-dom";
interface TitlePageProps{
    text:string;
   
}
const TitlePage: React.FC<TitlePageProps> = ({text}) => {
  const navigate = useNavigate();
  const back = () =>{
    navigate(-1);
  }
    return(
        <div className={styles.title}>
            <span onClick = {back}>
            <ArrowBack />
      </span>
        <h1>{text}</h1>
        </div>
    )
}

export default TitlePage