import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  variant: "primary" | "secondary" | "terciary" | "quartenary"; 
  onClick?: () => void; 
  customStyles?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode; 
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  customStyles,
  type,
  disabled = false,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return styles.btnPrimary;
      case "secondary":
        return styles.btnSecondary;
      case "terciary":
        return styles.btnTerciary;
        case "quartenary":
          return styles.btnQuartenary;
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={customStyles}
      className={`${styles.btn} ${getVariantClass()}`}
      disabled={disabled}  
    >
      {children}
    </button>
  );
};

export default Button;
