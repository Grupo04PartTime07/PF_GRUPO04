export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";

export const removeOneFromCart = (payload) => {
    return {
        type: REMOVE_ONE_FROM_CART,
        payload
        }}