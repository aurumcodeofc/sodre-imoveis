import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { WelcomeIcon } from "../../icons";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button"
export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(user, password);
        navigate("/");
      };
    return(
        <div className={styles.login}>
            <div className={styles.loginContainer}>
            <WelcomeIcon/>
             <form onSubmit={handleLogin}>
             <Input placeholder="Login" type="email" value={user} onChange={(e) => setUser(e.target.value)} />
             <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
             <Button type="submit" customStyles={{width:"246px",height:"48px",borderRadius:"10px",display:"flex",alignItems:"center",fontWeight:"bold",fontSize:'20px',
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="terciary">Acessar</Button>
             </form>
            </div>
        </div>
    )
}