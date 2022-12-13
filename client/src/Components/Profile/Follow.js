import React from 'react';
import UserCard from '../UserCard';
import FollowBtn from '../FollowBtn';
import { useSelector } from 'react-redux';


const Follow = ({users, showFollow, setShowFollow}) => {
    const auth  = useSelector(state => state.auth);
    
    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">
                    {showFollow === 'followers' ? 'Followers' : 'Following'}
                </h5>
                <hr/>
                
                <div className="follow_content">
                    {
                        users.map(user => (
                            <UserCard user={user} setShowFollow={setShowFollow} >
                                {
                                    auth.user._id !== user._id 
                                    ? 
                                    <FollowBtn user={user} auth={auth} />
                                    : 
                                    <>
                                        <button className="btn btn-info">
                                            Me
                                        </button>
                                    </>
                                }
                                
                            </UserCard>
                        ))
                    }
                </div>
                

                <div className="close" onClick={() => setShowFollow(null)}>
                    &times;
                </div>
                
            </div>
        </div>
    )
}

export default Follow;