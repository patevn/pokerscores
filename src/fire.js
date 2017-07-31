import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCUSfD9fEfYwY7kU6fN0eqkr4BwaKRRIBA",
    authDomain: "pokerscores-b2b64.firebaseapp.com",
    databaseURL: "https://pokerscores-b2b64.firebaseio.com",
    projectId: "pokerscores-b2b64",
    storageBucket: "pokerscores-b2b64.appspot.com",
    messagingSenderId: "252699613928"
};
var fire = firebase.initializeApp(config);
export default fire;