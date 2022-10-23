export const FULFILL_WISH_LIST = "FULFILL_WISH_LIST";

export const fulfillWishList = (cart) => {
    return { type: FULFILL_WISH_LIST, payload: cart}
}