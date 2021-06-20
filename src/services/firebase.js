import firebase from "firebase/app";
import "firebase/database";

var config = {
  apiKey: "AIzaSyDHiakBp7FrkJsaOiGCqM7CTDIhTnpyEwk",
  authDomain: "listosoftware.firebaseapp.com",
  databaseURL: "https://listosoftware-default-rtdb.firebaseio.com",
  projectId: "listosoftware",
  storageBucket: "listosoftware.appspot.com",
  messagingSenderId: "194384334024",
  appId: "1:194384334024:web:65ad72ac59a5ae8cffa9fd",
  measurementId: "G-48KX540D57"
};
firebase.initializeApp(config);
const database = firebase.database();
export default database;
