import { useEffect, useContext, useState } from "react";
// importing firebase functions and initialized database and authentication from the same file decreases complexity.
import {
    db,
    auth,
    app,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "../lib/FirebaseConfig"
import UserContext from '../context/User'

export const AuthContextProvider = ({ children }) => {
    // state storage currently logged user's object in state.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //main signup function takes email and password from the user and returns signed in user's object containing email, displayname and some other information.
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    // NOTE: sign up and adding the particular user's doc in database. and also search how to add custom id to the document.

    const setDisplayName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        }).catch((error) => {
            console.log(error.message);
        });
    }
    // firebase login main function
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    // firebase main function logouts the current user
    const logout = () => signOut(auth);
    // set the current user depending on current user using auth provider function of firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem('authUser', JSON.stringify(currentUser));
                console.log("LocalStorage Saved! currentUserData return by onAuthStateChanged " + JSON.stringify(currentUser));
                setUser(currentUser);
                setIsAuthenticated(true);
                console.log(`set user success` + JSON.stringify(currentUser))
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
                console.log('user is null means not authenticated' + JSON.stringify(currentUser))
            }
        })
        // unsubscribe function 
        return () => unsubscribe();
    }, [])

    // returning function's returned value to context provider so that can other files can have access to it.
    return (
        <UserContext.Provider value={{ isAuthenticated, createUser, user, setUser, logout, login, setDisplayName, db, app }}>
            {children}
        </UserContext.Provider>
    );
};
// function to extract Information returned/updated context.
export const useAuth = () => useContext(UserContext);