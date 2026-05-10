// Suntrenia AI Intervia Helper - Popup Script

class InterviewHelper {
    constructor() {
        this.backendUrl = 'http://localhost:3000'; // Change for production
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.cvUploaded = false;
        this.currentJobData = null;
        this.sessionId = null;

        this.init();
    }

    async init() {
        this.showLoading();
        await this.checkAccess();
        this.setupEventListeners();
        this.loadSettings();
    }

    // Screen Management
    showLoading() {
        this.showScreen('loading');
    }

    showNoAccess() {
        this.showScreen('no-access');
    }

    showMainInterface() {
        this.showScreen('main-interface');
    }

    showSettings() {
        this.showScreen('settings');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    // Access Control
    async checkAccess() {
        try {
            const response = await fetch(`${this.backendUrl}/api/interview-helper/status`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to check access');
            }

            const data = await response.json();

            if (data.hasAccess) {
                this.showMainInterface();
                await this.loadActiveJob();
            } else {
                this.showNoAccess();
            }
        } catch (error) {
            console.error('Access check failed:', error);
            this.showNoAccess();
        }
    }

    // Job Data Management
    async loadActiveJob() {
        try {
            const response = await fetch(`${this.backendUrl}/api/active-job`, {
                credentials: 'include'
            });

            if (response.ok) {
                const jobData = await response.json();
                this.populateJobDetails(jobData);
            }
        } catch (error) {
            console.error('Failed to load active job:', error);
        }
    }

    populateJobDetails(jobData) {
        if (jobData) {
            document.getElementById('job-title').value = jobData.title || '';
            document.getElementById('company').value = jobData.company || '';
            document.getElementById('job-description').value = jobData.description || '';
            this.currentJobData = jobData;
        }
    }

    async extractJobFromPage() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (!tab) return;

            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: extractJobData
            });

            if (results && results[0] && results[0].result) {
                const jobData = results[0].result;
                this.populateJobDetails(jobData);
                this.showStatus('Job details extracted successfully!', 'success');
            } else {
                this.showStatus('Could not extract job details from this page.', 'warning');
            }
        } catch (error) {
            console.error('Failed to extract job data:', error);
            this.showStatus('Failed to extract job details.', 'error');
        }
    }

    // CV Management
    handleCVUpload() {
        const fileInput = document.getElementById('cv-file');
        fileInput.click();

        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('cv', file);

            try {
                this.showStatus('Uploading CV...', 'info');
                const response = await fetch(`${this.backendUrl}/api/cv`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });

                if (response.ok) {
                    this.cvUploaded = true;
                    document.getElementById('cv-status').textContent = `Uploaded: ${file.name}`;
                    this.showStatus('CV uploaded successfully!', 'success');
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('CV upload failed:', error);
                this.showStatus('Failed to upload CV.', 'error');
                document.getElementById('cv-status').textContent = 'Upload failed';
            }
        };
    }

    // Audio Recording
    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = async () => {
                await this.processRecording();
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordingUI(true);

        } catch (error) {
            console.error('Failed to start recording:', error);
            this.showStatus('Failed to access microphone.', 'error');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.updateRecordingUI(false);
        }
    }

    updateRecordingUI(isRecording) {
        const startBtn = document.getElementById('start-recording');
        const stopBtn = document.getElementById('stop-recording');
        const indicator = document.getElementById('recording-indicator');

        if (isRecording) {
            startBtn.classList.add('hidden');
            stopBtn.classList.remove('hidden');
            indicator.classList.remove('hidden');
        } else {
            startBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            indicator.classList.add('hidden');
        }
    }

    async processRecording() {
        if (this.audioChunks.length === 0) return;

        try {
            this.showStatus('Processing audio...', 'info');

            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            // First, transcribe the audio
            const transcribeResponse = await fetch(`${this.backendUrl}/api/transcribe`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (!transcribeResponse.ok) {
                throw new Error('Transcription failed');
            }

            const transcribeData = await transcribeResponse.json();
            const transcription = transcribeData.transcription;

            // Then, get coaching feedback
            await this.getCoachingFeedback(transcription);

        } catch (error) {
            console.error('Failed to process recording:', error);
            this.showStatus('Failed to process recording.', 'error');
        }
    }

    async getCoachingFeedback(transcription) {
        try {
            this.showStatus('Getting AI coaching...', 'info');

            const contextData = {
                transcription: transcription,
                jobData: this.currentJobData,
                sessionId: this.sessionId
            };

            const response = await fetch(`${this.backendUrl}/api/coach`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contextData)
            });

            if (!response.ok) {
                throw new Error('Coaching request failed');
            }

            // Handle streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            const responseContainer = document.getElementById('response-content');
            const coachResponse = document.getElementById('coach-response');

            coachResponse.classList.remove('hidden');
            responseContainer.innerHTML = '<div class="typing-indicator">AI Coach is thinking...</div>';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.content) {
                                accumulatedResponse += data.content;
                                responseContainer.innerHTML = this.formatCoachingResponse(accumulatedResponse);
                            }
                        } catch (e) {
                            // Ignore parsing errors for incomplete chunks
                        }
                    }
                }
            }

            this.showStatus('Coaching feedback received!', 'success');

        } catch (error) {
            console.error('Failed to get coaching feedback:', error);
            this.showStatus('Failed to get coaching feedback.', 'error');
        }
    }

    formatCoachingResponse(response) {
        // Basic formatting for the coaching response
        return response
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    // Settings Management
    loadSettings() {
        chrome.storage.sync.get({
            autoExtract: true,
            realTimeCoaching: true,
            saveRecordings: false
        }, (settings) => {
            document.getElementById('auto-extract').checked = settings.autoExtract;
            document.getElementById('real-time-coaching').checked = settings.realTimeCoaching;
            document.getElementById('save-recordings').checked = settings.saveRecordings;
        });
    }

    saveSettings() {
        const settings = {
            autoExtract: document.getElementById('auto-extract').checked,
            realTimeCoaching: document.getElementById('real-time-coaching').checked,
            saveRecordings: document.getElementById('save-recordings').checked
        };

        chrome.storage.sync.set(settings, () => {
            this.showStatus('Settings saved!', 'success');
        });
    }

    // UI Utilities
    showStatus(message, type) {
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = statusIndicator.querySelector('.status-text');
        const statusDot = statusIndicator.querySelector('.status-dot');

        statusText.textContent = message;

        // Update color based on type
        switch (type) {
            case 'success':
                statusDot.style.background = '#28a745';
                break;
            case 'error':
                statusDot.style.background = '#dc3545';
                break;
            case 'warning':
                statusDot.style.background = '#ffc107';
                break;
            case 'info':
                statusDot.style.background = '#17a2b8';
                break;
            default:
                statusDot.style.background = '#28a745';
        }

        // Reset to "Ready" after 3 seconds
        setTimeout(() => {
            statusText.textContent = 'Ready';
            statusDot.style.background = '#28a745';
        }, 3000);
    }

    // Event Listeners
    setupEventListeners() {
        // Main interface buttons
        document.getElementById('extract-job-btn').addEventListener('click', () => this.extractJobFromPage());
        document.getElementById('upload-cv-btn').addEventListener('click', () => this.handleCVUpload());
        document.getElementById('start-recording').addEventListener('click', () => this.startRecording());
        document.getElementById('stop-recording').addEventListener('click', () => this.stopRecording());
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());

        // Settings
        document.getElementById('back-btn').addEventListener('click', () => this.showMainInterface());
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.saveSettings());
        });

        // Upgrade button
        document.getElementById('upgrade-btn').addEventListener('click', () => {
            chrome.tabs.create({ url: `${this.backendUrl}/subscription_page.html` });
        });
    }
}

// Content script function for extracting job data
function extractJobData() {
    const jobData = {
        title: '',
        company: '',
        description: ''
    };

    // LinkedIn job extraction
    if (window.location.hostname.includes('linkedin.com')) {
        jobData.title = document.querySelector('h1.job-title')?.textContent?.trim() ||
                       document.querySelector('.job-details-jobs-unified-top-card__job-title')?.textContent?.trim() ||
                       document.querySelector('h1')?.textContent?.trim() || '';

        jobData.company = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.textContent?.trim() ||
                         document.querySelector('.job-details-jobs-unified-top-card__primary-description')?.textContent?.trim() ||
                         document.querySelector('.company-name')?.textContent?.trim() || '';

        jobData.description = document.querySelector('.job-details-jobs-unified-top-card__job-description')?.textContent?.trim() ||
                             document.querySelector('.jobs-description')?.textContent?.trim() || '';
    }

    // Indeed job extraction
    else if (window.location.hostname.includes('indeed.com')) {
        jobData.title = document.querySelector('h1.jobsearch-JobMetadataHeader-title')?.textContent?.trim() ||
                       document.querySelector('.jobsearch-JobInfoHeader-title')?.textContent?.trim() ||
                       document.querySelector('h1')?.textContent?.trim() || '';

        jobData.company = document.querySelector('.jobsearch-InlineCompanyRating-companyHeader')?.textContent?.trim() ||
                         document.querySelector('.jobsearch-CompanyInfoWithoutHeaderImage')?.textContent?.trim() ||
                         document.querySelector('.companyName')?.textContent?.trim() || '';

        jobData.description = document.querySelector('#jobDescriptionText')?.textContent?.trim() ||
                             document.querySelector('.jobsearch-JobMetadataHeader-item')?.textContent?.trim() || '';
    }

    // Generic fallback
    if (!jobData.title) {
        const titleSelectors = ['h1', '.job-title', '.position-title', '[data-testid="job-title"]'];
        for (const selector of titleSelectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent.trim()) {
                jobData.title = element.textContent.trim();
                break;
            }
        }
    }

    return jobData;
}

// Initialize the extension when popup opens
document.addEventListener('DOMContentLoaded', () => {
    new InterviewHelper();
});