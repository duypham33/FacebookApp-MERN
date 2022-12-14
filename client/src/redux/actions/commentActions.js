import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { logout } from './authActions';

export const createComment = (newComment, post, auth) => async dispatch => {
    dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {loading: true}})
    
    
}
