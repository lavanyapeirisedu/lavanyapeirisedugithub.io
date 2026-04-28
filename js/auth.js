// Authentication and Database Functions

function registerUser(email, password, userData) {
    return new Promise((resolve, reject) => {
        if (!auth || !db) {
            reject(new Error('Firebase not initialized'));
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                const studentData = {
                    uid: user.uid,
                    email: user.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    course: userData.course,
                    age: userData.age,
                    examYear: userData.examYear,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                db.collection('students').doc(user.uid).set(studentData)
                    .then(() => {
                        localStorage.setItem('user', JSON.stringify({
                            uid: user.uid,
                            email: user.email,
                            ...userData
                        }));
                        resolve(user);
                    })
                    .catch((error) => {
                        user.delete();
                        reject(error);
                    });
            })
            .catch(reject);
    });
}

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        if (!auth || !db) {
            reject(new Error('Firebase not initialized'));
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                db.collection('students').doc(user.uid).get()
                    .then((doc) => {
                        if (doc.exists) {
                            const userData = doc.data();
                            localStorage.setItem('user', JSON.stringify(userData));
                            resolve(userData);
                        } else {
                            localStorage.setItem('user', JSON.stringify({
                                uid: user.uid,
                                email: user.email
                            }));
                            resolve({ uid: user.uid, email: user.email });
                        }
                    })
                    .catch((error) => {
                        resolve({ uid: user.uid, email: user.email });
                    });
            })
            .catch(reject);
    });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
}

function onAuthStateChange(callback) {
    if (!auth) {
        callback(null);
        return;
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('students').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        localStorage.setItem('user', JSON.stringify(userData));
                        callback(userData);
                    } else {
                        callback({ uid: user.uid, email: user.email });
                    }
                })
                .catch(() => {
                    callback({ uid: user.uid, email: user.email });
                });
        } else {
            callback(null);
        }
    });
}

function logoutUser() {
    return auth.signOut();
}

function getErrorMessage(error) {
    const errorCodes = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password is too weak',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later',
        'auth/network-request-failed': 'Network error. Please check your connection'
    };
    
    return errorCodes[error.code] || error.message;
}