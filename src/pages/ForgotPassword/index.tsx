/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import styles from "./styles.module.scss";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { LockIcon } from "../../icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../../services/userService";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.trim()) {
            toast.error("Por favor, insira um e-mail.");
            return;
        }

        try {
            await sendCode(user);
            toast.success("Código enviado com sucesso! Verifique seu e-mail.");
        } catch (error: any) {
            if (error?.response?.status === 404) {
                toast.error("E-mail não encontrado. Verifique e tente novamente.");
            } else {
                toast.error("Falha ao enviar o código. Tente novamente mais tarde.");
            }
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className={styles.forgotPassword}>
            <div className={styles.forgotPasswordContainer}>
                <div className={styles.header}>
                    <h1>Esqueceu a senha</h1>
                    <LockIcon />
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Email"
                        type="email"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <div className={styles.btContainer}>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            customStyles={{
                                width: "121px",
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
                                width: "121px",
                                height: "35px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "bold",
                                fontSize: "15px",
                                justifyContent: "space-evenly",
                                flexDirection: "row-reverse",
                            }}
                            variant="terciary"
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
