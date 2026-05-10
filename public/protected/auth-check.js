// auth-check.js - Include this in all protected pages
class SessionManager {
    constructor() {
        this.checkInterval = null;
        this.inactivityTimer = null;
        this.SESSION_TIMEOUT = 14 * 60 * 1000; // 14 minutes (slightly less than server)
        
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.startSessionMonitoring();
    }

    async checkAuthStatus() {
        try {
            const response = await fetch('/check-auth');
            const data = await response.json();
            
            if (!data.authenticated) {
                this.redirectToLogin();
            } else {
                this.resetInactivityTimer();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            this.redirectToLogin();
        }
    }

    setupEventListeners() {
        // Reset timer on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        events.forEach(event => {
            document.addEventListener(event, () => this.resetInactivityTimer());
        });

        // Check auth when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkAuthStatus();
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => {
            this.logoutDueToInactivity();
        }, this.SESSION_TIMEOUT);
    }

    async logoutDueToInactivity() {
        try {
            await fetch('/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        window.location.href = '/login.html?message=Session expired';
    }

    startSessionMonitoring() {
        // Check session every 2 minutes
        this.checkInterval = setInterval(() => {
            this.checkAuthStatus();
        }, 2 * 60 * 1000);
    }

    cleanup() {
        clearInterval(this.checkInterval);
        clearTimeout(this.inactivityTimer);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SessionManager();
});