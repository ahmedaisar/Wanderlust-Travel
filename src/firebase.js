import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREABSE_API_KEY,
  authDomain: process.env.REACT_APP_FIREABSE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREABSE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREABSE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREABSE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREABSE_APP_ID,
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
