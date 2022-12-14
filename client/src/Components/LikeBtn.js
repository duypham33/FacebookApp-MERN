import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikePost, UnLikePost } from '../redux/actions/postActions';

const LikeBtn = ({isLike, setLike, post}) => {
    const dispatch = useDispatch();
    const {auth, theme} = useSelector(state => state);

    const handleLike = () => {
        dispatch(LikePost(post, auth));
        setLike(true);
    }

    const handleUnlike = () => {
        dispatch(UnLikePost(post, auth));
        setLike(false);
    }

    return (
        <>
            {
                isLike 
                ? <i className="fas fa-heart text-danger" onClick={handleUnlike}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                : <i className="far fa-heart" onClick={handleLike} />
            }
        </>
    )
}

export default LikeBtn;