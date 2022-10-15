import { ORDER_BY_PRICE } from "./action";
import {GET_ALL_PRODUCTS} from './action.js';




const initialState = {
    categories: [],
    products: [],
    productsaux:[]
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsaux: action.payload
            }
        case ORDER_BY_PRICE:{
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
        }
        default: return state;
    }


export default reducer;