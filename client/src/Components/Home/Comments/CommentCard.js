import React, { useState, useEffect } from 'react';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LikeBtn from '../../LikeBtn';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu';
import { updateComment } from '../../../redux/actions/commentActions';
import InputComment from '../InputComment';


const CommentCard = ({children, comment, post}) => {
    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [readMore, setReadMore] = useState(false);

    const [onEdit, setOnEdit] = useState(false);
    const [isLike, setLike] = useState(false);

    const [onReply, setOnReply] = useState(false);


    useEffect(() => {
        setContent(comment.content);
        setLike(false);
        setOnReply(false);
        
        if(comment.likes.find(like => like._id === auth.user._id))
            setLike(true);
        
    },[comment, auth.user._id]);

    const handleUpdate = () => {
        if(comment.content !== content)
            dispatch(updateComment(comment, post, content, auth));
        
        setOnEdit(false);
    }


    const handleReply = () => {
        if(onReply) 
            return setOnReply(false);
        
        setOnReply(comment);
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    // const l = `<Link to={\`/profile/${comment.author._id}\`} className="d-flex text-dark">
    // @${comment.author.username} </Link> Hello everyone`;

    return (
        <div className="comment_card mt-2" style={styleCard}>
            <Link to={`/profile/${comment.author._id}`} className="d-flex text-dark">
                <Avatar src={comment.author.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.author.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill" 
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>
                    {
                        onEdit 
                        ? <textarea rows="5" value={content}
                        onChange={e => setContent(e.target.value)} />

                        : <div>
                            <span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content + ' ' : content.slice(0, 100) + '....'
                                }
                            </span>
                            {
                                content.length > 100 &&
                                <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                    {readMore ? 'Hide content' : 'Read more'}
                                </span>
                            }
                        </div>
                    }
                    

                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="font-weight-bold mr-3">
                            {comment.likes.length} {comment.likes.length > 1 ? 'likes' : 'like'}
                        </small>

                        {
                            onEdit
                            ? <>
                                <small className="font-weight-bold mr-3"
                                onClick={handleUpdate}>
                                    update
                                </small>
                                <small className="font-weight-bold mr-3"
                                onClick={() => {
                                    setOnEdit(false);
                                    setContent(comment.content);
                                    }}>
                                    cancel
                                </small>
                            </>

                            : <small className="font-weight-bold mr-3"
                            onClick={handleReply}>
                                {onReply ? 'cancel' :'reply'}
                            </small>
                        }
                        
                    </div>
                    
                </div>


                <div className="d-flex align-items-center mx-2" style={{cursor: 'pointer'}}>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                    <LikeBtn isLike={isLike} setLike={setLike} post={post} comment={comment} />
                </div>
            </div> 
            
            {
                onReply &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} />
            }

            {children}
        </div>
    )
}

export default CommentCard;