import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {};  //hashMap with key is user id

const onlineReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBAL_TYPES.ONLINE:
            return {...state, [action.payload]: true};
        case GLOBAL_TYPES.OFFLINE:
            if(state[action.payload])
                return {...state, [action.payload]: false};
            return state;
        default:
            return state;
    }
}


export default onlineReducer;