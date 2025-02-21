import { useState } from "react";
import styles from "./styles.module.scss";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button"
import { LockIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    const handleCancel = ()=>{
        navigate("/");
    }

    return(
        <div className={styles.forgotPassword}>
            <div className={styles.forgotPasswordContainer}>
            <div className = {styles.header}>
            <h1>Esqueceu a senha</h1>
            <LockIcon/>
            </div>
             <form>
             <Input placeholder="Email" type="email" value={user} onChange={(e) => setUser(e.target.value)} />
      
            <div className={styles.btContainer}>
             <Button type="button" onClick={handleCancel} customStyles={{width:"121px",height:"35px",borderRadius:"10px",display:"flex",alignItems:"center",fontWeight:"bold",fontSize:'15px',
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="quartenary">Cancelar</Button>

            <Button type="submit" customStyles={{width:"121px",height:"35px",borderRadius:"10px",display:"flex",alignItems:"center",fontWeight:"bold",fontSize:'15px',
                justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="terciary">Enviar</Button>
                 </div> 
             </form>
            </div>
        </div>
    )
}