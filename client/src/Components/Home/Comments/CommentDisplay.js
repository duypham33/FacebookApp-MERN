import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({comment, post, replyCm}) => {
    const [showRep, setShowRep] = useState([]);
    const [next, setNext] = useState(1);

    useEffect(() => {
        setShowRep(replyCm.slice(next <= replyCm.length ? replyCm.length - next : 0));
    },[replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} >
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                            key={index}
                            comment={item}
                            post={post}
                             />
                        ))
                    }

                    {
                        next < replyCm.length
                        ? <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(next + 5)}>
                            See more comments...
                        </div>

                        : replyCm.length > 1 &&
                        <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(1)}>
                            Hide comments...
                        </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay;