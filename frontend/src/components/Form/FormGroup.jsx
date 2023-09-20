import React, { useId } from 'react'

function FormGroup({ label, as: Component = 'input', children, type, required = false, name, value, onChange }) {
  const inputId = useId();

  const inputElement = Component === 'select'
    ? (
      <Component
        className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
        name={name || type}
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
      >{children}</Component>
    ) : (
      <Component
        className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
        type={type}
        name={name || type}
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
      />
    )

  return (
    <div className='flex flex-col gap-1'>
      <label
        className='text-neutral-600'
        htmlFor={inputId}
      >
        {label}
      </label>
      {inputElement}
    </div>
  )
}

export default FormGroup