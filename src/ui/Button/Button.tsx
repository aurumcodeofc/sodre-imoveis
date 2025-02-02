import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    variant: "primary" | "secondary" | "terciary"; 
    onClick?: () => void; 
    customStyles?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick, customStyles, type }) => {
    const getVariantClass = () => {
        switch (variant) {
            case "primary":
                return styles.btnPrimary;
            case "secondary":
                return styles.btnSecondary;
            case "terciary":
                return styles.btnTerciary;
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
        >
            {children}
        </button>
    );
};

export default Button;
