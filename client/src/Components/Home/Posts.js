import React from 'react';
// import CardHeader from './PostCard/CardHeader';
// import CardFooter from './PostCard/CardFooter';
// import CardBody from './PostCard/CardBody';
// import Comments from './Comments';
// import InputComment from './InputComment';
import PostCard from './PostCard/PostCard';
import { useSelector } from 'react-redux';

const Posts = () => {
    const {homePosts} = useSelector(state => state.post);
    
    return (
        <div className="posts"> 
            {
                homePosts.map(post => <PostCard post={post} />)
            }
        </div>
    )
}

export default Posts;