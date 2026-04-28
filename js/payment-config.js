const paymentConfig = {
    whatsappNumber: "+94760920335",
    courses: {
        sinhala: {
            name: "Sinhala Language",
            registrationFee: 0,
            monthlyFee: 0
        },
        media: {
            name: "Media Studies",
            registrationFee: 0,
            monthlyFee: 0
        }
    },
    adminEmail: "lavanyapeiris.edu@gmail.com"
};

function getCoursePaymentDetails(courseKey) {
    return paymentConfig.courses[courseKey] || null;
}

function getWhatsAppNumber() {
    return paymentConfig.whatsappNumber;
}