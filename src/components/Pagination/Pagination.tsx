import React, { FC, useMemo } from 'react';
import styles from './Pagination.module.css';
type IProps = {
  currentPage: number;
  totalCount: number;
  onChange: (value: number) => void;
};

const Pagination: FC<IProps> = ({ currentPage, totalCount, onChange }) => {
  const pages = useMemo(() => {
    const result = [];
    for (let i = currentPage - 3; i < currentPage + 3; i++) {
      if (i > 0 && i <= totalCount) {
        result.push(i);
      }
    }
    return result;
  }, [currentPage, totalCount]);
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Prev
      </button>
      {currentPage - 5 >= 0 && (
        <button
          className={styles.paginationBtn + `${currentPage === 1 ? ` ${styles.active}` : ''}`}
          onClick={() => onChange(1)}
        >
          1
        </button>
      )}
      {currentPage - 5 > 0 && <div className={styles.paginationBtn}>...</div>}
      {pages.map((page) => {
        return (
          <button
            onClick={() => onChange(page)}
            className={styles.paginationBtn + `${page === currentPage ? ` ${styles.active}` : ''}`}
            key={page}
          >
            {page}
          </button>
        );
      })}
      {currentPage + 5 < totalCount && <div className={styles.paginationBtn}>...</div>}
      {currentPage + 5 < totalCount && (
        <button
          className={
            styles.paginationBtn + `${totalCount === currentPage ? ` ${styles.active}` : ''}`
          }
          onClick={() => onChange(totalCount)}
        >
          {totalCount}
        </button>
      )}
      <button disabled={currentPage === totalCount} onClick={() => onChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
