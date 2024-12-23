import { FC } from "react";
import styles from "./styles.module.scss";

// Definindo as props que o componente Avatar vai receber
interface AvatarProps {
  name: string;
  image?: string | null; // A imagem pode ser uma URL ou null
}

const Avatar: FC<AvatarProps> = ({ name, image }) => {
  
  // Função para pegar as iniciais (primeira letra do primeiro e do último nome)
  const getInitials = (name: string) => {
    const nameArray = name.split(" "); // Divide o nome completo em partes
    const firstInitial = nameArray[0].charAt(0).toUpperCase(); // Primeira letra do primeiro nome
    const lastInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase(); // Primeira letra do último nome
    return firstInitial + lastInitial; // Junta as iniciais em uma string
  };

  return (
    <div className={styles.avatar}>
      {image ? (
        <img src={image} alt="Avatar" width={50} height={50} />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {getInitials(name)} {/* Exibe as iniciais */}
        </div>
      )}
    </div>
  );
};

export default Avatar;
