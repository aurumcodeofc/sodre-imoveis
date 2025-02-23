import React from "react";
import styles from "./styles.module.scss";
import { EditPassIcon } from "../../icons";

interface ProfileFieldProps {
  label: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPassword?: () => void; 
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  onChange,
  onClickPassword,
}) => {
  const specialLabels = ["Pessoa", "Senha", "CPF", "CNPJ", "CRECI", "Data de cadastro"];
  const isDisabled = specialLabels.includes(label);
  const inputClass = isDisabled ? styles.specialInput : styles.input;
  const inputType = label === "Senha" ? "password" : "text";
  const inputWidth = label === "Email" ? styles.emailInput : "";

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`${inputClass} ${inputWidth}`}
        />
        {label === "Senha" && (
          <span
            title="Alterar Senha"
            className={styles.iconButton}
            onClick={onClickPassword} 
          >
            <EditPassIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileField;
