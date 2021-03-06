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

export const covertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch(error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

export default firebase;

export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    documentsToAdd.forEach(document => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, document);
    });
    return await batch.commit();
};
