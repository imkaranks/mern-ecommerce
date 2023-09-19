import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO
} from '../constants/cartConstant';

export const cartReducer = (state={ cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existedItem = state.cartItems.find(
        item => item.product == newItem.product
      );
      if (existedItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            item => item.product === existedItem.product ? newItem : item
          )
        }
      }
      return {
        ...state,
        cartItems: [...state.cartItems, newItem]
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product !== action.payload
        )
      }
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      }
    default:
      return state;
  }
}