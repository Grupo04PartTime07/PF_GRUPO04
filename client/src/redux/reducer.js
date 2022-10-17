import { ORDER_BY_PRICE } from "./actions/order_price";
import { ORDER_BY_RATE } from "./actions/order_rate";
import { GET_ALL_PRODUCTS } from './actions/get_products';
import { GET_PRODUCT_DETAILS } from './actions/get_product_details';
import { CLEAN_PRODUCT_STATE } from './actions/clean_product_state';
import { GUEST_CREATE_ACCOUNT } from './actions/guest_create_account';
import { FILTER_BY_CATEGORY } from "./actions/filter_by_category";
import { GET_CATEGORIES } from './actions/get_categories'
import { ADD_TO_FAVORITE } from "./actions/add_to_favorite";
import { ADD_TO_CART } from "./actions/add_to_cart";
import { CREATE_CATEGORY } from "./actions/create_category";
import { NEW_PRODUCTS } from "./actions/new_products";

const initialState = {
    categories: [],
    products: [],
    productsaux: [],
    brand: [],
    productdetail: {},
    favorites: [],
    cart: [],
    message: ""

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsaux: action.payload
            }
        case GET_PRODUCT_DETAILS:
            return {
                ...state,
                productdetail: action.payload
            }
        case CLEAN_PRODUCT_STATE:
            return {
                ...state,
                productdetail: {}
            }
        case GUEST_CREATE_ACCOUNT:
            alert(action.payload)
            return {
                ...state,
                message: action.payload
            }
        case CREATE_CATEGORY:
            alert(action.payload)
            return {
                ...state,
                message: action.payload
                } 
        case NEW_PRODUCTS:
            //alert(action.payload)
            return {
                ...state,
                message: action.payload
                } 
        case ADD_TO_CART:
            let cartCopy = state.cart;
            let productExist = cartCopy.filter(e => e.name === action.payload.name)
            if (productExist.length > 0) {
                productExist[0].quantity = productExist[0].quantity + 1
                //console.log("productExist:",productExist)
                let newCartCopy = cartCopy.filter(e => e.name !== action.payload.name)
                //console.log("newCartCopy:", newCartCopy)
                let finalCart = newCartCopy.concat(productExist)
                //console.log("finalCart:",finalCart)
                return {
                    ...state,
                    cart: [...finalCart]
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }

            }
        case ADD_TO_FAVORITE:
            let favoritesCopy = state.favorites;
            let itemExist = favoritesCopy.filter(e => e.name === action.payload.name)
            //console.log(itemExist)
            if (itemExist.length > 0) {
                return {
                    ...state,
                    favorites: [...state.favorites]
                }
            } else {
                return {
                    ...state,
                    favorites: [...state.favorites, action.payload]
                }

            }
        case ORDER_BY_PRICE: {
            let ordered = [];
            if (action.payload === "asc") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.price > b.price) return 1
                    else if (b.price > a.price) return -1
                    else return 0
                })
                return { ...state, productsaux: ordered }
            } else if (action.payload === "desc") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.price > b.price) return -1
                    else if (b.price > a.price) return 1
                    else return 0
                })
                return { ...state, productsaux: ordered }
            }
            break;
        }
        case ORDER_BY_RATE: {
            let ordered = [];
            if (action.payload === "good") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.rate > b.rate) return 1
                    else if (b.rate > a.rate) return -1
                    else return 0
                })
                return { ...state, productsaux: ordered }
            } else if (action.payload === "bad") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.rate > b.rate) return -1
                    else if (b.rate > a.rate) return 1
                    else return 0
                })
                return { ...state, productsaux: ordered }
            }
            break;
        }
        case FILTER_BY_CATEGORY: {
            return {
                ...state,
                productsaux: action.payload
            }
        }
        case GET_CATEGORIES: {
            return {
                ...state,
                categories: action.payload
            }
        }
        case 'GET_NAME_PRODUCT':
            return {
                ...state,
                productsaux: action.payload
            }
        default: return state;
    }
}
export default reducer;