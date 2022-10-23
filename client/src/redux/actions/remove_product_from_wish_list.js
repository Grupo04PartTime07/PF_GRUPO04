export const REMOVE_PRODUCT_FROM_WISH_LIST = "REMOVE_PRODUCT_FROM_WISH_LIST";

export const removeProductFromWishList = (payload) => {
    return {
        type: REMOVE_PRODUCT_FROM_WISH_LIST,
        payload
        }}