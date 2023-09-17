import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../actions/cartAction';
import CloseIcon from '@mui/icons-material/Close';

function CartItem({ product, image, name, quantity, price, stock }) {
  const dispatch = useDispatch();
  const [newQuantity, setNewQuantity] = useState(quantity);

  const increaseQuantity = () => {
    const newQty = newQuantity + 1;
    if (stock <= newQuantity) return;
    setNewQuantity(newQty);
    dispatch(addItemToCart(product, newQty));
  }

  const decreaseQuantity = () => {
    const newQty = newQuantity - 1;
    if (newQuantity <= 1) return;
    setNewQuantity(newQty);
    dispatch(addItemToCart(product, newQty));
  }

  const deleteCartItem = () => {
    dispatch(removeItemFromCart(product));
  }

  return (
    <tr className="max-sm:block">
      <td className="px-2 py-3 max-sm:block">
        <div className='relative aspect-square w-16 max-sm:mx-auto'>
          <img
            className="w-full h-full object-cover object-center"
            src={image}
            alt={name}
          />
          <button className='absolute -top-1 -right-1 w-4 aspect-square inline-grid place-items-center rounded-full bg-[#222] text-white' onClick={deleteCartItem}>
            <span className='sr-only'>Remove item from cart</span>
            <CloseIcon sx={{fontSize: '.75rem'}} />
          </button>
        </div>
      </td>
      <td className="px-2 font-semibold max-sm:block sm:py-3">{name}</td>
      <td className="px-2 max-sm:block sm:py-3">₹{price}</td>
      <td className="p-2 max-sm:block sm:py-3">
        <div className='flex w-full max-sm:justify-center lg:w-auto'>
          <button className='border text-[#333] p-1.5' onClick={decreaseQuantity}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          <span className='border-y text-lg font-semibold px-4 py-1.5'>{newQuantity}</span>
          <button className='border text-[#333] p-1.5' onClick={increaseQuantity}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-2 max-sm:block sm:py-3">₹{price * quantity}</td>
    </tr>
  )
}

export default CartItem