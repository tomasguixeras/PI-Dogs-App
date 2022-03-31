import React from 'react';
import styles from './PaginationButtons.module.css'


const PaginationButtons = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? styles.currentPage : styles.pageItem} onClick={() => paginate(number)} >
              {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationButtons;