/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
import { WelcomeIcon } from "../../icons";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!user.trim() || !password.trim()) {
            toast.error("Preencha todos os campos.");
            return;
        }
    
        try {
            await login(user, password);
            toast.success("Login realizado com sucesso!");
            navigate("/inicio");
        } catch (error: any) {
            console.log("Erro no login:", error);
    
            // Exibe a mensagem de erro retornada pelo login
            const errorMessage = error?.message || "Falha ao realizar login. Tente novamente.";
            toast.error(errorMessage);
        }
    };
    

    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <WelcomeIcon />

                <form onSubmit={handleLogin}>
                    <Input
                        placeholder="Email"
                        type="email"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <Input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className={styles.actionsContainer}>
                        <div className={styles.check}>
                            <Input
                                type="checkbox"
                                label="Manter conectado"
                                value={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                        </div>

                        <Link to="/esqueceu-senha">
                            <span>Esqueceu a senha?</span>
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        customStyles={{
                            width: "246px",
                            height: "48px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "20px",
                            justifyContent: "space-evenly",
                            flexDirection: "row-reverse",
                        }}
                        variant="terciary"
                    >
                        Acessar
                    </Button>
                </form>
            </div>
        </div>
    );
}
