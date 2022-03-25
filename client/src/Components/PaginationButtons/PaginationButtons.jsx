import React from 'react';
import styles from './PaginationButtons.module.css'


const PaginationButtons = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={styles.pageItem} onClick={() => paginate(number)} >
              {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationButtons;