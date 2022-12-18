import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../UserCard';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import GLOBALTYPES from '../../redux/actions/globalTypes';
import { useParams, useNavigate } from 'react-router-dom';
import { addUser, getConversations } from '../../redux/actions/messageActions';
import axios from 'axios';
import { logout } from '../../redux/actions/authActions';

const LeftSide = () => {
    const { auth, message, online } = useSelector(state => state);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);

    const nav = useNavigate();
    const { id } = useParams();

    const pageEnd = useRef();
    const [page, setPage] = useState(0);

    //Search users
    useEffect(() => {
        if(search.length > 1){
            axios.get(`api/users/search?kw=${search}`).then(res => {
                setSearchUsers(res.data.users);
            
            }).catch(err => {
                if(err.response.status === 401)
                    dispatch(logout(err.response.data));
                //console.log(err);
            });
        } 
        else
            setSearchUsers([]);
    }, [search]);


    const handleSearch = evt => {
        evt.preventDefault();
    }

    const handleAddUser = user => {
        setSearch('');
        setSearchUsers([]);
        dispatch(addUser(user, message));
        
        return nav(`/message/${user._id}`);
    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

    useEffect(() => {
        if(message.firstLoad) 
            return;

        dispatch(getConversations({auth}));

    }, [auth, message.firstLoad]);

    // Load More
    // useEffect(() => {
    //     const observer = new IntersectionObserver(entries => {
    //         if(entries[0].isIntersecting){
    //             setPage(p => p + 1)
    //         }
    //     },{
    //         threshold: 0.1
    //     })

    //     observer.observe(pageEnd.current)
    // }, [setPage]);

    // useEffect(() => {
    //     if(message.resultUsers >= (page - 1) * 9 && page > 1)
    //         dispatch(getConversations({auth, page}));
        
    // }, [message.resultUsers, page, auth, dispatch]);
    

    return (
        <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{display: 'none'}}>Search</button>
            </form>

            <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <Card user={user} msg={true}>
                                        {
                                            online[user._id] === true
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />
                                                
                                        }
                                        
                                    </Card>
                                </div>
                            ))
                        }
                    </>
                }
               
               <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
            </div>
        </>
    )
}

export default LeftSide;