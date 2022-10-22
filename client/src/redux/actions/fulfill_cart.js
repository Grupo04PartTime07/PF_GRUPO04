export const FULFILL_CART = "FULFILL_CART";

export const fulfillCart = (cart) => {
    return { type: FULFILL_CART, payload: cart}
}