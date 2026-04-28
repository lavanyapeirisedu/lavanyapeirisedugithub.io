document.addEventListener('DOMContentLoaded', function() {
    updateNavAuth();
});

function updateNavAuth() {
    const navAuth = document.getElementById('navAuth');
    if (!navAuth) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user) {
        navAuth.innerHTML = `
            <a href="dashboard.html" class="btn btn-primary">Dashboard</a>
            <button onclick="logout()" class="btn btn-outline">Logout</button>
        `;
    } else {
        navAuth.innerHTML = `
            <a href="login.html" class="btn btn-outline">Login</a>
            <a href="register.html" class="btn btn-primary">Register</a>
        `;
    }
}

function logout() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        }).catch(error => {
            console.error('Logout error:', error);
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    } else {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

function hideError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(alertDiv, form.firstChild);
    }
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function checkAuth(required = true) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (required && !user) {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}