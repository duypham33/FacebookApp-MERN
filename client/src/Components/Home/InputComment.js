import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/commentActions';
import axios from 'axios';
import UserCard from '../UserCard';

const InputComment = ({children, post}) => {
    const [content, setContent] = useState('');
    const [tagging, setTagging] = useState(null);
    const [kw, setKw] = useState('');
    const [users, setUsers] = useState([]);
    const [tags, setTags] = useState([]);

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleInput = e => {
        const lastSymbol = content.length > 0 ? content.slice(-1) : '';
        setContent(e.target.value);

        if(e.nativeEvent.inputType === "deleteContentBackward" 
        && (lastSymbol === '@' || !e.target.value)){
            setTagging(null);
            setKw("");
            setUsers([]);
        }
    

        if(tagging !== null){
            if(content.length - tagging >= 10){
                setTagging(null);
                setKw("");
                setUsers([]);
            }
            else{
                const newKw = e.nativeEvent.data ? kw + e.nativeEvent.data : kw.slice(0, -1);
                
                if(newKw.trim()){
                    axios.get(`api/users/search/knowns?kw=${newKw}`).then(res => {
                        setUsers(res.data.users);
                    });
                }

                setKw(newKw);
            }
        }

        if(e.nativeEvent.data === '@'){
            axios.get(`api/users/search/knowns?kw=@`).then(res => {
                setUsers(res.data.users);
            });
            setTagging(e.target.value.length - 1);
            setKw("");
        }
            
        else if(e.nativeEvent.data === ' ' && lastSymbol === '@'){
            setTagging(null);
            setKw("");
            setUsers([]);
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!content.trim())
            return;
        
        const newComment = {
            content,
            likes: [],
            author: auth.user,
            createdAt: new Date().toISOString(),
        }
        
        dispatch(createComment(newComment, post, auth));
        setContent('');
        setTagging(null);
        setKw('');
        setTags([]);
    }

    return (
        <form className="card-footer comment_input search_form" onSubmit={handleSubmit} >
            {children}
            <input type="text" placeholder="Add your comments..."
            value={content} onChange={handleInput}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
            }} />

            <button type="submit" className="postBtn">
                Post
            </button>

            <div className="users">
                {
                    users.map((user, index) => (
                        <UserCard user={user} border="border" />
                    ))
                }
            </div>
        </form>
    )
}

export default InputComment;