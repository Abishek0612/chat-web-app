import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database' //(for storing user details in database)
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyD-KgyeLz_38qXukZPiikSolczbOJxvvGo",
    authDomain: "chatting-web-app-d0d4f.firebaseapp.com",
    databaseURL: "https://chatting-web-app-d0d4f-default-rtdb.firebaseio.com",
    projectId: "chatting-web-app-d0d4f",
    storageBucket: "chatting-web-app-d0d4f.appspot.com",
    messagingSenderId: "458411548650",
    appId: "1:458411548650:web:1fc72296e4be0d65e75c93",

};

const app = firebase.initializeApp(config);
export const auth = app.auth()
export const database = app.database();
export const storage = app.storage();
