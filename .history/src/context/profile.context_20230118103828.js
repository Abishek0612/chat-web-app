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
        let userStatusRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                userStatusRef = database.ref(`/status/${authObj.uid}`);
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snap) => {
                    const { name, createdAt, avatar } = snap.val();
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
                });


                database.ref('.info/connected').on('value', function (snapshot) => {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() === false) {
        return;
    };

   
    userStatusRef.onDisconnect().set(isOfflineForDatabase).then( () => {
      
        userStatusRef.set(isOnlineForDatabase);
    });
});


            } else {

    if (userRef) {
        userRef.off()
    }

    if(userStatusRef){
        userStatusRef.off()
    }
    
    if(userStatusRef){
        userStatusRef.off()
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
