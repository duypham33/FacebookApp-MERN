import GLOBAL_TYPES from '../actions/globalTypes';

const initialState = {
    homePosts: [],
    result: 0,
    page: 0,
    myposts: []
};

const updateOneInPosts = (posts, updatedPost) => {
    const newData = posts.filter(post => post._id !== updatedPost._id);
    newData.unshift(updatedPost);

    return newData
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBAL_TYPES.CREATE_POST:
            return {
                homePosts: [action.payload, ...state.homePosts],
                page: state.page > 0 ? state.page : 2,
                result: state.result + 1,
                myposts: [action.payload, ...state.myposts]
            }
        case GLOBAL_TYPES.GET_POSTS:
            return {...action.payload, page: state.page > 0 ? state.page : 2}
        case GLOBAL_TYPES.UPDATE_POST:
            return {
                ...state,
                homePosts: updateOneInPosts(state.homePosts, action.payload),
                myposts: updateOneInPosts(state.myposts, action.payload)
            }
        case GLOBAL_TYPES.RESET_POSTS:
            return initialState;
        default:
            return state;
    }
}


export default postReducer;