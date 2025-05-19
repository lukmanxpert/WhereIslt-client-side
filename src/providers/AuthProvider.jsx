import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/axiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (name, photoUrl) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            setUser(user);
            const result = await axiosPublic.post("/jwt", user)
            setLoading(false);
        });
        return unsubscribe;
    }, [user]);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        googleLogin,
        registerUser,
        updateUser,
        signOutUser,
        signInUser
    }
    console.log(user);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;