import React, { useState, ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface PaginationProps {
  totalRecords: number;
  recordsPerPageOptions: (number | string)[]; // Aceita tanto números quanto "all"
  onPageChange: (page: number) => void;
  onRecordsPerPageChange: (recordsPerPage: number | string) => void;
  currentPage: number; // Recebe o currentPage de UserList
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  recordsPerPageOptions,
  onPageChange,
  onRecordsPerPageChange,
  currentPage, 
}) => {
  const [recordsPerPage, setRecordsPerPage] = useState<number|string>(recordsPerPageOptions[0]);

  const totalPages = recordsPerPage === 'all' ? 1 : Math.ceil(totalRecords / Number(recordsPerPage));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage); 
    }
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRecordsPerPage = e.target.value;
    setRecordsPerPage(newRecordsPerPage);
    onRecordsPerPageChange(newRecordsPerPage); 
  };

  return (
    <div className={styles.paginationContainer}>
      <span>Total de {totalRecords} registros.</span>

      <div className={styles.paginationButtons}>
        <select
          className={styles.paginationSelect}
          value={recordsPerPage}
          onChange={handleRecordsPerPageChange}
        >
          {recordsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? 'Todos' : `${option} / página`}
            </option>
          ))}
        </select>

        {/* Não exibe os botões de paginação quando "all" é selecionado */}
        {recordsPerPage !== 'all' && (
          <>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>

            <p>{currentPage}</p>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
