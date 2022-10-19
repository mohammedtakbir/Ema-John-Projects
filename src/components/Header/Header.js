import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css'
const Header = () => {
    const { user, userSignOut } = useContext(AuthContext);

    //* Sign out an user
    const handleSignOut = () => {
        userSignOut()
            .then(() => { })
            .catch(err => console.error(err));
    }
    return (
        <nav className='header'>
            <Link to='/'>
                <img src={logo} alt="" />
            </Link>
            <div className='navLink'>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>

                {user?.uid ?
                    <Link onClick={handleSignOut} to="/login">Sign Out</Link> :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                }


                <span style={{ color: 'white', marginLeft: '10px' }}>{user?.email}</span>
            </div>
        </nav>
    );
};

export default Header;