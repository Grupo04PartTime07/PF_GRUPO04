import { ORDER_BY_PRICE } from "./actions/order_price";
import { GET_ALL_PRODUCTS } from './actions/get_products';
import { ORDER_BY_RATE } from "./actions/order_rate";

const initialState = {
    categories: [],
    products: [],
    productsaux:[],
    product:{}
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsaux: action.payload
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
                product: action.payload
        }   
        default: return state;
    }
}
export default reducer;