// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZFHoXCI4auXNjeUN6QQNRNs4kDf4sMQc",
  authDomain: "petshop-de025.firebaseapp.com",
  projectId: "petshop-de025",
  storageBucket: "petshop-de025.appspot.com",
  messagingSenderId: "544244791518",
  appId: "1:544244791518:web:2154459632452dd5bcea4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth();

export { auth, storage };