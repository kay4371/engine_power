# Suntrenia AI Intervia Helper - Chrome Extension

## Overview
This Chrome extension integrates with the IntelliJob backend to provide AI-powered interview coaching directly on job sites. Suntrenia AI Intervia Helper is your personal interview coach powered by advanced AI.

## Features
- 🎯 **Job Data Extraction**: Automatically extracts job details from LinkedIn, Indeed, Glassdoor, Monster, and Naukri
- 🎤 **Audio Recording**: Records interview responses with real-time transcription
- 🤖 **AI Coaching**: Provides personalized feedback using Anthropic Claude
- 📄 **CV Integration**: Uploads and analyzes your CV for better coaching
- 🔒 **Access Control**: Integrates with IntelliJob's subscription system

## Installation

### 1. Create Extension Icons
You need to create the following icon files in the `icons/` directory:

- `icon16.png` - 16x16 pixels
- `icon32.png` - 32x32 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

**Design Guidelines:**
- Use a professional color scheme (purple gradient: #667eea to #764ba2)
- Include an interview/target icon (🎯) or microphone (🎤)
- Keep it simple and recognizable
- Use PNG format with transparent background

**Quick Icon Creation:**
You can use online tools like:
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Canva](https://www.canva.com/) for custom design

### 2. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `interviewhelper` folder
5. The extension should now appear in your extensions list

### 3. Configure Backend URL

Update the `backendUrl` in `popup.js`:
```javascript
this.backendUrl = 'http://localhost:3000'; // For development
// or
this.backendUrl = 'https://your-production-domain.com'; // For production
```

## File Structure
```
interviewhelper/
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.js              # Popup logic and API integration
├── popup.css             # Popup styling
├── content.js            # Job site content script
├── content.css           # Content script styling
├── background.js         # Background service worker
├── icons/                # Extension icons (create these)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Usage

### For Users:
1. **Install the extension** following the steps above
2. **Visit a job site** (LinkedIn, Indeed, etc.)
3. **Click the extension icon** in the toolbar
4. **Extract job details** or fill them manually
5. **Upload your CV** for personalized coaching
6. **Start recording** your interview responses
7. **Get AI feedback** in real-time

### For Developers:
- **Backend Integration**: Ensure the IntelliJob server is running
- **API Keys**: Set `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` in your `.env`
- **CORS**: The backend should allow requests from `chrome-extension://*`
- **Testing**: Use the extension on various job sites to test extraction

## API Integration

The extension communicates with these backend endpoints:

- `GET /api/interview-helper/status` - Check access permissions
- `GET /api/active-job` - Get current job data
- `POST /api/transcribe` - Transcribe audio recordings
- `POST /api/coach` - Get AI coaching feedback
- `POST /api/cv` - Upload and store CV
- `GET/PUT/DELETE /api/cv` - Manage CV data

## Permissions Explained

- `activeTab`: Access current tab for job data extraction
- `storage`: Save user preferences and settings
- `scripting`: Inject content scripts on job sites
- `cookies`: Maintain session with IntelliJob backend
- Host permissions: Access IntelliJob API endpoints

## Troubleshooting

### Extension Not Loading
- Check that all icon files exist
- Verify `manifest.json` syntax
- Check browser console for errors

### Backend Connection Issues
- Ensure IntelliJob server is running
- Check CORS configuration
- Verify API endpoints are accessible

### Job Data Not Extracting
- Test on supported job sites
- Check content script is loading (DevTools → Console)
- Verify page structure hasn't changed

### Audio Recording Not Working
- Grant microphone permissions
- Check browser audio settings
- Ensure HTTPS in production (required for microphone access)

## Development

### Testing Locally
1. Start your IntelliJob server
2. Load the extension in Chrome
3. Test on various job sites
4. Check browser DevTools for errors

### Building for Production
1. Update `backendUrl` in `popup.js`
2. Ensure all API keys are set
3. Test thoroughly before deployment
4. Package the extension for the Chrome Web Store

## Support

For issues or questions:
- Check the IntelliJob server logs
- Review browser console errors
- Test API endpoints directly with curl/Postman
- Ensure all dependencies are installed

## License

This extension is part of the IntelliJob platform.