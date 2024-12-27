import React from "react";
import styles from "./styles.module.scss";
import { CloseIconModal } from "../../icons";
import Button from "../../ui/Button/Button";

interface ExportEmployeeProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

const ExportEmployee: React.FC<ExportEmployeeProps> = ({ onSubmit,onClose  }) => {
      const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Exportar Funcionários</h1>
          <span onClick={onClose}>
            <CloseIconModal />
          </span>
        </div>
          <form onSubmit={onSubmit}>
            <div className={styles.inputContainer}>
            <div className={styles.input}>
            <label id="status">Status</label>
            <select name="status" id="status">
              <option value="all">Todos</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="blocked">Bloqueado</option>
            </select>
            </div>

            <div className={styles.input}>
            <label id="periodo">Período</label>
            <select name="periodo" id="periodo">
              <option value="all">Todos</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="blocked">Bloqueado</option>
            </select>
            </div>

            </div>
            <div>
            <div className={styles.btContainer}>
    <Button type="button" onClick={onClose} customStyles={{width:"121px",height:"35px",borderRadius:"10px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly",flexDirection:"row-reverse", backgroundColor:"#404040",color:"#FFFFFF", fontWeight:"700",fontSize:"15px"}} variant="secondary">Cancelar</Button>

      <Button type = "submit" customStyles={{width:"161px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly",flexDirection:"row-reverse",fontWeight:"700", fontSize:"20px"}} variant="primary">Baixar</Button>
 
    </div>
            </div>

          </form>
  
      </div>
    </div>
  );
};

export default ExportEmployee;
