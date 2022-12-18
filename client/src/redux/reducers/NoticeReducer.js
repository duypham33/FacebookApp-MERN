import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {
    loading: false,
    data: [],
    sound: false
};

const noticeReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBAL_TYPES.GET_NOTICES:
            return {...state, data: action.payload};
        case GLOBAL_TYPES.CREATE_NOTICE:
            return {...state, data: [action.payload, ...state.data]}
        case GLOBAL_TYPES.UPDATE_SOUND:
            return {...state, sound: action.payload}
        default:
            return state;
    }
}


export default noticeReducer;