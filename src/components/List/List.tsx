import React, { useState } from "react";
import { EditIcon, ViewIcon, DeleteIcon,FilterIcon } from "../../icons";
import styles from "./styles.module.scss";
import Pagination from "../Pagination/Pagination"; 
type Record = {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; 
};

interface ListProps {
  data: Record[]; 
  columns: string[]; 
  onEdit: (id: number, updatedData: Partial<Record>) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const List: React.FC<ListProps> = ({ data, columns, onEdit, onDelete, onView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number | string>(10);
  const recordsPerPageOptions = [10, 20, 30, 45, "all"];
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const totalRecords = data.length;

  function capitalizeFirstLetter(word:string) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

  const totalPages = recordsPerPage === 'all' ? 1 : Math.ceil(totalRecords / (Number(recordsPerPage) || 1));

  const displayedData = recordsPerPage === 'all'
    ? data
    : data.slice((currentPage - 1) * Number(recordsPerPage), currentPage * Number(recordsPerPage));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSelectedRows(new Set());
    }
  };

  const handleRecordsPerPageChange = (recordsPerPage: number | string) => {
    if (recordsPerPage === 'all') {
      setRecordsPerPage(recordsPerPage);
    } else {
      setRecordsPerPage(Number(recordsPerPage));
    }
    setCurrentPage(1); 
    setSelectedRows(new Set()); 
  };

  const handleSelectAll = () => {
    if (selectedRows.size === displayedData.length) {
  
      setSelectedRows(new Set());
    } else {
     
      const newSelectedRows = new Set(displayedData.map((record) => record.id));
      setSelectedRows(newSelectedRows);
    }
  };

  const handleSelectRow = (id: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const hasStatusColumn = columns.includes("status");
  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Pesquisar..."
          className={styles.searchInput}
        />
        <button className={styles.filterButton}>
          <FilterIcon/>
        </button>
      </div>

      <table className={styles.listTable}>
        <thead>
          <tr>
            <th>
              <input type="checkbox"
           checked={selectedRows.size === displayedData.length} 
           onChange={handleSelectAll} />
            </th>
            {columns.includes("id") && <th>ID</th>}
            {hasStatusColumn && <th>STATUS</th>}
            {columns.includes("name") && <th>NOME</th>}
            {columns.includes("email") && <th>EMAIL</th>}
            {columns.includes("role") && <th>PERMISSÃO</th>}
            {columns.includes("registrationDate") && <th>CADASTRO</th>}
            {columns.includes("lastAccess") && <th>ÚLTIMO ACESSO</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((record) => (
            <tr key={record.id}>
              <td>
                <input type="checkbox" checked={selectedRows.has(record.id)} 
                onChange={() => handleSelectRow(record.id)}/>
            
              </td>
              {columns.includes("id") && <td>{record.id}</td>}
              {hasStatusColumn && (
                <td
                  style={{
                    border: record.status === "confirmado" ? "1px solid #52C41A" : record.status === "bloqueado" ? "1px solid #A2272B" : "1px solid #444444",
                    color: record.status === "confirmado" ? "#52C41A" : record.status === "bloqueado" ? "#A2272B" : "#444444",
                    borderRadius: "4px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "700",
                    fontSize: "12px",
                    height: "7px",

                  }}
                >
                  {capitalizeFirstLetter(record.status)}
                </td>
              )}
              {columns.includes("name") && <td>{capitalizeFirstLetter(record.name)}</td>}
              {columns.includes("email") && <td>{record.email.toLowerCase()}</td>}
              {columns.includes("role") && <td>{capitalizeFirstLetter(record.role)}</td>}
              {columns.includes("registrationDate") && <td>{record.registrationDate}</td>}
              {columns.includes("lastAccess") && <td>{record.lastAccess}</td>}
              <td className={styles.actionButtons}>
                <button title="visualizar" className={styles.iconButton} onClick={() => onView(record.id)}>
                  <ViewIcon />
                </button>
                <button  title="editar" className={styles.iconButton} onClick={() => onEdit(record.id, { status: "confirmado" })}>
                  <EditIcon/>
                </button>
                <button title="deletar" className={styles.iconButton} onClick={() => onDelete(record.id)}>
                  <DeleteIcon/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Componente de paginação */}
      <Pagination
        totalRecords={totalRecords}
        recordsPerPageOptions={recordsPerPageOptions}
        onPageChange={handlePageChange}
        onRecordsPerPageChange={handleRecordsPerPageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default List;
