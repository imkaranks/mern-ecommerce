import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Dropdown({ options, onOptionSelect, label, children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='py-2 text-sm border-b'>
      <button
        className='w-full font-medium font-accent uppercase inline-flex justify-between items-center'
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span>{label}</span>
        {expanded ? <RemoveIcon /> : <AddIcon />}
      </button>
      <div className={`grid ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
        {
          children || (
            <ul className='text-gray-600 font-normal overflow-hidden capitalize'>
              {
                options.map((option, i) => (
                  <li
                    key={i}
                    className='px-4 py-1 cursor-pointer transition-colors duration-300 hover:rounded-full hover:bg-[whitesmoke]'
                    onClick={(e) => onOptionSelect(option)}
                  >
                    {option}
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default Dropdown;