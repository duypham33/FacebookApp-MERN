import {useState, useEffect} from 'react';
import Info from '../../Components/Profile/Info';
import Posts from '../../Components/Profile/Posts';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import LoadIcon from '../../static/images/loading.gif'; 

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {auth, post} = useSelector(state => state);
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        if(auth.user._id === id){
            setUserData(auth.user);
            setPosts(post.myposts);
            setLoading(false);
        }
            
        else{
            setLoading(true);
            //console.log("I fet");
            axios.get(`api/users/${id}`).then(res => {
                setUserData(res.data.user);
                setPosts(res.data.posts);
                setLoading(false);
            }).catch(err => {
                if(err.response.status === 401)
                    dispatch(logout(err.response.data));
            });
        }
    }, [id, auth.user, post.myposts]);


    return (
        loading ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        : <div className='profile'>
            <Info id={id} auth={auth} user={userData} />
            <Posts user={userData} posts={posts} />
        </div>
    )
}

export default Profile;