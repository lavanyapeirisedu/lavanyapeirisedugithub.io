async function savePaymentRecord(paymentData) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const paymentDoc = {
        ...paymentData,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('payments').add(paymentDoc);
    return docRef.id;
}

async function getStudentPayments(studentId) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const snapshot = await db.collection('payments')
        .where('studentId', '==', studentId)
        .orderBy('createdAt', 'desc')
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getPendingPayments() {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const snapshot = await db.collection('payments')
        .where('status', 'in', ['pending', 'whatsapp_sent'])
        .orderBy('createdAt', 'desc')
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getAllPayments() {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const snapshot = await db.collection('payments')
        .orderBy('createdAt', 'desc')
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function approvePayment(paymentId, approvedBy) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    await db.collection('payments').doc(paymentId).update({
        status: 'approved',
        approvedBy: approvedBy,
        approvedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function rejectPayment(paymentId, reason) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    await db.collection('payments').doc(paymentId).update({
        status: 'rejected',
        rejectionReason: reason,
        rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function getStudentById(studentId) {
    if (!db) {
        throw new Error('Firebase not initialized');
    }

    const doc = await db.collection('students').doc(studentId).get();
    return doc.exists ? doc.data() : null;
}

function getLatestApprovedPayment(payments) {
    return payments
        .filter(p => p.status === 'approved')
        .sort((a, b) => {
            const dateA = a.approvedAt ? (a.approvedAt.seconds || 0) : 0;
            const dateB = b.approvedAt ? (b.approvedAt.seconds || 0) : 0;
            return dateB - dateA;
        })[0];
}

function isPaymentRecent(payment, daysThreshold = 30) {
    if (!payment || !payment.approvedAt) return false;
    const approvedDate = payment.approvedAt.toDate ? payment.approvedAt.toDate() : new Date(payment.approvedAt.seconds * 1000);
    const daysDiff = (new Date() - approvedDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= daysThreshold;
}