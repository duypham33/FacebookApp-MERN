import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {onCreate: false, onEdit: false};

const statusReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBAL_TYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default statusReducer;