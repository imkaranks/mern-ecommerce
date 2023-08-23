import React from 'react'
import Pagination from '@mui/material/Pagination';

function Paginate({ currentPage, resultsPerPage, productCount, handlePageChange }) {
  const pages = productCount % resultsPerPage
    ? Math.floor(productCount / resultsPerPage) + 1
    : productCount / resultsPerPage;

  return (
    <div className='flex justify-center items-center m-8'>
      <Pagination
        count={pages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default Paginate