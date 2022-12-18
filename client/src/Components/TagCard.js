import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import {updateTags} from '../utils/handleTagUsers';

const TagCard = ({user, border, data}) => {
    const {content, setContent, tagging, setTagging, kw,
        setKw, setUsers, tags, setTags} = data;
    const handleTag = evt => {
        evt.preventDefault();
       
        setContent(content.slice(0, tagging + 1) + 
        user.username + ' ' + content.slice(tagging + kw.length + 1, content.length));

        updateTags(tags, tagging + user.username.length + 2, user.username.length + 1 - kw.length);
        
        
        setTags([...tags, {
            start: tagging, 
            end: tagging + user.username.length,
            userId: user._id
        }]);

        //
        setTagging(null);
        setKw("");
        setUsers([]);
    }
    
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link key={user._id} to={`#`} onClick={handleTag}
                className="d-flex align-items-center">
                    
                    <Avatar src={user.avatar} size="big-avatar" />

                    <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                        <span className="d-block">{user.username}</span>
                        <small style={{opacity: 0.7}}> {user.fullname} </small>
                    </div>
                </Link>
            </div>
            
        </div>
    )
}


export default TagCard;