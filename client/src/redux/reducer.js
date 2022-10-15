//import actions

const initialState = {
    categories: [],
};

const reducer = (state = initialState, action) =>{
    switch(action.type) {
        case "ALGO":{
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