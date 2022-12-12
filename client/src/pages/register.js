import {useState, useEffect} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../redux/actions/authActions';
import GLOBAL_TYPES from '../redux/actions/globalTypes';

const checkInput = userInput => {
    const {fullname, username, email, password, cf_password, gender} = userInput;
    if(fullname.length < 1 || username.length < 1 
        || email.length < 1 || password.length < 1 || cf_password.length < 1)
        return 0;
    
    return password === cf_password ? 1 : -1;
}


const Register = () => {
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);
    const [userInput, setUserInput] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        cf_password: '',
        gender: "male"
    })
    const {fullname, username, email, password, cf_password} = userInput;
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const nav = useNavigate();

    useEffect(() => {
        if(state.auth.user)
            nav("/");
        else if(state.notify.success)
            nav("/login");
    });

    
    const handleChangeInput = evt => {
        setUserInput({...userInput, [evt.target.name]: evt.target.value});
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        
        const check = checkInput(userInput);
        if(check === 1)
            dispatch(register(userInput));
        else if(check === -1)
            dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {error: "Confirm password does not match!"}});
        else
            dispatch({type: GLOBAL_TYPES.NOTIFY, payload: {error: "You must fill all fields!"}});
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Facebook</h3>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="fullname"
                    onChange={handleChangeInput} value={fullname}
                    style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" className="form-control" id="username" name="username"
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                    style={{background: `${alert.username ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.username ? alert.username : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={email}
                    style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password"
                        style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">
                        
                        <input type={ typeCfPass ? "text" : "password" } 
                        className="form-control" id="cf_password"
                        onChange={handleChangeInput} value={cf_password} name="cf_password"
                        style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ''}
                    </small>
                </div>

                <div className="row justify-content-between mx-0 mb-1">
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender"
                        value="male" defaultChecked onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender"
                        value="female" onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="other">
                        Other: <input type="radio" id="other" name="gender"
                        value="other" onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Register
                </button>

                <p className="my-2">
                    Already have an account? 
                    <Link to="/login" style={{color: "crimson", marginLeft: 20}}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}


export default Register;