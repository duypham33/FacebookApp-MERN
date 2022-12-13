import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
//import { follow, unfollow } from '../redux/actions/profileActions';
import GLOBAL_TYPES from '../redux/actions/globalTypes';
import axios from 'axios';

const FollowBtn = ({user, auth}) => {
    const [followed, setFollowed] = useState(false); 
    const dispatch = useDispatch();
    
    useEffect(() => {
        //console.log("I do");
        if(auth.user.following.find(item => item._id === user._id))
            setFollowed(true);
        else
            setFollowed(false);
    }, [user._id]);

    const handleFollow = () => {
        setFollowed(!followed);
        axios.patch(`api/users/${auth.user._id}/follow`, {targetID: user._id}).then(res => {
            dispatch({type: GLOBAL_TYPES.LOGIN, payload: {user: res.data.user}});
        });
    }

    const handleUnFollow = () => {
        setFollowed(!followed);
        axios.patch(`api/users/${auth.user._id}/unfollow`, {targetID: user._id}).then(res => {
            dispatch({type: GLOBAL_TYPES.LOGIN, payload: {user: res.data.user}});
        })
    }

    return (
        <>
        {
            followed
            ? <button className="btn btn-danger"
            onClick={handleUnFollow}>
                UnFollow
            </button>
            : <button className="btn btn-info"
            onClick={handleFollow}>
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn;