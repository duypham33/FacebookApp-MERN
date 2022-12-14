import React from 'react';
import CardHeader from './PostCard/CardHeader';
import CardFooter from './PostCard/CardFooter';
import CardBody from './PostCard/CardBody';
import Comments from './Comments';
import InputComment from './InputComment';
import { useSelector } from 'react-redux';

const Posts = () => {
    const {homePosts} = useSelector(state => state.post);
    
    return (
        <div className="posts"> 
            {
                homePosts.map(post => (
                    <div key={post._id} className="card my-3">
                        <CardHeader post={post} />
                        <CardBody post={post} />
                        <CardFooter post={post} />
                        
                        <Comments post={post} />
                        <InputComment post={post} />
                    </div>
                ))
            }
        </div>
    )
}

export default Posts;