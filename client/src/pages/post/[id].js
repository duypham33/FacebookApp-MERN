import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { getPost } from '../../redux/actions/postAction'
import LoadIcon from '../../static/images/loading.gif';
import PostCard from '../../Components/Home/PostCard/PostCard';
import { logout } from '../../redux/actions/authActions';
import axios from 'axios';
import GLOBAL_TYPES from '../../redux/actions/globalTypes';

const Post = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    
    const {postDetail} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        console.log("I fet");
        axios.get(`api/posts/${id}`).then(res => {
            dispatch({
                type: GLOBAL_TYPES.UPDATE_POST_DETAIL,
                payload: res.data.post
            })
            setLoading(false);

        }).catch(err => {
            if(err.response.status === 401)
                dispatch(logout(err.response.data));
            else
                setLoading(false);
        });
        
    }, [id]);

    return (
        loading ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
        :
        <div className="posts">
            <PostCard post={postDetail} />
        </div>
    )
}

export default Post;