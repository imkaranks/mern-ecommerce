import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/MetaData';

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  function searchSubmitHandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  }

  return (
    <>
      <MetaData title='Ecommerce | Search a product' />
      <div>
        <form className='bg-[#f9f9f9] min-h-[calc(100vh-70px)] flex justify-center items-center' onSubmit={searchSubmitHandler}>
          <input
            type="text"
            className='shadow-md text-black/60 px-4 py-2 w-1/2 outline-none rounded-none font-light'
            placeholder='Search a product...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            type="submit"
            className='shadow-md bg-[tomato] text-white px-4 py-2 w-1/5 rounded-none font-light transition-colors hover:bg-[tomato]/75'
            value='Search'
          />
        </form>
      </div>
    </>
  )
}

export default Search