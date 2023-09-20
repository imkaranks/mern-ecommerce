import React from 'react'

function Button({ type='button', label, width='fit', disabled=false, onClick=null }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-${width} uppercase font-bold text-white transition-colors hover:bg-neutral-700`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button