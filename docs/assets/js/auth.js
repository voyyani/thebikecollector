const auth = firebase.auth();
// Email/Password Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "services.html")
        .catch(error => handleAuthError(error));
});

// Google Sign-In
function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => window.location.href = "services.html")
    .catch(error => handleAuthError(error));
}

// Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Logged in:", user.email);
        // Update UI elements if needed
    } else {
        console.log("No user logged in");
    }
});

// Error Handling
function handleAuthError(error) {
    const message = document.getElementById('loginMessage');
    message.textContent = error.message;
    message.className = "status-message error";
    message.style.display = 'block';
    setTimeout(() => message.style.display = 'none', 5000);
}

// Logout Function
function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}
