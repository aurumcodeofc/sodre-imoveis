import { useState } from "react";
import { AddBt, DownArrow } from "../../icons";
import Button from "../../ui/Button/Button";
import TitlePage from "../../components/TitlePage/TitlePage"
import FormAccess from "../../components/FormAccess/FormAccess";
import styles from "./styles.module.scss";
import List from "../../components/List/List";
import {Link} from "react-router-dom"
import ExportEmployee from "../../components/ExportEmployee/ExportEmployee";

type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
  registrationDate: string;
  lastAccess: string;
};

export default function AccessControl() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOpenExport, setIsOpenExport] = useState<boolean>(false);
  const [userData, setUserData] = useState<User[]>([]); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const toggleExport = () => {
    setIsOpenExport(!isOpenExport);
    setIsMenuOpen(false);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCloseExport = () =>{
  
    setIsOpenExport(false);
  }


  const handleFormSubmit = (newUser: Omit<User, "id">) => {
    const newUserWithId = {
      id: userData.length + 1,
      ...newUser,
    };
    setUserData((prev) => [...prev, newUserWithId]); 
    handleCloseModal();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <TitlePage text="Controle de Acesso"/>
          <div className={styles.btContainer}>
            <Button
              onClick={toggleMenu}
              customStyles={{
                width: "151px",
                height: "50px",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row-reverse",
              }}
              variant="secondary"
            >
              <span>
                <DownArrow />
              </span>
              AÇÕES
            </Button>
            <Button
              onClick={toggleModal}
              customStyles={{
                width: "151px",
                height: "50px",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              variant="primary"
            >
              <span>
                <AddBt />
              </span>
              NOVO
            </Button>
          </div>
        </div>
        <div className={styles.list}>
          <List
            data={userData}
            columns={[
              "id",
              "name",
              "email",
              "status",
              "role",
              "registrationDate",
              "lastAccess",
            ]}
            onView={(id) => alert(`Visualizar ${id}`)}
            onEdit={(id, updatedData) =>
              alert(`Editar ${id}`, JSON.stringify(updatedData))
            }
            onDelete={(id) =>
              setUserData((prev) => prev.filter((user) => user.id !== id))
            }
          />
        </div>
        <div
          className={`${styles.dropdownMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          <ul>
          <Link to="/importar-funcionario"><li>Importar</li></Link>
            <li onClick={toggleExport}>Exportar</li>
            <li>Aplicar Permissões</li>
          </ul>
        </div>
        {isOpenModal && (
          <div>
            <FormAccess onSubmit={handleFormSubmit} onClose={handleCloseModal} />
          </div>
        )}

      {isOpenExport && (
          <div>
            <ExportEmployee onClose={handleCloseExport}/>
          </div>
        )}
      </div>
    </>
  );
}