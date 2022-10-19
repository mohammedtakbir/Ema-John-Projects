import React from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext(); 
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //* Create an user
    //? email & password diye jokhn createUser function call kora hobe, tokhn auth, email, password diye friebase e user create hobe createUserWithEmailAndPassword() er maddhome
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //* login an user
    const userLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //* Sign out an user
    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    //* get the currently Sign-in user
    useEffect(() => {
        const unSubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);


    const authInfo = { user, createUser, userLogIn, userSignOut, loading };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;