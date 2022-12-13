import React from 'react';
import Avatar from '../Avatar';
import { useSelector, useDispatch } from 'react-redux';
import GLOBAL_TYPES from '../../redux/actions/globalTypes';

const Status = () => {
    const {auth, status}  = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user.avatar} size="big-avatar" />
            
            <button className="statusBtn flex-fill"
            onClick={() => dispatch({ type: GLOBAL_TYPES.STATUS, payload: {...status, onCreate: true} })}>
                {auth.user.username}, what are you thinking? Let's share with everyone!
            </button>
        </div>
    )
}

export default Status;