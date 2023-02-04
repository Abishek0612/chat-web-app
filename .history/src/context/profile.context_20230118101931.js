// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";



// or online.
const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let userRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snap) => {
                    const { name, createdAt , avatar} = snap.val();
                    // console.log('profileData', profileData)
                    const data = {
                        name,
                        createdAt,
                        avatar,
                        uid: authObj.uid,
                        email: authObj.email
                    }
                    setProfile(data)
                    setIsLoading(false);
                })

            } else {

                if (userRef) {
                    userRef.off()
                }
                setProfile(null)
                setIsLoading(false)
            }
        });

        return () => {
            authUnsub();

            if (userRef) {
                userRef.off();
            }
        }
    }, [])

    return <ProfileContext.Provider value={{ isLoading, profile }} >
        {children}
    </ProfileContext.Provider>
}
export const useProfile = () => useContext(ProfileContext);
