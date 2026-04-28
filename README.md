# Online Academy Website

A student registration system for an educational institute, built with HTML/CSS/JS and Firebase.

## Features

- User Registration & Login (Firebase Authentication)
- Student Dashboard (view profile & enrolled courses)
- Contact Form with database storage
- Responsive design
- Free hosting on GitHub Pages

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase (Auth + Firestore)
- **Hosting:** GitHub Pages

## Firebase Setup (Required)

### Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project" → Enter name: `online-academy`
3. Disable Google Analytics (optional)
4. Click "Create project"

### Step 2: Enable Authentication

1. Go to **Build** → **Authentication** → **Sign-in method**
2. Click "Email/Password"
3. Enable "Email/Password"
4. Click "Save"

### Step 3: Enable Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select location (nearest to you)
4. Start in **Test mode** (allows read/write)
5. Click "Create"

### Step 4: Get Configuration

1. Go to **Project Settings** (gear icon ⚙️)
2. Scroll down to "Your apps" → Click **</>** (Web)
3. Register app (nickname: "online-academy")
4. Copy the `firebaseConfig` object

### Step 5: Update Configuration

Open `js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

## Deploy to GitHub Pages

1. Go to your repository on GitHub
2. Go to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /
4. Click "Save"
5. Wait 1-2 minutes for deployment

Your site will be at: `https://yourusername.github.io/lavanyapeirisedugithub.io/`

## Project Structure

```
├── index.html          # Home page
├── about.html         # About page
├── courses.html       # Courses page
├── register.html      # Registration page
├── login.html         # Login page
├── dashboard.html     # Student dashboard
├── contact.html       # Contact page
├── css/
│   └── style.css      # Styles
├── js/
│   ├── main.js        # Shared functions
│   ├── firebase-config.js  # Firebase config (EDIT THIS)
│   └── auth.js        # Authentication functions
└── README.md          # This file
```

## Testing Locally

1. Open `index.html` in a browser, OR
2. Use a local server:
   ```bash
   npx serve .
   ```

## Admin Access

To view registered students:
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database** → **students** collection

To view contact messages:
1. Go to **Firestore Database** → **messages** collection

## Notes

- First-time users need to wait ~2 minutes for GitHub Pages deployment
- Firebase free tier: 100K monthly auth, 50K/20K daily DB reads/writes
- Contact page works in demo mode even without Firebase (shows confirmation)

## Support

For issues: lavanyapeiris.edu@gmail.com