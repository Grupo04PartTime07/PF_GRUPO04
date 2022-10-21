export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";

export const removeProductFromCart = (payload) => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload
        }}