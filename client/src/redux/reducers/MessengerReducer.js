import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
    firstLoad: false
};

const messengerReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBAL_TYPES.ADD_USER:
            return {...state,
                data: [{_id: action.payload._id, messages: [], result: 0}, ...state.data], 
                users: [action.payload, ...state.users]};

        case GLOBAL_TYPES.ADD_MESSAGE:
            return {
                ...state,
                data: state.data.map(item => 
                    item._id === action.payload.peer._id
                    ? {
                        ...item,
                        messages: [...item.messages, action.payload.msg],
                        result: item.result + 1
                    }
                    : item
                ),
                users: updateToHead(state.users, action.payload.peer)
            }

        case GLOBAL_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                resultUsers: action.payload.resultUsers,
                users: action.payload.users
            }
        case GLOBAL_TYPES.GET_MESSAGES:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case GLOBAL_TYPES.DELETE_MESSAGE:
            return {
                ...state,
                data: state.data.map(item => 
                    item._id === action.payload._id
                    ? action.payload
                    : item
                )
            }
        case GLOBAL_TYPES.RESET_MESSENGER:
            return initialState;
        default:
            return state;
    }
}

const updateToHead = (users, updatedUser) => {
    const newData = users.filter(user => user._id !== updatedUser._id);
    newData.unshift(updatedUser);

    return newData;
}

export default messengerReducer;