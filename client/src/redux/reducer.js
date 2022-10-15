//import actions
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
            default: return state; 
        }
    }


export default reducer;