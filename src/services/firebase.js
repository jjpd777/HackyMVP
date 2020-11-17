import firebase from "firebase/app";
import "firebase/database";

var config = {
  apiKey: "AIzaSyCuV-6VJ0OogUPSfAt4_52pZgwVT8RBRAY",
  authDomain: "getfitbakery.firebaseapp.com",
  databaseURL: "https://getfitbakery.firebaseio.com",
  projectId: "getfitbakery",
  storageBucket: "getfitbakery.appspot.com",
  messagingSenderId: "627159302111",
  appId: "1:627159302111:web:4dece0e9feba7379184e6a"
};


firebase.initializeApp(config);
const database = firebase.database();
export default database;
