// Firebase Configuration Template
// Go to: https://console.firebase.google.com
// 1. Create a project
// 2. Enable Authentication (Email/Password)
// 3. Enable Firestore Database
// 4. Go to Project Settings > Your Apps > Web App
// 5. Copy your config and replace the values below

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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