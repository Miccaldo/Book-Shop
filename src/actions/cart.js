const SET_CART = 'SET_CART';
const SET_MERGED_PRODUCTS = 'SET_MERGED_PRODUCTS';

const setCart = (value) => ({type: SET_CART, value});
const setMergedProducts = (value) => ({type: SET_MERGED_PRODUCTS, value});

export {
    SET_CART,
    SET_MERGED_PRODUCTS,
    setCart,
    setMergedProducts
}
