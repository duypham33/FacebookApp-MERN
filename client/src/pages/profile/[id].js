import {useState, useEffect} from 'react';
import Info from '../../Components/Profile/Info';
import Posts from '../../Components/Profile/Posts';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const {id} = useParams();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        if(auth.user._id === id)
            setUserData(auth.user);
        else{
            console.log("I fet");
            axios.get(`api/users/${id}`).then(res => {
                setUserData(res.data.user);
                
            }).catch(err => {
                if(err.response.status === 401)
                    dispatch(logout(err.response.data));
            });
        }
    }, [id, auth.user]);


    return (
        <div className='profile'>
            <Info id={id} auth={auth} user={userData} />
            <Posts />
        </div>
    )
}

export default Profile;