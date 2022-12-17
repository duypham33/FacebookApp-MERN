import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentMenu = ({post, comment, setOnEdit}) => {

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="menu">
            {
                comment.author._id === auth.user._id && 
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                            <span className="material-icons">create</span> Edit
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu;