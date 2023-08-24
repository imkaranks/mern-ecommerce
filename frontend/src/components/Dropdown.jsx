import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Dropdown({ children, label }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='py-2 text-sm border-b'>
      <button
        className='w-full font-medium uppercase inline-flex justify-between items-center'
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span>{label}</span>
        {
          expanded
          ? <RemoveIcon />
          : <AddIcon />
        }
      </button>
      <div className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
        {children}
      </div>
    </div>
  )
}

export default Dropdown