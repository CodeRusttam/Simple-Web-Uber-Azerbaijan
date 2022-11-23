import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDUyUb3lMBNib1j4YUHXsJJHs1N99nIoqI",
  authDomain: "web-uber-azerbaijan.firebaseapp.com",
  projectId: "web-uber-azerbaijan",
  storageBucket: "web-uber-azerbaijan.appspot.com",
  messagingSenderId: "806991848628",
  appId: "1:806991848628:web:cb82ded1b39102a28163e1"
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth()
export { app, provider, auth }