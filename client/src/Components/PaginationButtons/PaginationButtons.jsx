import React from 'react';
import styles from './PaginationButtons.module.css'


const PaginationButtons = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  function onClick(e){
    e.preventDefault();
    paginate(e.target.value)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} value={number} className={currentPage === number ? styles.currentPage : styles.pageItem} onClick={onClick} >
              {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationButtons;