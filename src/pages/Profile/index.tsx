import { useState, useEffect } from "react";
import Avatar from "../../ui/Avatar/Avatar";
import TitlePage from "../../components/TitlePage/TitlePage";

import { useAuth } from "../../context/AuthContext";
import Tab from "../../ui/Tab/Tab";
import "react-phone-input-2/lib/style.css";
import styles from "./styles.module.scss";
import ProfileField from "../../ui/ProfileFIeld/ProfileField";
import { formatDate, formatHour, formatCEP, formatCPF } from "../../utils/helpers";
import { searchCep } from "../../utils/searchCep";
import api from "../../services/api"; 
import Button from "../../ui/Button/Button";
import ModalChangePassword from "../../components/ModalChangePassword/ModalChangePassword";

export default function Profile() {
  const { user } = useAuth();
  const [isOpenChangePass, setIsOpenChangePass] = useState<boolean>(false);
  const dateHour = `${formatDate(user.created_at)} ${formatHour(user.created_at)}`;
  const birthDate = formatDate(user.birth_date);



  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone); 
  const [birthDateState, setBirthDateState] = useState(birthDate);
  const [cpf, setCpf] = useState(user?.cpf);
  const [cnpj, setCnpj] = useState(user?.cnpj);
  const [address, setAddress] = useState({
    street: user?.address?.street,
    district: user?.address?.district,
    city: user?.address?.city,
    state: user?.address?.state,
    addressNumber: user?.address?.addressNumber,
    postalCode: user?.address?.postalCode,
  });

  const [isEdited, setIsEdited] = useState(false);

  const toggleModal = () => {
    setIsOpenChangePass(!isOpenChangePass);
  };

  const handleCloseChangePassword = () =>{
    setIsOpenChangePass(false);
  }
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    setAddress((prev) => ({ ...prev, postalCode: cepValue }));

    if (cepValue.length === 8) {
      try {
        const data = await searchCep(cepValue);
        setAddress((prev) => ({
          ...prev,
          street: data.logradouro,
          district: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };


  useEffect(() => {
    const hasChanges =
      name !== user?.name ||
      phone !== user?.phone ||
      birthDateState !== birthDate ||
      address.street !== user?.address?.street ||
      address.district !== user?.address?.district ||
      address.city !== user?.address?.city ||
      address.state !== user?.address?.state ||
      address.addressNumber !== user?.address?.addressNumber ||
      address.postalCode !== user?.address?.postalCode ||
      cpf !== user?.cpf ||
      cnpj !== user?.cnpj;

    setIsEdited(hasChanges);
  }, [name, phone, birthDateState, address, user, cpf, cnpj]);


  const handleSave = async () => {
    try {
   
      const updatedData = {
        id: user?.id,
        full_name: name,
        birth_date: birthDateState,
        cpf,
        cnpj,
        phone,
        mobile_phone: phone, 
        address: {
          street: address.street,
          district: address.district,
          city: address.city,
          state: address.state,
          addressNumber: address.addressNumber,
          postalCode: address.postalCode,
        },
      };

      await api.put("/users/update", updatedData);


      setIsEdited(false);


      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      alert("Houve um erro ao atualizar as informações.");
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDateState(formatBirthDateInput(value));
  };

  const userContent = (
    <>
    <div className={styles.userContainer}>
      <div className={styles.firstStep}>
        <div className={styles.userInfo}>
          <ProfileField label="Data de cadastro" value={dateHour} />
          <ProfileField label="Email" value={user?.email} />
        </div>
        <div className={styles.userInfo}>
          <ProfileField label="Pessoa" value={user?.person_type} />
          <ProfileField label="Senha" value="********" disabled onClickPassword={toggleModal}/>
        </div>
      </div>

      <h2>Informações Pessoais</h2>
      <div className={styles.personInfo}>
        <div className={styles.leftColumn}>
          <div className={styles.userInfo}>
            <ProfileField
              label="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {user?.person_type === "FISICA" && (
              <ProfileField
                label="CPF"
                value={formatCPF(cpf || "")}
                onChange={(e) => setCpf(e.target.value)}
              />
            )}


            {user?.person_type === "JURIDICA" && (
              <ProfileField
                label="CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            )}
            <ProfileField
              label="Data de nascimento"
              value={birthDateState} 
              onChange={handleBirthDateChange}
              disabled={!isEdited}
            />
            <ProfileField
              label="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.subColumn}>
            <div className={styles.userInfo}>
              <ProfileField
                label="CEP"
                value={address.postalCode}
                onChange={handleCepChange}
                disabled={!isEdited}
              />
              <ProfileField
                label="Estado"
                value={address.state}
                disabled
              />
            </div>
            <div className={styles.userInfo}>
              <ProfileField
                label="Cidade"
                value={address.city}
                disabled
              />
            </div>
          </div>

          <div className={styles.subColumn}>
            <div className={styles.userInfo}>
              <ProfileField
                label="Bairro"
                value={address.district}
                onChange={(e) => setAddress((prev) => ({ ...prev, district: e.target.value }))} 
              />
              <ProfileField
                label="Rua"
                value={address.street}
                onChange={(e) => setAddress((prev) => ({ ...prev, street: e.target.value }))} 
              />
            </div>
            <div className={styles.userInfo}>
              <ProfileField
                label="Número"
                value={address.addressNumber}
                onChange={(e) => setAddress((prev) => ({ ...prev, addressNumber: e.target.value }))} 
              />
            </div>
          </div>
        </div>
      </div>

      {isEdited && (
        <div className={styles.saveButton}>
          <Button
            type="button"
            onClick={handleSave}
            customStyles={{
              width: "130px",
              height: "30px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              fontWeight: "700",
              fontSize: "15px",
            }}
            variant="primary"
          >
            Salvar
          </Button>
        </div>
      )}
    </div>
    {isOpenChangePass && (
          <div>
            <ModalChangePassword onClose={handleCloseChangePassword}/>
          </div>
        )}
      
    </>
  );

  const notificationsContent = (
    <div>
      <h2>Notificações</h2>
      <p>Aqui estão as notificações.</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <TitlePage text="Meu Perfil" />
      <div className={styles.headerProfile}>
        <div className={styles.profileIcon}>
          <Avatar name={user.name} title={user?.name} variant="profile" />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileStatus}>
            <span className={styles.status}>VERIFICADO</span>
            <p>{user?.name}</p>
          </div>
          <span>{user?.email}</span>
          <span>ADMINISTRADOR MASTER</span>
        </div>
      </div>
      <Tab userContent={userContent} notificationsContent={notificationsContent} />
    </div>
  );
}
