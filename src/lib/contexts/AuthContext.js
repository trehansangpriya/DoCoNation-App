import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { auth, provider } from '../config/firebaseConfig'
import { db } from './../config/firebaseConfig';

const AuthContext = React.createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [navOpen, setNavOpen] = useState(false)
    const [userLoading, setUserLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const [userData, setUserData] = useState()
    const [dococoins, setDococoins] = useState(0)
    const [loading, setLoading] = useState({
        text: 'Loading',
        status: false
    })
    const [showAlert, setShowAlert] = useState({
        variant: '',
        status: false,
        title: ''
    })
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            currentUser && db.collection('users').doc(currentUser.uid).onSnapshot(doc => {
                setUserData(doc.data())
                setUserLoading(false)
                return null
            })
            setTimeout(() => {
                !currentUser && setUserLoading(false)
            }, 1000)
        })
        currentUser && db.collection('transactions').where('user', '==', currentUser.email).onSnapshot(snapshot => {
            let credit = 0;
            let debit = 0;
            snapshot.forEach(doc => {
                if (doc.data().type === 'credit') {
                    credit += doc.data().amount
                }
                else if (doc.data().type === 'debit') {
                    debit += doc.data().amount
                }
            });
            let total = 0;
            total = credit - debit
            setDococoins(total)
        })
    }, [currentUser])
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const signInWithGoogle = () => {
        // return auth.signInWithPopup(provider)
        return auth.signInWithRedirect(provider)
    }
    const logOut = () => {
        setCurrentUser(null)
        setUserData(null)
        return auth.signOut()
    }
    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }
    const value = {
        navOpen,
        setNavOpen,
        currentUser,
        dococoins,
        setDococoins,
        userData,
        setUserData,
        signInWithGoogle,
        signup,
        login,
        logOut,
        forgotPassword,
        showAlert,
        setShowAlert,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {!userLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext