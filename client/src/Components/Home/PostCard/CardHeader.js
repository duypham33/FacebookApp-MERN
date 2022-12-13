import React from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import GLOBAL_TYPES from '../../../redux/actions/globalTypes';
// import { deletePost } from '../../../redux/actions/postAction'
// import { BASE_URL } from '../../../utils/config'

const CardHeader = ({post}) => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();


    const handleEditPost = () => {
        dispatch({ type: GLOBAL_TYPES.STATUS, payload: {...post, onEdit: true}});
    }


    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.author.avatar} size="big-avatar" />

                <div className="card_name ml-3">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.author._id}`} className="text-dark">
                            {post.author.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.updatedAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user._id === post.author._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edit Post
                            </div>
                            <div className="dropdown-item">
                                <span className="material-icons">delete_outline</span> Remove Post
                            </div>
                        </>
                    }

                    <div className="dropdown-item">
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader;