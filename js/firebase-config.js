// Firebase Configuration Template
// Go to: https://console.firebase.google.com
// 1. Create a project
// 2. Enable Authentication (Email/Password)
// 3. Enable Firestore Database
// 4. Go to Project Settings > Your Apps > Web App
// 5. Copy your config and replace the values below

const firebaseConfig = {
    apiKey: "AIzaSyCbkGqomIrHXo-ei_u5mMxymrmvyRERIvw",
    authDomain: "online-academy-b127a.firebaseapp.com",
    projectId: "online-academy-b127a",
    storageBucket: "online-academy-b127a.firebasestorage.app",
    messagingSenderId: "93559735552",
    appId: "1:93559735552:web:1e15140cac19902d359fe5",
    measurementId: "G-PJYS2SBY3N"
};

// Initialize Firebase
let app, auth, db;

function initFirebase() {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        return { app, auth, db };
    }
    return null;
}

// Initialize on load
if (typeof firebase !== 'undefined') {
    initFirebase();
}