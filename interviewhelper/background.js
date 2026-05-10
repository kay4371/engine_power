// Suntrenia AI Intervia Helper - Background Script

/**
 * Background service worker for the Chrome extension
 * Handles extension lifecycle, permissions, and cross-component communication
 */

let currentPopup = null;

// Extension installation/setup
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // First time installation
        console.log('Suntrenia AI Intervia Helper installed');

        // Set default settings
        chrome.storage.sync.set({
            autoExtract: true,
            realTimeCoaching: true,
            saveRecordings: false,
            installDate: new Date().toISOString(),
            version: chrome.runtime.getManifest().version
        });

        // Open welcome page or instructions
        chrome.tabs.create({
            url: chrome.runtime.getURL('welcome.html') // We'll create this if needed
        });

    } else if (details.reason === 'update') {
        // Extension updated
        console.log('Suntrenia AI Intervia Helper updated');

        // Handle any migration logic here if needed
        chrome.storage.sync.get(['version'], (result) => {
            const currentVersion = chrome.runtime.getManifest().version;
            if (result.version !== currentVersion) {
                chrome.storage.sync.set({ version: currentVersion });
            }
        });
    }
});

// Handle extension icon clicks
chrome.action.onClicked.addListener((tab) => {
    // The popup will open automatically due to manifest configuration
    // This listener can be used for additional logic if needed
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'openPopup':
            // Force open the popup
            chrome.action.openPopup();
            break;

        case 'checkPermissions':
            // Check if we have necessary permissions
            checkPermissions().then(result => {
                sendResponse(result);
            });
            return true; // Keep message channel open

        case 'requestPermissions':
            // Request additional permissions if needed
            requestPermissions().then(result => {
                sendResponse(result);
            });
            return true; // Keep message channel open

        case 'getActiveTab':
            // Get information about the currently active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    sendResponse({
                        url: tabs[0].url,
                        title: tabs[0].title,
                        id: tabs[0].id
                    });
                } else {
                    sendResponse(null);
                }
            });
            return true; // Keep message channel open

        case 'extractJobData':
            // Forward extraction request to content script
            if (sender.tab) {
                chrome.tabs.sendMessage(sender.tab.id, request, (response) => {
                    sendResponse(response);
                });
            } else {
                sendResponse(null);
            }
            return true; // Keep message channel open

        default:
            sendResponse({ error: 'Unknown action' });
    }
});

// Permission checking functions
async function checkPermissions() {
    try {
        // Check microphone permission
        const microphoneResult = await navigator.permissions.query({ name: 'microphone' });

        // Check if we can access the backend
        const backendAccessible = await checkBackendAccess();

        return {
            microphone: microphoneResult.state === 'granted',
            backend: backendAccessible,
            tabs: true, // We have activeTab permission
            storage: true // We have storage permission
        };
    } catch (error) {
        console.error('Permission check failed:', error);
        return {
            microphone: false,
            backend: false,
            tabs: false,
            storage: false,
            error: error.message
        };
    }
}

async function checkBackendAccess() {
    try {
        // Try to access the backend status endpoint
        const response = await fetch('http://localhost:3000/api/interview-helper/status', {
            method: 'HEAD',
            credentials: 'include'
        });
        return response.ok;
    } catch (error) {
        // Try HTTPS version for production
        try {
            const response = await fetch('https://your-domain.com/api/interview-helper/status', {
                method: 'HEAD',
                credentials: 'include'
            });
            return response.ok;
        } catch (error2) {
            return false;
        }
    }
}

async function requestPermissions() {
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Immediately stop the stream - we just wanted permission
        stream.getTracks().forEach(track => track.stop());

        return { success: true, microphone: true };
    } catch (error) {
        console.error('Permission request failed:', error);
        return { success: false, error: error.message };
    }
}

// Handle tab updates to show/hide extension on job sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const isJobSite = isJobSiteUrl(tab.url);

        // Update extension icon badge
        if (isJobSite) {
            chrome.action.setBadgeText({ text: '🎯', tabId });
            chrome.action.setBadgeBackgroundColor({ color: '#667eea', tabId });
        } else {
            chrome.action.setBadgeText({ text: '', tabId });
        }
    }
});

// Check if URL is a job site
function isJobSiteUrl(url) {
    const jobSites = [
        'linkedin.com/jobs',
        'indeed.com',
        'glassdoor.com',
        'monster.com',
        'naukri.com',
        'dice.com',
        'careerbuilder.com',
        'simplyhired.com'
    ];

    try {
        const urlObj = new URL(url);
        return jobSites.some(site => urlObj.hostname.includes(site));
    } catch (error) {
        return false;
    }
}

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Parakleet AI Interview Helper started');
});

// Handle extension suspension
chrome.runtime.onSuspend.addListener(() => {
    console.log('Parakleet AI Interview Helper suspending');
});

// Periodic health check
setInterval(async () => {
    try {
        const permissions = await checkPermissions();
        chrome.storage.local.set({ lastHealthCheck: new Date().toISOString(), permissions });
    } catch (error) {
        console.error('Health check failed:', error);
    }
}, 300000); // Check every 5 minutes

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkPermissions,
        requestPermissions,
        isJobSiteUrl
    };
}