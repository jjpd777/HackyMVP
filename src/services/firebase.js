import firebase from "firebase/app";
import "firebase/database";

var config = {
  apiKey: "AIzaSyAcCtzvRGCUQJ4smMF14uKmelpYmGW6zTU",
  authDomain: "fir-finallyjuan.firebaseapp.com",
  databaseURL: "https://fir-finallyjuan.firebaseio.com",
  projectId: "firebasefinallyjuan",
  storageBucket: "firebasefinallyjuan.appspot.com",
  messagingSenderId: "33788123767",
  appId: "1:33788123767:web:2ef92fa41787d4c9810472"
};

firebase.initializeApp(config);
const database = firebase.database();
export default database;
