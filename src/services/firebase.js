import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "AIzaSyAcCtzvRGCUQJ4smMF14uKmelpYmGW6zTU",
    authDomain: "fir-finallyjuan.firebaseapp.com",
    databaseURL: "https://fir-finallyjuan.firebaseio.com",
    projectId: "firebasefinallyjuan",
    storageBucket: "firebasefinallyjuan.appspot.com",
    messagingSenderId: "33788123767",
    appId: "1:33788123767:web:fd20df98a6aad97c810472"
  };


firebase.initializeApp(config);
const database = firebase.database();
export default database;
