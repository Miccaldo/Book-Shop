import { SET_CART, SET_MERGED_PRODUCTS } from '../actions/cart';

const initialState = {
  cart: [],
  merged_products: []
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.value
    };
    case SET_MERGED_PRODUCTS:
      return {
        ...state,
        merged_products: action.value
    };
    default:
      return state;
  }
}
