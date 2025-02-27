import { FC } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./styles.module.scss";

interface AvatarProps {
  variant:"header" | "profile";
  name: string;
  image?: string | null;
  title: string | null; 
  navigateTo?: string; 
}

const Avatar: FC<AvatarProps> = ({ name, image, title, navigateTo,variant }) => {
  const navigate = useNavigate(); 

  const getVariantClass = () => {
    switch (variant) {
      case "header":
        return styles.header;
      case "profile":
        return styles.profile;
      default:
        return "";
    }
  };
  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    const firstInitial = nameArray[0].charAt(0).toUpperCase();
    const lastInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  };

  const handleAvatarClick = () => {
    if (navigateTo) {
      navigate(navigateTo); 
    }
  };

  return (
    <div
    className={`${styles.avatar} ${getVariantClass()}`} title={title ?? undefined} 
      onClick={handleAvatarClick}
    >
      {image ? (
        <img src={image} alt="Avatar" width={50} height={50} />
      ) : (
        <div className={styles.avatarPlaceholder} >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
