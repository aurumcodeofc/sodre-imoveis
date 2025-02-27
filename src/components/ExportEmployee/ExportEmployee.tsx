import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CloseIconModal } from "../../icons";
import Button from "../../ui/Button/Button";
import { exportToExcel, formatCurrentDate, formatDate } from "../../utils/helpers";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

interface EmployeeData {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  creci: string;
  telefone: string;
  birthData: string;
  cep: string;
  city: string;
  state: string;
  status: string;
  role: string;
  neighborhood: string;
  street: string;
  homeNumber: string;
  registrationDate: string;
  lastAccess: string;
}

interface User {
  id: number;
  fullName?: string;
  cpf?: string;
  email?: string;
  creci?: string;
  telefone?: string;
  birthData?: string;
  cep?: string;
  city?: string;
  state?: string;
  status?: string;
  role?: string;
  neighborhood?: string;
  street?: string;
  homeNumber?: string;
  registrationDate?: string;
  lastAccess?: string;
}

interface ExportEmployeeProps {
  onClose: () => void;
  data: User[];
}

const ExportEmployee: React.FC<ExportEmployeeProps> = ({ onClose, data }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const filterByPeriod = (registrationDate: string): boolean => {
    const date = new Date(registrationDate);
    const now = new Date();

    if (selectedPeriod === "lastMonth") {
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
      return date >= lastMonth;
    }

    if (selectedPeriod === "lastYear") {
      const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
      return date >= lastYear;
    }

    return true;
  };

  const getFilteredData = (): EmployeeData[] => {
    return data
      .map((user) => ({
        id: user.id,
        fullName: user.fullName ?? "",
        cpf: user.cpf ?? "",
        email: user.email ?? "",
        creci: user.creci ?? "",
        telefone: user.telefone ?? "",
        birthData: user.birthData ?? "",
        cep: user.cep ?? "",
        city: user.city ?? "",
        state: user.state ?? "",
        status: user.status ?? "",
        role: user.role ?? "",
        neighborhood: user.neighborhood ?? "",
        street: user.street ?? "",
        homeNumber: user.homeNumber ?? "",
        registrationDate: user.registrationDate ?? "",
        lastAccess: user.lastAccess ?? "",
      }))
      .filter((item) => {
        const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
        const matchesPeriod = filterByPeriod(item.registrationDate);
        return matchesStatus && matchesPeriod;
      });
  };

  const handleExport = () => {
    const filteredData = getFilteredData();

    if (filteredData.length === 0) {
      toast.error("Não há dados disponíveis com os filtros selecionados.");
      return;
    }

    const limitedData = filteredData.slice(0, 1000);

    const mappedData = limitedData.map((item) => ({
      "ID": item.id,
      "Nome": item.fullName,
      "CPF": item.cpf,
      "Email": item.email,
      "CRECI": item.creci,
      "Telefone": item.telefone,
      "Data de Nascimento": formatDate(item.birthData),
      "CEP": item.cep,
      "Cidade": item.city,
      "Estado": item.state,
      "Status": item.status,
      "Cargo": item.role,
      "Bairro": item.neighborhood,
      "Rua": item.street,
      "Número": item.homeNumber,
      "Data de Registro": item.registrationDate,
      "Último Acesso": item.lastAccess,
    }));

    const formattedDate = formatCurrentDate();
    const fileName = `funcionarios_sodre_${formattedDate}`;

    exportToExcel(mappedData, fileName);
    toast.success("Exportação concluída com sucesso!");
  };

  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Exportar Funcionários</h1>
          <span onClick={onClose}>
            <CloseIconModal />
          </span>
        </div>
        <form>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="bloqueado">Bloqueado</option>
              </select>
            </div>
            <div className={styles.input}>
              <label htmlFor="periodo">Período</label>
              <select
                name="periodo"
                id="periodo"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="lastMonth">Último Mês</option>
                <option value="lastYear">Último Ano</option>
              </select>
            </div>
          </div>
          <div className={styles.btContainer}>
            <Button
              type="button"
              onClick={onClose}
              customStyles={{
                width: "121px",
                height: "35px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row-reverse",
                backgroundColor: "#404040",
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: "15px",
              }}
              variant="secondary"
            >
              Cancelar
            </Button>

            <Button
              type="button"
              onClick={handleExport}
              customStyles={{
                width: "161px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row-reverse",
                fontWeight: "700",
                fontSize: "20px",
              }}
              variant="primary"
            >
              Baixar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportEmployee;
