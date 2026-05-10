#!/usr/bin/env node

/**
 * Test script for Suntrenia AI Intervia Helper Chrome Extension
 * Tests extension setup and backend integration
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Suntrenia AI Intervia Helper Extension...\n');

// Test 1: Check if all required files exist
console.log('📁 Checking file structure...');
const requiredFiles = [
    'manifest.json',
    'popup.html',
    'popup.js',
    'popup.css',
    'content.js',
    'content.css',
    'background.js',
    'README.md',
    'package.json'
];

const iconFiles = [
    'icons/icon16.png',
    'icons/icon32.png',
    'icons/icon48.png',
    'icons/icon128.png'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

console.log('\n🖼️  Checking icon files...');
iconFiles.forEach(icon => {
    if (fs.existsSync(icon)) {
        console.log(`✅ ${icon}`);
    } else {
        console.log(`⚠️  ${icon} - PLACEHOLDER (needs to be created)`);
    }
});

// Test 2: Validate manifest.json
console.log('\n📋 Validating manifest.json...');
try {
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    const requiredFields = ['manifest_version', 'name', 'version', 'description', 'permissions', 'action'];

    let manifestValid = true;
    requiredFields.forEach(field => {
        if (!manifest[field]) {
            console.log(`❌ Missing required field: ${field}`);
            manifestValid = false;
        }
    });

    if (manifestValid) {
        console.log('✅ Manifest.json is valid');
        console.log(`   Name: ${manifest.name}`);
        console.log(`   Version: ${manifest.version}`);
        console.log(`   Permissions: ${manifest.permissions.join(', ')}`);
    }
} catch (error) {
    console.log('❌ Invalid manifest.json:', error.message);
}

// Test 3: Check for syntax errors in JS files
console.log('\n💻 Checking JavaScript syntax...');
const jsFiles = ['popup.js', 'content.js', 'background.js'];

jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            // Basic syntax check by attempting to parse
            const content = fs.readFileSync(file, 'utf8');
            // Remove import/export statements that might cause issues in Node
            const cleanContent = content
                .replace(/import\s+.*from\s+['"].*['"];?\s*/g, '')
                .replace(/export\s+.*;?/g, '');

            new Function(cleanContent);
            console.log(`✅ ${file} - syntax OK`);
        } catch (error) {
            console.log(`❌ ${file} - syntax error: ${error.message}`);
        }
    }
});

// Test 4: Backend connectivity test (if server is running)
console.log('\n🌐 Testing backend connectivity...');
const http = require('http');

function testBackendConnection() {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/api/interview-helper/status',
            method: 'GET',
            timeout: 5000
        }, (res) => {
            console.log('✅ Backend server is running');
            console.log(`   Status: ${res.statusCode}`);
            resolve(true);
        });

        req.on('error', () => {
            console.log('⚠️  Backend server not running (start with: npm run start)');
            resolve(false);
        });

        req.on('timeout', () => {
            console.log('⚠️  Backend server not responding');
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

// Run backend test
testBackendConnection().then(() => {
    console.log('\n🎉 Extension test complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Create the icon files (see README.md)');
    console.log('2. Load extension in Chrome (chrome://extensions/)');
    console.log('3. Start IntelliJob server: npm run start');
    console.log('4. Test on job sites: LinkedIn, Indeed, etc.');
    console.log('5. Verify API keys are set in .env');

    if (!allFilesExist) {
        console.log('\n⚠️  Some files are missing. Check the output above.');
    }
});