import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAsAULalU6HnuBhnfGeSrNPFwJTgPgNNdI",
    authDomain: "discord-clone-8077e.firebaseapp.com",
    projectId: "discord-clone-8077e",
    storageBucket: "discord-clone-8077e.appspot.com",
    messagingSenderId: "835528090668",
    appId: "1:835528090668:web:c7ca11935bd28493e21d89"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);     //Set app up
const db = firebaseApp.firestore();                             // store firestore in DB variable

const auth = firebase.auth();                                   
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
