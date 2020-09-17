import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBjD0-tyX1tDaQM_RJoQKbgffnX9SB7Zqk",
    authDomain: "coconut-shell-d29b6.firebaseapp.com",
    databaseURL: "https://coconut-shell-d29b6.firebaseio.com",
    projectId: "coconut-shell-d29b6",
    storageBucket: "coconut-shell-d29b6.appspot.com",
    messagingSenderId: "98818609376",
    appId: "1:98818609376:web:8a2c79f80daeb7b4320085",
    measurementId: "G-5JJT394Q0M"
};
let app = Firebase.initializeApp(config);
export const db = app.database();

