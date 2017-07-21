import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAUeWGgirAJOOtsp00_KvkD3jcPm1TSVJk",
    authDomain: "test-a5bb9.firebaseapp.com",
    databaseURL: "https://test-a5bb9.firebaseio.com",
    projectId: "test-a5bb9",
    storageBucket: "test-a5bb9.appspot.com",
    messagingSenderId: "618369880452"
};
var fire = firebase.initializeApp(config);
export default fire;