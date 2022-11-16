// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW-J97YF1kroaSqNJt7hNAWCqqQQ6ARsQ",
  authDomain: "imageupload-29e41.firebaseapp.com",
  projectId: "imageupload-29e41",
  storageBucket: "imageupload-29e41.appspot.com",
  messagingSenderId: "465159080995",
  appId: "1:465159080995:web:d7bdfe1b7ba911f2b63596",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

