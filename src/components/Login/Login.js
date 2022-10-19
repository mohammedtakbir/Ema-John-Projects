import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'

const Login = () => {
    const {userLogIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); 
    const from = location.state?.from?.pathname || "/";

    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        //* Login an user
        userLogIn(email, password)
        .then(res => {
            const user = res.user;
            form.reset();
            navigate(from, { replace: true });
            // navigate('/') //* navigate to the home page
            console.log(user);
        })
        .catch(err => console.error(err));
    }
    
    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handleLogIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <input type="submit" value="Login" className='btn-submit' />
            </form>
            <div  className='signUp-link'>
                <p>New to Ema-john? <Link to="/signup">Create New Account</Link></p>
            </div>
        </div>
    );
};

export default Login;