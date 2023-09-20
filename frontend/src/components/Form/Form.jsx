import React from 'react'

const Form = ({ children, forwardedRef = null, encType = 'application/x-www-form-urlencoded', onSubmit = null, className = '' }) => {
  return (
    <form
      className={`w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300 ${className}`}
      ref={forwardedRef}
      encType={encType}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
};

export default Form