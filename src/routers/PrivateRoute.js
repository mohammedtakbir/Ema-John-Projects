import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => { //? PrivateRoute er vitore je children component thakbe user authentication chara oi children component render hobe na
    const { user } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location)
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <p style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold' }}>Loading....................</p>
    }
    if (user && user?.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate> //? useLocation returns the current location object
};

export default PrivateRoute;    