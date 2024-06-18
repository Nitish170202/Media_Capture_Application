// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBYrt_WziHQbV5HU097eVD2IxVSe7VcUuk",
  authDomain: "media-application-42d81.firebaseapp.com",
  projectId: "media-application-42d81",
  storageBucket: "media-application-42d81.appspot.com",
  messagingSenderId: "1062577066343",
  appId: "1:1062577066343:web:327cf305f949a7ae871fc2"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const storage = firebase.storage();
const firestore = firebase.firestore();

export { auth, firebase, firestore, storage };

