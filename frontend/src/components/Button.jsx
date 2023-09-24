import React from 'react';

export const colorVariants = {
  primary: {
    bg: '[#333]',
    color: 'white'
  },
  secondary: {
    bg: '[#eee]',
    color: '#333'
  }
};

export const buttonVariants = {
  sm: (width, variant) => `px-5 py-1.5 uppercase bg-${variant.bg} w-${width} text-xs text-${variant.color} font-medium font-accent transition-colors duration-300 ease hover:bg-${variant.bg}/70`,
  md: (width, variant) => `inline-flex items-center justify-center bg-${variant.bg} font-accent px-4 py-1.5 w-${width} uppercase font-medium text-${variant.color} transition-colors hover:bg-${variant.bg}/70`,
  lg: (width, variant) => `inline-flex items-center justify-center bg-${variant.bg} font-accent px-6 py-2.5 sm:py-4 w-${width} uppercase font-semibold text-${variant.color} transition-colors hover:bg-${variant.bg}/70`
};

function Button({ as: Component = 'button', type='button', label, disabled=false, onClick=null, size='lg', variant='primary', colorConfig, width='fit', className='' }) {
  const attributes = Component === 'button'
    ? {
      type,
      className: `${buttonVariants[size](width, colorConfig || colorVariants[variant])} ${className}`,
      disabled,
      onClick
    } : {
      className: `${buttonVariants[size](width, colorConfig || colorVariants[variant])} ${className}`,
      onClick
    }

  return (
    <Component {...attributes}>
      {label}
    </Component>
  )
}

export default Button