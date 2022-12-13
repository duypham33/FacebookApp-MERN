import { useState } from 'react';
import React from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Follow from './Follow';
//import GLOBAL_TYPES from '../../redux/actions/globalTypes';

const Info = ({id, auth, user}) => {
    const [onEdit, setOnEdit] = useState(false);
    const numFollowers = user.followers ? user.followers.length : 0;
    const [showFollow, setShowFollow] = useState(null);
    
    return (
        <div className="info">
            <div className="info_container" key={user._id}>
                <Avatar src={user.avatar} size="supper-avatar"  />

                <div className="info_content">
                    <div className="info_content_title">
                        <h2>{user.username}</h2>
                        
                        {
                            user._id === auth.user._id
                            ?  <button className="btn btn-outline-info"
                            onClick={() => setOnEdit(true)}>
                                Edit Profile
                            </button>
                            
                            : <FollowBtn user={user} auth={auth} />
                        }
                        
                        
                    </div>

                    <div className="follow_btn">
                        <span className="mr-4" onClick={() => setShowFollow("followers")}>
                            {numFollowers} {numFollowers > 1 ? 'Followers' : 'Follower'}
                        </span>
                        <span className="ml-4" onClick={() => setShowFollow("following")}>
                            {user.following ? user.following.length : 0} Following
                        </span>
                    </div>
                    
                    <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                    <p className="m-0">{user.address}</p>
                    <h6 className="m-0">{user.email}</h6>
                    <a href={user.website} target="_blank" rel="noreferrer">
                        {user.website}
                    </a>
                    <p>{user.story}</p>
                </div>

                {
                    onEdit && <EditProfile setOnEdit={setOnEdit} />
                }

                {
                    showFollow &&
                    <Follow 
                    users={showFollow === 'followers' ? user.followers : user.following}
                    showFollow={showFollow} 
                    setShowFollow={setShowFollow} 
                    />
                }

                {/* {
                    showFollowers &&
                    <Followers 
                    users={user.followers} 
                    setShowFollowers={setShowFollowers} 
                    />
                }
                {
                    showFollowing &&
                    <Following 
                    users={user.following} 
                    setShowFollowing={setShowFollowing} 
                    />
                } */}
            </div>
        </div>
    )
}

export default Info;