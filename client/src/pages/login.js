import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/actions/authActions';


const Login = () => {
    const initialState = {email: "", password: ""};
    const [userInput, setUserInput] = useState(initialState);
    const [typePass, setTypePass] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const nav = useNavigate();

    useEffect(() => { 
        if(auth.user)
            nav("/");
        
    }, [auth]);

    const handleChangeInput = (evt) => {
        setUserInput({...userInput, [evt.target.name]: evt.target.value});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(login(userInput));
    }


    return (
         <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Facebook</h3>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={userInput.email} />
                    
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" }
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={userInput.password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                   
                </div>
                
                <button type="submit" className="btn btn-dark w-100"
                disabled={userInput.email && userInput.password ? false : true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? 
                    <Link to="/register" style={{color: "crimson", marginLeft: 20}}>
                        Register Now
                    </Link>
                </p>
            </form>
        </div>
    )
}


export default Login;