import * as firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyB8hpQgdVS0Y-Ku2-ImttWndn2t1e96ML4",
    authDomain: "quick-learning-fe532.firebaseapp.com",
    databaseURL: "https://quick-learning-fe532.firebaseio.com",
    projectId: "quick-learning-fe532",
    storageBucket: "quick-learning-fe532.appspot.com",
    messagingSenderId: "52641490844",
    appId: "1:52641490844:web:198be079dde45768140a59",
    measurementId: "G-XF814FTKKP"
};


firebase.initializeApp(config);

export default firebase.database();