export const ADD_ONE_TO_CART = "ADD_ONE_TO_CART";

export const addOneToCart = (payload) => {
    console.log("Payload:",payload)
    return {
        type: ADD_ONE_TO_CART,
        payload
        }}  