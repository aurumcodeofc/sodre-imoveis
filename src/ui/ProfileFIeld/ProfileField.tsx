// components/ProfileField.tsx
import React from 'react';
import styles from './styles.module.scss';

interface ProfileFieldProps {
  label: string;
  value: string | undefined;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  const specialLabels = ['Pessoa', 'Senha', 'CPF', 'CRECI', 'Data de cadastro'];
  
  const inputClass = specialLabels.includes(label) ? styles.specialInput : styles.input;
  
  const inputType = label === 'Senha' ? 'password' : 'text';
  const inputWidth = label === 'Email' ? styles.emailInput : '';

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input 
        type={inputType} 
        value={value} 
        readOnly 
        className={`${inputClass} ${inputWidth}`} 
      />
    </div>
  );
};

export default ProfileField;
