import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
import { WelcomeIcon } from "../../icons";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

export default function Login() {
  const { login, firstAccess, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Estado de carregamento

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user.trim() || !password.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }
  
    setIsLoading(true);  // Inicia o estado de carregamento
  
    try {
      const loginData = await login(user, password);  // Tenta o login
      
      if (loginData) {
        const { first_access } = loginData;  // Pega o first_access da resposta
  
        toast.success("Login realizado com sucesso!");
  
        // Redireciona com base no first_access
        if (first_access) {
          navigate("/primeiro-acesso");
        } else {
          navigate("/inicio");
        }
      } else {
        throw new Error("Dados de login inválidos");
      }
    } catch (error: any) {
      console.error("Erro no login:", error?.message || "Falha ao realizar login.");
      toast.error(error?.message || "Falha ao realizar login.");
    } finally {
      setIsLoading(false);  // Finaliza o estado de carregamento
    }
  };
  

  return (
    <div className={styles.login}>
      <ToastContainer />
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
            disabled={isLoading}  // Desabilita o botão enquanto o login está em andamento
          >
            {isLoading ? "Carregando..." : "Acessar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
