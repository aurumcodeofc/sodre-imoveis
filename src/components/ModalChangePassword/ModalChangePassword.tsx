
import { useState } from "react"
import { CloseIcon, LockIcon } from "../../icons"
import Input from "../../ui/Input/Input"

import styles from "./styles.module.scss"
import Button from "../../ui/Button/Button"
interface ModalChangePasswordProps {
    onClose: () => void;
    
  }
const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({ onClose}) => {
        const [oldPassword, setOldPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

          const handleOverlayClick = (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          };
    return(
        <div className={styles.container} onClick={handleOverlayClick}>
            <div className={styles.modalContainer}>
            <span className={styles.closeModal} onClick={onClose}><CloseIcon/></span>
                <div className ={styles.modalHeader}>
                <h1>Alterar Senha</h1>
                <LockIcon/>
                </div>
                <form>
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
                            onClick={onClose}
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
    )
}

export default ModalChangePassword