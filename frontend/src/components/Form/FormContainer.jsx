import React from 'react'

function FormContainer({ label, children, multiple=false }) {
  return (
    <>
      <section className='text-center py-14 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold text-neutral-800 font-accent'>{label}</h1>
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