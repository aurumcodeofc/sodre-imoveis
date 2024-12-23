import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    variant: "primary" | "secondary"; 
    onClick?: () => void; 
    customStyles?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick, customStyles,type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            style={customStyles}
            className={`${styles.btn} ${variant === "primary" ? styles.btnPrimary : styles.btnSecondary}`}
        >
            {children}
        </button>
    );
};

export default Button;
