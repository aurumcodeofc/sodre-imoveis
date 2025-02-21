import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { WelcomeIcon } from "../../icons";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button"
export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(user, password);
        navigate("/inicio");
      };
    return(
        <div className={styles.login}>
            <div className={styles.loginContainer}>
            <WelcomeIcon/>
             <form onSubmit={handleLogin}>
             <Input placeholder="Email" type="email" value={user} onChange={(e) => setUser(e.target.value)} />
             <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
             <div className={styles.actionsContainer}>
                <div className={styles.check}>

                <Input
                type="checkbox"
                label="Manter conectado"
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                />
                </div>
                <Link to="/importar-funcionario"><span >Esqueceu a senha</span></Link>
             </div>
             <Button type="submit" customStyles={{width:"246px",height:"48px",borderRadius:"10px",display:"flex",alignItems:"center",fontWeight:"bold",fontSize:'20px',
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="terciary">Acessar</Button>
             </form>
            </div>
        </div>
    )
}