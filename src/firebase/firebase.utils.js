import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCezpAZpBnucsqw3zxUw7ntm9wrv4xWd5k",
    authDomain: "myshopdb-dafb8.firebaseapp.com",
    databaseURL: "https://myshopdb-dafb8.firebaseio.com",
    projectId: "myshopdb-dafb8",
    storageBucket: "myshopdb-dafb8.appspot.com",
    messagingSenderId: "1089321628297",
    appId: "1:1089321628297:web:3d54fab4af2f7ee9904c58",
    measurementId: "G-BGBJBYDFHC"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        );
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;