import { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [openSignUp, setOpenSignUp] = useState(false); // État pour contrôler l'ouverture de la modal d'inscription
    const [openSignIn, setOpenSignIn] = useState(false); // État pour contrôler l'ouverture de la modal de connexion
    const [loading, setLoading] = useState(true);

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{
            user, signUp, openSignUp, setOpenSignUp, openSignIn, setOpenSignIn,
            signIn
        }}>
            {!loading && props.children}
        </UserContext.Provider>
    );
}
