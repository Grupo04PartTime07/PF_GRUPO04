import { ORDER_BY_PRICE } from "./action";

const initialState = {
    categories: [],
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case "ALGO":{
            break;
        }
        case ORDER_BY_PRICE:{
            let ordered = [];
            if(action.payload === "asc"){
                ordered = state.productaux.sort(function(a,b){
                    if(a.price > b.price) return 1
                    else if(b.price > a.price) return -1
                    else return 0
                  })
                  return {...state, productaux: ordered}
            }else if(action.payload === "desc"){
                ordered = state.productaux.sort(function(a,b){
                  if(a.price > b.price) return -1
                  else if(b.price > a.price) return 1
                  else return 0
                })
                return {...state, productaux: ordered}
              }
        }
        default: return state;
    }
}

export default reducer;