import React from 'react';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import CardBody from './CardBody';
import Comments from '../Comments';
import InputComment from '../InputComment';

const PostCard = ({post}) => {
    
    return (
        <div key={post._id} className="card my-3">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />
            
            <Comments post={post} />
            <InputComment post={post} />
        </div>
    )
}

export default PostCard;