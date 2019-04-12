import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database"
import "firebase/storage"

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAJ0mfddRpvCUid6k-FQQP88P5h3HW9Bbw",
  authDomain: "tipping-board.firebaseapp.com",
  databaseURL: "https://tipping-board.firebaseio.com",
  projectId: "tipping-board",
  storageBucket: "tipping-board.appspot.com",
  messagingSenderId: "649287442721"
};
firebase.initializeApp(config);

export default firebase;