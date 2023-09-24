import React from 'react';
import Heading from '../Heading';

function FormContainer({ label, children, multiple=false }) {
  return (
    <>
      <section className='text-center py-14 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          <Heading
            as='h1'
            variant='lg'
            label={label}
          />
        </div>
      </section>

      <section className='py-8'>
        <div className={`relative w-11/12 max-w-xl mx-auto ${multiple ? 'flex overflow-hidden' : ''}`}>
          {children}
        </div>
      </section>
    </>
  )
}

export default FormContainer