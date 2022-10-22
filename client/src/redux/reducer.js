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
import { CREATE_NEW_PRODUCTS } from "./actions/create_new_products";
import { GET_BRANDS } from './actions/get_brands'
import { FILTER_BY_BRAND } from "./actions/filter_by_brand";
import { CLEAN_PRODUCTS } from "./actions/clean_products";
import { UPDATE_PRODUCT } from "./actions/update_product";
import { REMOVE_PRODUCT_FROM_CART} from "./actions/remove_product_from_cart";
import { ADD_ONE_TO_CART} from "./actions/add_one_to_cart";
import { REMOVE_ONE_FROM_CART} from "./actions/remove_one_from_cart";
import { DELETE_CART} from "./actions/delete_cart";
import { GET_CART} from "./actions/get_cart";


const initialState = {
    categories: [],
    products: [],
    productsaux: [],
    brand: [],
    productdetail: {},
    favorites: [],
    cart: [],
    account:[],
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
        case CLEAN_PRODUCTS:
            return {
                ...state,
                productsaux: {}
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
        case CREATE_NEW_PRODUCTS:
            //alert(action.payload)
            return {
                ...state,
                message: action.payload
                }
        case UPDATE_PRODUCT:
            alert(action.payload)
            return {
                ...state,
                message: action.payload
                }
        case ADD_TO_CART:
            let cartCopy = state.cart;
            let itemFound = cartCopy.find(item => item.id === action.payload.id)
            return itemFound?
            {
             ...state,
             cart: cartCopy.map(item => item.id === action.payload.id?{...item, quantity: item.quantity + 1} : item)
            }:{
            ...state,
            cart:[...state.cart, action.payload]
             }
        case GET_CART:
                return {
                    ...state,
                    cart: [...state.cart]
                    }    
        case REMOVE_PRODUCT_FROM_CART:
                let cartCopyTwoo = state.cart;
                let cartFiltered = cartCopyTwoo.filter(e => e.id !== action.payload)
                console.log(action.payload, cartFiltered)
                return {
                    ...state,
                    cart: [...cartFiltered]
                    }
        case ADD_ONE_TO_CART:
            let cartCopyThree = state.cart;
            for(let i=0; i<cartCopyThree.length; i++){
            if(cartCopyThree[i].id === action.payload ){
                cartCopyThree[i].quantity = cartCopyThree[i].quantity + 1
                }else{
                cartCopyThree[i].quantity = cartCopyThree[i].quantity
                } }
                return {
                    ...state,
                    cart: [...cartCopyThree]
                    }     
        case REMOVE_ONE_FROM_CART:
                let cartCopyFour = state.cart;
                for(let i=0; i<cartCopyFour.length; i++){
                if(cartCopyFour[i].id === action.payload && cartCopyFour[i].quantity > 1 ){
                    cartCopyFour[i].quantity = cartCopyFour[i].quantity - 1
                }else{
                    cartCopyFour[i].quantity = cartCopyFour[i].quantity
                }}
                return {
                    ...state,
                    cart: [...cartCopyFour]
                    }         
        case DELETE_CART:
                return {
                    ...state,
                    cart: []
                    }           
        case ADD_TO_FAVORITE:
            let favoritesCopy = state.favorites;
            let itemExist = favoritesCopy.filter(e => e.name === action.payload.name)
            if (itemExist.length > 0) {
                let newfav = favoritesCopy.filter(e => e.name !== action.payload.name)
                return {
                    ...state,
                    favorites: newfav
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
            if (action.payload === "bad") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.score > b.score) return 1
                    else if (b.score > a.score) return -1
                    else return 0
                })
                return { ...state, productsaux: ordered }
            } else if (action.payload === "good") {
                ordered = state.productsaux.sort(function (a, b) {
                    if (a.score > b.score) return -1
                    else if (b.score > a.score) return 1
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
        case FILTER_BY_BRAND: {
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
        case GET_BRANDS: {
            return {
                ...state,
                brand: action.payload
            }
        }
        case 'GET_NAME_PRODUCT':
            return {
                ...state,
                products: action.payload
            }
        default: return state;
    }
}
export default reducer;
