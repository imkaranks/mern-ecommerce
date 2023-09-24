import React from 'react'

export const headingVariants = {
  sm: {
    size: 'base',
    weight: 'semibold'
  },
  md: {
    size: 'xl',
    weight: 'semibold'
  },
  lg: {
    size: '3xl',
    weight: 'bold'
  }
};

function Heading({ as: Component = 'h1', label, variant = 'lg', color = 'neutral-800', isUppercase = false, style }) {
  const attr = {
    className: `text-${headingVariants[variant].size} font-${headingVariants[variant].weight} text-${color} font-accent ${isUppercase && 'uppercase'}`
  };

  if (style) {
    attr.style = style;
  }

  return (
    <Component {...attr}>{label}</Component>
  )
}

export default Heading