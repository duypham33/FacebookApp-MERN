import axios from 'axios';
import GLOBAL_TYPES from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import { logout } from './authActions';

export const updateProfileUser = ({user, avatar, auth}) => async dispatch => {
    dispatch({
        type: GLOBAL_TYPES.NOTIFY,
        payload: {loading: true}
    })
    
    let err = null;
    if(user.fullname.length === 0)
        err = 'You must enter a full name!';
    else if(user.fullname.length > 100)
        err = 'Your full name is too long!';
    else if(user.story.length > 200)
        err = 'Your story is too long!';
    if(err) {
        dispatch({
            type: GLOBAL_TYPES.NOTIFY,
            payload: {error: err}
        });
    }
    
    let media;

    if(avatar !== null) 
        media = await imageUpload([avatar]);

    const res = await axios.patch(`api/users/${auth.user._id}/update`,
        {...user, avatar: avatar ? media[0].url : auth.user.avatar}
    );

    if(res.status === 401)
        dispatch(logout("Please, login!"));
    else{
        dispatch({type: GLOBAL_TYPES.LOGIN, payload: {user: res.data.user}});
        dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {success: res.data.msg}});
        console.log(auth.user);
    }
}


// export const follow = ({auth, userID}) => dispatch => {
//     console.log(userID);
//     axios.patch(`api/users/${auth.user._id}/follow`, {targetID: userID}).then(res => {
//         //dispatch({type: GLOBAL_TYPES.LOGIN, payload: {user: res.data.user}});
//     });
// }

// export const unfollow = ({auth, user}) => dispatch => {
//     axios.patch(`api/users/${auth.user._id}/unfollow`, {targetID: user._id}).then(res => {
//         dispatch({type: GLOBAL_TYPES.LOGIN, payload: {user: res.data.user}});
//     })
// }

