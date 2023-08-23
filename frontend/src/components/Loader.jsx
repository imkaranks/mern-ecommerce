import React from 'react'

function Loader() {
  return (
    <div className='w-full min-h-[calc(100vh-70px)] grid place-items-center'>
      <div className="w-14 h-14 border-b-2 border-b-gray-400 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader