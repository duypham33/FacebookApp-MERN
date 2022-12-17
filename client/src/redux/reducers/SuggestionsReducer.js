import GLOBAL_TYPES from '../actions/globalTypes';

const initialState = {
    loading: true,
    users: []
};

const suggestionReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBAL_TYPES.LOAD_SUGGESTIONS:
            return {...state, loading: action.payload}
        case GLOBAL_TYPES.SUGGESTIONS:
            return {...state, users: action.payload};
        default:
            return state;
    }
}


export default suggestionReducer;