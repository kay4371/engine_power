/* Suntrenia AI Intervia Helper - Content Script */

/**
 * Content script that runs on job sites to extract job information
 * and provide visual indicators for the extension
 */

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractJobData') {
        const jobData = extractJobData();
        sendResponse(jobData);
    }
});

// Function to extract job data from various job sites
function extractJobData() {
    const jobData = {
        title: '',
        company: '',
        description: '',
        location: '',
        url: window.location.href,
        extractedAt: new Date().toISOString()
    };

    const hostname = window.location.hostname.toLowerCase();

    try {
        // LinkedIn Jobs
        if (hostname.includes('linkedin.com')) {
            // Job title
            jobData.title = document.querySelector('h1[data-test-id="job-title"]')?.textContent?.trim() ||
                           document.querySelector('.job-details-jobs-unified-top-card__job-title')?.textContent?.trim() ||
                           document.querySelector('h1.job-title')?.textContent?.trim() ||
                           document.querySelector('h1')?.textContent?.trim() || '';

            // Company name
            jobData.company = document.querySelector('.job-details-jobs-unified-top-card__company-name a')?.textContent?.trim() ||
                             document.querySelector('.job-details-jobs-unified-top-card__primary-description a')?.textContent?.trim() ||
                             document.querySelector('.company-name')?.textContent?.trim() || '';

            // Location
            jobData.location = document.querySelector('.job-details-jobs-unified-top-card__primary-description .job-details-jobs-unified-top-card__bullet')?.textContent?.trim() ||
                              document.querySelector('.job-search-card__location')?.textContent?.trim() || '';

            // Job description
            jobData.description = document.querySelector('.jobs-description__content')?.textContent?.trim() ||
                                 document.querySelector('.job-details-jobs-unified-top-card__job-description')?.textContent?.trim() ||
                                 document.querySelector('#job-details')?.textContent?.trim() || '';
        }

        // Indeed
        else if (hostname.includes('indeed.com')) {
            // Job title
            jobData.title = document.querySelector('h1.jobsearch-JobMetadataHeader-title')?.textContent?.trim() ||
                           document.querySelector('.jobsearch-JobInfoHeader-title')?.textContent?.trim() ||
                           document.querySelector('h1')?.textContent?.trim() || '';

            // Company name
            jobData.company = document.querySelector('.jobsearch-InlineCompanyRating-companyHeader a')?.textContent?.trim() ||
                             document.querySelector('.jobsearch-CompanyInfoWithoutHeaderImage a')?.textContent?.trim() ||
                             document.querySelector('.companyName a')?.textContent?.trim() ||
                             document.querySelector('.companyName')?.textContent?.trim() || '';

            // Location
            jobData.location = document.querySelector('.jobsearch-JobMetadataHeader-item')?.textContent?.trim() ||
                              document.querySelector('.jobsearch-JobInfoHeader-subtitle')?.textContent?.trim() || '';

            // Job description
            jobData.description = document.querySelector('#jobDescriptionText')?.textContent?.trim() ||
                                 document.querySelector('.jobsearch-JobMetadataHeader-item--text')?.textContent?.trim() || '';
        }

        // Glassdoor
        else if (hostname.includes('glassdoor.com')) {
            // Job title
            jobData.title = document.querySelector('h1[data-test="job-title"]')?.textContent?.trim() ||
                           document.querySelector('.job-title')?.textContent?.trim() ||
                           document.querySelector('h1')?.textContent?.trim() || '';

            // Company name
            jobData.company = document.querySelector('h2[data-test="employer-name"]')?.textContent?.trim() ||
                             document.querySelector('.employer-name')?.textContent?.trim() ||
                             document.querySelector('.company-name')?.textContent?.trim() || '';

            // Location
            jobData.location = document.querySelector('[data-test="location"]')?.textContent?.trim() ||
                              document.querySelector('.location')?.textContent?.trim() || '';

            // Job description
            jobData.description = document.querySelector('[data-test="job-description"]')?.textContent?.trim() ||
                                 document.querySelector('.job-description')?.textContent?.trim() ||
                                 document.querySelector('.jobDescription')?.textContent?.trim() || '';
        }

        // Monster
        else if (hostname.includes('monster.com')) {
            // Job title
            jobData.title = document.querySelector('h1[data-testid="job-title"]')?.textContent?.trim() ||
                           document.querySelector('.job-title')?.textContent?.trim() ||
                           document.querySelector('h1')?.textContent?.trim() || '';

            // Company name
            jobData.company = document.querySelector('[data-testid="company-name"]')?.textContent?.trim() ||
                             document.querySelector('.company-name')?.textContent?.trim() || '';

            // Location
            jobData.location = document.querySelector('[data-testid="job-location"]')?.textContent?.trim() ||
                              document.querySelector('.location')?.textContent?.trim() || '';

            // Job description
            jobData.description = document.querySelector('[data-testid="job-description"]')?.textContent?.trim() ||
                                 document.querySelector('.job-description')?.textContent?.trim() || '';
        }

        // Naukri (India)
        else if (hostname.includes('naukri.com')) {
            // Job title
            jobData.title = document.querySelector('h1.job-title')?.textContent?.trim() ||
                           document.querySelector('.jd-header-title')?.textContent?.trim() ||
                           document.querySelector('h1')?.textContent?.trim() || '';

            // Company name
            jobData.company = document.querySelector('.jd-header-comp-name')?.textContent?.trim() ||
                             document.querySelector('.company-name')?.textContent?.trim() || '';

            // Location
            jobData.location = document.querySelector('.jd-header-location')?.textContent?.trim() ||
                              document.querySelector('.location')?.textContent?.trim() || '';

            // Job description
            jobData.description = document.querySelector('.jd-desc')?.textContent?.trim() ||
                                 document.querySelector('.job-description')?.textContent?.trim() || '';
        }

        // Generic fallback for other job sites
        else {
            // Try common selectors
            const titleSelectors = [
                'h1[data-testid*="title" i]',
                'h1.job-title',
                '.job-title',
                '.position-title',
                '[data-test*="title" i]',
                'h1'
            ];

            for (const selector of titleSelectors) {
                const element = document.querySelector(selector);
                if (element && element.textContent.trim()) {
                    jobData.title = element.textContent.trim();
                    break;
                }
            }

            const companySelectors = [
                '[data-testid*="company" i]',
                '.company-name',
                '.employer-name',
                '.job-company',
                '.company'
            ];

            for (const selector of companySelectors) {
                const element = document.querySelector(selector);
                if (element && element.textContent.trim()) {
                    jobData.company = element.textContent.trim();
                    break;
                }
            }

            const descSelectors = [
                '[data-testid*="description" i]',
                '.job-description',
                '.job-detail',
                '.description',
                '#job-description'
            ];

            for (const selector of descSelectors) {
                const element = document.querySelector(selector);
                if (element && element.textContent.trim()) {
                    jobData.description = element.textContent.trim();
                    break;
                }
            }
        }

        // Clean up extracted data
        jobData.title = jobData.title.replace(/\s+/g, ' ').trim();
        jobData.company = jobData.company.replace(/\s+/g, ' ').trim();
        jobData.description = jobData.description.replace(/\s+/g, ' ').trim();
        jobData.location = jobData.location.replace(/\s+/g, ' ').trim();

        // Limit description length
        if (jobData.description.length > 2000) {
            jobData.description = jobData.description.substring(0, 2000) + '...';
        }

    } catch (error) {
        console.error('Error extracting job data:', error);
    }

    return jobData;
}

// Add visual indicator when extension is active on job pages
function addVisualIndicator() {
    if (!document.querySelector('.parakleet-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'parakleet-indicator';
        indicator.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
            ">
                <span>🎯</span>
                <span>Suntrenia AI Intervia Active</span>
            </div>
        `;

        indicator.onclick = () => {
            // Open extension popup
            chrome.runtime.sendMessage({ action: 'openPopup' });
        };

        document.body.appendChild(indicator);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }, 5000);
    }
}

// Initialize content script
function init() {
    // Add visual indicator
    addVisualIndicator();

    // Listen for extraction requests from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'extractJobData') {
            const jobData = extractJobData();
            sendResponse(jobData);
        }
        return true; // Keep message channel open for async response
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}