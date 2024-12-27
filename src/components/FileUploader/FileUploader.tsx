import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";
import { UploadIcon } from "../../icons";
interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
      if (allowedExtensions.includes(file.type)) {
        onFileSelect(file); 
      } else {
        alert("Apenas arquivos .xlsx ou .xls são permitidos.");
      }
    }
  };

  return (
    <div className={styles.uploader} onClick={() => document.getElementById("fileInput")?.click()}>
      <input
        type="file"
        id="fileInput"
        className={styles.input}
        accept=".xlsx,.xls"
        onChange={handleFileChange}
      />
      <UploadIcon/>
      <div>
      <p>Solte o arquivo ou clique para procurar</p>
      <p>Extensões permitidas: .xls, .xslx</p>
      </div>
    </div>
  );
};

export default FileUploader;
