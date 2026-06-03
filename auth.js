// Seele Agency - Auth Guard
// Redirects unauthenticated users to index.html

const SESSION_KEY = 'seele_agency_auth';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function checkAuth() {
    try {
        const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        if (session && Date.now() - session.timestamp < SESSION_TTL_MS) {
            // Refresh timestamp
            session.timestamp = Date.now();
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            return true;
        }
    } catch (e) {}
    return false;
}

function clearAuth() {
    localStorage.removeItem(SESSION_KEY);
}

// Determine if we're on the login page
const path = window.location.pathname;
const isLoginPage = path.endsWith('/index.html') || path === '/' || path.endsWith('/login.html');

// If on a protected page and not authenticated, redirect
if (!isLoginPage && !checkAuth()) {
    window.location.replace('/index.html');
}
