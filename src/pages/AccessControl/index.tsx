import { useState,useEffect } from "react";
import {AddBt, DownArrow } from "../../icons"
import Button from "../../ui/Button/Button"
import FormAccess from "../../components/FormAccess/FormAccess";
import styles from "./styles.module.scss"
import List from "../../components/List/List";
import {Link} from "react-router-dom"
import { fetchFakeUsers } from "../../services/accessControl/fetchFakeUsers";
import {User} from "../../services/accessControl/fetchFakeUsers"
import TitlePage from "../../components/TitlePage/TitlePage";

export default function AccessControl(){
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<User[]>([]);
   

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchFakeUsers(); 
          setUserData(data);
        } catch {
          console.log('Erro ao buscar dados');
        }
      };
  
      fetchData();
    }, []);
    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleModal = () =>{
      setIsOpenModal(!isOpenModal)
    }

    const handleCloseModal = () => {
      setIsOpenModal(false);
    };

 
    
    const handleFormSubmit = (data: Record<string, string>) => {
      const newUser: User = {
        id: userData.length + 1, // ID único para o novo usuário
        name: data.nome,
        email: data.email,
        status: "confirmado", // Status fixo como 'confirmado' ou outro valor permitido
        role: "administrador", // Outro valor para 'role' conforme necessário
        registrationDate: new Date().toLocaleDateString(),
        lastAccess: new Date().toLocaleDateString(),
      };
  
      // Adiciona o novo usuário à lista existente
      setUserData((prevData) => [...prevData, newUser]);
  
      // Fecha o modal após o submit
      handleCloseModal();
    };
  
    // const handleDeleteUser = (id: number) => {
    //   setUserData((prev) => prev.filter((userData) => userData.id !== id));
    // };
    
      // const handleEditUser = (id: number, updatedUser: Partial<User>) => {
      //   setUsers((prev) =>
      //     prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      //   );
      // };
    
      const handleDeleteUser = (id: number) => {
        setUserData((prev) => prev.filter((userData) => userData.id !== id));
      };
    return(
    <>
    <div className={styles.container}>
    <div className={styles.containerTitle}>
        <TitlePage text="Controle de Acesso"/>
        <div className={styles.btContainer}>
        <Button onClick={toggleMenu} customStyles={{width:"151px",height:"50px",borderRadius:"30px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="secondary"><span><DownArrow/></span>AÇÕES</Button>
        <Button onClick={toggleModal} customStyles = {{width:"151px",height:"50px",borderRadius:"30px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly"}}variant="primary"><span><AddBt/></span> NOVO</Button>
        </div>

    </div>
    <div className = {styles.list}>
    <List
  data={userData} 
  columns={['id', 'name', 'email', 'status', 'role', 'registrationDate', 'lastAccess']} 
  onView={(id) => alert(`Visualizar ${id}`)}
  onEdit={(id, updatedData) => alert(`Editar ${id}`, updatedData)}
  onDelete={(id) => handleDeleteUser(id)}
/>
            </div>
            <div
          className={`${styles.dropdownMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          <ul>
            <li>Importar</li>
            <Link to="/importar-funcionario"><li>Exportar</li></Link>
            <li>Aplicar Permissões</li>
          </ul>
        </div>
    {isOpenModal && (
      <div>
        <FormAccess onSubmit={handleFormSubmit} onClose={handleCloseModal}/>
      </div>
    )}
    </div>

    
    </>
    )
}