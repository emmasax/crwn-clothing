import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVyEAz-PWCF0AwfGOeC8IHN_AX6RQu4zk",
    authDomain: "crwn-db-61b4e.firebaseapp.com",
    projectId: "crwn-db-61b4e",
    storageBucket: "crwn-db-61b4e.appspot.com",
    messagingSenderId: "729672152605",
    appId: "1:729672152605:web:7115197ab30727b98bb8f4",
    measurementId: "G-YL9MNC5NF8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;