import { ORDER_BY_PRICE } from "./actions/order_price";
import { ORDER_BY_RATE } from "./actions/order_rate";
import {GET_ALL_PRODUCTS} from './actions/get_products';
import {GET_PRODUCT_DETAILS} from './actions/get_product_details';
import {CLEAN_PRODUCT_STATE} from './actions/clean_product_state';
import {GUEST_CREATE_ACCOUNT} from './actions/guest_create_account';

const initialState = {
    categories: [],
    products: [],
    productsaux:[],
    productdetail: {},
    message:""
    
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
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
        case ORDER_BY_PRICE: {
            let ordered = [];
            if(action.payload === "asc"){
                ordered = state.productsaux.sort(function(a,b){
                    if(a.price > b.price) return 1
                    else if(b.price > a.price) return -1
                    else return 0
                  })
                  return {...state, productsaux: ordered}
            }else if(action.payload === "desc"){
                ordered = state.productsaux.sort(function(a,b){
                  if(a.price > b.price) return -1
                  else if(b.price > a.price) return 1
                  else return 0
                })
                return {...state, productsaux: ordered}
              }
              break;
        }
        case ORDER_BY_RATE:{
            let ordered = [];
            if(action.payload === "good"){
                ordered = state.productsaux.sort(function(a,b){
                    if(a.rate > b.rate) return 1
                    else if(b.rate > a.rate) return -1
                    else return 0
                  })
                  return {...state, productsaux: ordered}
            }else if(action.payload === "bad"){
                ordered = state.productsaux.sort(function(a,b){
                  if(a.rate > b.rate) return -1
                  else if(b.rate > a.rate) return 1
                  else return 0
                })
                return {...state, productsaux: ordered}
              }
              break;
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