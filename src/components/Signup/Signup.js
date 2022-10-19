import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Signup.css'
const Signup = () => {
    //* error message
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        
        //* Password validation
        if(password.length < 6) {
            setError('Password should be 6 at least character.');
            return;
        }   
        if(password !== confirm){
            setError('Password did not match');
            return;
        };

        //* create an user 
        createUser(email, password)
        .then(res => {
            const user = res.user;
            form.reset(); //* reset the form
            console.log(user);
        })
        .catch(err => console.error(err))
        


    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <p style={{color: 'red'}}>{error}</p>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" required/>
                </div>
                <input type="submit" value="Sign Up" className='btn-submit' />
            </form>
            <div  className='signUp-link'>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;