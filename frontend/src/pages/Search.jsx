import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/MetaData';
import Button from '../components/Button';

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
            className='shadow-md text-black/60 px-4 py-1.5 w-1/2 outline-none rounded-none font-light'
            placeholder='Search a product...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Button
            type='submit'
            label='Search'
            width='1/5'
            size='md'
            className='min-w-fit shadow-md'
          />
        </form>
      </div>
    </>
  )
}

export default Search