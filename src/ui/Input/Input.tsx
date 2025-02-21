import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./styles.module.scss";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "checkbox" | "email";
  value?: string | boolean;
  checked?: boolean; // Adiciona a prop checked
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  checked,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.inputWrapper}>
      {type === "checkbox" ? (
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={checked} // Agora usa a prop checked
            onChange={onChange}
            className={styles.checkbox}
          />
          {label}
        </label>
      ) : (
        <>
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
            className={styles.input}
          />
          {type === "password" && (
            <button type="button" className={styles.eyeButton} onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
