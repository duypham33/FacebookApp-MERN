import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import axios from 'axios';
//import GLOBAL_TYPES from '../../redux/actions/globalTypes';
import LoadIcon from '../../static/images/loading.gif';
//import {Link} from 'react-router-dom';
import UserCard from '../UserCard';

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if(search.length > 1){
            setLoad(true);
            axios.get(`api/users/search?kw=${search}`).then(res => {
                setUsers(res.data.users);
                setLoad(false);
            }).catch(err => {
                if(err.response.status === 401)
                    dispatch(logout(err.response.data));
                //console.log(err);
            });
        } 
        else
            setUsers([]);
        

    }, [search]);


    const handleSearch = evt => {
        evt.preventDefault();
        
    }

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input type="text" name="search" value={search} id="search" title="Enter to Search"
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />

            <div className="search_icon" style={{opacity: search ? 0 : 0.3}}>
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div>
        
            <div className="close_search" style={{opacity: users.length === 0 ? 0 : 1}}
             onClick={handleClose}>
                &times;
            </div>

            {/* <button type="submit" style={{display: 'none'}}>Search</button> */}

            { load && <img className="loading" src={LoadIcon} alt="loading"  /> }

            {/* <div className="users">
                {
                    search && users.map(user => (
                        <UserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                        handleClose={handleClose} 
                        />
                    ))
                }
            </div>   */}
            <div className="users">
                {
                    users.map((user, index) => (
                        <UserCard user={user} border="border" handleClose={handleClose}  />
                    ))
                }
            </div>
        </form>
    )
}

export default Search;