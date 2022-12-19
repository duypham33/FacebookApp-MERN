import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = null;

const peerReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBAL_TYPES.PEER:
            return action.payload;
        default:
            return state;
    }
}


export default peerReducer;