/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LockIcon } from "../../icons";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import api from "../../services/api";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function FirstAccess(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {logout } = useAuth();
    const navigate = useNavigate()
    const handleCancel = () => {
        logout(); 
        navigate('/'); 
      };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Todos os campos são obrigatórios.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }
  
      if (newPassword.length < 8) {
        toast.error("A nova senha deve ter pelo menos 8 caracteres.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        toast.error("As senhas não coincidem.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }
  
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token de autenticação não encontrado.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        return;
      }
  
      try {
        const response = await api.post(
          "/users/change-password",
          {
            currentPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          toast.success("Senha atualizada com sucesso!");
          navigate("/inicio")
      
        }
      } catch (error: any) {
        if (error?.response?.data?.message === "Password is not valid.") {
          toast.error("Senha antiga incorreta!");
        } else {
          toast.error("Erro ao alterar a senha. Tente novamente.");
        }
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    };
    return(
            <>
            
              <ToastContainer/>
                <div className = {styles.firstAccess}>
                <div className={styles.container}>
                  <div className={styles.header}>
                    <h1>Primeiro Acesso</h1>
                    <LockIcon />
                  </div>
        
                  <form onSubmit={handleSubmit}>
                    <div className={styles.oldPass}>
                      <Input
                        placeholder="Antiga Senha"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
        
                    <div className={styles.newPass}>
                      <Input
                        placeholder="Nova Senha"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
        
                      <Input
                        placeholder="Confirmar nova senha"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
        
                    <div className={styles.btContainer}>
         
                    <Button
                        type="button"
                        onClick={handleCancel}
                        customStyles={{
                        width: "117px",
                        height: "35px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "15px",
                        justifyContent: "space-evenly",
                        flexDirection: "row-reverse",
                        }}
                        variant="quartenary"
                    >
                        Cancelar
                    </Button>
                      <Button
                        type="submit"
                        customStyles={{
                          width: "161px",
                          height: "40px",
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
                        Salvar
                      </Button>
                    </div>
                  </form>
                </div>
                </div>
            </>
          );
    
}