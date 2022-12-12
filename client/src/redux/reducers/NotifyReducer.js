import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {};

const notifyReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBAL_TYPES.NOTIFY:
            return action.payload;
        default:
            return state;
    }
}


export default notifyReducer;