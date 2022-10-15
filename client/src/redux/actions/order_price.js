export const ORDER_BY_PRICE = "ORDER_BY_PRICE";


export const orderByPrice = (order) =>{
    return { type: ORDER_BY_PRICE, payload: order}
}
