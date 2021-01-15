import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBEP9qo8MPmZqeYDxFupfrMgGv4fRbUl6g",
  authDomain: "kiitproject-1f1e2.firebaseapp.com",
  databaseURL: "https://kiitproject-1f1e2-default-rtdb.firebaseio.com",
  projectId: "kiitproject-1f1e2",
  storageBucket: "kiitproject-1f1e2.appspot.com",
  messagingSenderId: "275432655979",
  appId: "1:275432655979:web:a9283b77d135fca636b52e",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
