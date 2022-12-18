import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/commentActions';
import TagCard from '../TagCard';
import {handleInput} from '../../utils/handleTagUsers';
import Icons from '../Icons';

const InputComment = ({post, onReply, setOnReply}) => {
    const [content, setContent] = useState('');
    const [tagging, setTagging] = useState(null);
    const [kw, setKw] = useState('');
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);

    const { auth, theme, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const handleComment = e => {
        handleInput({e, content, setContent, tagging, setTagging, kw,
            setKw, setUsers, tags, setTags});
    }
    

    const handleSubmit = e => {
        e.preventDefault()
        if(!content.trim())
            return;
        
        const newComment = {
            author: auth.user,
            content,
            likes: [],
            tags: tags.filter(tag => tag.userId).map(tag => tag.userId),
            createdAt: new Date().toISOString(),
            postId: post._id,
            reply: onReply ? (onReply.reply ? onReply.reply : onReply._id) : null
        }
        
        dispatch(createComment(newComment, post, auth, socket));
        setContent('');
        setTagging(null);
        setKw('');
        setTags([]);

        setOnReply(false);
    }

    return (
        <form className="card-footer comment_input search_form" onSubmit={handleSubmit} >
            <input type="text" placeholder="Add your comments..."
            value={content} onChange={handleComment}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
            }} />

            <Icons setContent={setContent} content={content} theme={theme} />

            <button type="submit" className="postBtn">
                Post
            </button>

            <div className="users">
                {
                    users.map(user => (
                        <TagCard user={user} border="border" 
                        data={{content, setContent, tagging, setTagging, kw,
                            setKw, setUsers, tags, setTags}} />
                    ))
                }
            </div>
        </form>
    )
}

export default InputComment;