import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikePost, UnLikePost } from '../redux/actions/postActions';
import { likeComment, unlikeComment } from '../redux/actions/commentActions';

const LikeBtn = ({isLike, setLike, post, comment}) => {
    const dispatch = useDispatch();
    const {auth, theme, socket} = useSelector(state => state);

    const handleLike = () => {
        if(!comment)
            dispatch(LikePost(post, auth, socket));
        else
            dispatch(likeComment(post, comment, auth, socket));
        setLike(true);
    }

    const handleUnlike = () => {
        if(!comment)
            dispatch(UnLikePost(post, auth, socket));
        else
            dispatch(unlikeComment(post, comment, auth, socket));
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