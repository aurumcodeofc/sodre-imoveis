import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {CloseIconModal} from "../../icons";
import {searchCep} from "../../utils/searchCep"
import {searchStates} from "../../utils/searchStates"
import {formatCPF,validateCPF,formatCEP} from "../../utils/helpers"
import Button from "../../ui/Button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface EmployeeProps {
  fullName: string;
  cpf: string; 
  email: string;
  creci: string; 
  telefone: string; 
  birthData: string; 
  cep: string; 
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  homeNumber: string; 
}

interface FormField {
  fields: EmployeeProps[];
  role: "administrador" | "gerente" | "estagiario" | "corretor";
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
}

const FormAccess: React.FC<FormField> = ({ onSubmit,onClose }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    cpf: "",
    email: "",
    creci: "",
    telefone: "",
    birthData: "",
    cep: "",
    city: "",
    state: "",
    neighborhood: "",
    street: "",
    homeNumber: "",
    role: "", 
  });
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    const formattedCEP = formatCEP(cep);
  
    setFormData((prevData) => ({
      ...prevData,
      cep: formattedCEP,
    }));
  
    // Verifica se o CEP tem o formato válido de 8 caracteres numéricos
    if (formattedCEP.length === 8 && /^\d{8}$/.test(formattedCEP)) {
      try {
        const addressData = await searchCep(formattedCEP);
  
        // Preenche os campos automaticamente
        setFormData((prevData) => ({
          ...prevData,
          street: addressData.logradouro || "",
          neighborhood: addressData.bairro || "",
          homeNumber: addressData.unidade || "",
        }));
  
        // Define o estado de acordo com o dado retornado
        const fetchedState = addressData.uf || "";
        setSelectedState(fetchedState); // Define o estado automaticamente
  
        // Verifica se a cidade é retornada corretamente
        if (addressData.localidade) {
          setSelectedCity(addressData.localidade); // Atualiza a cidade com a localidade
        }
  
        if (fetchedState) {
          handleStateChange(fetchedState); // Aciona a função de preenchimento de cidade ao identificar o estado
        }
  
      } catch {
        console.error("CEP inválido");
      }
    }
  };

  useEffect(() => {
    const loadStates = async () => {
      const statesList = await searchStates();
      console.log("lista", statesList);
    
      // Ordena a lista de estados em ordem alfabética
      const sortedStates = statesList.sort();
    
      setStates(sortedStates); // Atualiza o estado com os estados ordenados
    };
    

    loadStates();
  }, []);

  const handleStateChange = async (state: string) => {
    setSelectedState(state);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`);
      const data = await response.json();
  
      // Aqui, extrai os nomes das cidades.
      if (Array.isArray(data)) {
        const cityNames = data.map((cidade: { nome: string }) => cidade.nome); // Extrai apenas o nome da cidade
        setCities(cityNames);  // Armazena os nomes das cidades no estado
      } else {
        console.error('Estrutura de dados inesperada:', data);
      }
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
 
    if (!formData.nome || !formData.email || !formData.cpf) {
      alert("Por favor, preencha todos os campos: Nome, E-mail e CPF.");
      return; 
    }
  
    // Validando o CPF
    if (!validateCPF(formData.cpf)) {
      alert("CPF inválido!"); // Exibe alerta se o CPF for inválido
      return; // Interrompe o submit caso o CPF seja inválido
    }
  
    // Se tudo estiver correto, os dados são enviados para a função onSubmit
    onSubmit(formData);
  };
  

  return (
    <div className={styles.formContainer} onClick={handleOverlayClick}>
    <div className={styles.formContent}>
    <div className = {styles.formHeader}>
        <h2>Novo Funcionario</h2>
        <span onClick={onClose}><CloseIconModal/></span>
        </div>
    <form onSubmit={handleSubmit}>


    <div className={styles.formMain}>
    <div className={styles.formFields}>
      <div className={styles.inputContainer}>
        <label htmlFor="fullName">Nome Completo</label>
        <input
          style={{width:"300px"}}
          type="text"
          name="fullName"
          placeholder="Insira o nome completo"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
  <label htmlFor="cpf">CPF</label>
  <input
    style={{ width: "170px" }}
    type="text"
    name="cpf"
    placeholder="000.000.000-00"
    value={formData.cpf}
    onChange={(e) => {
      const formattedCPF = formatCPF(e.target.value);
      handleChange({
        target: { name: "cpf", value: formattedCPF },
      } as React.ChangeEvent<HTMLInputElement>);
    }}
  />
      </div>
      </div>

      <div className={styles.formFields}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">E-mail</label>
        <input
        style={{width:"300px"}}
          type="email"
          name="email"
          placeholder="Insira o email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="creci">CRECI</label>
        <input
        style={{width:"170px"}}
          type="text"
          name="creci"
          placeholder="Insira o CRECI"
          value={formData.creci}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className={styles.formFields}>
      <div className={styles.inputContainer}>
        <label htmlFor="telefone">Telefone</label>
      

<PhoneInput
        country={"br"} 
        value={formData.telefone}
        onChange={(value) => {
          setFormData({
            ...formData,
            telefone: value, // Atualiza apenas o telefone com o valor formatado
          });
        }}
        placeholder="Digite seu telefone"
        inputStyle={{
          fontFamily:"Ubuntu",
          width: "250px",
          padding: "10px",
          fontSize: "13px",
          paddingLeft:"45px"
        }}
      />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="birthData">Data de Nascimento</label>
        <input
          type="date"
          name="birthData"
          placeholder="DD/MM/AAAA"
          value={formData.birthData}
          onChange={handleChange}
        />
      </div>
</div>
    </div>
    <p>Dados Complementares</p>
    <div className={styles.formComplementary}>
    <div className={styles.formFields}>
    <div className={styles.inputContainer}>
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          name="cep"
          placeholder="Insira o CEP"
          value={formData.cep}
          onChange={handleCEPChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="state">Estado</label>
        <select
        name="state"
        value={selectedState}
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option disabled>Escolha um estado</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      </div>
      </div>
      <div className={styles.formFields}>
      <div className={styles.inputContainer}>
        <label htmlFor="city">Cidade</label>
        <select
  name="city"
  value={selectedCity}
  onChange={(e) => setSelectedCity(e.target.value)}
>
  <option disabled>Escolha uma cidade</option>
  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>
      </div>
    
      <div className={styles.inputContainer}>
        <label htmlFor="neighborhood">Bairro</label>
        <input
          type="text"
          name="neighborhood"
          placeholder="Insira o bairro"
          value={formData.neighborhood}
          onChange={handleChange}
        />
      </div>
      </div>
      
      <div className={styles.formFields}>
      <div className={styles.inputContainer}>
        <label htmlFor="street">Rua</label>
        <input
          type="text"
          name="street"
          placeholder="Insira a rua"
          value={formData.street}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="homeNumber">Número da Casa</label>
        <input
          type="number"
          name="homeNumber"
          placeholder="Insira a numeração"
          value={formData.homeNumber}
          onChange={handleChange}
        />
      </div>
      </div>
    </div>

    <div className={styles.formPermissions}>
    <div className={styles.inputContainer}>
        <p>Permissões</p>
        <label  htmlFor="role">Tipo de permissão</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          
        >
          <option disabled >Escolha um status</option>
          <option value="administrador">Administrador</option>
          <option value="gerente">Gerente</option>
          <option value="estagiario">Estagiário</option>
          <option value="corretor">Corretor</option>
        </select>
      </div>
    </div>
    <div className={styles.btContainer}>
    <Button type="button" onClick={onClose} customStyles={{width:"121px",height:"35px",borderRadius:"10px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="secondary">Cancelar</Button>

      <Button type = "submit" customStyles={{width:"121px",height:"35px",borderRadius:"10px",display:"flex",alignItems:"center",
    justifyContent:"space-evenly",flexDirection:"row-reverse"}} variant="primary">Salvar</Button>
 
    </div>
    </form>
    </div>
    </div>
    
  );
};

export default FormAccess;
