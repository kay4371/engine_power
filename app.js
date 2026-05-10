const http = require('http');
const MongoStore = require('connect-mongo');
const natural = require('natural'); // or use import syntax if using ES modules
const { WordTokenizer, PorterStemmer } = natural;
const tfidf = new natural.TfIdf();
const schedule = require('node-schedule'); // Import the schedule module
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const tokenizer = new natural.WordTokenizer();
const nodemailer = require("nodemailer");
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');
const unirest = require('unirest');
const cheerio = require('cheerio');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const classifier = new natural.BayesClassifier(); // Initialize a Bayesian classifier
const sanitizeHtml = require('sanitize-html'); // Import sanitize-html library
const session = require('express-session');
const PDFDocument = require('pdfkit');
const fetch = require('node-fetch');
const FormData = require('form-data');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const dbName = 'olukayode_sage';
const socketIo = require('socket.io'); // Make sure to require 'socket.io'
const helmet = require('helmet');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const WebSocket = require('ws');
const { Configuration, OpenAIApi } = require("openai");
const { PDFExtract } = require('pdf.js-extract');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const { S3Client } = require;
const aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3-v2");
// const ObjectId = require('mongodb').ObjectId;
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');
// const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const path = require("path");
const html_to_pdf = require('html-pdf-node');
const app = express();
const port = process.env.PORT || 3000;

function generateUniqueCode() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
  const uniqueCode = `${timestamp}_${randomString}`;
  console.log('Generated Code:', uniqueCode); // Log the generated code
  return uniqueCode;
}
// Generate the code when the app is initialized
const generatedCode = generateUniqueCode();



const options = {
  key: fs.readFileSync('./certs/private.key'),
  cert: fs.readFileSync('./certs/certificate.crt'),
};
// alert(" Worked")


// Authentication middleware
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/');
  }
}

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/index.html');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use('/protected', ensureAuthenticated, express.static(__dirname + '/public/protected'));
app.use(helmet());
app.use(logger('dev'));
// Updated CORS for Parakleet AI Chrome extension support
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.APP_DOMAIN || '',
    ];
    // Always allow Chrome extension origins and server origins
    if (!origin || origin.startsWith('chrome-extension://') || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow for now, restrict in production
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,
}));


app.use((req, res, next) => {
  req.generatedCode = generatedCode;
  next();
});
const token = process.env.TOKEN;
// const token = process.env.TOKEN;
const token2 = process.env.TOKEN2;
const WHAPI_TOKEN3 = process.env.WHAPI_TOKEN3


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'profile-picture-upload-youtube1',
    // acl: 'public-read', // Ensure this ACL is supported by your bucket
    acl: 'private', // Remove this line if ACLs are disabled
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  }),
  fileFilter: function (req, file, cb) {
    // Implement file filtering if needed
    cb(null, true); // Allow all files for demonstration
  }
});

const sessionSecret = crypto.randomBytes(64).toString('hex');

//Note email is kayodelphia@gmail.com
const GROQ_CONFIG = {
  model: 'llama-3.3-70b-versatile', // Your working model from app2.js
  apiKey: process.env.GROQ_API_KEY,
  
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  temperature: 0.75, // Slightly higher for variety
  max_tokens: 3000, // Increased for detailed responses
  top_p: 0.92
};


app.use(session({
  secret: sessionSecret, // Use the generated secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));


// Authentication middleware
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    // User is logged in
    return next();
  } else {
    // Redirect to login page
    return res.redirect('/');
  }
}

app.use(express.static(__dirname + '/public'));



// Set up MongoDB connection
let registrationDetails = []; // Define a variable to store registration details

const uri = process.env.MONGO_URI || 
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}${process.env.MONGO_OPTIONS}`;

const client = new MongoClient(uri);
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(session({
  secret: generatedCode, // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));



//  //////////////////////////////ensures app redirect to index.html on startup
// // === PROTECT ALL HTML FILES (except login pages) ===
// app.use((req, res, next) => {
//   const allowedPaths = ['/', '/index.html'];
//   // const allowedPaths = ['/', '/index.html', '/create_account.html'];
  
//   // If accessing any HTML file that's not login-related
//   if (req.path.endsWith('.html') && !allowedPaths.includes(req.path)) {
//     if (!req.session || !req.session.userId) {
//       return res.redirect('/');
//     }
//   }
//   next();
// });
// === PROTECT ALL HTML FILES (except login pages) ===
app.use((req, res, next) => {
  const allowedPaths = [
    '/', 
    '/index.html',
    '/activate.html',           // Add your activation page
    '/verify-activation-code',  // Add the API route
    '/resend-activation-code'   // Add the resend route
  ];
  
  // If accessing any HTML file that's not login-related
  if (req.path.endsWith('.html') && !allowedPaths.includes(req.path)) {
    if (!req.session || !req.session.userId) {
      return res.redirect('/');
    }
  }
  next();
});


app.get("/", (req, res) => {
  res.sendFile(path.join(htmlDir, 'index.html'));
});



  let userSubscription; // Declare globally
  function generateSessionToken() {
    return Math.random().toString(36).slice(2); // Generate a random session token
  }
  
  // Generate a session token externally (outside the logic)
  const sessionToken = generateSessionToken(); // This will be the token you'll use externally
///////////////////////working
// ////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Route to serve the Test_email.html file
app.get('/Test_email.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Test_email.html'));
});




app.post('/register', async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword } = req.body;

  // Check for missing fields
  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Password match validation
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  // Phone number validation
  if (!/^\+234\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Invalid phone number format. Use +234XXXXXXXXXX.' });
  }

  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const userCollection = database.collection('Users_CV_biodata');
   
    // Check if email or phone number already exists
    const existingUser = await userCollection.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      const message = existingUser.email === email
        ? 'Email already in use.'
        : 'Phone number already in use.';
      return res.status(409).json({ success: false, message });
    }

    // Use phone number as UserRegistrationId
    const UserRegistrationId = phoneNumber;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      _id: UserRegistrationId, // Use UserRegistrationId as custom ID
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    };

    // Insert the new user
    await userCollection.insertOne(user);

    // Simulate sending activation code
    sendActivationCode(phoneNumber);

    // Respond with success
    res.status(200).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user.' });
  } finally {
    await client.close();
  }
});

// });
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "testmyitproject@gmail.com", // Your email
//     pass: "ewcl clle zkjr djra", // Your email password or app-specific password
//   },
// });


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/authorize', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Authorization</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #1d2671, #c33764);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
        }
        .auth-container {
          background: #fff;
          padding: 40px 50px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          max-width: 420px;
          width: 90%;
          text-align: center;
          animation: fadeIn 0.6s ease-in-out;
        }
        .auth-container h2 {
          margin-bottom: 10px;
          color: #222;
          font-size: 1.8rem;
        }
        .auth-container p {
          color: #555;
          font-size: 1rem;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        form {
          display: flex;
          justify-content: space-evenly;
          gap: 20px;
        }
        button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button[value="yes"] {
          background: #0078d4;
          color: white;
        }
        button[value="yes"]:hover {
          background: #005fa3;
        }
        button[value="no"] {
          background: #f0f0f0;
          color: #333;
        }
        button[value="no"]:hover {
          background: #ddd;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        footer {
          margin-top: 25px;
          font-size: 0.85rem;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="auth-container">
        <h2>Email Access Permission</h2>
        <p>
          We’ll need your authorization to send job application emails on your behalf.  
          This is a one-time approval to connect securely with your email service.
        </p>
        <form method="POST" action="/authorize">
          <button type="submit" name="decision" value="yes">Allow Access</button>
          <button type="submit" name="decision" value="no">Deny</button>
        </form>
        <footer>
          Your credentials are never stored. This access is used only to send authorized job applications.
        </footer>
      </div>
    </body>
    </html>
  `);
});
async function sendActivationCode(phoneNumber) {
  if (!/^\+234\d{10}$/.test(phoneNumber)) {
    throw new Error('Invalid phone number format. Use +234XXXXXXXXXX.');
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    const collection = db.collection('Users_CV_biodata');

    // Fetch the user by phone number
    const savedData = await collection.findOne({ phoneNumber });

    if (!savedData) {
      throw new Error('User not found');
    }

    // Generate a 5-digit activation code
    const activationCode = Math.floor(10000 + Math.random() * 90000).toString();

    // Update user document with activation code and expiration
    await collection.updateOne(
      { phoneNumber },
      {
        $set: {
          activationCode,
          activationCodeExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        },
      }
    );

    // Extract email from the user data
    const recipientEmail = savedData.email;


    const mailOptions = {
      from: `"noreply@suntrenia.com" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: 'Activate Your Account',
      html: `
        <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="font-weight: bold; font-size: 24px; color: #6A0DAD; margin-bottom: 20px;">Activate Your Account</h1>
          <p style="font-size: 16px; margin-bottom: 10px;">Dear <strong>${savedData.name.split(' ')[0]}</strong>,</p>
          <p style="font-size: 16px; margin-bottom: 20px;">Thank you for signing up with Suntrenia! To complete your registration and activate your account, please use the activation code below:</p>
          <p style="font-size: 24px; font-weight: bold; color: #6A0DAD; background: #f9f9f9; padding: 15px 30px; border-radius: 5px; letter-spacing: 5px; display: inline-block;">
            ${activationCode.split('').join(' ')}
          </p>
          <p style="font-size: 14px; margin: 20px 0; color: #555;">This code will expire in 15 minutes.</p>
          <p style="font-size: 14px; margin-top: 20px; color: #777;">If you didn’t create this account, please ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
          <p style="font-size: 14px; margin-top: 20px; color: #555;">
            Need help? Contact us at <a href="mailto:support@suntrenia.com" style="color: #007BFF; text-decoration: none;">support@suntrenia.com</a>.
          </p>
          <p>The Suntrenia Team</p>
        </div>
      `,
    };
    
// Send email
const info = await transporter.sendMail(mailOptions);
console.log('Activation code sent: %s', info.messageId);

return {
  email: recipientEmail,
  message: 'Activation code sent successfully',
};
} catch (error) {
  console.error('Error sending activation code:', error);
  throw error;
} finally {
  await client.close();
}
}

//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/resend-activation-code', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
      // Retrieve the email from the session or localStorage on the client-side
      const email = req.body.email; // You might need to send email from client
      
      if (!email) {
          return res.status(400).json({
              success: false,
              message: 'Email is required to resend activation code'
          });
      }

      await client.connect();
      const db = client.db('olukayode_sage');
      const collection = db.collection('Users_CV_biodata');

      // Find the user by email
      const user = await collection.findOne({ email });

      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found'
          });
      }

      // Generate a new 5-digit activation code
      const activationCode = Math.floor(10000 + Math.random() * 90000).toString();

      // Update user document with new activation code and expiration
      await collection.updateOne(
          { email },
          {
              $set: {
                  activationCode,
                  activationCodeExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
              }
          }
      );

      // Send email with new activation code (using your existing email sending logic)
      const mailOptions = {
        from: `"noreply@suntrenia.com" <${process.env.EMAIL_USER}>`,
       
        to: email,
        
        subject: 'Your Activation Code',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333333; background-color: #f8f9fa; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
                <h1 style="color: #333333; text-align: center; font-size: 24px; margin-bottom: 20px;">Your Activation Code</h1>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">Dear User,</p>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Your activation code is: <strong style="color: #007BFF;">${activationCode}</strong>
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Please note that this code will expire in <strong>15 minutes</strong>.
                </p>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 14px; color: #555555; text-align: center; margin-top: 20px;">
                    If you did not request this code, please ignore this email or contact support if you have concerns.
                </p>
            </div>
        `,
    };
    


      await transporter.sendMail(mailOptions);

      res.status(200).json({
          success: true,
          message: 'New activation code sent successfully'
      });

  } catch (error) {
      console.error('Error resending activation code:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to resend activation code'
      });
  } finally {
      await client.close();
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////
// Route for verifying activation code
app.post('/verify-activation-code', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    
    const { email, activationCode } = req.body;

    if (!email || !activationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email and activation code are required',
      });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db('olukayode_sage');
    const collection = db.collection('Users_CV_biodata');

    // Find user by email and activation code, and ensure the code is not expired
    const user = await collection.findOne({
      email: email,
      activationCode: activationCode,
      activationCodeExpires: { $gt: new Date() }, // Check expiration
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired activation code',
      });
    }

    // Activate the user by updating their record
    await collection.updateOne(
      { email: email },
      {
        $set: {
          isActivated: true,
          activationCode: null,
          activationCodeExpires: null,
        },
      }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Account activated successfully',
      redirectUrl: '/index.html',
    });
  } catch (error) {
    console.error('Error verifying activation code:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying activation code',
    });
  } finally {
    // Ensure MongoDB connection is always closed
    await client.close();
  }
});


///////////////////////////////////////////////////////////////////////////////
// Login Route
app.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    console.log('Login attempt:', { phoneNumber, password });
    await client.connect();
    const database = client.db('olukayode_sage');
    const usersCollection = database.collection('Users_CV_biodata');
    const user = await usersCollection.findOne({phoneNumber});

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found. Please create an account.' });
    }
    if (!user.isActivated) {
      console.log('Account not activated');
      return res.status(403).json({ message: 'Account not activated. Please activate your account.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate session token
    const token = jwt.sign({ userId: user._id }, sessionSecret, { expiresIn: '1h' });
    req.session.token = token;
    req.session.userId = user._id;

    console.log('Login successful:', user.name);
    res.json({
      token,
      userName: user.name,
      // redirect: '/receptionist_newVisitor_entry.html',
      redirect: '/protected/receptionist_newVisitor_entry.html', // Updated path
    });


  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).send('You must be logged in to access this resource');
}


app.get('/check-auth', (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});




// Logout a user
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
    res.clearCookie('connect.sid'); // Adjust cookie name as needed
    res.json({ message: 'Logged out successfully.' });
  });
});



function cleanAndFormatPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    console.error('Invalid phoneNumber:', phoneNumber);
    return phoneNumber;
  }

  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  if (cleanedNumber.startsWith('0')) {
    return `+234${cleanedNumber.slice(1)}`;
  }

  if (cleanedNumber.startsWith('234')) {
    return `+${cleanedNumber}`;
  }

  return `+234${cleanedNumber}`;
}


// Protected route example
// app.get('/dashboard', isAuthenticated, (req, res) => {
//   res.send('Welcome to your dashboard');
// });
app.get('/dashboard', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const client = new MongoClient(process.env.MONGO_URI);
  let user = {}, statusDoc = {}, recentApps = [], autoModeLogs = [];
  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    user = await db.collection('Users_CV_biodata').findOne(
      { _id: userId },
      { projection: { name: 1, email: 1, subscription: 1, autoMode: 1, interviewHelper: 1 } }
    ) || {};
    statusDoc = await db.collection('application_status').findOne({ userId }) || {};
    recentApps = await db.collection('applicationProcessingFeeder')
      .find({ userId, role_processed: true })
      .sort({ processedAt: -1 }).limit(20).toArray();
    const today = new Date(); today.setHours(0,0,0,0);
    autoModeLogs = await db.collection('autoMode_daily_log')
      .find({ userId, date: { $gte: today } }).toArray();
  } catch(e) { console.error('[Dashboard]', e.message); }
  finally { await client.close(); }

  const plan = user.subscription?.plan || 'None';
  const appsTotal = statusDoc.successfulApplications || 0;
  const appsToday = recentApps.filter(a => new Date(a.processedAt) >= new Date(new Date().setHours(0,0,0,0))).length;
  const subExpiry = user.subscription?.expirationDate ? new Date(user.subscription.expirationDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : 'N/A';
  const subStatus = user.subscription?.expirationDate && new Date(user.subscription.expirationDate) > new Date() ? 'Active' : 'Expired';
  const autoMode = user.autoMode === true;
  const oauthConnected = !!(user.gmailAuthorized);
  const isStopped = statusDoc.isStopped === true;

  const appRows = recentApps.map(a => `
    <tr>
      <td>${a.role || a.title || '-'}</td>
      <td style="font-size:12px">${a.processedAt ? new Date(a.processedAt).toLocaleString() : '-'}</td>
      <td><span class="badge-green">Sent</span></td>
    </tr>`).join('');

  const autoRows = autoModeLogs.map(a => `
    <tr>
      <td>${a.role || '-'}</td>
      <td>${a.company || '-'}</td>
      <td style="font-size:12px">${a.appliedAt ? new Date(a.appliedAt).toLocaleString() : '-'}</td>
    </tr>`).join('');

  // Load plan config for dashboard topup section
  let dashPlans = {};
  try { dashPlans = await getPlanConfig(); } catch(e) { /* use defaults */ }

  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>My Dashboard — Suntrenia</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#1a1a2e;font-family:Inter,sans-serif;color:#f0f0f0;min-height:100vh;}
    .topbar{background:#16213e;border-bottom:1px solid rgba(124,58,237,0.3);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:fixed;top:0;width:100%;z-index:100;}
    .logo{color:#7c3aed;font-size:20px;font-weight:700;}
    .nav a{color:#a0a0b0;text-decoration:none;font-size:14px;margin-left:20px;}
    .nav a:hover{color:#f0f0f0;}
    .content{padding:80px 24px 40px;max-width:1100px;margin:0 auto;}
    .welcome{font-size:22px;font-weight:700;margin-bottom:4px;}
    .sub-welcome{color:#a0a0b0;font-size:14px;margin-bottom:24px;}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:24px;}
    .stat-card{background:#16213e;border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:18px 20px;}
    .stat-label{color:#a0a0b0;font-size:11px;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
    .stat-value{font-size:24px;font-weight:700;color:#7c3aed;}
    .stat-value.green{color:#10b981;}
    .stat-value.red{color:#ef4444;}
    .stat-value.yellow{color:#f59e0b;}
    .card{background:#16213e;border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:22px;margin-bottom:20px;}
    .card-title{font-size:14px;font-weight:600;margin-bottom:16px;color:#e0e0f0;}
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}
    @media(max-width:700px){.two-col{grid-template-columns:1fr;}}
    table{width:100%;border-collapse:collapse;font-size:13px;}
    th{text-align:left;padding:9px 12px;color:#a0a0b0;border-bottom:1px solid rgba(124,58,237,0.1);font-weight:500;font-size:11px;text-transform:uppercase;}
    td{padding:9px 12px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle;}
    .badge-green{background:rgba(16,185,129,0.15);color:#10b981;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-red{background:rgba(239,68,68,0.15);color:#ef4444;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-purple{background:rgba(124,58,237,0.15);color:#a78bfa;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-yellow{background:rgba(245,158,11,0.15);color:#f59e0b;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
    .toggle-row:last-child{border-bottom:none;padding-bottom:0;}
    .toggle-label{font-size:14px;font-weight:500;}
    .toggle-desc{font-size:12px;color:#a0a0b0;margin-top:3px;}
    .toggle{position:relative;width:44px;height:24px;flex-shrink:0;}
    .toggle input{opacity:0;width:0;height:0;}
    .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#2d2d4d;border-radius:24px;transition:0.3s;}
    .slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background:white;border-radius:50%;transition:0.3s;}
    input:checked+.slider{background:#7c3aed;}
    input:checked+.slider:before{transform:translateX(20px);}
    .btn{padding:10px 20px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;}
    .btn-primary{background:#7c3aed;color:white;}
    .btn-secondary{background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);}
    .btn-success{background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);}
    .btn-danger{background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);}
    .status-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;}
    .dot-green{background:#10b981;}
    .dot-red{background:#ef4444;}
    .section-title{font-size:16px;font-weight:700;margin:24px 0 12px;color:#a78bfa;}
    .alert{padding:12px 16px;border-radius:8px;margin-bottom:20px;font-size:14px;}
    .alert-success{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10b981;}
    .alert-warning{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);color:#f59e0b;}
    .table-wrap{overflow-x:auto;}
    .topup-plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:12px;}
    .plan-card{background:#0f3460;border:1px solid rgba(124,58,237,0.2);border-radius:10px;padding:16px;text-align:center;}
    .plan-name{font-size:15px;font-weight:700;color:#a78bfa;margin-bottom:6px;}
    .plan-apps{font-size:12px;color:#a0a0b0;margin-bottom:12px;}
    .plan-price{font-size:20px;font-weight:700;color:#f0f0f0;margin-bottom:12px;}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="logo">Suntrenia</div>
    <div class="nav">
      <a href="/dashboard">Dashboard</a>
      <a href="/user/settings">Settings</a>
      <a href="/logout">Logout</a>
    </div>
  </div>
  <div class="content">
    <div class="welcome">Welcome back, ${user.name?.split(' ')[0] || 'there'} 👋</div>
    <div class="sub-welcome">${user.email || ''}</div>

    ${isStopped ? '<div class="alert alert-warning">⚠️ Your account applications are currently paused. Contact support or wait for admin to resume.</div>' : ''}
    ${req.query.success ? `<div class="alert alert-success">✅ ${decodeURIComponent(req.query.success)}</div>` : ''}

    <div class="stats">
      <div class="stat-card"><div class="stat-label">Plan</div><div class="stat-value" style="font-size:18px;padding-top:4px">${plan}</div></div>
      <div class="stat-card"><div class="stat-label">Status</div><div class="stat-value ${subStatus === 'Active' ? 'green' : 'red'}" style="font-size:18px;padding-top:4px">${subStatus}</div></div>
      <div class="stat-card"><div class="stat-label">Expires</div><div class="stat-value" style="font-size:15px;padding-top:6px">${subExpiry}</div></div>
      <div class="stat-card"><div class="stat-label">Apps Today</div><div class="stat-value green">${appsToday}</div></div>
      <div class="stat-card"><div class="stat-label">Apps Total</div><div class="stat-value">${appsTotal}</div></div>
      <div class="stat-card"><div class="stat-label">Mode</div><div class="stat-value ${autoMode ? 'yellow' : 'green'}" style="font-size:15px;padding-top:6px">${autoMode ? 'Auto' : 'Consent'}</div></div>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title">Account Settings</div>
        <div class="toggle-row">
          <div>
            <div class="toggle-label">Application Mode</div>
            <div class="toggle-desc">${autoMode ? 'Auto Mode — system applies automatically' : 'Consent Mode — you approve each application'}</div>
          </div>
          <label class="toggle">
            <input type="checkbox" id="autoModeToggle" ${autoMode ? 'checked' : ''} onchange="toggleAutoMode(this)">
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div>
            <div class="toggle-label">Gmail Authorization</div>
            <div class="toggle-desc">${oauthConnected ? '✅ Connected — emails sent from your Gmail' : '⚠️ Not connected — using Suntrenia SMTP'}</div>
          </div>
          <a href="/settings/email-authorization" class="btn ${oauthConnected ? 'btn-success' : 'btn-secondary'}" style="font-size:12px;padding:6px 14px">${oauthConnected ? 'Manage' : 'Connect'}</a>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Subscription Details</div>
        <table>
          <tr><td style="color:#a0a0b0;font-size:12px">Plan</td><td><span class="badge-purple">${plan}</span></td></tr>
          <tr><td style="color:#a0a0b0;font-size:12px">Status</td><td><span class="${subStatus === 'Active' ? 'badge-green' : 'badge-red'}">${subStatus}</span></td></tr>
          <tr><td style="color:#a0a0b0;font-size:12px">Expires</td><td style="font-size:13px">${subExpiry}</td></tr>
          <tr><td style="color:#a0a0b0;font-size:12px">Apps Sent</td><td style="font-weight:600">${appsTotal}</td></tr>
          <tr><td style="color:#a0a0b0;font-size:12px">Interview Helper</td><td><span class="${user.interviewHelper?.access ? 'badge-green' : 'badge-red'}">${user.interviewHelper?.access ? 'Unlocked' : 'Locked'}</span></td></tr>
        </table>
      </div>
    </div>

    <div class="section-title">Top Up Subscription</div>
    <div class="card">
      <div class="card-title">Choose a plan to activate or extend your subscription</div>
      <div class="topup-plans" id="topupPlans">
        <div style="color:#a0a0b0;font-size:13px">Loading plans...</div>
      </div>
    </div>

    ${autoMode && autoRows ? `
    <div class="section-title">Today's Auto-Applied Jobs</div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Role</th><th>Company</th><th>Applied At</th></tr></thead>
          <tbody>${autoRows}</tbody>
        </table>
      </div>
    </div>` : ''}

    <div class="section-title">Recent Applications</div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Role</th><th>Applied At</th><th>Status</th></tr></thead>
          <tbody>${appRows || '<tr><td colspan=3 style="color:#a0a0b0;text-align:center;padding:20px">No applications yet</td></tr>'}</tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    async function toggleAutoMode(checkbox) {
      const mode = checkbox.checked;
      try {
        const res = await fetch('/user/toggle-automode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ autoMode: mode })
        });
        const data = await res.json();
        if (data.success) {
          window.location.href = '/dashboard?success=' + encodeURIComponent('Mode updated to ' + (mode ? 'Auto' : 'Consent'));
        } else {
          alert('Failed to update mode: ' + (data.message || 'Unknown error'));
          checkbox.checked = !mode;
        }
      } catch(e) {
        alert('Network error. Please try again.');
        checkbox.checked = !mode;
      }
    }

    async function loadTopupPlans() {
      try {
        const r = await fetch('/api/get-plan-config');
        const data = await r.json();
        if (!data.success) throw new Error('Failed');
        const plans = data.plans;
        const order = ['basic', 'standard', 'premium'];
        const container = document.getElementById('topupPlans');
        if (!container) return;
        let html = '';
        order.forEach(function(key, idx) {
          const p = plans[key];
          if (!p) return;
          const highlighted = idx === 1;
          const borderStyle = highlighted ? ' style="border-color:rgba(124,58,237,0.5)"' : '';
          const nameStyle = highlighted ? ' style="color:#7c3aed"' : '';
          const btnClass = highlighted ? 'btn btn-primary' : 'btn btn-secondary';
          const star = highlighted ? ' ⭐' : '';
          const highlightHtml = p.highlight ? '<div style="font-size:11px;color:#10b981;margin-bottom:6px">' + p.highlight + '</div>' : '';
          const price = p.price.toLocaleString ? p.price.toLocaleString() : p.price;
          html += '<div class="plan-card"' + borderStyle + '>';
          html += '<div class="plan-name"' + nameStyle + '>' + p.name + star + '</div>';
          html += highlightHtml;
          html += '<div class="plan-apps">Up to ' + p.applications + ' applications · ' + p.durationDays + ' days</div>';
          html += '<div class="plan-price">\u20A6' + price + '</div>';
          html += '<button class="' + btnClass + '" onclick="topUp(\'' + p.name + '\')" style="width:100%">Activate</button>';
          html += '</div>';
        });
        container.innerHTML = html;
      } catch(e) {
        const container = document.getElementById('topupPlans');
        if (container) container.innerHTML = '<div style="color:#ef4444;font-size:13px">Could not load plans. Please refresh.</div>';
      }
    }
    loadTopupPlans();

    async function topUp(plan) {
      if (!confirm('Activate ' + plan + ' plan? This will start your new subscription immediately.')) return;
      try {
        const res = await fetch('/api/submit-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, date: new Date().toISOString() })
        });
        const data = await res.json();
        if (res.ok) {
          window.location.href = '/dashboard?success=' + encodeURIComponent(plan + ' plan activated successfully!');
        } else {
          alert('Error: ' + (data.message || 'Could not activate plan'));
        }
      } catch(e) {
        alert('Network error. Please try again.');
      }
    }
  </script>
</body>
</html>`);
});


const formatDate2 = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const currentDate = new Date();

const formattedToday2 = formatDate2(currentDate);

const lastWeek2 = new Date(currentDate);
lastWeek2.setDate(lastWeek2.getDate() - 7);
const formattedStartDate2 = formatDate2(lastWeek2);

const timeFrame = `from ${formattedStartDate2} to ${formattedToday2}`;

const groupId = "2347035517578"



///////////////////////////////////////////////////////////////////////////////////////////////////
function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 5).toUpperCase(); // Generates a 3-letter unique code
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Modify this part for fetching userId8 dynamically based on session or session token
// Declare variables globally so they can be accessed outside Resume_Details
let applicantName = " "; // Default value
let accessedRoleTime = new Date().toISOString().replace(/[:.]/g, '-');
let uniqueCode = generateUniqueCode();

// Function to fetch userId from sessionToken
async function fetchUserIdBySessionToken(sessionToken) {
  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db('olukayode_sage');
    const sessionsCollection = database.collection('sessions');

    // Query the database to find the user by sessionToken
    const sessionData = await sessionsCollection.findOne({ sessionToken });

    if (sessionData) {
      const userId = sessionData.userId;
      console.log(`Retrieved User ID: ${userId}`); // Corrected this line to use backticks for template literals
      return userId;
    } else {
      console.log("User ID not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user ID by session token:", error);
    return null;
  }
}

// Function to get userId dynamically from session or session token
async function getUserIdFromSession(session, sessionToken) {
  const userId8 = session?.userId || await fetchUserIdBySessionToken(sessionToken);
  return userId8;
}

// Modified Resume_Details function that directly fetches applicant name from user_cv_bidata
async function Resume_Details(session, sessionToken) {
  let client, database;
  let applicantName = " "; // Default value

  // Get userId8 dynamically from the session or session token
  const userId8 = await getUserIdFromSession(session, sessionToken);

  try {
    // Connect to the database
    ({ client, database } = await connectToDatabase2());
    
    // Fetch applicant name from the user_cv_bidata collection using the userId8
    const collection = database.collection('Users_CV_biodata');
    const user = await collection.findOne({ userId: userId8 });
    
    // If user exists, fetch their name
    if (user) {
      applicantName = user.name;
    }
  } catch (error) {
    console.error("Error fetching applicant name:", error);
    applicantName = "Unknown"; // In case of error, use default name
  } finally {
    if (client) {
      await client.close();
    }
  }

  // Now use the fetched applicantName and userId8 for further logic
  console.log(`Applicant Name: ${applicantName}, User ID: ${userId8}`);

  // Remaining logic for Resume_Details...
  // You can use applicantName and userId8 in the following operations
  // For example, generating a filename:
  const formattedDateToday = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
 const safeUserId = (userId8 || 'pending').toString().replace(/[^a-zA-Z0-9]/g, '');
const filename = `${applicantName}__${formattedDateToday}_CV_${safeUserId}.pdf`;
  const filePath = path.join(__dirname, "uploads", filename);

  console.log("Generated Filename:", filename);
  console.log("File Path:", filePath);

  // More logic can go here...
}

// Main function to invoke Resume_Details
// main3() is called only when a valid session exists — never at startup
async function main3(activeSession, activeSessionToken) {
  await Resume_Details(activeSession, activeSessionToken);
  const formattedDateToday = new Date().toISOString().slice(0, 10);
  const uniqueCode = Math.random().toString(36).substr(2, 5).toUpperCase();
  const filename = gatePassUniqueFilename('User', 'CV', formattedDateToday, uniqueCode);
  const filePath = path.join(__dirname, "uploads", filename);
  console.log("Generated Filename:", filename);
  console.log("File Path:", filePath);
}
const today = new Date();


const formatDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formattedToday = formatDate(today);

// /////////////////////////////////////////////////////////////////////////////yyyyyyyyyyyyyyyyyyyyyyyy

const gatePassDownloadsFolderPath = path.join(__dirname, '..', 'downloads');


// Function to generate the unique filename
// const gatePassUniqueFilename = () => {
//   return `${applicantName}__${accessedRoleTime}_accessed_role_${uniqueCode}.pdf`;
// };
const gatePassUniqueFilename = (applicantName, appliedRole, formattedDateToday, uniqueCode) => {
  // ✅ Provide fallback for missing values and trim whitespace
  const safeName = (applicantName || 'Unknown').trim().replace(/\s+/g, '_');
  const safeRole = (appliedRole || 'Role').trim().replace(/\s+/g, '_');
  const safeDate = formattedDateToday || new Date().toISOString().slice(0, 10);
  const safeCode = uniqueCode || Math.random().toString(36).substr(2, 5).toUpperCase();
  
  return `${safeName}_${safeRole}_${safeDate}_${safeCode}.pdf`;
};;
// Example usage
// ✅ Placeholder path — real filename is generated inside sendEmailWithAttachment()
// with actual applicantName, appliedRole, date and uniqueCode
const gatePassPdfPath = path.join(gatePassDownloadsFolderPath, 'pending_cv.pdf');
console.log("Generated Path:", gatePassPdfPath);



app.use(session({
  secret: sessionSecret, // Use the generated secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
  //cookie: {secure: true }
}));


// }


async function getUserPreferences(session) {
  try {
    console.log('Connecting to the database...');
    await client.connect();
    const database = client.db('olukayode_sage');
    const users = database.collection('Users_CV_biodata');

    const userId = session.userId;
    if (!userId) {
      throw new Error('User ID not found in session.');
    }
    console.log('Session userId:', userId);

    // Check if the ID is a valid ObjectId, otherwise treat it as a string
    const query = ObjectId.isValid(userId)
      ? { _id: new ObjectId(userId) }
      : { _id: userId };

    console.log('Fetching preferences for user:', userId);
    const user = await users.findOne(query);

    if (user) {
      const desiredJobTitle = user.jobTitle || 'default job title';
      //const desiredJobTitle = user.jobTitle || user.education?.[0]?.jobTitle || "No job title found";
      //  const desiredJobTitle = user.desiredJobTitle || 'default job title';
      console.log('Desired job title found:', desiredJobTitle);
      return desiredJobTitle;

    } else {
      console.log('No user document found.');
      return 'default job title';
    }
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return 'default job title';
  } finally {
    console.log('Closing the database connection.');
    await client.close();
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to select a random User-Agent
const selectRandomUserAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
  ];

  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
};

let roleBatchId; // Declare a global variable to store the batch ID


// ================================================================
// BLOCK A — Paste this DIRECTLY ABOVE fetchDataWithAxios (~line 1039)
// ================================================================
 
// ── Field slug map for MyJobMag (confirmed from live site) ──────
const FIELD_SLUG_MAP = {
  'data analyst':      'research-data-analysis',
  'data scientist':    'research-data-analysis',
  'business analyst':  'research-data-analysis',
  'data engineer':     'research-data-analysis',
  'machine learning':  'research-data-analysis',
  'ai ':               'research-data-analysis',
  'software':          'information-technology',
  'developer':         'information-technology',
  'web developer':     'information-technology',
  'frontend':          'information-technology',
  'backend':           'information-technology',
  'fullstack':         'information-technology',
  'devops':            'information-technology',
  'cybersecurity':     'information-technology',
  'it ':               'information-technology',
  'engineer':          'engineering',
  'accountant':        'accounting-audit',
  'finance':           'accounting-audit',
  'audit':             'accounting-audit',
  'sales':             'sales-marketing',
  'marketing':         'marketing-communication',
  'product manager':   'product-management',
  'project manager':   'project-management',
  'hr ':               'human-resources',
  'human resources':   'human-resources',
  'legal':             'legal',
  'medical':           'medical',
  'healthcare':        'medical',
  'nurse':             'medical',
  'logistics':         'logistics',
  'supply chain':      'procurement-store-keeping',
  'procurement':       'procurement-store-keeping',
  'admin':             'administration',
  'customer service':  'customer-care',
  'customer care':     'customer-care',
  'customer success':  'customer-care',
  'content':           'content-editorial',
  'copywriter':        'content-editorial',
  'journalist':        'content-editorial',
  'ux ':               'ux-design-architecture',
  'ui ':               'ux-design-architecture',
  'design':            'ux-design-architecture',
  'architect':         'ux-design-architecture',
  'ngo':               'ngo',
  'nonprofit':         'ngo',
  'research':          'research',
  'science':           'science',
  'oil':               'oil-refining-and-marketing',
  'gas':               'oil-refining-and-marketing',
  'energy':            'oil-refining-and-marketing',
  'insurance':         'insurance',
  'banking':           'banking',
  'security':          'security',
};
 
function resolveFieldSlug(jobTitle) {
  const lower = jobTitle.toLowerCase();
  for (const [keyword, slug] of Object.entries(FIELD_SLUG_MAP)) {
    if (lower.includes(keyword.trim())) return slug;
  }
  return 'general';
}

// ── FIXED: fetchDataWithAxios ────────────────────────────────────
// Drop-in replacement — same signature, same output shape
// Output: [{ userId, title, link, jobDate, description }]
// ================================================================
// BLOCK B — Replace the ENTIRE fetchDataWithAxios function
// Find: const fetchDataWithAxios = async (query, startIndex = 0, userId) => {
// Replace everything from that line to its closing }; with this
// ================================================================





const fetchDataWithAxios = async (query, startIndex = 0, userId) => {
  const userAgent = selectRandomUserAgent();

  // Extract raw job title — strips "site:myjobmag.com" if present
  const rawTitle = query.replace(/site:\S+/gi, '').trim();
  const slug     = resolveFieldSlug(rawTitle);
  const page     = Math.floor(startIndex / 10) + 1;

  // FIXED URL — /jobs-by-field/{slug} (confirmed from live site)
  const url = `https://www.myjobmag.com/jobs-by-field/${slug}?page=${page}`;
  console.log(`[MyJobMag] Fetching page ${page} → ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':      userAgent,
        'Referer':         'https://www.google.com/',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept':          'text/html,application/xhtml+xml,*/*;q=0.8',
        'Cache-Control':   'no-cache',
      },
      timeout: 20000,
    });

    const html = response.data;
    const $    = cheerio.load(html);
    const results = [];

    // Query words used for relevance filtering (words > 2 chars)
    const queryWords = rawTitle.toLowerCase()
      .split(' ')
      .filter(w => w.length > 2);

    $('ul li').each((index, element) => {
      const jobElement  = $(element);
      const titleEl     = jobElement.find('h2 a');
      const title       = titleEl.text().trim();
      const href        = titleEl.attr('href');
      const link        = href && href.startsWith('/job/')
                          ? `https://www.myjobmag.com${href}`
                          : null;

      // FIX 1: Clean jobDate — strip whitespace, newlines and
      // embedded location text (e.g. "20 April \n \n Yobe")
      const rawJobDate  = jobElement.find('li').last().text().trim() || '';
      const jobDate     = rawJobDate.split('\n')[0].trim()
                          || new Date().toLocaleDateString();

      const description = jobElement.find('p').first().text().trim() || '';

      // FIX 2: Relevance filter — only include jobs that match
      // at least one word from the user's desired job title
      const titleLower  = title.toLowerCase();
      const isRelevant  = queryWords.some(word => titleLower.includes(word));

      if (link && title && isRelevant) {
        results.push({ userId, title, link, jobDate, description });
      }
    });

    console.log(`[MyJobMag] Page ${page}: found ${results.length} relevant jobs for "${rawTitle}"`);
    return results;

  } catch (error) {
    console.error(`[MyJobMag] Error fetching page ${page}:`, error.message);
    if (error.response?.status === 403) {
      console.warn('[MyJobMag] ⚠️ Blocked — fallback sources will compensate');
    }
    return [];
  }
};

// ── END OF BLOCK B ───────────────────────────────────────────────
 // ── Jobzilla scraper (no API key needed) ────────────────────────
async function scrapeJobzillaJobs(rawTitle, userId, pages = 2) {
  const results = [];
  const userAgent = selectRandomUserAgent();
  for (let page = 1; page <= pages; page++) {
    try {
      const url = `https://www.jobzilla.ng/jobs?q=${encodeURIComponent(rawTitle)}&page=${page}`;
      console.log(`[Jobzilla] Fetching page ${page} → ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': userAgent,
          'Referer': 'https://www.google.com/',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
        },
        timeout: 15000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        decompress: true,
      });
      const $ = cheerio.load(response.data);
      // Jobzilla uses article tags or .job-item containers
      $('article, .job-item, .job-listing, li.job').each((i, el) => {
        const titleEl    = $(el).find('h2 a, h3 a, .job-title a').first();
        const title      = titleEl.text().trim();
        const href       = titleEl.attr('href');
        const link       = href
          ? (href.startsWith('http') ? href : `https://www.jobzilla.ng${href}`)
          : null;
        const jobDate    = $(el).find('.date, .job-date, time').first().text().trim()
                           || new Date().toLocaleDateString();
        const description = $(el).find('p, .job-desc, .job-excerpt').first().text().trim() || '';
        if (link && title) {
          results.push({ userId, title, link, jobDate, description });
        }
      });
      console.log(`[Jobzilla] Page ${page}: found ${results.length} total so far`);
      await new Promise(r => setTimeout(r, randomDelay()));
    } catch (err) {
      console.error(`[Jobzilla] Error on page ${page}:`, err.message);
    }
  }
  return results;
}
// ── API FALLBACKS — output same shape: { userId, title, link, jobDate, description }
 // ── Jobberman scraper (no API key needed) ───────────────────────
async function scrapeJobbermanJobs(rawTitle, userId, pages = 2) {
  const results = [];
  const userAgent = selectRandomUserAgent();
  for (let page = 1; page <= pages; page++) {
    try {
      const url = `https://www.jobberman.com/jobs?q=${encodeURIComponent(rawTitle)}&page=${page}`;
      console.log(`[Jobberman] Fetching page ${page} → ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': userAgent,
          'Referer': 'https://www.google.com/',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        },
        timeout: 15000,
      });
      const $ = cheerio.load(response.data);
      // Jobberman uses article or .job-listing__item containers
      $('article, .job-listing__item, .job-card, li.job').each((i, el) => {
        const titleEl    = $(el).find('h2 a, h3 a, .job-title a, a[data-cy="job-title"]').first();
        const title      = titleEl.text().trim();
        const href       = titleEl.attr('href');
        const link       = href
          ? (href.startsWith('http') ? href : `https://www.jobberman.com${href}`)
          : null;
        const jobDate    = $(el).find('.date, time, .job-date, [data-cy="posted-date"]').first().text().trim()
                           || new Date().toLocaleDateString();
        const description = $(el).find('p, .job-desc, .job-excerpt').first().text().trim() || '';
        if (link && title && !link.includes('/company/')) {
          results.push({ userId, title, link, jobDate, description });
        }
      });
      console.log(`[Jobberman] Page ${page}: found ${results.length} total so far`);
      await new Promise(r => setTimeout(r, randomDelay()));
    } catch (err) {
      console.error(`[Jobberman] Error on page ${page}:`, err.message);
    }
  }
  return results;
}
 
// ── Remotive API (remote jobs, no key needed) ───────────────────
async function fetchRemotiveJobs(rawTitle, userId) {
  try {
    const res = await axios.get('https://remotive.com/api/remote-jobs', {
      params: { search: rawTitle, limit: 20 },
      timeout: 10000,
    });
    return (res.data.jobs || []).map(j => ({
      userId,
      title:       j.title,
      link:        j.url,
      jobDate:     new Date(j.publication_date).toLocaleDateString(),
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) || '',
    }));
  } catch (err) {
    console.error('[Remotive] Error:', err.message);
    return [];
  }
}
// Arbeitnow — remote/EU jobs, no auth needed
async function fetchArbeitnowJobs(rawTitle, userId) {
  try {
    const res = await axios.get('https://www.arbeitnow.com/api/job-board-api', {
      params: { search: rawTitle },
      timeout: 10000,
    });
    return (res.data.data || []).slice(0, 20).map(j => ({
      userId,
      title:       j.title,
      link:        j.url,
      jobDate:     new Date(j.created_at * 1000).toLocaleDateString(),
      description: j.description?.replace(/<[^>]*>/g, '').slice(0, 300) || '',
    }));
  } catch (err) {
    console.error('[Arbeitnow] Error:', err.message);
    return [];
  }
}
 
// Adzuna — Nigeria focused, needs free API key
// ── Adzuna API (Nigeria-focused, free key needed) ───────────────
async function fetchAdzunaJobs(rawTitle, userId) {
  const appId  = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    console.warn('[Adzuna] Missing ADZUNA_APP_ID or ADZUNA_APP_KEY — skipping');
    return [];
  }
// ✅ Try Nigeria first, fall back to UK if 404
  const countries = ['ng', 'gb', 'us'];
  for (const country of countries) {
    try {
      console.log(`[Adzuna] Trying country: ${country}`);
      const res = await axios.get(`https://api.adzuna.com/v1/api/jobs/${country}/search/1`, {
        params: { app_id: appId, app_key: appKey, what: rawTitle, results_per_page: 20 },
        timeout: 10000,
      });
      const jobs = (res.data.results || []).map(j => ({
        userId,
        title:       j.title,
        link:        j.redirect_url,
        jobDate:     new Date(j.created).toLocaleDateString(),
        description: j.description || '',
      }));
      console.log(`[Adzuna] ✅ ${country}: found ${jobs.length} jobs`);
      return jobs;
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn(`[Adzuna] ${country} returned 404, trying next country...`);
        continue;
      }
      console.error(`[Adzuna] Error on ${country}:`, err.message);
      return [];
    }
  }
  console.warn('[Adzuna] All countries failed');
  return [];
}
 
// Jobicy — remote jobs, free
async function fetchJobicyJobs(rawTitle, userId) {
  try {
    const res = await axios.get('https://jobicy.com/api/v2/remote-jobs', {
      params: { count: 20, tag: rawTitle.toLowerCase().replace(/\s+/g, '-') },
      timeout: 10000,
    });
    return (res.data.jobs || []).map(j => ({
      userId,
      title:       j.jobTitle,
      link:        j.url,
      jobDate:     new Date(j.pubDate).toLocaleDateString(),
      description: j.jobExcerpt || '',
    }));
  } catch (err) {
    console.error('[Jobicy] Error:', err.message);
    return [];
  }
}


// ── JSearch API (LinkedIn+Indeed+Glassdoor via RapidAPI) ────────
async function fetchJSearchJobs(rawTitle, userId) {
  const apiKey = process.env.JSEARCH_API_KEY;
  if (!apiKey) {
    console.warn('[JSearch] Missing JSEARCH_API_KEY — skipping');
    return [];
  }
  try {
    const res = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query:       `${rawTitle} in Nigeria OR Remote`,
        page:        '1',
        num_pages:   '2',
        date_posted: 'month',
      },
      headers: {
        'X-RapidAPI-Key':  apiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      timeout: 10000,
    });
    return (res.data.data || []).map(j => ({
      userId,
      title:       j.job_title,
      link:        j.job_apply_link || j.job_google_link,
      jobDate:     j.job_posted_at_datetime_utc
                   ? new Date(j.job_posted_at_datetime_utc).toLocaleDateString()
                   : new Date().toLocaleDateString(),
      description: j.job_description?.slice(0, 300) || '',
    }));
  } catch (err) {
    console.error('[JSearch] Error:', err.message);
    return [];
  }
}
 


// ================================================================
// BLOCK C — Replace the ENTIRE fetchMultiplePagesWithAxios function
// Find: const fetchMultiplePagesWithAxios = async (query, pages = 3, userId) => {
// Replace everything from that line to its closing }; with this
// ================================================================

const fetchMultiplePagesWithAxios = async (query, pages = 3, userId) => {
  const results = [];

  // Extract raw job title from query
  const rawTitle = query.replace(/site:\S+/gi, '').trim();

  // ── TIER 1: MyJobMag scraping (fixed, primary Nigerian source) ─
  console.log(`[JobFetch] Starting MyJobMag scrape for: "${rawTitle}"`);
  for (let i = 0; i < pages; i++) {
    const startIndex = i * 10;
    try {
      const pageResults = await fetchDataWithAxios(query, startIndex, userId);
      results.push(...pageResults);
    } catch (error) {
      console.error(`[MyJobMag] Error on page ${i + 1}:`, error.message);
    }
    await new Promise(resolve => setTimeout(resolve, randomDelay()));
  }
  console.log(`[JobFetch] MyJobMag total: ${results.length} jobs`);

  // ── TIER 2: Jobzilla + Jobberman (free scrapers, no API key) ──
  // Run in parallel as backup — these don't need API keys
  const [jobzillaRes, jobbermanRes] = await Promise.allSettled([
    scrapeJobzillaJobs(rawTitle, userId, 2),
    scrapeJobbermanJobs(rawTitle, userId, 2),
  ]);
  const nigerianBackup = [
    ...(jobzillaRes.status  === 'fulfilled' ? jobzillaRes.value  : []),
    ...(jobbermanRes.status === 'fulfilled' ? jobbermanRes.value : []),
  ];
  console.log(`[JobFetch] Jobzilla+Jobberman backup: ${nigerianBackup.length} jobs`);
  results.push(...nigerianBackup);

  // ── TIER 3: International API sources (parallel) ───────────────
  // Free sources first (no key), then paid (key required)
  const [remotiveRes, arbeitnowRes, jobicyRes, adzunaRes, jsearchRes] =
    await Promise.allSettled([
      fetchRemotiveJobs(rawTitle, userId),    // free, no key
      fetchArbeitnowJobs(rawTitle, userId),   // free, no key
      fetchJobicyJobs(rawTitle, userId),      // free, no key
      fetchAdzunaJobs(rawTitle, userId),      // free key: developer.adzuna.com
      fetchJSearchJobs(rawTitle, userId),     // free key: rapidapi.com (JSearch)
    ]);

  const internationalJobs = [
    ...(remotiveRes.status   === 'fulfilled' ? remotiveRes.value   : []),
    ...(arbeitnowRes.status  === 'fulfilled' ? arbeitnowRes.value  : []),
    ...(jobicyRes.status     === 'fulfilled' ? jobicyRes.value     : []),
    ...(adzunaRes.status     === 'fulfilled' ? adzunaRes.value     : []),
    ...(jsearchRes.status    === 'fulfilled' ? jsearchRes.value    : []),
  ];
  console.log(`[JobFetch] International API sources: ${internationalJobs.length} jobs`);
  results.push(...internationalJobs);

  // ── Deduplicate by link ────────────────────────────────────────
  const seen   = new Set();
  const unique = results.filter(r => {
    if (!r.link || seen.has(r.link)) return false;
    seen.add(r.link);
    return true;
  });

  console.log(`[JobFetch] ✅ Grand total unique jobs: ${unique.length}`);
  return unique;
};

// ── END OF BLOCK C ───────────────────────────────────────────────
 
module.exports = { fetchDataWithAxios, fetchMultiplePagesWithAxios };
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 to 5 seconds


///////////////////////////////////////////////////////////////////////////////
async function saveRoleToDB(role, collectionName, userResponse, serialNumber = null, session) {
  const { client, collection } = await connectToDatabase();

  if (!session || !session.userId) {
    console.error("Session or user ID not available.");
    return;
  }

  try {
    // Use the session's userId to make this user-specific
    const userId = session.userId;

    // Check for existing entry with the same role title and URL for this user
    const existingRole = await collection.findOne({
      userId: userId, // Ensure it checks only for this user's data
      role: role.title,
      url: role.link
    });

    if (existingRole) {
      console.log(`Role "${role.title}" with URL "${role.link}" already exists for user "${userId}". Skipping insertion.`);

      // Optionally, update the existing entry
      await collection.updateOne(
        { _id: existingRole._id },
        {
          $set: {
            date: new Date().toLocaleDateString(),
            userResponse: userResponse || 'no response',
            serialNumber: serialNumber || null
          }
        }
      );
      console.log(`Role "${role.title}" updated for user "${userId}".`);
    } else {
      // Check if roleBatchId is already set, otherwise generate a new one
      if (!roleBatchId) {
        roleBatchId = generateUniqueID(); // Generate ID once per batch
      }

      // Prepare the document with user's response and unique ID
      const document = {
        userId: userId, // Add user ID to make the data user-specific
        date: new Date().toLocaleDateString(), // current date
        role: role.title,
        url: role.link,
        userResponse: userResponse || 'no response', // Handle null or undefined responses
        serialNumber: serialNumber || null, // Add serial number if available
        uniqueId: "Job_role_" + roleBatchId, // Use the generated batch ID
      };

      // Insert the new document
      await collection.insertOne(document);
      console.log(`Role "${role.title}" added for user "${userId}".`);
    }

    // Remove exact duplicates for this user
    const duplicates = await collection.aggregate([
      {
        $match: {
          userId: userId // Only match duplicates for this user
        }
      },
      {
        $group: {
          _id: { url: "$url", role: "$role", date: "$date" },
          count: { $sum: 1 },
          docs: { $push: "$_id" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]).toArray();

    for (const duplicate of duplicates) {
      const [keepId, ...deleteIds] = duplicate.docs;
      await collection.deleteMany({ _id: { $in: deleteIds } });
    }

    // Consolidate unique entries for this user
    const uniqueRoles = await collection.aggregate([
      {
        $match: {
          userId: userId // Only match entries for this user
        }
      },
      {
        $group: {
          _id: { role: "$role" },
          doc: { $first: "$$ROOT" }
        }
      }
    ]).toArray();

    const bulkOperations = uniqueRoles.map(role => ({
      updateOne: {
        filter: { _id: role.doc._id },
        update: { $set: role.doc },
        upsert: true
      }
    }));

    await collection.bulkWrite(bulkOperations);

    console.log(`Data cleaned and consolidated successfully for user "${userId}".`);
  } catch (error) {
    console.error("Error saving role to MongoDB:", error);
  } finally {
    await client.close();
  }
}
// saveRoleToDB()

// Function to generate a unique ID (replace with your preferred method)
function generateUniqueID() {
  // Implement your logic to generate a unique ID (e.g., using libraries like nanoid)
  // This example is for illustration and might not be secure for production
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


  
///////////////////////////////////////////////////////////////////////
// ================================================================
// BLOCK D — Replace the ENTIRE filterResults function
// Find: const filterResults = async (results, rolesListing, userId) => {
// Replace everything from that line to its closing }; with this
// ================================================================

const filterResults = async (results, rolesListing, userId) => {
  const filteredResults = results.filter(result => {
    // ── Existing Nigerian sources (logic UNCHANGED) ─────────────
    if (result.link.includes('myjobmag.com')) {
      return !result.link.includes('jobs-by-title');
    } else if (result.link.includes('jobzilla.ng')) {
      return !result.link.includes('categories');
    } else if (result.link.includes('jobberman.com')) {
      return !result.link.includes('company');
    }
    // ── NEW: International API sources ──────────────────────────
    else if (
      result.link.includes('remotive.com')    ||
      result.link.includes('arbeitnow.com')   ||
      result.link.includes('jobicy.com')      ||
      result.link.includes('adzuna.com')      ||
      result.link.includes('linkedin.com')    ||
      result.link.includes('indeed.com')      ||
      result.link.includes('glassdoor.com')   ||
      result.link.includes('ziprecruiter.com')||
      result.link.includes('jsearch')         ||
      result.link.includes('rapidapi')
    ) {
      return true;
    }
    return false;
  }).map(result => {
    let jobTitle;
    // ── Existing title parsing (UNCHANGED) ─────────────────────
    if (result.link.includes('myjobmag.com')) {
      const titleMatch = result.title.match(/^(.*?)\s*Jobs/i);
      jobTitle = titleMatch ? titleMatch[1].trim() : result.title;
    } else if (
      result.link.includes('jobzilla.ng')     ||
      result.link.includes('jobberman.com')   ||
      // ── NEW: international sources use title as-is ───────────
      result.link.includes('remotive.com')    ||
      result.link.includes('arbeitnow.com')   ||
      result.link.includes('jobicy.com')      ||
      result.link.includes('adzuna.com')      ||
      result.link.includes('linkedin.com')    ||
      result.link.includes('indeed.com')      ||
      result.link.includes('glassdoor.com')   ||
      result.link.includes('ziprecruiter.com')||
      result.link.includes('jsearch')         ||
      result.link.includes('rapidapi')
    ) {
      jobTitle = result.title;
    }
    // Output shape UNCHANGED — exactly what saveRoleToDB expects
    return { userId, title: jobTitle, link: result.link, jobDate: result.jobDate };
  });

  console.log('Filtered Results:', filteredResults);

  // ── Everything below is 100% UNCHANGED from your original ──────
  for (let i = 0; i < filteredResults.length; i++) {
    const role = filteredResults[i];

    const existingRole = await rolesListing.findOne({
      $and: [
        { userId },
        { $or: [{ link: role.link }, { title: role.title }] },
      ],
    });

    if (existingRole) {
      console.log(`Role with link ${role.link} or title ${role.title} for user ${userId} already exists. Skipping...`);
      continue;
    }

    // Graceful fetch — API source pages won't have MyJobMag selectors
    // so we wrap in try/catch and use sensible defaults if page fails
    let postedDate       = new Date();
    let deadlineDate     = new Date();
    let deadlineDateText = '';
    let postedDateText   = '';
    let daysSincePosted  = 0;
    let daysToDeadline   = 30;
    let isDeadlinePassed = false;

    try {
      const response = await axios.get(role.link, { timeout: 10000 });
      const html = response.data;
      const $    = cheerio.load(html);

      postedDateText = $('#posted-date').text().replace('Posted:', '').trim();
      if (postedDateText) postedDate = new Date(postedDateText);

      deadlineDateText = $('.read-date-sec-li b.tc-bl3').next().text().replace('Deadline:', '').trim();

      if (deadlineDateText === 'Not specified' || !deadlineDateText) {
        deadlineDate     = new Date(postedDate);
        deadlineDate.setDate(deadlineDate.getDate() + 30);
        deadlineDateText = `Computed as ${deadlineDate.toDateString()} (30 days from posted date)`;
      } else {
        deadlineDate = new Date(deadlineDateText);
      }

      const currentDate = new Date();
      daysSincePosted   = Math.round((currentDate - postedDate) / (1000 * 60 * 60 * 24));
      daysToDeadline    = Math.round((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));
      isDeadlinePassed  = currentDate > deadlineDate;

      if (isDeadlinePassed) {
        console.log(`User ${userId}: Job deadline has passed (${deadlineDateText}). Days since posting: ${daysSincePosted}, Days beyond deadline: ${Math.abs(daysToDeadline)}.`);
      } else {
        console.log(`User ${userId}: Job is still active. Posted: ${postedDateText}, Deadline: ${deadlineDateText}. Days since posting: ${daysSincePosted}, Days to deadline: ${daysToDeadline}.`);
      }
    } catch (fetchErr) {
      // API source or unreachable page — use jobDate and 30-day default
      console.warn(`[filterResults] Could not fetch page for "${role.title}": ${fetchErr.message}. Using defaults.`);
      if (role.jobDate) {
        postedDate = new Date(role.jobDate);
        if (isNaN(postedDate)) postedDate = new Date();
      }
      deadlineDate     = new Date(postedDate);
      deadlineDate.setDate(deadlineDate.getDate() + 30);
      deadlineDateText = `Computed as ${deadlineDate.toDateString()} (30 days from posted date)`;
      postedDateText   = postedDate.toDateString();
      daysSincePosted  = 0;
      daysToDeadline   = 30;
      isDeadlinePassed = false;
    }

    const serialNumber = i + 1;

    // Document shape UNCHANGED
    const document = {
      userId,
      title:          role.title,
      link:           role.link,
      jobDate:        role.jobDate,
      serialNumber,
      validated:      false,
      label:          'new',
      postedDate,
      deadlineDate,
      daysSincePosted,
      daysToDeadline: isDeadlinePassed ? null : daysToDeadline,
      isExpired:      isDeadlinePassed,
      timestamp:      new Date(),
    };

    await rolesListing.insertOne(document);
    console.log(`New role added for user ${userId}: ${role.title}`);
  }

  console.log(`Filtered roles have been processed for user ${userId}.`);
  return filteredResults;
};

// ── END OF BLOCK D ───────────────────────────────────────────────
///////////////////////////////////////////////////////////////////////////

let UsersSubscriptionPlan = 'Basic'; // Default plan
let successfulApplications = 0;
let maxRepeats = 0;  // Re-initialized maxRepeats
let subscriptionLimit;
const conversionRate = 0.2;  // Assuming 20% of prompts result in successful applications




const sendSubscriptionExpiryMessage = async (email, session, sessionToken, client) => {
  if (!email) {
      console.error("Email is missing. Aborting email sending.");
      return;
  }

  try {
      await client.connect();
      const database = client.db("olukayode_sage");
      const userCollection = database.collection("Users_CV_biodata");
      const applicationRecords = database.collection("user_application_records");

      // Fetch user ID from session or sessionToken
      const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
      if (!userId) {
          console.error("User ID is missing. Cannot proceed.");
          return;
      }

      console.log(`Retrieved User ID: ${userId}`);

      // Fetch user details
      const user = await userCollection.findOne({ _id: userId });
      let applicantName = user?.name?.trim() || "User";
      let firstName = applicantName.split(" ")[0]; // Extract first name

      // Fetch last few applied jobs
      const recentApplications = await applicationRecords
          .find({ userId })
          .sort({ sentAt: -1 })
          .limit(5)
          .toArray();

      let appliedRolesList = recentApplications
          .map((app) => `- ${app.role}`)
          .join("\n");

      if (!appliedRolesList) appliedRolesList = "No recent applications found.";

      // Construct message
      const messageBody = `
          <html>
              <body style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                      <!-- Header -->
                      <div style="text-align: left; margin-bottom: 20px;">
                          <h2 style="font-size: 18px; color: #333333; margin: 0;">Hey ${firstName},</h2>
                      </div>

                      <!-- Body -->
                      <div style="color: #555555;">
                          <p>How are you doing? Your subscription expired recently, but we added extra days and applications for you!</p>

                          <p>Here are the roles we applied to:</p>
                          <ul style="padding-left: 20px;">
                              ${appliedRolesList.split('\n').map(role => `<li>${role}</li>`).join('')}
                          </ul>

                          <p>We’re optimistic that you’ll receive interview invites soon! Have you gotten any calls or emails from recruiters?</p>

                          <p>Kindly share your testimonials with us! We'd love to support you through the next stage. If you haven’t received any feedback yet, don’t worry! Some recruitment processes take longer. But if you’d like to intensify your search, feel free to top up your subscription.</p>

                          <p>We’re eager to hear some great news from you! Thanks for choosing IntelliJob.</p>
                      </div>

                      <!-- Signature -->
                      <div style="margin-top: 30px;">
                          <p style="margin: 0;"><strong>Kayode</strong></p>
                          <p style="margin: 0; color: #777777;">Founder & CEO, Suntrenia</p>
                      </div>

                      <!-- Social Media Icons -->
                      <div style="margin-top: 30px; text-align: left;">
                          <a href="https://facebook.com" style="margin-right: 10px;">
                              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;">
                          </a>
                          <a href="https://twitter.com" style="margin-right: 10px;">
                              <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 24px; height: 24px;">
                          </a>
                          <a href="https://linkedin.com">
                              <img src="https://cdn-icons-png.flaticon.com/512/124/124011.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                          </a>
                      </div>
                  </div>
              </body>
          </html>
      `;

      // Send email
      const emailResponse = await transporter.sendMail({
          from: `"IntelliJob" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your IntelliJob Subscription Update 🚀",
          html: messageBody, // Use `html` instead of `text` for formatted email
      });

      console.log(`User ${userId}: Subscription expiry message sent. Message ID: ${emailResponse.messageId}`);
  } catch (error) {
      console.error("Error occurred:", error);
      throw error;
  } finally {
      await client.close();
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////
let mainIsRunning=false;
const main = async (req, res) => {
  if(mainIsRunning){
    console.log("[Main] Already running - skipping duplicate call");
    return;
  }
  mainIsRunning=true;
  const _mainDone=()=>{mainIsRunning=false;};
  const { session } = req; // Access session from request

  const { client } = await connectToDatabase();
  try {
      await client.connect();

      console.log('Database connected successfully.');

      const database = client.db('olukayode_sage');
      const rolesListing = database.collection('roles_listing');

      const userPreferences = await getUserPreferences(session);
      console.log('User Preferences:', userPreferences);

      const jobTitle = typeof userPreferences === 'string' ? userPreferences : 'default job title';
      console.log(`Extracted desired job title: ${jobTitle}`);

      const query = `${jobTitle} site:myjobmag.com`;

      try {
          const results = await fetchMultiplePagesWithAxios(query, 6, session.userId);
          console.log('All Results:', results);

          await filterResults(results, rolesListing, session.userId);
          res.status(200).json({ message: 'Job processing completed.' });
      } catch (error) {
          console.error('Error fetching or processing results:', error);
          res.status(500).json({ error: 'Error during job processing.' });
      }
  } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ error: 'Database connection failed.' });
  } finally {
      await client.close();
      console.log('Database connection closed.');
  }

    const subscriptionClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  try {
      await subscriptionClient.connect();

      console.log('Fetching session data for token:', session.userId);

      const subscriptionDatabase = subscriptionClient.db('olukayode_sage');
      const sessionsCollection = subscriptionDatabase.collection('sessions');
      const usersCollection = subscriptionDatabase.collection('Users_CV_biodata');
      const applicationStatusCollection = subscriptionDatabase.collection("application_status");
      const userId7 = session?.userId || (await fetchUserIdBySessionToken(sessionToken));

      const UsersSubscription = await usersCollection.findOne({ _id: userId7 });

      if (UsersSubscription?.subscription?.plan) {
          UsersSubscriptionPlan = UsersSubscription.subscription.plan;
      }

      const userStatus = await applicationStatusCollection.findOne({ userId: userId7 });
      successfulApplications = userStatus?.successfulApplications || 0;

      if (!UsersSubscriptionPlan) {
          throw new Error("UsersSubscription not found");
      }

      const sessionData = await sessionsCollection.findOne({ sessionToken: session.userId });

      if (sessionData?.userId) {
          console.log('User ID found:', sessionData.userId);
          const user = await usersCollection.findOne({ _id: sessionData.userId });

          if (user?.subscription?.plan) {
              UsersSubscriptionPlan = user.subscription.plan;
          }
      }

      console.log('User Subscription:', UsersSubscriptionPlan);
      console.log('User successful applications:', successfulApplications);

      // Define max applications based on subscription
      switch (UsersSubscriptionPlan) {
          case 'Premium':
              subscriptionLimit = 24;
              break;
          case 'Standard':
              subscriptionLimit = 20;
              break;
          case 'Basic':
              // subscriptionLimit = 15;
              subscriptionLimit = 20;
              break;
          default:
              subscriptionLimit = 5;
      }

      maxRepeats = Math.max(subscriptionLimit - successfulApplications, 0);
      console.log(`User ${session?.userId}: Subscription limit: ${subscriptionLimit}, Current applications: ${successfulApplications}, Remaining: ${maxRepeats}`);

      // Calculate maxRepeats correctly
      const remainingApplications = subscriptionLimit - successfulApplications;
      maxRepeats = Math.ceil(remainingApplications / conversionRate);
      console.log(`Calculated maxRepeats: ${maxRepeats}`);

      const subscriptionsHistoryCollection = subscriptionDatabase.collection('subscriptionsHistory');

      if (successfulApplications >= subscriptionLimit) {
          // Store the completed subscription record before resetting
          await subscriptionsHistoryCollection.insertOne({
              userId: userId7,
              subscriptionType: UsersSubscriptionPlan,
              completedAt: new Date()
          });

          // Reset successful applications count
          successfulApplications = 0;

          console.log(`Subscription completed for user ${userId7}. Resetting application count.`);

          // Send subscription expiry message
          const user = await usersCollection.findOne({ _id: userId7 });
          if (user?.email) {
              await sendSubscriptionExpiryMessage(user.email, session, session.userId, subscriptionClient);
          } else {
              console.error("User email not found. Cannot send subscription expiry message.");
          }
      }

      ///////////////existing
      startPolling(session);
      await fetchJobUrlForUsers(session);

      try {
          await main2(session);
      } catch (error) {
          console.error("Error in main2 execution:", error);
      }
      startEmailPrompt(session, maxRepeats, subscriptionLimit);
      //startEmailPrompt(session, maxRepeats);
      ///////////////////////////////////////////////////////////////

  } catch (error) {
      console.error('Error fetching subscription details:', error);
  } finally {
      await subscriptionClient.close();
      console.log('Closing database connection...');
      _mainDone();
  }
};



///////////////////////////////////////////////////////////////////////////////////////////

async function getAppSettings() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const settings = await client.db('olukayode_sage').collection('app_settings').findOne({ _id: 'global' });
    return settings || { mode: 'TESTING_MODE' };
  } catch(e) {
    console.error('[AppSettings] Failed:', e.message);
    return { mode: 'TESTING_MODE' };
  } finally { await client.close(); }
}

async function fetchSuccessfulApplications(session) {
  const { client } = await connectToDatabase();
  try {
    await client.connect();
    console.log('Database connected successfully.');

    const database = client.db('olukayode_sage');
    const applicationStatusCollection = database.collection('application_status');
    const userStatus = await applicationStatusCollection.findOne({ userId: session.userId });

    return userStatus?.successfulApplications || 0;
  } catch (error) {
    console.error('Error fetching successful applications:', error);
    return 0; // Default value in case of an error
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

async function startEmailPrompt(session, maxRepeats = 5, subscriptionLimit = 5) {
  // AUTO MODE CHECK — if user has autoMode enabled, skip WhatsApp prompt and apply directly
  try {
    const autoClient = new MongoClient(process.env.MONGO_URI);
    await autoClient.connect();
    const autoUser = await autoClient.db('olukayode_sage').collection('Users_CV_biodata')
      .findOne({ _id: session.userId }, { projection: { autoMode: 1 } });
    await autoClient.close();
    if (autoUser?.autoMode === true) {
      console.log(`[AutoMode] User ${session.userId} is in Auto Mode — skipping WhatsApp prompts`);
      // Run application cycle directly without WhatsApp approval
      const autoDb = new MongoClient(process.env.MONGO_URI);
      await autoDb.connect();
      const db = autoDb.db('olukayode_sage');
      const pendingRoles = await db.collection('applicationProcessingFeeder')
        .find({ userId: session.userId, role_processed: false }).limit(maxRepeats).toArray();
      for (const role of pendingRoles) {
        try {
          await db.collection('autoMode_daily_log').insertOne({
            userId: session.userId,
            role: role.role || role.title,
            company: role.company || '',
            appliedAt: new Date(),
            date: new Date(new Date().setHours(0,0,0,0))
          });
          console.log(`[AutoMode] Logged auto-apply for role: ${role.role || role.title}`);
        } catch(logErr) {
          console.error('[AutoMode] Log error:', logErr.message);
        }
      }
      await autoDb.close();
      // Schedule end-of-day summary at 9 PM
      const now = new Date();
      const ninepm = new Date(now); ninepm.setHours(21,0,0,0);
      const msUntil9pm = ninepm > now ? ninepm - now : 0;
      setTimeout(async () => {
        try {
          const summaryClient = new MongoClient(process.env.MONGO_URI);
          await summaryClient.connect();
          const today = new Date(); today.setHours(0,0,0,0);
          const logs = await summaryClient.db('olukayode_sage').collection('autoMode_daily_log')
            .find({ userId: session.userId, date: { $gte: today } }).toArray();
          await summaryClient.close();
          if (logs.length > 0) {
            const summaryLines = logs.map((l,i) => `${i+1}. ${l.role}${l.company ? ' at ' + l.company : ''}`).join('\n');
            const summaryMsg = `📋 *Suntrenia Daily Summary*\n\nHere are the ${logs.length} job(s) we applied to for you today:\n\n${summaryLines}\n\nAll applications were sent automatically. Reply *STOP* anytime to pause Auto Mode.`;
            await sendMessage(session.userId.replace(/^\+/,''), summaryMsg);
            console.log(`[AutoMode] Daily summary sent to ${session.userId}`);
          }
        } catch(sumErr) {
          console.error('[AutoMode] Summary error:', sumErr.message);
        }
      }, msUntil9pm);
      return; // Skip the normal WhatsApp prompt flow entirely
    }
  } catch(autoErr) {
    console.error('[AutoMode] Check error:', autoErr.message);
    // Fall through to normal consent flow if auto mode check fails
  }
const settings = await getAppSettings(); // reads from app_settings collection
const mode = settings.mode || "TESTING_MODE"
  if (mode === "TESTING_MODE") {
    console.log("Running in TESTING MODE: First email will be sent after 1 minute.");
    scheduleFirstEmail(session, 1);
  } else if (mode === "NORMAL_MODE") {
    console.log("Running in NORMAL MODE: First email will be sent after 30-45 minutes.");
    const randomDelay = Math.floor(Math.random() * (45 - 30 + 1)) + 30;
    scheduleFirstEmail(session, randomDelay);
  } else {
    console.error("Error: MODE environment variable must be set to 'TESTING_MODE' or 'NORMAL_MODE'.");
    return;
  }

  // Schedule the remaining emails at random times (latest time is 7 PM)
  const randomTimes = generateRandomTimes(2, 3);
  randomTimes.forEach(time => {
    schedule.scheduleJob(time, async () => {
      try {
        const currentSuccessfulApps = await fetchSuccessfulApplications(session);
        console.log(`Checking successful applications before email send: ${currentSuccessfulApps}/${subscriptionLimit}`);

        if (currentSuccessfulApps >= subscriptionLimit) {
          console.log("Email prompt stopped: successful applications have reached the subscription limit.");
          // await sendSubscriptionExpiryMessage(user?.email, session, session?.sessionToken);

          return;
        }

        await promptuserbymail(session);
        console.log(`(NORMAL MODE) Email sent at ${time.toLocaleString()}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });
  });

  console.log(`Emails scheduled at: ${randomTimes.map(time => time.toLocaleString()).join(", ")}`);
}

function scheduleFirstEmail(session, delayMinutes) {
  const firstTriggerTime = new Date(Date.now() + delayMinutes * 60 * 1000);

  schedule.scheduleJob(firstTriggerTime, async () => {
    try {
      await promptuserbymail(session);
      console.log(`(FIRST EMAIL) Sent at ${firstTriggerTime.toLocaleTimeString()}`);
    } catch (error) {
      console.error("Error sending first email:", error);
    }
  });

  console.log(`First email scheduled at: ${firstTriggerTime.toLocaleString()}`);
}

function generateRandomTimes(minTimes, maxTimes) {
  const times = [];
  const numTimes = Math.floor(Math.random() * (maxTimes - minTimes + 1)) + minTimes;
  const now = new Date();
  //testing_mode
  // const latestHour = 19; // 7 PM in 24-hour format
  const latestHour = 23; // 7 PM in 24-hour format
  for (let i = 0; i < numTimes; i++) {
    let randomTime;
    do {
      const randomHour = Math.floor(Math.random() * (latestHour - now.getHours())) + now.getHours();
      const randomMinute = Math.floor(Math.random() * 60);
      randomTime = new Date();
      randomTime.setHours(randomHour, randomMinute, 0, 0);
    } while (randomTime <= now || randomTime.getHours() >= latestHour); // Ensure it's a future time and before 7 PM

    times.push(new Date(randomTime));
  }

  return times;
}




app.post('/trigger-main', (req, res) => {
  const { plan, date } = req.body;

  if (!plan || !date) {
    return res.status(400).json({ success: false, message: 'Invalid subscription data' });
  }

  console.log(`Triggered main logic for plan: ${plan} at ${date}`);

  // Call the main function
  main(req, res).catch((err) => {
    console.error('Error in main function:', err);
    res.status(500).json({ error: 'Error triggering main function.' });
  });
});
////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
const apiKey = 'AIzaSyAAaq27xrkFhUSYAirdk5LSSm8LkKhySCE';
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getMaxListeners } = require('process');
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

let lastFetchedMessageId = null; // To track the last fetched message
let summarizedText = '';
let finalSummary = '';

const whatsappJobPosts = async (session) => {
  try {
    // Ensure user specificity
    const userId = session.userId;
    if (!userId) {
      throw new Error('User ID not found in session.');
    }

    console.log('Fetching WhatsApp job posts for user:', userId);

  const threeMinutesAgo = Math.floor(Date.now() / 1000) - 180;
    let allMessages = [];

    // ✅ Fetch dynamic job groups from MongoDB
    const groupDbClient = new MongoClient(uri);
    let JOB_GROUP_IDS = [];
    try {
      await groupDbClient.connect();
      const groupDocs = await groupDbClient
        .db('olukayode_sage')
        .collection('whatsapp_job_groups')
        .find({ active: true })
        .toArray();
      JOB_GROUP_IDS = groupDocs.map(g => g.groupId);
      console.log(`[WhatsApp] Loaded ${JOB_GROUP_IDS.length} active job groups from DB`);
    } catch (groupErr) {
      console.warn('[WhatsApp] Could not load groups from DB, using fallback:', groupErr.message);
      // Fallback to env vars if DB fails
      JOB_GROUP_IDS = [
        process.env.WHATSAPP_JOB_GROUP_1,
        process.env.WHATSAPP_JOB_GROUP_2,
        process.env.WHATSAPP_JOB_GROUP_3,
      ].filter(Boolean);
    } finally {
      await groupDbClient.close();
    }

    // ✅ Try WHAPI first, fall back to Waha
    // ✅ THREE-TIER WhatsApp message fetching:
    // PRIMARY: Baileys (free, always running)
    // FALLBACK1: WHAPI (paid, needs valid WHAPI_TOKEN)
    // FALLBACK2: Empty array (graceful degradation)

const fetchMessagesFromWhapi = async () => {
  // ✅ Check if WhatsApp scraping is enabled
  try {
    const _sc = new MongoClient(process.env.MONGO_URI);
    await _sc.connect();
    const _st = await _sc.db('olukayode_sage').collection('app_settings').findOne({_id:'global'});
    await _sc.close();
    if(_st && _st.whatsappScraping === false){
      console.log('[WHAPI] Scraping paused by admin - skipping poll');
      return [];
    }
  } catch(_e){ console.warn('[WHAPI] Scraping flag check failed:',_e.message); }
  // ✅ Read cursor — timestamp of last processed WHAPI message
  const cursorClient = new MongoClient(uri);
  let sinceTimestamp = Math.floor(Date.now() / 1000) - (3 * 60); // default: 3 mins ago
  try {
    await cursorClient.connect();
    const cursorDb = cursorClient.db('olukayode_sage');
    const cursor = await cursorDb.collection('whapi_cursor').findOne({ key: 'last_processed' });
    if (cursor?.lastTimestamp) {
      sinceTimestamp = cursor.lastTimestamp;
      console.log(`[WHAPI] Fetching messages since: ${new Date(sinceTimestamp * 1000).toISOString()}`);
    }
  } catch (e) {
    console.warn('[WHAPI] Could not read cursor, using 3-min default:', e.message);
  } finally {
    await cursorClient.close();
  }

  const response = await axios.request({
    method: 'GET',
    url: 'https://gate.whapi.cloud/messages/list/?count=100',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.WHAPI_TOKEN}`
    }
  });

  const allMsgs = response.data.messages || [];

  // ✅ Only keep messages newer than last processed timestamp
  const freshMsgs = allMsgs.filter(msg => (msg.timestamp || 0) > sinceTimestamp);
  console.log(`[WHAPI] ${allMsgs.length} total fetched, ${freshMsgs.length} new since last poll`);

  if (freshMsgs.length === 0) return [];

  // ✅ Save the newest timestamp as the new cursor
  const newestTimestamp = Math.max(...freshMsgs.map(m => m.timestamp || 0));
  try {
    const saveClient = new MongoClient(uri);
    await saveClient.connect();
    const saveDb = saveClient.db('olukayode_sage');
    await saveDb.collection('whapi_cursor').updateOne(
      { key: 'last_processed' },
      { $set: { lastTimestamp: newestTimestamp, updatedAt: new Date() } },
      { upsert: true }
    );
    await saveClient.close();
    console.log(`[WHAPI] ✅ Cursor updated to: ${new Date(newestTimestamp * 1000).toISOString()}`);
  } catch (e) {
    console.warn('[WHAPI] Could not save cursor:', e.message);
  }

  return freshMsgs.map(msg => ({
    from: msg.from || msg.chatId,
    chatId: msg.chatId || msg.from,
    timestamp: msg.timestamp,
    text: { body: msg.text?.body || msg.body || '' }
  }));
};

    const fetchMessagesFromBaileys = async () => {
      // ✅ Baileys stores messages in memory via baileysMessages global cache
      // Messages are pushed into baileysMessages[] by the Baileys listener
      // defined in startBaileys() at the top of app.js
      if (!global.baileysMessages || global.baileysMessages.length === 0) {
        console.log('[Baileys] No messages in cache yet');
        return [];
      }
      const threeMinutesAgoMs = Date.now() - 3 * 60 * 1000;
      const fresh = global.baileysMessages.filter(m => m.receivedAt >= threeMinutesAgoMs);
      console.log(`[Baileys] ${fresh.length} fresh messages from cache`);
      // Clear processed messages to avoid reprocessing
      global.baileysMessages = global.baileysMessages.filter(m => m.receivedAt >= threeMinutesAgoMs);
      return fresh;
    };

    // PRIMARY: Try Baileys first
    try {
      allMessages = await fetchMessagesFromBaileys();
      console.log(`[WhatsApp] Baileys: fetched ${allMessages.length} messages`);
    } catch (baileysError) {
      console.warn('[WhatsApp] Baileys failed:', baileysError.message);
      allMessages = [];
    }

    // FALLBACK1: Try WHAPI if Baileys returned nothing
    if (allMessages.length === 0 && process.env.WHAPI_TOKEN) {
      try {
        allMessages = await fetchMessagesFromWhapi();
        console.log(`[WhatsApp] WHAPI fallback: fetched ${allMessages.length} messages`);
      } catch (whapiError) {
        console.warn('[WhatsApp] WHAPI also failed:', whapiError.message);
        allMessages = [];
      }
    }
    // ✅ Filter from any active job group OR known sender
    const filteredMessages = allMessages.filter(message => {
    const fromJobGroup = JOB_GROUP_IDS.length > 0 && JOB_GROUP_IDS.some(groupId =>
      message.from === groupId || message.chatId === groupId
    );
    const sentWithinLastThreeMinutes = message.timestamp >= threeMinutesAgo;
    return fromJobGroup && sentWithinLastThreeMinutes;
    });

    if (filteredMessages.length > 0) {
      const { client } = await connectToDatabase();
      await client.connect();
      console.log('Database connected successfully.');

      const database = client.db('olukayode_sage');
      const whatsappJobVacancyPost = database.collection('whatsappJobVacancyPost');

      const jobPostExists = async (messageBody, whatsappJobVacancyPost) => {
        const existingPost = await whatsappJobVacancyPost.findOne({
          message: messageBody,
          userId: userId // Ensure user-specific job post existence check
        });
        return existingPost !== null;
      };

 for (const message of filteredMessages) {
        const messageBody = message.text?.body;
        if (!messageBody) continue;

        const exists = await jobPostExists(messageBody, whatsappJobVacancyPost);
        if (exists) {
          console.log('Job post already exists for this user. Skipping.');
          continue;
        }

        // ✅ AI filter — detect if message is a job post and extract data
        let isJobPost = false;
        let extractedJob = null;
        try {
          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              max_tokens: 500,
              messages: [{
                role: 'user',
                content: `Analyze this WhatsApp message and determine if it is a job vacancy posting.

Message:
"""
${messageBody}
"""

Respond ONLY with a JSON object, no markdown, no explanation:
{
  "isJobPost": true or false,
  "title": "job title or null",
  "company": "company name or null",
  "location": "location or null",
  "deadline": "deadline date or null",
  "applicationEmail": "email address or null",
  "description": "full job description or null"
}`
              }]
            })
          });
          const groqData = await groqResponse.json();
          const rawText = groqData.choices?.[0]?.message?.content?.trim();
          if (rawText) {
            const parsed = JSON.parse(rawText);
            isJobPost = parsed.isJobPost === true;
            if (isJobPost) {
              extractedJob = parsed;
              console.log(`[WhatsApp AI] ✅ Job detected: ${parsed.title} at ${parsed.company}`);
            } else {
              console.log('[WhatsApp AI] ❌ Not a job post — skipping message');
            }
          }
        } catch (aiErr) {
          console.warn('[WhatsApp AI] AI filter failed, treating as job post by default:', aiErr.message);
          isJobPost = true; // ✅ Fail open — if AI fails, save it anyway
          extractedJob = { title: 'Unknown', company: 'Unknown', description: messageBody };
        }

        if (!isJobPost) continue;

        // ✅ Save to whatsappJobVacancyPost
        const jobPostDocument = {
          message: messageBody,
          userId,
          timestamp: new Date(),
          status: 'new',
          priority: 'high', // ✅ WhatsApp jobs are highest priority
          source: 'whatsapp_group',
          title: extractedJob?.title || 'Unknown',
          company: extractedJob?.company || 'Unknown',
          location: extractedJob?.location || 'Not provided',
          deadline: extractedJob?.deadline || null,
          applicationEmail: extractedJob?.applicationEmail || 'Not provided',
          description: extractedJob?.description || messageBody,
        };
        const result = await whatsappJobVacancyPost.insertOne(jobPostDocument);
        console.log(`[WhatsApp] Saved job post with ID: ${result.insertedId} for user: ${userId}`);

        // ✅ Also save to roles_listing so CV pipeline picks it up
        try {
          const rolesClient = new MongoClient(uri);
          await rolesClient.connect();
          const rolesDb = rolesClient.db('olukayode_sage');
          await rolesDb.collection('roles_listing').insertOne({
            userId,
            title: extractedJob?.title || 'Unknown Position',
            link: null,
            jobDate: new Date().toISOString(),
            description: extractedJob?.description || messageBody,
            company: extractedJob?.company || 'Unknown',
            applicationEmail: extractedJob?.applicationEmail || 'Not provided',
            priority: 'high', // ✅ Premium users get these first
            source: 'whatsapp',
            validated: false,
            label: 'new',
            timestamp: new Date()
          });
          console.log(`[WhatsApp] ✅ Job also saved to roles_listing for CV pipeline`);
          await rolesClient.close();
        } catch (rolesErr) {
          console.error('[WhatsApp] Failed to save to roles_listing:', rolesErr.message);
        }
      }

      await client.close();
      console.log('Database connection closed.');
    } else {
      console.log('No messages found from the sender within the last 3 minutes.');
    }
  } catch (error) {
    console.error('Error retrieving WhatsApp job posts or saving to database:', error.message, error.stack);
  }
};



//////////////////////////////////////////////
// Polling function to check for new messages every 30 seconds
const pollForWhatsAppJobPosts = async (session) => {
  console.log("Polling for new WhatsApp job posts...");

  try {
    const userId = session.userId; // Ensure user-specificity
    if (!userId) {
      throw new Error("User ID not found in session.");
    }

    const jobPost = await whatsappJobPosts(session); // Fetch the latest message for the user
    if (jobPost) {
      if (jobPost !== lastFetchedMessageId) {
        console.log(`New job post fetched for user ${userId}:`, jobPost);

        // Process the job post using the summarizeJobPost function
        summarizeJobPost(jobPost)
          .then(async (summarizedPost) => {
            const whatsapp_Job_post = furtherProcessing(summarizedPost); // Process the summarized post

            // Map job data to structured format
            const structuredData = mapToStructuredData(whatsapp_Job_post, userId); // Pass userId for mapping

            // Connect to MongoDB and save structured data
            const { client } = await connectToDatabase();
            await client.connect();
            console.log('Database connected successfully.');

            // Save the structured data to the database
            await saveToDatabase(structuredData, client, userId); // Pass userId for saving

            // Close the MongoDB connection
            await client.close();

            // Perform keyword extraction or other operations as needed
            performOperations(whatsapp_Job_post, userId); // Pass userId for operations
          })
          .catch(error => {
            console.error(`Error processing job post for user ${userId}:`, error);
          });

        lastFetchedMessageId = jobPost; // Update the last fetched message ID
      } else {
        console.log(`Same job post already processed for user ${userId}, skipping...`);
      }
    } else {
      console.log(`No new job post available for user ${userId}.`);
    }
  } catch (error) {
    console.error("Error during polling:", error);
  }
};

// Start polling — interval read from DB (default 30 mins)
const startPolling = async (session) => {
  pollForWhatsAppJobPosts(session);
  let intervalMinutes = 30;
  try {
    const _wClient = new MongoClient(process.env.MONGO_URI);
    await _wClient.connect();
    const _wSettings = await _wClient.db('olukayode_sage').collection('app_settings').findOne({ _id: 'global' });
    await _wClient.close();
    if (_wSettings && _wSettings.pollIntervalMinutes) intervalMinutes = _wSettings.pollIntervalMinutes;
  } catch(e) {
    console.error('[WhatsApp] Could not read poll interval, using 30 mins:', e.message);
  }
  const intervalMs = intervalMinutes * 60 * 1000;
  console.log(`[WhatsApp] Polling every ${intervalMinutes} minute(s)`);
  global.whatsappPollInterval=setInterval(() => pollForWhatsAppJobPosts(session), intervalMs);
};


// ///////////////////////////////working
// // Function to summarize job vacancy post using AI model (Gemini AI)
// async function summarizeJobPost(post) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(post);
//     summarizedText = result.response.text(); // Assign the summarized text to the declared variable
//     console.log("Summarized text:", summarizedText); // Logging the summarized text
//     return summarizedText; // Optionally, still return the summarized text if needed
//   } catch (error) {
//     console.error('Error summarizing job vacancy post:', error);
//     throw error;
//   }
// }
//////////////////////////////////////////////////////////existing
////////////////////////////working
// Function to summarize job vacancy post using AI model (Gemini AI)
async function summarizeJobPost(post, userId) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(post);
    const summarizedText = result.response.text(); // Assign the summarized text to the declared variable
    console.log(`Summarized text for user ${userId}:`, summarizedText); // Logging the summarized text with userId
    return summarizedText; // Optionally, still return the summarized text if needed
  } catch (error) {
    console.error(`Error summarizing job vacancy post for user ${userId}:`, error);
    throw error;
  }
}
///////////////////existing////////////////////////////////////////////////

// // Function to map WhatsApp job data to structured data format
// function mapToStructuredData(whatsapp_Job_post) {
//   return {
//     title: whatsapp_Job_post["Job Title"] || "Not stated",
//     url: whatsapp_Job_post["url"] || "Not provided",
//     jobLocation: whatsapp_Job_post["Job Location"] || "Not stated",
//     qualification: whatsapp_Job_post["qualification"] || "Not stated",
//     experience: whatsapp_Job_post["experience"] || "Not stated",
//     jobField: whatsapp_Job_post["jobField"] || "Not stated",
//     jobDescription: whatsapp_Job_post["Job Description"] || "Not provided",
//     salaryRange: whatsapp_Job_post["Expected Salary"] || "Not provided",
//     keyResponsibilities: whatsapp_Job_post["keyResponsibilities"] || "Not provided",
//     skills: whatsapp_Job_post["skills"] || "Not provided",
//     requirements: whatsapp_Job_post["requirements"] || "Not provided",
//     applicationEmail: whatsapp_Job_post["Contact Email"] || "Not provided",
//     postedDate: whatsapp_Job_post["postedDate"] ? new Date(whatsapp_Job_post["postedDate"]).toISOString() : "Not specified",
//     deadline: whatsapp_Job_post["deadline"] ? new Date(whatsapp_Job_post["deadline"]).toISOString() : "Not specified",
//     processedAt: new Date().toISOString(),
//     published: true,
//     publishedAt: new Date().toISOString()

//   };

// }
///////////////////////////////////////////////////////////////////////

// Function to map WhatsApp job data to structured data format
function mapToStructuredData(whatsapp_Job_post, userId) {
  return {
    userId, // Include the userId for user-specific operations
    title: whatsapp_Job_post["Job Title"] || "Not stated",
    url: whatsapp_Job_post["url"] || "Not provided",
    jobLocation: whatsapp_Job_post["Job Location"] || "Not stated",
    qualification: whatsapp_Job_post["qualification"] || "Not stated",
    experience: whatsapp_Job_post["experience"] || "Not stated",
    jobField: whatsapp_Job_post["jobField"] || "Not stated",
    jobDescription: whatsapp_Job_post["Job Description"] || "Not provided",
    salaryRange: whatsapp_Job_post["Expected Salary"] || "Not provided",
    keyResponsibilities: whatsapp_Job_post["keyResponsibilities"] || "Not provided",
    skills: whatsapp_Job_post["skills"] || "Not provided",
    requirements: whatsapp_Job_post["requirements"] || "Not provided",
    applicationEmail: whatsapp_Job_post["Contact Email"] || "Not provided",
    postedDate: whatsapp_Job_post["postedDate"] ? new Date(whatsapp_Job_post["postedDate"]).toISOString() : "Not specified",
    deadline: whatsapp_Job_post["deadline"] ? new Date(whatsapp_Job_post["deadline"]).toISOString() : "Not specified",
    processedAt: new Date().toISOString(),
    published: true,
    publishedAt: new Date().toISOString(),
  };
}
/////////////////////////////////exiting
// // Function to save structured data to the database
// async function saveToDatabase(whatsapp_Job_post, client) {

//   try {
//     await client.connect();
//     console.log('Database connected successfully.');

//     const database = client.db('olukayode_sage');
//     const result = await database.collection('whatsappJobVacancyPost').insertOne(whatsapp_Job_post); // Save to 'whatsappJobVacancyPost' collection
//     console.log("Job post saved to database with ID:", result.insertedId);
//   } catch (error) {
//     console.error("Error saving job post to database:", error);
//   }
// }
//////////////////////////////////////////////////////////
// Function to save structured data to the database
async function saveToDatabase(whatsapp_Job_post, client, userId) {
  try {
    await client.connect();
    console.log(`Database connected successfully for user ${userId}.`);

    const database = client.db('olukayode_sage');
    const collectionName = 'whatsappJobVacancyPost';

    // Ensure user-specificity by storing userId in the document
    const document = { ...whatsapp_Job_post, userId };
    const result = await database.collection(collectionName).insertOne(document); // Save to 'whatsappJobVacancyPost' collection

    console.log(`Job post saved to database for user ${userId} with ID:`, result.insertedId);
  } catch (error) {
    console.error(`Error saving job post to database for user ${userId}:`, error);
  }
}
// // Function for further processing using NLP techniques
// function furtherProcessing(summarizedPost) {
//   const KEYWORDS = {
//     POSITION: /(?:job title:|position:|title:)/i,
//     LOCATION: /(?:location:|job location:)/i,
//     SALARY_RANGE: /(?:salary range:|expected salary:)/i,
//     INTERVIEW_DATE: /(?:interview date:|date:)/i,
//     QUALIFICATION: /(?:qualification:|required qualifications:)/i,
//     EXPERIENCE: /(?:experience:|years of experience:)/i,
//     JOB_FIELD: /(?:job field:|industry:)/i,
//     RESPONSIBILITIES: /(?:key responsibilities:|responsibilities:)/i,
//     SKILLS: /(?:skills:|required skills:)/i,
//     REQUIREMENTS: /(?:requirements:|job requirements:)/i,
//   };
// Function for further processing using NLP techniques
function furtherProcessing(summarizedPost, userId) {
  const KEYWORDS = {
    POSITION: /(?:job title:|position:|title:)/i,
    LOCATION: /(?:location:|job location:)/i,
    SALARY_RANGE: /(?:salary range:|expected salary:)/i,
    INTERVIEW_DATE: /(?:interview date:|date:)/i,
    QUALIFICATION: /(?:qualification:|required qualifications:)/i,
    EXPERIENCE: /(?:experience:|years of experience:)/i,
    JOB_FIELD: /(?:job field:|industry:)/i,
    RESPONSIBILITIES: /(?:key responsibilities:|responsibilities:)/i,
    SKILLS: /(?:skills:|required skills:)/i,
    REQUIREMENTS: /(?:requirements:|job requirements:)/i,
  };

  // function extractValue(text, regex) {
  //   const match = text.match(regex);
  //   return match ? text.slice(match.index + match[0].length).trim() : null;
  // }
 // Helper function to extract values based on regex
 function extractValue(text, regex) {
  const match = text.match(regex);
  return match ? text.slice(match.index + match[0].length).trim() : null;
}

  // const sentences = summarizedPost.split('\n').map(sentence => sentence.trim());
  // const whatsapp_Job_post = {
  //   "Job Description": summarizedPost,
  //   "keywords": []
  // };
  const sentences = summarizedPost.split('\n').map(sentence => sentence.trim());
  const whatsapp_Job_post = {
    userId, // Associate data with a specific user
    "Job Description": summarizedPost,
    "keywords": []
  };

  // sentences.forEach(sentence => {
  //   const lowerSentence = sentence.toLowerCase();

//     if (KEYWORDS.POSITION.test(lowerSentence)) {
//       whatsapp_Job_post["Job Title"] = extractValue(sentence, KEYWORDS.POSITION) || "Not stated";
//     } else if (KEYWORDS.LOCATION.test(lowerSentence)) {
//       whatsapp_Job_post["Job Location"] = extractValue(sentence, KEYWORDS.LOCATION) || "Not stated";
//     } else if (KEYWORDS.SALARY_RANGE.test(lowerSentence)) {
//       whatsapp_Job_post["Expected Salary"] = extractValue(sentence, KEYWORDS.SALARY_RANGE) || "Not stated";
//     } else if (KEYWORDS.INTERVIEW_DATE.test(lowerSentence)) {
//       whatsapp_Job_post["Interview Date"] = extractValue(sentence, KEYWORDS.INTERVIEW_DATE) || "Not stated";
//     } else if (KEYWORDS.QUALIFICATION.test(lowerSentence)) {
//       whatsapp_Job_post["Qualification"] = extractValue(sentence, KEYWORDS.QUALIFICATION) || "Not stated";
//     } else if (KEYWORDS.EXPERIENCE.test(lowerSentence)) {
//       whatsapp_Job_post["Experience"] = extractValue(sentence, KEYWORDS.EXPERIENCE) || "Not stated";
//     } else if (KEYWORDS.JOB_FIELD.test(lowerSentence)) {
//       whatsapp_Job_post["Job Field"] = extractValue(sentence, KEYWORDS.JOB_FIELD) || "Not stated";
//     } else if (KEYWORDS.RESPONSIBILITIES.test(lowerSentence)) {
//       whatsapp_Job_post["Key Responsibilities"] = extractValue(sentence, KEYWORDS.RESPONSIBILITIES) || "Not provided";
//     } else if (KEYWORDS.SKILLS.test(lowerSentence)) {
//       whatsapp_Job_post["Skills"] = extractValue(sentence, KEYWORDS.SKILLS) || "Not provided";
//     } else if (KEYWORDS.REQUIREMENTS.test(lowerSentence)) {
//       whatsapp_Job_post["Requirements"] = extractValue(sentence, KEYWORDS.REQUIREMENTS) || "Not provided";
//     } else if (/\b\d{10,15}\b/.test(sentence)) {
//       const phoneNumbers = sentence.match(/\b\d{10,15}\b/g);
//       whatsapp_Job_post["Contact Phone Number"] = phoneNumbers ? phoneNumbers.join(", ") : "Not indicated";
//     } else if (lowerSentence.includes("keywords:")) {
//       const keywords = sentence.split(':')[1]?.trim().split(',') || [];
//       whatsapp_Job_post["keywords"].push(...keywords.map(keyword => keyword.trim()));
//     }
//   });

//   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
//   const emailAddresses = summarizedPost.match(emailRegex) || [];
//   whatsapp_Job_post["Contact Email"] = emailAddresses.join(", ") || "Not indicated";

//   console.log("Final Summary:", whatsapp_Job_post);
//   return whatsapp_Job_post;
// }
// Process each sentence and extract details based on keywords
sentences.forEach(sentence => {
  const lowerSentence = sentence.toLowerCase();

  if (KEYWORDS.POSITION.test(lowerSentence)) {
    whatsapp_Job_post["Job Title"] = extractValue(sentence, KEYWORDS.POSITION) || "Not stated";
  } else if (KEYWORDS.LOCATION.test(lowerSentence)) {
    whatsapp_Job_post["Job Location"] = extractValue(sentence, KEYWORDS.LOCATION) || "Not stated";
  } else if (KEYWORDS.SALARY_RANGE.test(lowerSentence)) {
    whatsapp_Job_post["Expected Salary"] = extractValue(sentence, KEYWORDS.SALARY_RANGE) || "Not stated";
  } else if (KEYWORDS.INTERVIEW_DATE.test(lowerSentence)) {
    whatsapp_Job_post["Interview Date"] = extractValue(sentence, KEYWORDS.INTERVIEW_DATE) || "Not stated";
  } else if (KEYWORDS.QUALIFICATION.test(lowerSentence)) {
    whatsapp_Job_post["Qualification"] = extractValue(sentence, KEYWORDS.QUALIFICATION) || "Not stated";
  } else if (KEYWORDS.EXPERIENCE.test(lowerSentence)) {
    whatsapp_Job_post["Experience"] = extractValue(sentence, KEYWORDS.EXPERIENCE) || "Not stated";
  } else if (KEYWORDS.JOB_FIELD.test(lowerSentence)) {
    whatsapp_Job_post["Job Field"] = extractValue(sentence, KEYWORDS.JOB_FIELD) || "Not stated";
  } else if (KEYWORDS.RESPONSIBILITIES.test(lowerSentence)) {
    whatsapp_Job_post["Key Responsibilities"] = extractValue(sentence, KEYWORDS.RESPONSIBILITIES) || "Not provided";
  } else if (KEYWORDS.SKILLS.test(lowerSentence)) {
    whatsapp_Job_post["Skills"] = extractValue(sentence, KEYWORDS.SKILLS) || "Not provided";
  } else if (KEYWORDS.REQUIREMENTS.test(lowerSentence)) {
    whatsapp_Job_post["Requirements"] = extractValue(sentence, KEYWORDS.REQUIREMENTS) || "Not provided";
  } else if (/\b\d{10,15}\b/.test(sentence)) {
    const phoneNumbers = sentence.match(/\b\d{10,15}\b/g);
    whatsapp_Job_post["Contact Phone Number"] = phoneNumbers ? phoneNumbers.join(", ") : "Not indicated";
  } else if (lowerSentence.includes("keywords:")) {
    const keywords = sentence.split(':')[1]?.trim().split(',') || [];
    whatsapp_Job_post["keywords"].push(...keywords.map(keyword => keyword.trim()));
  }
});

// Extract email addresses from the summarized post
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const emailAddresses = summarizedPost.match(emailRegex) || [];
whatsapp_Job_post["Contact Email"] = emailAddresses.join(", ") || "Not indicated";

console.log(`Final Summary for User ${userId}:`, whatsapp_Job_post);
return whatsapp_Job_post;
}

const stopWords = new Set(["a", "an", "the", "and", "is", "of", "in", "to", "for", "with", "on", "as", "by", "at", "from", "this", "that", "or", "which", "be", "it", "are", "was", "were", "has", "have", "had", "will", "would", "can", "could", "should", "may", "might", "been", "being", "do", "does", "did", "doing", "than", "then", "there", "their", "if", "into", "but", "not", "all", "about", "some", "any", "such", "each", "many", "more", "most", "no", "nor", "too", "very", "either", "neither", "both", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "other", "now", "later"]);
// const filteredTokens = processedTokens.filter(token => !stopWords.has(token));


//     }
///////////////////////////////////////////////////////////////////////////////

const wordnet = new natural.WordNet();

async function performOperations(whatsapp_Job_post, userId) {
  const jobDescription = whatsapp_Job_post["Job Description"];
  if (!jobDescription) {
    console.error("Job description not found in whatsapp_Job_post.");
    return;
  }

  // Tokenize the job description
  const tokens = tokenizer.tokenize(jobDescription.toLowerCase());

  // Filter out stopwords
  const filteredTokens = tokens.filter(token => !stopWords.has(token));

  // Initialize a map to store the frequency of each word
  const frequency = {};

  // Process tokens with lemmatization
  for (const token of filteredTokens) {
    // Lemmatize the token (to get its proper base form)
    await new Promise((resolve) => {
      wordnet.lookup(token, (err, definitions) => {
        if (!err && definitions.length > 0) {
          // Use the lemma (base form) if found
          const lemma = definitions[0].lemma;
          const normalizedToken = lemma || token;
          frequency[normalizedToken] = (frequency[normalizedToken] || 0) + 1;
        } else {
          // Fall back to the token itself if no lemma is found
          frequency[token] = (frequency[token] || 0) + 1;
        }
        resolve();
      });
    });
  }

  // Sort keywords by frequency
  const sortedKeywords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);

  // Fetch all keywords without slicing
  const allKeywords = sortedKeywords;

  console.log("All Keywords:", allKeywords);

  try {
    const { client } = await connectToDatabase();
    await client.connect();
    console.log('Database connected successfully.');

    const database = client.db('olukayode_sage');

    // Add keywords to the jobData object
    whatsapp_Job_post.keywords = allKeywords;

    // Custom ID using userId for user-specific context
    if (!userId) {
      console.error('[WhatsApp] userId is undefined — cannot save job post');
      return;
    }
    const customId = `${userId}_whatsappJobPost`;
    // Check if a document with the same _id exists for this user
    const existingDoc = await database.collection('whatsappJobVacancyPost').findOne({ _id: customId });

    if (existingDoc) {
      console.log(`Document with the custom ID (${customId}) already exists for user ${userId}, skipping insertion.`);
    } else {
      const insertResult = await database.collection('whatsappJobVacancyPost').insertOne({
        _id: customId, // Custom _id field
        userId, // Associate the document with a specific user
        ...whatsapp_Job_post, // Spread operator to insert all fields from jobData
        keywords: allKeywords, // Add keywords as a new field
        timestamp: new Date(), // Save the timestamp of when the message was stored
        status: 'new' // Mark the message as new
      });

      console.log("New document inserted with ID:", insertResult.insertedId);
    }


    await client.close();


  } catch (error) {
    console.error("Error while updating keywords in MongoDB:", error);
  }
}
// ///////////existing


function extractDataFromText(summarizedText, finalSummary, session) {
  // Retrieve userId from session
  const userId = session.userId; // Ensure user-specificity
  if (!userId) {
    console.error("User ID not found in session.");
    return null; // Exit the function if userId is not available
  }

  const extractedData = {};

  // Extract job title using regex from summarizedText or finalSummary
  const titleMatch = summarizedText.match(/Job Title:\s*(.+)/) || finalSummary.match(/Job Title:\s*(.+)/);
  extractedData.title = titleMatch ? titleMatch[1].trim() : "Not provided";

  // Extract company from summarizedText or finalSummary
  const companyMatch = summarizedText.match(/Company:\s*(.+)/) || finalSummary.match(/Company:\s*(.+)/);
  extractedData.company = companyMatch ? companyMatch[1].trim() : "Not provided";

  // Extract location
  const locationMatch = summarizedText.match(/Location:\s*(.+)/) || finalSummary.match(/Location:\s*(.+)/);
  extractedData.jobLocation = locationMatch ? locationMatch[1].trim() : "Not provided";

  // Extract qualifications
  const qualificationMatch = summarizedText.match(/Qualifications?:\s*([\s\S]+?)(?=\n|$)/) || finalSummary.match(/Qualifications?:\s*([\s\S]+?)(?=\n|$)/);
  extractedData.qualification = qualificationMatch ? qualificationMatch[1].trim() : "Not provided";

  // Extract experience
  const experienceMatch = summarizedText.match(/Experience:\s*([\s\S]+?)(?=\n|$)/) || finalSummary.match(/Experience:\s*([\s\S]+?)(?=\n|$)/);
  extractedData.experience = experienceMatch ? experienceMatch[1].trim() : "Not provided";

  // Extract application email
  const emailMatch = summarizedText.match(/CV to\s*(.+)/) || finalSummary.match(/Application Process:[\s\S]+CV to\s*(.+)/);
  extractedData.applicationEmail = emailMatch ? emailMatch[1].trim() : "Not provided";

  // Add userId to the extracted data
  extractedData.userId = userId;

  // Return the final mapped data
  return extractedData;
}

// Example of how to pass session to the function
const mappedData = extractDataFromText(summarizedText, finalSummary, session);
if (mappedData) {
  console.log(mappedData);
}

///////////////////////////////////////////////////////////webscraping
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
];

const getRandomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
};

const getRandomDelay = () => Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 to 5 seconds

const fetchDataWithRetry = async (url, retries = 3) => {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': getRandomUserAgent() }
    });
    return response.data;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
    return fetchDataWithRetry(url, retries - 1);
  }
};

//////////////////////////////existing


let jobData = {};

async function validateJobUrl(url, session) {
  try {
    const userId = session.userId;
    // Ensure session ID is available
    if (!session || !session.userId) {
      console.error("Session ID is missing");
      return { valid: false, expired: false, emailProvided: false };
    }

    // const userId = session.userId; // Using session ID as user-specific identifier
    console.log(`Validating job URL for user: ${userId}`);

    // Check for invalid patterns in the URL
    if (typeof url !== "string" || url.includes("jobs-by-title/") || url.includes("jobs-by-field/") || url.includes("jobs-by-industry/")) {
      console.log("Invalid URL format or matches exclusion pattern");
      return { valid: false, expired: false, emailProvided: false };
    }

    const response = await axios.get(url);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);

      // Check for required keywords on the page
      const pageText = $('body').text();
      const requiredKeywords = ["Job Type", "Location", "Posted:", "Deadline:"];
      const containsAllKeywords = requiredKeywords.every(keyword => pageText.includes(keyword));

      if (!containsAllKeywords) {
        console.log("Required keywords missing for user:", userId);
        return { valid: false, expired: false, emailProvided: false };
      }

      // Check if the job has expired
      if (pageText.includes("Oops! It seems this job has expired")) {
        console.log("Job expired for user:", userId);
        return { valid: false, expired: true, emailProvided: false };
      }

      // Check for email address in the "Method of Application" section
      const applicationSection = $('h2#application-method').next().find('p').text().trim();
      const applicationEmailRegex = /CV to:\s*([^\s]+@[^\s]+)/i;
      const applicationEmailMatch = applicationSection.match(applicationEmailRegex);

      if (applicationEmailMatch) {
        console.log(`Valid application email found for user ${userId}: ${applicationEmailMatch[1].trim()}`);
        return { valid: true, expired: false, emailProvided: true };
      } else {
        console.log(`No application email provided for user ${userId}`);
        return { valid: true, expired: false, emailProvided: false };
      }
    }
  } catch (error) {
    console.error(`Error validating URL for user ${session.id}:`, error);
    return { valid: false, expired: false, emailProvided: false };
  }
}





const fetchPageWithRetry = async (url, session, retries = 3) => {
  const userId = session.userId; // Retrieve userId from session

  try {
    // Log user-specific actions for debugging
    console.log(`User ${userId} is fetching the URL: ${url}`);

    const response = await axios.get(url, {
      headers: { 'User-Agent': getRandomUserAgent() }
    });
    return response.data;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
    return fetchPageWithRetry(url, session, retries - 1); // Pass session for retry attempts
  }
};


async function fetchSalaryRangeFromUrl(url, session) {
  if (!session || !session.userId) {
    console.error('Invalid session or missing userId:', session);
    throw new Error('User ID not found in session.');
  }

  const userId = session.userId; // Retrieve userId from session
  console.log(`User ${userId} is fetching salary range from URL: ${url}`);

  try {
    // Fetch the page content with retry and user-specific logging
    const data = await fetchPageWithRetry(url, session);
    console.log(`User ${userId}: Page content fetched successfully.`);

    // Load the page content into cheerio
    const $ = cheerio.load(data);

    // Extract text from the page
    const text = $('body').text();
    console.log(`User ${userId}: Page text extracted.`);

    // Default salary range
    let salaryRange = '150k - 900k';

    // Split text into sentences
    const sentences = text.split('. ');
    console.log(`User ${userId}: Text split into sentences.`);

    // Extract salary range from the text
    sentences.forEach(sentence => {
      if (sentence.toLowerCase().includes("salary range:") || sentence.toLowerCase().includes("pay:")) {
        const match = sentence.match(/(?:salary range:|pay:)\s*(.+)/i);
        if (match) {
          salaryRange = match[1].trim();
          console.log(`User ${userId}: Salary range found: ${salaryRange}`);
        }
      }
    });

    console.log(`User ${userId}: Final salary range: ${salaryRange}`);
    return salaryRange || '150k - 900k'; // Fallback to default if not found
  } catch (error) {
    console.error(`User ${userId}: Error fetching or parsing the page:`, error);
    return '150k - 900k'; // Fallback to default on error
  }
}




// ///////existing///////////////////////////////////////////////////////////////////

///

async function fetchJobUrlForUsers(session) {
  if (!session || !session.userId) {
    console.error('Invalid session or missing userId:', session);
    throw new Error('User ID not found in session.');
  }

  const userId = session.userId;
  console.log('Processing jobs for userId:', userId);

  try {
    console.log('Connecting to the database...');
    await client.connect();
    const database = client.db('olukayode_sage');
    const rolesListing = database.collection('roles_listing');
    const validatedRoles = database.collection('validated_roles');

    // Fetch unprocessed jobs for the user
    const jobs = await rolesListing.find({
      userId,
      status: { $exists: false },
    }).toArray();

    if (!jobs.length) {
      console.log(`No unprocessed jobs found for user ${userId}`);
      return [];
    }

    for (const job of jobs) {
      console.log(`Processing job document for user ${userId}. Job URL: ${job.link}`);

      if (job.link) {
        try {
          const validation = await validateJobUrl(job.link, session);
          console.log(`Validation result for job ${job._id}:`, validation);

          if (validation.valid) {
            console.log(`Job URL ${job.link} is valid.`);
            const url = job.link;
            const title = job.title || 'Unknown Title';
            if (!job.title) {
              console.warn(`Job ${job._id} has no title. Using default title.`);
            }


           
            const salaryRange = await fetchSalaryRangeFromUrl(url, session);
            // const salaryRange = await fetchSalaryRangeFromUrl(job.link, session);
            console.log(`Salary range fetched for job ${job._id}: ${salaryRange}`);
         
            const validatedRoleDetails = {
              userId,
              title,
              url: job.link,
              accessedAt: new Date().toISOString(),
            };

            await validatedRoles.insertOne(validatedRoleDetails);
            console.log(`Validated role inserted for user ${userId}:`, validatedRoleDetails);

            await rolesListing.updateOne(
              { _id: job._id },
              {
                $set: {
                  status: 'validated',
                  label: 'processed',
                  validated: true,
                  processedAt: new Date().toISOString(),
                },
              }
            );
          } else {
            const status = validation.expired ? 'expired' : 'invalid';
            await rolesListing.updateOne(
              { _id: job._id },
              {
                $set: {
                  status,
                  processedAt: new Date().toISOString(),
                  validationError: validation.error || 'Unknown validation error',
                },
              }
            );
            console.log(`Job document ${job._id} status updated to ${status}`);
          }
        } catch (validationError) {
          console.error(`Error validating job ${job._id} for user ${userId}:`, validationError);
          await rolesListing.updateOne(
            { _id: job._id },
            {
              $set: {
                status: 'error',
                processedAt: new Date().toISOString(),
                error: validationError.message,
              },
            }
          );
        }
      } else {
        console.warn(`Job document ${job._id} has no URL.`);
        await rolesListing.updateOne(
          { _id: job._id },
          { $set: { status: 'invalid', label: 'missing_url' } }
        );
      }
    }

    console.log('All job URLs processed for user', userId);
    return jobs;
  } catch (error) {
    console.error('Error processing job URLs for user', userId, ':', error);
    throw error;
  } finally {
    console.log('Closing the database connection.');
    await client.close();
  }
}


async function scrapeJobPage(url, userId, callback) {
  try {
    const html = await axios.get(url).then(res => res.data);
    const $ = cheerio.load(html);
    let jobData = {};

    jobData["Job Title"] = $('h1').text().trim();
    jobData["Job Location"] = $('ul.job-key-info li:contains("Location") .jkey-info').text().trim();
    jobData["Qualification"] = $('ul.job-key-info li:contains("Qualification") .jkey-info').text().trim();
    jobData["Experience"] = $('ul.job-key-info li:contains("Experience") .jkey-info').text().trim();
    jobData["Job Field"] = $('ul.job-key-info li:contains("Job Field") .jkey-info').text().trim();
    jobData["Job Description"] = $('div.job-details').text().trim();

    // Fetching Salary Range or Salary
    const salaryRange = $('ul.job-key-info li:contains("Salary Range") .jkey-info').text().trim();
    const salary = $('ul.job-key-info li:contains("Salary") .jkey-info').text().trim();
    jobData["Salary Range"] = salaryRange || salary || 'Not provided';

    const responsibilitiesRegex = /JOB RESPONSIBILITIES\s*([\s\S]*?)\s*SKILLS/i;
    const responsibilitiesMatch = jobData["Job Description"].match(responsibilitiesRegex);
    jobData["Key Responsibilities"] = responsibilitiesMatch ? responsibilitiesMatch[1].trim() : 'Not provided';

    const skillsRegex = /SKILLS\s*([\s\S]*?)\s*Requirement/i;
    const skillsMatch = jobData["Job Description"].match(skillsRegex);
    jobData["Skills"] = skillsMatch ? skillsMatch[1].trim() : 'Not provided';

    const requirementsRegex = /Requirement\s*([\s\S]*?)\s*SALARY/i;
    const requirementsMatch = jobData["Job Description"].match(requirementsRegex);
    jobData["Requirements"] = requirementsMatch ? requirementsMatch[1].trim() : 'Not provided';

    const methodOfApplicationText = $('h2#application-method').next().find('p').text();
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = methodOfApplicationText.match(emailRegex);
    jobData["Application Email"] = emailMatch ? emailMatch[0] : 'Not provided';

    const structuredData = $('script[type="application/ld+json"]').html();

    // Extract the Date Posted
    const postedDate = $('div#posted-date b.tc-o').next().text().trim(); // Extract the date value after the "Posted:" label
    jobData["Date Posted"] = postedDate || 'Not provided';

    // Extract the Deadline
    const deadlineDate = $('div.read-date-sec-li b.tc-bl3').next().text().trim(); // Extract the deadline date after the "Deadline:" label
    jobData["Deadline"] = deadlineDate || 'Not specified';

    // Add userId to the job data to associate it with the user
    jobData["userId"] = userId;

    callback(null, jobData);
  } catch (error) {
    console.error("Error scraping job page:", error);
    callback(error, null);
  }
}

// ////////////////////////////////////////////////////////////////////////////////////////


const main2 = async (session) => {
  if (!session || !session.userId) {
    console.error("Invalid session or missing userId:", session);
    throw new Error("User ID not found in session.");
  }

  const userId = session.userId; // Retrieve userId from session
  console.log(`User ${userId}: Starting main2 process.`);

  const { client } = await connectToDatabase(); // Connect to the database
  try {
    await client.connect();
    console.log(`User ${userId}: Database connected successfully.`);

    const database = client.db('olukayode_sage');
    const validatedRoles = database.collection('validated_roles');
    const applicationProcessingFeeder = database.collection('application_processing_feeder');
// Fetch all validated roles for this specific user that have not been processed yet
    const jobs = await validatedRoles.find({
      userId, // Ensure only jobs for the current user are fetched
      status: { $exists: false },
    }).toArray();

    if (jobs.length === 0) {
      console.log(`User ${userId}: No validated job URLs found.`);
      return;
    }

    for (const job of jobs) {
      const jobUrl = job.url;
      console.log(`User ${userId}: Processing Job URL:`, jobUrl);

      // Validate job URL using user-specific session
      const validity = await validateJobUrl(jobUrl, session);

      if (validity.valid) {
        if (validity.emailProvided) {
          console.log(`User ${userId}: The page has a valid application email.`);
        } else {
          console.log(`User ${userId}: The page does not provide an application email.`);
        }

        // Scrape job page to extract detailed job data
        const jobData = await new Promise((resolve, reject) => {
          scrapeJobPage(jobUrl, userId, (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

        console.log(`User ${userId}: Scraped Job Data:`, jobData);

        // Ensure the Date Posted and Deadline are in the correct ISO format
        const postedDate = jobData["Date Posted"] && !isNaN(Date.parse(jobData["Date Posted"]))
          ? new Date(Date.parse(jobData["Date Posted"])).toISOString()
          : null;

        const deadline = jobData["Deadline"] && !isNaN(Date.parse(jobData["Deadline"]))
          ? new Date(Date.parse(jobData["Deadline"])).toISOString()
          : null;

        // Build the application processing details object
        const applicationProcessingDetails = {
          title: jobData["Job Title"],
          url: jobUrl,
          jobLocation: jobData["Job Location"],
          qualification: jobData["Qualification"],
          experience: jobData["Experience"],
          jobField: jobData["Job Field"],
          jobDescription: jobData["Job Description"],
          salaryRange: jobData["Salary Range"],
          keyResponsibilities: jobData["Key Responsibilities"],
          skills: jobData["Skills"],
          requirements: jobData["Requirements"],
          applicationEmail: jobData["Application Email"],
          postedDate: postedDate,  // Store as ISO string
          deadline: deadline,      // Store as ISO string
          processedAt: new Date().toISOString(), // Add a timestamp for processing
          userId: userId           // Associate with the current user
        };

        console.log(`User ${userId}: Application Processing Details:`, applicationProcessingDetails);

        // Insert into the application_processing_feeder collection
        try {
          const result = await applicationProcessingFeeder.insertOne(applicationProcessingDetails);
          console.log(`User ${userId}: Application processing data inserted into application_processing_feeder:`, result.insertedId);
        } catch (insertError) {
          console.error(`User ${userId}: Error inserting application processing data:`, insertError);
        }

        // Update the validated_roles collection to mark the job as processed
        await validatedRoles.updateOne(
          { _id: job._id, userId }, // Ensure the update is scoped to the current user
          { $set: { status: 'processed' } }
        );
        console.log(`User ${userId}: Job URL ${jobUrl} processed and marked as 'processed'.`);

        // Perform any additional operations needed with jobData
        performOperations(jobData);

      } else {
        console.log(`User ${userId}: The page is invalid or expired.`);
      }
    }

    console.log(`User ${userId}: All validated job URLs processed.`);
  } catch (error) {
    console.error(`User ${userId}: Error in main2 function:`, error);
  } finally {
    await client.close();
    console.log(`User ${userId}: Database connection closed.`);
  }
};

// (async () => {
//   try {
//     await main2(session);
//   } catch (error) {
//     console.error("Error in main2 execution:", error);
//   }
// })();


const subscriber = "2349010400099"; // Replace with your group ID
// Function to connect to the database

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to database');
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata');
    // const collection = database.collection('application_processing_feeder');
    return { client, collection };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; // Re-throw the error to handle it at a higher level
  }
}

////////////////////////////////////////////////////////////////////////
// Function to get the first name of a user by userId
async function getFirstName(userId) {
  const { client, collection } = await connectToDatabase();

  try {
    const user = await collection.findOne({ userId: userId }); // Fetch user based on userId
    console.log("Fetched user:", user);  // Debugging: Log the fetched user

    if (user && user.name) {
      const firstName = user.name.split(' ')[0];  // Extract first name
      console.log("First Name:", firstName);  // Debugging: Log the first name
      return firstName;
    }

    console.log("User or name not found.");
    return null;
  } catch (error) {
    console.error("Error fetching first name:", error);  // Debugging: Log any errors
    return null;
  } finally {
    await client.close();
    console.log("Database connection closed.");  // Debugging: Confirm DB closure
  }
}

// Function to get the full name of a user by userId
async function getFullName(userId) {
  const { client, collection } = await connectToDatabase();

  try {
    const user = await collection.findOne({ userId: userId }); // Fetch user based on userId
    console.log("Fetched user:", user);  // Debugging: Log the fetched user

    if (user && user.name) {
      const userFullName = user.name;  // Full name is the whole name field
      console.log("Full Name:", userFullName);  // Debugging: Log the full name
      return userFullName;
    }

    console.log("User or name not found.");
    return null;
  } catch (error) {
    console.error("Error fetching full name:", error);  // Debugging: Log any errors
    return null;
  } finally {
    await client.close();
    console.log("Database connection closed.");  // Debugging: Confirm DB closure
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////fFUNCTION TO GET INTERNATIONAL JOBS FOR THE USER BY AI IF CERTAIN CONDITIONS ARE MET


/////////////////////////////////////////customer care
async function getDynamicName() {
  let client, collection;
  try {
    ({ client, collection } = await connectToDatabase());
    console.log('Database connected successfully');

    // Fetch a user from the database, or use a different criterion if needed
    const user = await collection.findOne(); // Fetches any user document
    console.log('User fetched:', user);

    // Use a default value if name is not available
    return user?.name || 'Funmi'; // Default to "Tomi" if name is not found
  } catch (error) {
    console.error('Error fetching user name:', error);
    return 'Funmi'; // Default to "Tomi" if there is an error
  } finally {
    try {
      if (client) {
        await client.close();
        console.log('Database connection closed');
      }
    } catch (closeError) {
      console.error('Error closing database connection:', closeError);
    }
  }
}
function cleanJobTitle(title) {
  // Convert title to lowercase and find the position of "at" or "in"
  let cleanedTitle = title.toLowerCase();
  const atIndex = cleanedTitle.indexOf(' at ');
  const inIndex = cleanedTitle.indexOf(' in ');

  // If "at" or "in" is found, trim everything after it
  if (atIndex !== -1) {
    cleanedTitle = cleanedTitle.substring(0, atIndex).trim();
  } else if (inIndex !== -1) {
    cleanedTitle = cleanedTitle.substring(0, inIndex).trim();
  }
  // Capitalize the first letter of each word in the remaining title
  cleanedTitle = cleanedTitle.replace(/\b\w/g, char => char.toUpperCase());

  return cleanedTitle;
}

/////////////////////////////////////////////////////////////////////////////////////// Fetch job title and salary range
async function connectToDatabase2() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to database');
    const database = client.db('olukayode_sage');
    return { client, database };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

const messageVariants = [
  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    // const name = await getDynamicName() || 'Funmi';
    console.log("First Name=", firstName, "role=", role, "Salary Range=", salaryRange, "name", name, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")

    if (!firstName || !role) {
      return 'Error fetching user information';
    }

    // let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
    // ? accessedJobTitle.applicationEmail 
    // : null;

    //   // 🔴 Trigger callback if no email is found
    //   if (!applicationEmail) {
    //     console.log("No email found, adding to fallback queue.");
    //     return await handleMissingEmail(accessedJobTitle, session);
    //   }

    // No need to clean the role again, it's already cleaned in getAccessedJobTitle
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';

     // Cleaned textMessage without emojis
     return `Hello ${firstName},\n\nI'm ${name} from Suntrenia. We have an exciting job opportunity that fits your expertise perfectly.\n\nIt’s ${article} ${role} role, with a competitive salary range of ${salaryRange}.\n\nIf you're interested, please proceed by clicking the button below. If not, you can decline.\n\nBest regards,\n${name}`;
    },
    // 

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;

    if (!firstName || !role) {
      return 'Error fetching user information';
    }

    // let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
    //     ? accessedJobTitle.applicationEmail 
    //     : null;

    // // 🔴 Trigger callback if no email is found
    // if (!applicationEmail) {
    //   console.log("No email found, adding to fallback queue.");
    //   return await handleMissingEmail(accessedJobTitle, session);
    // }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We've spotted an exciting opportunity that could be perfect for you!\n\nThere's ${article} ${role} role with a competitive salary range of ${salaryRange} at a top company.\n\nYour skills match perfectly! Ready to take the next step? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

    // let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
    //     ? accessedJobTitle.applicationEmail 
    //     : null;

    // // 🔴 Trigger callback if no email is found
    // if (!applicationEmail) {
    //   console.log("No email found, adding to fallback queue.");
    //   return await handleMissingEmail(accessedJobTitle, session);
    // }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. There's a fantastic opportunity for ${article} ${role} role at a reputable company, offering a competitive salary of ${salaryRange}.\n\nYour expertise fits perfectly! Shall we proceed with the application? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
 
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. I hope you're having a great day! We found an incredible opportunity for you.\n\nA top company is looking for ${article} ${role}, offering a competitive salary range of ${salaryRange}.\n\nYou're the perfect fit! Shall we proceed with the application? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. We've found a job opportunity that could be perfect for you.\n\nA reputable company is hiring ${article} ${role} with a salary range of ${salaryRange}.\n\nYour skills make you a great fit! Shall we proceed with the application? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
  
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We've come across an exciting job opportunity that we believe is perfect for you.\n\nIt's for ${article} ${role} role at a top company, with a competitive salary range of ${salaryRange}.\n\nYour qualifications are a great match! Shall we move forward with the application? Simply click one of the buttons below, and we'll take care of the rest.\n\nBest regards,\n${name}`;
  
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. There's a job opening that could be just what you're looking for.\n\nA reputable company is looking for ${article} ${role}, offering a salary range of ${salaryRange}.\n\nYour experience makes you a perfect fit! Shall we apply on your behalf? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
 
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. I hope you're doing well! We've discovered a great opportunity that aligns with your skills.\n\nThe position is for ${article} ${role}, and the salary range is ${salaryRange}.\n\nYour qualifications are a perfect match. Shall we apply on your behalf? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
 
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We have an exciting job opportunity that we think you'd be perfect for.\n\nThe role is ${article} ${role} with a salary range of ${salaryRange}.\n\nWe believe your skills and experience make you a great fit. Are you interested in applying? Simply click one of the buttons below, and we'll handle the application process.\n\nBest regards,\n${name}`;
  
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle(session);
    const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
    let salaryRange = accessedJobTitle?.salaryRange;
    // Check if salaryRange is "Not Provided" and set default if true
    if (salaryRange === "Not provided" || !salaryRange) {
      salaryRange = '150k - 900k';
    }
    // const name = await getDynamicName() || 'Funmi';
    const fullName = await getDynamicName() || 'Funmi';
    const firstName2 = fullName.split(' ')[0];
    const name = firstName2;
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

//     let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
//     ? accessedJobTitle.applicationEmail 
//     : null;

// // 🔴 Trigger callback if no email is found
// if (!applicationEmail) {
//   console.log("No email found, adding to fallback queue.");
//   return await handleMissingEmail(accessedJobTitle, session);
// }

    const jobTitle = cleanJobTitle(role);
    // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. We hope you're having a wonderful day! We've found ${article} ${role} role that matches your profile perfectly.\n\nThe role offers a salary range of ${salaryRange}.\n\nYour qualifications are a great match for this opportunity. Would you like us to proceed with the application? Simply click one of the buttons below, and we'll take care of it for you.\n\nBest regards,\n${name}`;
  }
];


//////////////////////////////////////////////////////////////////////////////////////
async function getAccessedJobTitle(session) {
  if (!session || !session.userId) {
    console.error("Invalid session or missing userId:", session);
    throw new Error("User ID not found in session.");
  }

  const userId = session.userId;
  console.log(`User ${userId}: Starting getAccessedJobTitle process.`);

  let client, database, collection;
  try {
    ({ client, database } = await connectToDatabase2());
    console.log(`User ${userId}: Database connected successfully.`);

    collection = database.collection('application_processing_feeder');

    // ✅ Find job that hasn't had email sent yet
    const accessedRole = await collection.findOne(
      {
        userId,
        url: { $exists: true, $ne: null },
        role_processed: { $ne: true } // Only check role_processed
      },
      {
        sort: { processedAt: -1 } // Get most recent first
      }
    );

    // ✅ Simplified check - only verify essentials
    if (!accessedRole || !accessedRole.url) {
      console.log(`User ${userId}: No unprocessed job with valid URL found.`);
      return null;
    }

    // Extract and clean the role
    const cleanedRole = cleanJobTitle(accessedRole.title);

    // ✅ Return complete job data with original title AND cleaned role
    return {
      _id: accessedRole._id,
      role: cleanedRole, // Cleaned version for email
      originalTitle: accessedRole.title, // ✅ Keep original for reference
      url: accessedRole.url,
      salaryRange: accessedRole.salaryRange || null,
      jobLocation: accessedRole.jobLocation || null,
      qualification: accessedRole.qualification || null,
      experience: accessedRole.experience || null,
      jobField: accessedRole.jobField || null,
      jobDescription: accessedRole.jobDescription || null,
      keyResponsibilities: accessedRole.keyResponsibilities || null,
      skills: accessedRole.skills || null,
      requirements: accessedRole.requirements || null,
      applicationEmail: accessedRole.applicationEmail || null,
      postedDate: accessedRole.postedDate || null,
      deadline: accessedRole.deadline || null,
      company: accessedRole.company || null // ✅ For your email template
    };
  } catch (error) {
    console.error(`User ${userId}: Error fetching accessed role details:`, error);
    return null;
  } finally {
    if (client) {
      await client.close();
      console.log(`User ${userId}: Database connection closed.`);
    }
  }
}



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////existing
async function promptuserbymail(session) {
  console.log('We are here now.');

  // Ensure userId exists in session
  const userId = session.userId;
  if (!userId) {
    throw new Error('User ID not found in session.');
  }

  // Use the externally generated sessionToken
  console.log(`Using session token: ${sessionToken}`); // Corrected this line to use backticks for template literals
const userRecord = await (async () => {
    const c = new MongoClient(uri);
    try {
      await c.connect();
      return await c.db('olukayode_sage').collection('Users_CV_biodata').findOne(
        { _id: userId }, { projection: { email: 1 } }
      );
    } finally { await c.close(); }
  })();
  const recipientEmail = userRecord?.email;
  if (!recipientEmail) {
    console.error('[promptuserbymail] No email found for user:', userId);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: 465,
    secure: true,
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
///////////////////////////////////////////////
 
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db('olukayode_sage');
    const sessionsCollection = database.collection('sessions');

    // Update the session document with the userId and sessionToken
    await sessionsCollection.updateOne(
      { userId },
      {
        $set: {
          userId,
          sessionToken, // Use the session token generated externally
          lastLogin: new Date(),
        },
      },
      { upsert: true } // Insert a new document if none exists
    );
    console.log('User ID and session token successfully added to the database.');



// External function to use the session token value
async function fetchUserIdBySessionToken(sessionToken) {
  try {
    // Connect to the MongoDB database
    await client.connect();
    const database = client.db('olukayode_sage');
    const sessionsCollection = database.collection('sessions');

    // Query the database to find the user by sessionToken
    const sessionData = await sessionsCollection.findOne({ sessionToken });

    if (sessionData) {
      const userId = sessionData.userId;
      console.log(`Retrieved User ID: ${userId}`); // Corrected this line to use backticks for template literals
      return userId;
    } else {
      console.log("User ID not found.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    await client.close();
    console.log("Database connection closed.");
  }
}



  /////////////////////////////////////////////////////////////////////////////////////////
function generateHtmlMessage(textMessage, jobId, userId) {
  const trimmedUserId = (userId || '').trim().replace(/\s+/g, '');
  const emailId = Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  const DOMAIN = 'https://api.suntrenia.com';
  // triggerButtonResponseCheck(trimmedUserId, emailId, jobId);
  return `
    <div style="background: #f4f4f4; padding: 10px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <!-- Heading -->
        <h2 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px; text-align: left;">Exciting Job Opportunity</h2>

        <!-- Message Body -->
        <p style="line-height: 1.5; color: #555; text-align: left; margin: 0 0 20px 0; font-size: 14px;">
          ${textMessage.replace(/\n/g, '<br>')}
        </p>

        <!-- Buttons for Proceed and Decline -->
        <div style="text-align: left;">
        <!-- Proceed Button -->
        <a href="${DOMAIN}/handle-response?response=proceed&emailId=${emailId}&jobId=${jobId}&userId=${trimmedUserId}" 
          
           style="display: block; width: 100%; background: #28a745; color: white; padding: 12px; border-radius: 8px; text-decoration: none; font-size: 14px; text-align: center; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: background 0.3s ease;">
          Proceed
        </a>
      
        <!-- Decline Button -->
        <a href="${DOMAIN}/handle-response?response=decline&emailId=${emailId}&jobId=${jobId}&userId=${trimmedUserId}" 
           
           style="display: block; width: 100%; background: #dc3545; color: white; padding: 12px; border-radius: 8px; text-decoration: none; font-size: 14px; text-align: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: background 0.3s ease;">
          Decline
        </a>
      </div>

        <!-- Social Media Icons -->
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="text-align: center; margin: 0;">
          <a href="#" style="margin: 0 10px;"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" width="24"></a>
          <a href="#" style="margin: 0 10px;"><img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" width="24"></a>
          <a href="#" style="margin: 0 10px;"><img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" width="24"></a>
          <a href="#" style="margin: 0 10px;"><img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" width="24"></a>
        </p>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
          <p style="margin: 0;">You are receiving this email because you expressed interest in job opportunities with Suntrenia.</p>
          <p style="margin: 5px 0;">If you no longer wish to receive these emails, <a href="#" style="color: #28a745; text-decoration: none;">unsubscribe here</a>.</p>
          <p style="margin: 0;">&copy; Suntrenia 2024. All rights reserved.</p>
          <p style="margin: 5px 0;">Contact us: <a href="mailto:info@suntrenia.com" style="color: #28a745; text-decoration: none;">info@suntrenia.com</a> | +23470 3499 5589 | +234 802 794 6808</p>
          <p style="margin: 0;"><a href="#" style="color: #28a745; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #28a745; text-decoration: none;">Terms of Service</a></p>
        </div>
      </div>
    </div>
  `;
}

  // Function to select a random subject line and inject the role title
  function generateDynamicSubject(role) {
    const subjectTemplates = [
      "We've Found the Perfect {Role} Role Just for You!",
      "This {Role} Opportunity Has Your Name Written All Over It!",
      "You're a Perfect Fit for This {Role} Role – Apply Now!",
      "This {Role} Position Was Tailored Just for You – Let's Make It Yours!",
      "Ready to Secure Your Next Role? {Role} Awaits You!",
      "Step Into Your Dream {Role} Position – It's Yours for the Taking!",
      "We Found a {Role} Role That’s Perfect for You – Time to Apply!",
      "A Special {Role} Opportunity Is Here Just for You – Let’s Get You Hired!"
    ];
    const randomIndex = Math.floor(Math.random() * subjectTemplates.length);
    return subjectTemplates[randomIndex].replace("{Role}", role);
  }


  const messageVariants = [
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      // const name = await getDynamicName() || 'Funmi';
      console.log("First Name=", firstName, "role=", role, "Salary Range=", salaryRange, "name", name, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
  
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  
      // let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
      // ? accessedJobTitle.applicationEmail 
      // : null;
  
      //   // 🔴 Trigger callback if no email is found
      //   if (!applicationEmail) {
      //     console.log("No email found, adding to fallback queue.");
      //     return await handleMissingEmail(accessedJobTitle, session);
      //   }
  
      // No need to clean the role again, it's already cleaned in getAccessedJobTitle
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
  
       // Cleaned textMessage without emojis
       return `Hello ${firstName},\n\nI'm ${name} from Suntrenia. We have an exciting job opportunity that fits your expertise perfectly.\n\nIt’s ${article} ${role} role, with a competitive salary range of ${salaryRange}.\n\nIf you're interested, please proceed by clicking the button below. If not, you can decline.\n\nBest regards,\n${name}`;
      },
      // 
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
  
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  
      // let applicationEmail = (accessedJobTitle?.applicationEmail && accessedJobTitle.applicationEmail !== "Not provided") 
      //     ? accessedJobTitle.applicationEmail 
      //     : null;
  
      // // 🔴 Trigger callback if no email is found
      // if (!applicationEmail) {
      //   console.log("No email found, adding to fallback queue.");
      //   return await handleMissingEmail(accessedJobTitle, session);
      // }
  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We've spotted an exciting opportunity that could be perfect for you!\n\nThere's ${article} ${role} role with a competitive salary range of ${salaryRange} at a top company.\n\nYour skills match perfectly! Ready to take the next step? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  
    
  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. There's a fantastic opportunity for ${article} ${role} role at a reputable company, offering a competitive salary of ${salaryRange}.\n\nYour expertise fits perfectly! Shall we proceed with the application? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
   
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  
 
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. I hope you're having a great day! We found an incredible opportunity for you.\n\nA top company is looking for ${article} ${role}, offering a competitive salary range of ${salaryRange}.\n\nYou're the perfect fit! Shall we proceed with the application? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. We've found a job opportunity that could be perfect for you.\n\nA reputable company is hiring ${article} ${role} with a salary range of ${salaryRange}.\n\nYour skills make you a great fit! Shall we proceed with the application? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
    
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We've come across an exciting job opportunity that we believe is perfect for you.\n\nIt's for ${article} ${role} role at a top company, with a competitive salary range of ${salaryRange}.\n\nYour qualifications are a great match! Shall we move forward with the application? Simply click one of the buttons below, and we'll take care of the rest.\n\nBest regards,\n${name}`;
    
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. There's a job opening that could be just what you're looking for.\n\nA reputable company is looking for ${article} ${role}, offering a salary range of ${salaryRange}.\n\nYour experience makes you a perfect fit! Shall we apply on your behalf? Simply click one of the buttons below, and we'll take care of everything.\n\nBest regards,\n${name}`;
   
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. I hope you're doing well! We've discovered a great opportunity that aligns with your skills.\n\nThe position is for ${article} ${role}, and the salary range is ${salaryRange}.\n\nYour qualifications are a perfect match. Shall we apply on your behalf? Simply click one of the buttons below, and we'll handle the rest.\n\nBest regards,\n${name}`;
   
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. We have an exciting job opportunity that we think you'd be perfect for.\n\nThe role is ${article} ${role} with a salary range of ${salaryRange}.\n\nWe believe your skills and experience make you a great fit. Are you interested in applying? Simply click one of the buttons below, and we'll handle the application process.\n\nBest regards,\n${name}`;
    
    },
  
    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle(session);
      const role = accessedJobTitle?.role ?? null; // 'role' is already cleaned
      let salaryRange = accessedJobTitle?.salaryRange;
      // Check if salaryRange is "Not Provided" and set default if true
      if (salaryRange === "Not provided" || !salaryRange) {
        salaryRange = '150k - 900k';
      }
      // const name = await getDynamicName() || 'Funmi';
      const fullName = await getDynamicName() || 'Funmi';
      const firstName2 = fullName.split(' ')[0];
      const name = firstName2;
      if (!firstName || !role) {
        return 'Error fetching user information';
      }
  

  
      const jobTitle = cleanJobTitle(role);
      // const article = /^[aeiou]/i.test(jobTitle) ? 'an' : 'a';
      const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
      return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. We hope you're having a wonderful day! We've found ${article} ${role} role that matches your profile perfectly.\n\nThe role offers a salary range of ${salaryRange}.\n\nYour qualifications are a great match for this opportunity. Would you like us to proceed with the application? Simply click one of the buttons below, and we'll take care of it for you.\n\nBest regards,\n${name}`;
    }
  ];

  const emailId = Date.now(); // millisecond precision
async function sendSelectedMessage(session, sessionToken, callback) {
  let userId; // Declare with let to allow reassignment

  if (session && session.userId) {
    userId = session.userId; // Extract userId from session
  } else {
    console.log("User ID not found in session, fetching using session token...");
    userId = await fetchUserIdBySessionToken(sessionToken); // Use await to get the result
  }

  if (!userId) {
    console.error('User ID is missing. Cannot proceed.');
    return; // Exit if userId is not available
  }

  console.log(userId, "1111111111111111111100000000000000000000000000000000000000000000000000000000000000000");
  try {
    // Fetch job title for the current session
    const accessedJobTitle = await getAccessedJobTitle(session,userId);

    if (!accessedJobTitle) {
      console.log('No valid accessed job title found for the user. Cannot send the message.');
      return;
    }

    const { _id, role, url, processedAt } = accessedJobTitle;

    if (!_id || !role || !url) {
      console.log('Invalid accessed job title data found for the user. Cannot send the message.');
      return;
    }

    const jobId = _id || `job_${Date.now()}`;
    const emailId = Date.now(); // This can also be passed around consistently
    


    const randomIndex = Math.floor(Math.random() * messageVariants.length);
    const selectedMessage = await messageVariants[randomIndex]();
    const dynamicSubject = generateDynamicSubject(role);
    // const htmlMessage = generateHtmlMessage(selectedMessage);
    const htmlMessage = generateHtmlMessage(selectedMessage, jobId, userId);


    // Define mail options
    const mailOptions = {
      from: `"Suntrenia" <${process.env.EMAIL_USER}>`,
      to: recipientEmail, // Replace with the recipient's email
      subject: dynamicSubject,
      text: selectedMessage,
      html: htmlMessage,
    };

    console.log('Sending email to:', recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Connect to MongoDB
    await client.connect();
    const db = client.db('olukayode_sage');
    const collection = db.collection('user_application_records');

    // Update the specific document for the user
    // const jobId = _id || `job_${Date.now()}`; // Use existing _id or generate one
    const result = await collection.updateOne(
      { _id, userId }, // Filter by user ID and document ID
      {
        $set: {
          role: role,
          emailId: Date.now(), // Same as in generateHtmlMessage()
          subject: dynamicSubject,
          jobId,              // Unique ID for this job prompt
          messageId: info.messageId,
          url: url,
          processedAt: processedAt,
          sentAt: new Date(),
        },
      },
      { upsert: true }
    );



    console.log('Selected subject and job details saved to database:', result.upsertedId || 'Document updated');
    const collection3 = db.collection('application_processing_feeder');

    // Update the specific document for the user
    

    const publish = await collection3.updateOne(
      { _id, userId },
      {
        $set: {
          role: accessedJobTitle.role,
          jobId,
          url,
          published: true,
          emailId, // ⬅️ This is our golden timestamp
          publishedAt: new Date(),
        },
      },
      { upsert: true }
    );
    
    // Step 3: save emailId into session for later retrieval
    if (session) {
      session.emailId = emailId;
      console.log("Email ID timestamp saved to session:", emailId);
    } else {
      console.warn("Session object is not available — cannot save emailId.");
    }

    if (publish.matchedCount > 0) {
      console.log('Document updated in application_processing_feeder');
    } else if (publish.upsertedId) {
      console.log('New document inserted in application_processing_feeder:', publish.upsertedId);
    } else {
      console.log('No changes made to the application_processing_feeder document');
    }

    // Close the MongoDB connection
    await client.close();

    // Execute callback if provided
    if (callback) {
      console.log('Executing callback...');
      callback(); // Call the provided callback function
    }

  } catch (error) {
    console.error('Error sending email:', error);
    if (client) await client.close();
  }
}

// Example callback function
function myCallback() {
  console.log('Callback executed successfully.');
}

// Execute the function with the session, sessionToken, and callback
await sendSelectedMessage(session, sessionToken, myCallback);

}
// Persistent MongoDB connection (initialize this when your app starts)
let database;
async function initializeDatabase() {
  await client.connect();
  database = client.db('olukayode_sage'); // Use the correct database name
  console.log('Connected to MongoDB');
}





// Function to generate a unique ID
function generateUniqueId() {
    return `email_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Initialize the database connection when the app starts
        initializeDatabase().catch(console.error);

          // IMAP configuration (Gmail example with rejectUnauthorized set to false)
          const config = {
            imap: {
              user: process.env.IMAP_USER,
              password: process.env.IMAP_PASSWORD,
              host: 'imap.gmail.com', // Gmail's IMAP server
              port: 993,
              tls: true,
              authTimeout: 3000,
              tlsOptions: { rejectUnauthorized: false } // Bypass self-signed certificate error
            },
          };
          




// Add this function to your backend (after the IMAP config)
// Add this function to your backend (after the IMAP config)
// ✅ 1. Create HTTP server with a clear name
        const httpServer = http.createServer(app);

        // ✅ 2. Create WebSocket SERVER (uses httpServer)
        const wss = new WebSocket.Server({ server: httpServer });

// ✅ 3. Browser client connection handler (unchanged from original)
wss.on('connection', (ws, req) => {
  console.log('🔌 WS client connected');
  console.log('📍 Connection details:', {
    url: req.url,
    headers: req.headers,
    remoteAddress: req.socket.remoteAddress
  });

  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = url.searchParams.get('userId');

  if (userId) {
    clients.set(userId, ws);
    console.log(`🆔 Registered client for userId: ${userId}`);
    console.log(`📊 Total connected clients: ${clients.size}`);
  }

  ws.send(JSON.stringify({
    type: 'connection_established',
    message: 'WebSocket connected successfully',
    timestamp: new Date().toISOString()
  }));

  ws.on('message', (message) => {
    console.log('📨 Received message from client:', message.toString());
  });

  ws.on('close', () => {
    console.log(`❌ Client disconnected${userId ? ` (${userId})` : ''}`);
    if (userId) clients.delete(userId);
    console.log(`📊 Remaining clients: ${clients.size}`);
  });

  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });
});

// ✅ 4. Persistent WebSocket CLIENT to api.suntrenia.com
//    Replaces the old inline ws that had no reconnect logic
let suntreniaWs = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_MS = 30000;
// ✅ FIX 23 — Deduplication map to prevent double proceed processing
const processedResponseIds = new Map();

// ============================================================================
// ✅ BAILEYS — Free WhatsApp Web client (primary WhatsApp provider)
// First run: scan QR code with WhatsApp → auth saved to ./baileys_auth/
// Subsequent runs: auto-connects, no QR needed
// ============================================================================
async function startBaileys() {
  try {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth');

    global.baileysSocket = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      browser: ['IntelliJob', 'Chrome', '1.0'],
      syncFullHistory: false,
      logger: require('pino')({ level: 'silent' }), // ✅ Silence JSON logs
    });

    // ✅ Save credentials whenever updated
    global.baileysSocket.ev.on('creds.update', saveCreds);

    // ✅ Handle connection updates
    global.baileysSocket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;
     if (qr) {
        console.log('[Baileys] 📱 Scan this QR code with WhatsApp:');
        const qrcode = require('qrcode-terminal');
        qrcode.generate(qr, { small: true });
      }
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error instanceof Boom)
          ? lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
          : true;
        console.log('[Baileys] Connection closed. Reconnecting:', shouldReconnect);
        if (shouldReconnect) {
          setTimeout(startBaileys, 5000); // Reconnect after 5 seconds
        } else {
          console.log('[Baileys] Logged out — delete ./baileys_auth/ and restart to re-scan QR');
        }
      } else if (connection === 'open') {
        console.log('[Baileys] ✅ Connected to WhatsApp successfully!');
      }
    });

    // ✅ Listen for incoming messages from job groups
    global.baileysSocket.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;
      for (const msg of messages) {
        if (msg.key.fromMe) continue; // Skip messages sent by us
        const groupId = msg.key.remoteJid;
        if (!groupId?.endsWith('@g.us')) continue; // Only group messages

        // ✅ Check if message is from an active job group
        const groupDbClient = new MongoClient(uri);
        let isJobGroup = false;
        try {
          await groupDbClient.connect();
          const groupDoc = await groupDbClient
            .db('olukayode_sage')
            .collection('whatsapp_job_groups')
            .findOne({ groupId, active: true });
          isJobGroup = !!groupDoc;

          // ✅ Also check env var group IDs as fallback
          if (!isJobGroup) {
            const envGroups = [
              process.env.WHATSAPP_JOB_GROUP_1,
              process.env.WHATSAPP_JOB_GROUP_2,
              process.env.WHATSAPP_JOB_GROUP_3,
            ].filter(Boolean);
            isJobGroup = envGroups.includes(groupId);
          }
        } catch (dbErr) {
          console.warn('[Baileys] DB check failed:', dbErr.message);
        } finally {
          await groupDbClient.close();
        }

        if (!isJobGroup) continue;

        // ✅ Extract message body
        const body = msg.message?.conversation ||
                     msg.message?.extendedTextMessage?.text ||
                     msg.message?.imageMessage?.caption ||
                     '';

        if (!body) continue;

        console.log(`[Baileys] 📨 Job group message from ${groupId}: ${body.substring(0, 100)}...`);

        // ✅ Push to global cache for poller to pick up
        global.baileysMessages.push({
          from: groupId,
          chatId: groupId,
          timestamp: Math.floor(Date.now() / 1000),
          receivedAt: Date.now(),
          text: { body }
        });
      }
    });

  } catch (err) {
    console.error('[Baileys] Failed to start:', err.message);
    setTimeout(startBaileys, 10000); // Retry after 10 seconds
  }
}

// ✅ Start Baileys when app starts
startBaileys().catch(err => console.error('[Baileys] Startup error:', err));

function connectToSuntrenia() {
  console.log('[Suntrenia WS] Connecting to wss://api.suntrenia.com...');
  suntreniaWs = new WebSocket('wss://api.suntrenia.com');
  suntreniaWs.onmessage = async (event) => {
    try {
      const payload = JSON.parse(event.data);
      console.log('📩 Received WebSocket nudge from server:', payload);
      const { userId, emailId, jobId, type, userEmail, responseId } = payload;

      // ✅ Deduplicate — ignore if same responseId was processed in last 60 seconds
      if (type === 'proceed' && responseId) {
        if (processedResponseIds.has(responseId)) {
          console.log('⚠️ Duplicate proceed signal ignored:', responseId);
          return;
        }
        processedResponseIds.set(responseId, Date.now());
        // Clean entries older than 60 seconds
        for (const [id, ts] of processedResponseIds.entries()) {
          if (Date.now() - ts > 60000) processedResponseIds.delete(id);
        }
      }

        if (type === 'proceed') {
        console.log('✅ User already authorized — verifying with database...');
     let proceedClient;
        try {
          proceedClient = new MongoClient(uri);
          await proceedClient.connect();
          const db = proceedClient.db('olukayode_sage');
          console.log('🔗 Connected to MongoDB for auth check');
          const authData = await db.collection('user_gmail_tokens').findOne({ userId });
          await proceedClient.close();
          console.log('✅ MongoDB connection closed');
          if (authData && authData.isAuthorized) {
            console.log('✅ Database confirms authorization');
            console.log('📧 Email to use:', authData.userEmail);
            console.log('🔐 Personal email?', authData.usePersonalEmail);
            await checkForResponses(userId, emailId, jobId, type);
          } else {
            console.warn('⚠️ Authorization mismatch - user may need to re-authorize');
            console.warn('⚠️ Auth data found:', !!authData);
            console.warn('⚠️ Is authorized:', authData?.isAuthorized);
          }
     } catch (dbError) {
          console.error('❌ Error checking authorization from database:', dbError);
          console.error('❌ Error details:', dbError.message);
          try { if (proceedClient) await proceedClient.close(); } catch (e) {
            console.error('Error closing MongoDB:', e);
          }
        }

      } else if (type === 'user_authorized') {
        console.log('✅ User just completed authorization!');
        console.log('📧 Email authorized:', userEmail);
        try {
          mongoClient = new MongoClient(process.env.MONGODB_URI);
          await mongoClient.connect();
          console.log('🔗 Connected to MongoDB for new auth verification');
          const db = mongoClient.db('olukayode_sage');
          const authData = await db.collection('user_gmail_tokens').findOne({ userId });
          await mongoClient.close();
          console.log('✅ MongoDB connection closed');
          if (authData && authData.isAuthorized) {
            console.log('✅ Database confirms new authorization');
            console.log('📧 Email to use:', authData.userEmail);
            console.log('🔐 Personal email?', authData.usePersonalEmail);
            await checkForResponses(userId, emailId, jobId, 'proceed');
          } else {
            console.warn('⚠️ Authorization verification failed');
            console.warn('⚠️ Auth data found:', !!authData);
            console.warn('⚠️ Is authorized:', authData?.isAuthorized);
          }
     } catch (dbError) {
          console.error('❌ Error checking authorization from database:', dbError);
          console.error('❌ Error details:', dbError.message);
          try { if (proceedClient) await proceedClient.close(); } catch (e) {
            console.error('Error closing MongoDB:', e);
          }
        }

      } else if (type === 'decline') {
        console.log('❌ User declined application');
        await checkForResponses(userId, emailId, jobId, type);

      } else if (type === 'connection') {
        console.log('📩 Suntrenia WS handshake confirmed:', payload.message);
        reconnectAttempts = 0;
      }

    } catch (err) {
      console.error('❌ Error in WebSocket message handler:', err);
      console.error('❌ Error name:', err.name);
      console.error('❌ Error message:', err.message);
      console.error('❌ Stack trace:', err.stack);
    }
  };

  suntreniaWs.onopen = () => {
    console.log('✅ [Suntrenia WS] Connected successfully');
    reconnectAttempts = 0;
  };

  suntreniaWs.onclose = (event) => {
    console.warn(`⚠️ [Suntrenia WS] Disconnected (code: ${event.code}, reason: ${event.reason || 'none'})`);
    scheduleReconnect();
  };

  suntreniaWs.onerror = (error) => {
    console.error('❌ [Suntrenia WS] Error:', error.message || error);
  };
}

function scheduleReconnect() {
  const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), MAX_RECONNECT_MS);
  reconnectAttempts++;
  console.log(`🔄 [Suntrenia WS] Reconnecting in ${delay / 1000}s (attempt ${reconnectAttempts})...`);
  setTimeout(connectToSuntrenia, delay);
}

connectToSuntrenia();

setInterval(() => {
  if (suntreniaWs && suntreniaWs.readyState === WebSocket.OPEN) {
    suntreniaWs.ping && suntreniaWs.ping();
  }
}, 25000);


// Check if user is authorized
// Endpoint for frontend to check authorization status
app.get('/check-user-auth', async (req, res) => {
  const { userId } = req.query;
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('olukayode_sage');
    const userAuth = await db.collection('user_gmail_tokens').findOne({ userId });
    
    await client.close();
    
    const authorized = userAuth && userAuth.isAuthorized;
    
    res.json({
      authorized,
      userEmail: userAuth?.userEmail,
      usePersonalEmail: userAuth?.usePersonalEmail,
      authorizedAt: userAuth?.authorizedAt
    });
    
  } catch (error) {
    console.error('Error checking user auth:', error);
    res.status(500).json({ error: 'Failed to check authorization' });
  }
});


async function sendApplicationEmail(userId, applicationData) {
  console.log("📧 [sendApplicationEmail] START - Function called");
  console.log("👉 Parameters:", { userId, applicationData: applicationData ? "exists" : "missing" });
  
  let client;
  try {
    console.log("🔗 Connecting to MongoDB...");
    client = new MongoClient(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    await client.connect();
    console.log("✅ MongoDB connected successfully");

    const db = client.db('olukayode_sage');
    console.log(`🔍 Looking up user auth for userId: ${userId}`);
    
    const userAuth = await db.collection('user_gmail_tokens').findOne({ userId });
    console.log("📋 User auth result:", userAuth ? "Found" : "Not found");
    
    let fromEmail;
    if (!userAuth || !userAuth.isAuthorized) {
      console.warn("⚠️ User not authorized — sending via Suntrenia SMTP");
      fromEmail = process.env.EMAIL_USER;
    } else {
      fromEmail = userAuth.userEmail;
    }
    
    // Use the stored email
    //const fromEmail = userAuth.userEmail;
    console.log(`📨 Using sender email: ${fromEmail}`);
    console.log(`🔄 Email method: ${userAuth.usePersonalEmail ? 'Gmail API' : 'SMTP'}`);
    
    if (userAuth.usePersonalEmail) {
      console.log("🚀 Sending via Gmail API...");
      // Send via Gmail API with user's token
      await sendViaGmailAPI(userAuth.accessToken, fromEmail, applicationData);
    } else {
      console.log("🚀 Sending via SMTP...");
      // Send via your SMTP (company email)
      await sendViaSMTP(fromEmail, applicationData);
    }
    
    console.log("✅ Email sent successfully!");
    
  } catch (error) {
    console.error("❌ [sendApplicationEmail] Error:", error.message);
    throw error;
  } finally {
    if (client) {
      console.log("🔗 Closing MongoDB connection...");
      await client.close();
      console.log("✅ MongoDB connection closed");
    }
  }
}


async function getSenderEmail(userId, emailId, jobId) {
  // ✅ Normalize userId — remove leading + for DB lookup
  userId = userId?.replace(/^\+/, '') || userId;
  console.log("📧 [getSenderEmail] invoked");
  console.log("👉 Params:", { userId, emailId, jobId });
  let client;
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db("olukayode_sage");

    // 1️⃣ Check tracking / response collection
    const record = await db
      .collection("user_application_response")
      .findOne({ userId, emailId, jobId }, { projection: { recipientEmail: 1 } });

    if (record?.recipientEmail) {
      console.log("✅ Sender email found:", record.recipientEmail);
      return record.recipientEmail;
    }

    // 2️⃣ Fallback: check user profile
          const user = await db.collection("Users_CV_biodata").findOne(
        { $or: [{ _id: userId }, { _id: '+' + userId }, { phoneNumber: '+' + userId }] },
        { projection: { email: 1 } }
      );
    if (user?.email) {
      console.log("✅ Sender email found in user profile:", user.email);
      return user.email;
    }

    console.warn("❌ No sender email found for", { userId, emailId, jobId });
    return null;
  } catch (err) {
    console.error("💥 Error in getSenderEmail:", err);
    return null;
  } finally {
    if (client) await client.close();
  }
}


async function handleDeclineResponse(userId, emailId, jobId, from) {
  console.log("❌ [handleDecline] Processing decline for userId:", userId, "jobId:", jobId);

  const declineResponses = [
    "Thank you for letting us know. Should you change your mind, feel free to reach out again.",
    "Noted. Should you reconsider, we'll be here to assist you further.",
    "Understood. Feel free to reconnect if you decide to explore our services later.",
    "Got it. Should you have a change of heart, don't hesitate to get in touch with us again.",
    "Acknowledged. If your circumstances change, we're here to help.",
    "Thank you for informing us. Remember, our doors are always open if you reconsider.",
    "I understand. Our assistance remains available if you have a change of plans.",
    "Received. Feel free to reach out if you have any questions in the future."
  ];

  const botReply = declineResponses[Math.floor(Math.random() * declineResponses.length)];

  if (from) {
    try {
      await sendReplyToRecipient(from, botReply, jobId, userId);
      console.log("✅ [handleDecline] Acknowledgement email sent to:", from);
    } catch (emailErr) {
      console.error("❌ [handleDecline] Failed to send acknowledgement:", emailErr.message);
    }
  } else {
    console.warn("⚠️ [handleDecline] No sender email — skipping acknowledgement");
  }

  try {
    const declineClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await declineClient.connect();
    const declineDb = declineClient.db('olukayode_sage');

    await declineDb.collection('application_processing_feeder').updateOne(
      { userId, jobId },
      {
        $set: {
          role_processed: true,
          status: 'Treated',
          application: 'Declined',
          published: true,
          publishedAt: new Date(),
          processedAt: new Date(),
          declinedAt: new Date()
        }
      }
    );
    console.log("✅ [handleDecline] application_processing_feeder updated");

    await declineDb.collection('roles_listing').updateOne(
      { userId, jobId },
      {
        $set: {
          label: 'declined',
          userResponse: 'decline',
          processedAt: new Date()
        }
      }
    );
    console.log("✅ [handleDecline] roles_listing updated");

    await declineDb.collection('user_application_response').updateOne(
      { userId, emailId, jobId },
      {
        $set: {
          processed: true,
          processedAt: new Date(),
          outcome: 'declined'
        }
      }
    );
    console.log("✅ [handleDecline] user_application_response marked processed");

    await declineClient.close();
    console.log("✅ [handleDecline] Full decline flow complete");

  } catch (dbErr) {
    console.error("❌ [handleDecline] DB update failed:", dbErr.message);
  }
}

async function checkForResponses(userId = null, emailId = null, jobId = null) {
  console.log("🚀 [checkForResponses] invoked");
  console.log("👉 Params:", { userId, emailId, jobId });
  
  let mongoClient = null;
  let collection = null;
  let userResponse = null;
  let botReply = null;
  let from = null; // This will be set using our helper function
  
  try {
      // === 1️⃣ Connect to Mongo & get button response early
      if (userId && emailId && jobId) {
          // Get sender email using helper function
          from = await getSenderEmail(userId, emailId, jobId);
          
          mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
          await mongoClient.connect();
          const db = mongoClient.db('olukayode_sage');
          collection = db.collection('user_application_response');
          
          const rec = await collection.findOne({ userId, emailId, jobId });
          
          if (rec) {
              console.log("📌 DB record found:", {
                  userId: rec.userId,
                  emailId: rec.emailId,
                  jobId: rec.jobId,
                  response: rec.response || "<no response field>"
              });
              
              userResponse = rec.response.toLowerCase();
              console.log("✅ Normalized button response:", userResponse);
              // ── Decline check — exits early before proceed block ──
              if (
                userResponse.includes("decline") ||
                userResponse.includes("not interested") ||
                userResponse.includes("not apply") ||
                userResponse.includes("no please") ||
                userResponse.includes("no")
              ) {
                const senderEmail = await getSenderEmail(userId, emailId, jobId);
                await handleDeclineResponse(userId, emailId, jobId, senderEmail);
                return;
              }
              if (userResponse.includes("proceed") ||
                  userResponse.includes("okay") ||
                  userResponse.includes("yes") ||
                  userResponse.includes("ok") ||
                  userResponse.includes("continue") ||
                  userResponse.includes("thank you") ||
                  userResponse.includes("sure") ||
                  userResponse.includes("please do")) {
                  ////////////////////////////////////////////////////////
                    // if (!authorized) {
                    //   req.session.nextAction = { type: "jobApplication", threadId, subscriber };
                    //   return res.redirect("/auth/google");
                    // }
/////////////////////////////////////////////////////////////
        const responses = [
          "Thank you for considering our services. We're excited to move forward with your application. For more details about the job role and your application status, please visit the 'Manage Application' tab on your user dashboard.",
          "We appreciate your interest and are ready to proceed with your application. For further information about the job role and your application status, please check the 'Manage Application' tab on your user dashboard.",
          "Your decision to apply is noted. We'll handle your application with care. To learn more about the role and track your application status, please visit the 'Manage Application' tab on your user dashboard.",
          "Great choice! We're processing your application. For more details about the role and to check your application status, please go to the 'Manage Application' tab on your user dashboard.",
          "Thank you for your response. We’ll ensure everything is in place for your application. For additional information about the job role and to monitor your application status, please visit the 'Manage Application' tab on your user dashboard."
        ];

        botReply = responses[Math.floor(Math.random() * responses.length)];

          function cleanURL(url) {
            const httpsIndex = url.indexOf('https://');
            if (httpsIndex !== -1) {
              const cleanedURL = url.substring(httpsIndex);
              console.log('Cleaned URL1:', cleanedURL); // Log the cleaned URL
              return cleanedURL;
            }
            console.log('Original URL (no change):', url); // Log the original URL if 'https://' is not found
            return url; // Return the URL as is if 'https://' is not found

          }


          async function fetchDataAndProcess(session, sessionToken,userId, responseData,exactTimestamp,jobId) {

            await client.connect();
            const database = client.db('olukayode_sage');
            const collection = database.collection("Users_CV_biodata");
            const sessionsCollection = database.collection('sessions');
          try {
            const sessionData = await sessionsCollection.findOne({ sessionToken });
          
             if (sessionData) {
              const userId = sessionData.userId;
              console.log(`Retrieved User ID: ${userId}`); // Corrected this line to use backticks for template literals
              console.log("Fetch Data and Process user 888888888888888888888888888888888888888888888888",userId)
              // const data = await collection.find({ _id: new ObjectId(userId) }).toArray();
              const data = await collection.find({ _id: userId }).toArray();
               console.log(data)
              //  
       
// }
// KEEP THIS VERSION - IT'S DESIGNED FOR YOUR NEW SYSTEM
async function processCV(jobPostingUrl, userId, sessionToken, jobId, exactTimestamp, options = {}) {
  try {
    console.log("🎯 Starting CV processing pipeline with Groq...");
    
    // Validate input
    if (!userId || !sessionToken) {
      console.error("Missing required userId or sessionToken");
      throw new Error("Missing required authentication parameters");
    }

    // 1. Get original user data
    console.log("📋 Fetching user data...");
    const originalData = await getUserData(userId, sessionToken, jobId, exactTimestamp);
    if (!originalData) {
      throw new Error("Failed to retrieve user data");
    }
    console.log("✅ User data retrieved successfully");

    // 2. Get job details
    console.log("📋 Fetching job details...");
    const jobDetails = await getJobDetailsForCV(jobId, userId);
    if (!jobDetails || !jobDetails.description) {
      console.warn("Job details not found or incomplete, using basic tailoring");
      return {
        tailoredCVData: originalData,
        coverLetter: generateCoverLetter(
          originalData, 
          "", 
          options.companyName || "the company",
          options.position || "the position"
        ),
        metadata: {
          tailoringMethod: "None (job details missing)",
          generatedAt: new Date().toISOString()
        }
      };
    }
    console.log("✅ Job details retrieved successfully");

    // 3. Try Groq tailoring (replaces Gemini)
    console.log("🤖 Starting CV tailoring with Groq...");
    let tailoringMethod = "Keyword";
    let tailoredData;
    
    if (options.useAI && jobDetails.description.length > 100) {
      console.log("🚀 Attempting Groq AI tailoring...");
      tailoredData = await tailorWithGroq(originalData, jobDetails, userId, jobId);
      
      if (tailoredData) {
        tailoringMethod = "Groq AI (Llama 3.3 70B)";
        console.log("✅ Groq AI tailoring successful");
      } else {
        console.log("⚠️ Groq tailoring failed, falling back to keyword method");
      }
    }
    
    // Fallback to keyword method if Groq not used or failed
    if (!tailoredData) {
      console.log("📝 Using keyword-based tailoring...");
      tailoredData = tailorWithKeywords(originalData, jobDetails.description);
    }

    // 4. Generate cover letter
    console.log("✉️ Generating cover letter...");
    // const coverLetter = generateCoverLetter(
    //   tailoredData,
    //   jobDetails.description,
    //   options.companyName || jobDetails.company || "the company",
    //   options.position || jobDetails.title || "the position"
    // );
///////////////////////////////////////////////////////////////////////
// TO:

      const coverLetter = await generateCoverLetter(
        tailoredData,
        jobDetails.description,
        options.companyName || jobDetails.company || "the company",
        options.position || jobDetails.title || "the position",
        userId,
        jobId
      );
    // const coverLetter = generateCoverLetter(
    //   tailoredData,
    //   jobDetails.description,
    //   options.companyName || jobDetails.company || "the company",
    //   options.position || jobDetails.title || "the position",
    //   userId,
    //   jobId
    // );
console.log("🎉 CV processing completed successfully");
    return {
      tailoredCVData: tailoredData,
      coverLetter,
      metadata: {
        tailoringMethod,
        generatedAt: new Date().toISOString(),
        jobDetails: {
          title: jobDetails.title,
          company: jobDetails.company,
          keywords: (await getJobKeywords(jobDetails.description, userId, jobId)).topKeywords
        }
      }
    };

  } catch (error) {
    console.error("❌ CV processing pipeline failed:", error);
    throw error;
  }
}

// Initialize tokenizer
const tokenizer = new natural.WordTokenizer();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Configuration
const stopWords = new Set(["a", "an", "the", "and", "is", "of", "in", "to", "for", "with", "on", "as", "by", "at", "an", "the", "and", "is", "of", "in", "to", "for", "with", "on", "as", "by", "at", "from", "this", "that", "or", "which", "be", "it", "are", "was", "were", "has", "have", "had", "will", "would", "can", "could", "should", "may", "might", "been", "being", "do", "does", "did", "doing", "than", "then", "there", "their", "if", "into", "but", "not", "all", "about", "some", "any", "such", "each", "many", "more", "most", "no", "nor", "too", "very", "either", "neither", "both", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "other", "now", "later"]);
const techLexicon = new Set(['python', 'sql', 'aws', 'data', 'analysis', 'machine', 'learning', 'statistics']);


async function getUserData(userId, sessionToken, jobId, exactTimestamp) {
  try {
      await client.connect();
      const database = client.db('olukayode_sage');
      const collection = database.collection("Users_CV_biodata");
      const sessionsCollection = database.collection('sessions');

      // Verify session
      const sessionData = await sessionsCollection.findOne({ sessionToken });
      if (!sessionData) {
          throw new Error("Invalid session token");
      }

      // Fetch user data
      const userDataArray = await collection.find({ _id: userId }).toArray();
      if (!userDataArray || userDataArray.length === 0) {
          throw new Error("User data not found");
      }

      const userData = userDataArray[0]; // Assuming we want the first document

      // Fetch job data
      const jobData = await fetchPublishedJobById(userId, jobId) || 
                      await fetchPublishedJobByTimestamp(userId, exactTimestamp);
      console.log("User data retrieved:", userData.fullName || userData.name || "Unknown");        
      
      // Transform to match expected structure
      return {
          summary: userData.professionalSummary || userData.summary || "",
          skills: userData.skills || [],
          workExperience: userData.workExperience || [],
          projects: userData.projects || [],
          education: userData.education || [],
          name: userData.fullName || userData.name || "",
          address: userData.address || "",
          phone_number: userData.phone || userData.phoneNumber || "",
          email: userData.email || "",
          rawData: userData, // Keep original for reference
          jobData: jobData // Include the job data if needed
      };

  } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Or return a default structure if preferred
  } finally {
      await client.close();
  }
}

async function fetchPublishedJobById(userId, jobId) {
  let newClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await newClient.connect();
  try {
    const db = newClient.db('olukayode_sage');
    const collection = db.collection('application_processing_feeder');
    
    const job = await collection.findOne({
      userId,
      jobId,
      published: true
    });
    
    if (!job) {
      console.log('No published job found with ID:', jobId);
      return null;
    }
    console.log("Job found by ID:", jobId);
    return job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  } finally {
    await newClient.close();
  }
}

async function fetchPublishedJobByTimestamp(userId, exactTimestamp) {
  if (!exactTimestamp) {
    console.log("No timestamp provided for job search");
    return null;
  }
  
  let newClient =  new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await newClient.connect();
  try {
    const db = newClient.db('olukayode_sage');
    const collection = db.collection('application_processing_feeder');
    
    // Create start and end dates for 1ms range
    const startDate = new Date(exactTimestamp);
    const endDate = new Date(exactTimestamp + 1);
    
    const job = await collection.findOne({
      userId,
      publishedAt: {
        $gte: startDate,
        $lt: endDate
      }
    });
    
    if (!job) {
      console.log('No job found published at exact timestamp:', exactTimestamp);
      return null;
    }
    console.log("Job found by timestamp:", exactTimestamp);
    return job;
  } catch (error) {
    console.error("Error fetching job by timestamp:", error);
    return null;
  } finally {
    await newClient.close();
  }
}

// Fix getJobDetailsForCV to properly handle job fetching
async function getJobDetailsForCV(jobId, userId) {
  try {
    // 1. Try to fetch from database first
    const job = await fetchPublishedJobById(userId, jobId) || await fetchPublishedJobByTimestamp(userId, jobId);
    console.log("Job details retrieval status:", job ? "Success" : "Failed");
    
    // 2. Check if we have complete data in DB
    if (isCompleteJobData(job)) {
      console.log("Complete job data found in database");
      return formatJobData(job);
    }

    // 3. Fallback to URL scraping
    console.log('Insufficient DB data, scraping URL:', job?.url || "URL not available");
    const scrapedData = job?.url ? await scrapeJobPage(job.url) : {};
    
    // Merge DB and scraped data
    return formatJobData({
      ...job,
      ...scrapedData
    });

  } catch (error) {
    console.error('Job details fetch failed:', error);
    throw new Error('Could not retrieve job details');
  }
}

// Data completeness check
function isCompleteJobData(job) {
  return job?.jobDescription?.length > 200 && 
         job?.requirements?.length > 50 &&
         job?.title?.length > 5;
}

// Standardize output format
function formatJobData(job) {
  if (!job) return {};
  
  const description = job.jobDescription || job.description || '';
  
  return {
    description,
    title: job.title || '',
    company: job.company || job.companyName || '',
    requirements: job.requirements || '',
    skills: extractKeywords(description),
    url: job.url || '',
    rawData: job // Keep original for reference
  };
}

// Enhanced scraping function
async function scrapeJobPage(url) {
  try {
    const html = await axios.get(url).then(res => res.data);
    const $ = cheerio.load(html);
    
    // Extract sections using improved selectors
    const extractSection = (selector, fallbackText = '') => {
      return $(selector).text().trim() || fallbackText;
    };

    return {
      jobDescription: extractSection('.job-description, .job-details, #jobDesc'),
      requirements: extractSection('.requirements, .job-requirements, #jobReq'),
      title: extractSection('h1.job-title, h1.title, h1'),
      company: extractSection('.company-name, .organization, .employer'),
      skills: extractSection('.skills, .job-skills, #jobSkills')
    };
  } catch (error) {
    console.error('Scraping failed:', error);
    return {}; // Return empty but don't fail
  }
}

// Optimized keyword extraction
function extractKeywords(text) {
  if (!text) return [];

  // Process text
  const tokens = tokenizer.tokenize(text ? text.toLowerCase() : '');
  const frequency = {};
  console.log("Processing text for keyword extraction, found tokens:", tokens ? tokens.length : 0);
  
  // Count relevant terms
  if (tokens && tokens.length > 0) {
    tokens.forEach(token => {
      if (token.length > 3 && !stopWords.has(token)) {
        const normalized = natural.PorterStemmer.stem(token);
        if (techLexicon.has(normalized)) {
          frequency[normalized] = (frequency[normalized] || 0) + 1;
        } else {
          frequency[token] = (frequency[token] || 0) + 1;
        }
      }
    });
  }

  // Prioritize tech terms then sort by frequency
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([term]) => term)
    .slice(0, 15);
}

// Enhanced text cleaning utility with normalization
function cleanText(text) {
  console.debug(`[cleanText] Input received:`, text ? text.substring(0, 20) + '...' : 'empty');
  if (!text) {
      console.debug(`[cleanText] Empty input, returning empty string`);
      return '';
  }
  const result = text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  console.debug(`[cleanText] Output produced:`, result ? result.substring(0, 20) + '...' : 'empty');
  return result;
}

// ============================================================================
// STEP 2: ENHANCE WITH ONLINE DICTIONARY/THESAURUS APIs
// ============================================================================

// KEEP THIS COMPLETE VERSION:
async function enrichKeywordsWithDictionary(keywords) {
  try {
    console.log("📚 [Dictionary] Enriching keywords with synonyms and related terms...");
    
    const allKeywords = [
      ...(keywords.hard_skills || []),
      ...(keywords.soft_skills || []),
      ...(keywords.tools_and_technologies || []),
      ...(keywords.keywords || [])
    ];

    const enrichedKeywords = new Set(allKeywords);
    
    // Use Datamuse API to find related terms
    for (const keyword of allKeywords.slice(0, 10)) { // Limit to avoid rate limits
      try {
        // Get synonyms and related words
        const relatedResponse = await axios.get(KEYWORD_SOURCES.datamuse, {
          params: {
            rel_syn: keyword, // synonyms
            max: 5
          },
          timeout: 5000
        });

        relatedResponse.data.forEach(word => {
          if (word.word && word.score > 1000) { // Only high-relevance words
            enrichedKeywords.add(word.word);
          }
        });

        // Get words that often appear with this keyword
        const contextResponse = await axios.get(KEYWORD_SOURCES.datamuse, {
          params: {
            rel_trg: keyword, // words that follow
            max: 5
          },
          timeout: 5000
        });

        contextResponse.data.forEach(word => {
          if (word.word && word.score > 1000) {
            enrichedKeywords.add(word.word);
          }
        });

      } catch (err) {
        console.debug(`[Dictionary] Could not enrich "${keyword}":`, err.message);
      }
    }

    console.log(`✅ [Dictionary] Enriched from ${allKeywords.length} to ${enrichedKeywords.size} keywords`);
    return Array.from(enrichedKeywords);

  } catch (error) {
    console.error("❌ [Dictionary] Enrichment failed:", error.message);
    return keywords; // Returns original structure
  }
}


// ============================================================================
// INDUSTRY-SPECIFIC GUIDANCE
// ============================================================================

function getIndustrySpecificGuidance(industry, roleCategory) {
  const guidance = {
    'Technology': `
- Emphasize technical proficiency and problem-solving
- Include programming languages, frameworks, methodologies
- Show scalability, performance improvements, automation
- Use metrics: response time, uptime, code coverage, bug reduction`,

    'Healthcare': `
- Emphasize patient care, clinical outcomes, safety protocols
- Include medical procedures, equipment, EMR systems
- Show patient satisfaction, treatment success rates, efficiency gains
- Use healthcare-specific terminology and compliance standards`,

    'Finance': `
- Emphasize accuracy, compliance, risk management
- Include financial tools, regulations (SOX, GAAP), analysis methods
- Show cost savings, revenue growth, audit results, risk mitigation
- Use financial metrics: ROI, NPV, revenue impact`,

    'Education': `
- Emphasize student outcomes, pedagogical methods, curriculum development
- Include educational technologies, assessment tools, learning frameworks
- Show student performance improvements, engagement rates, innovation
- Use education-specific terminology`,

    'Manufacturing': `
- Emphasize efficiency, quality control, safety standards
- Include production systems, lean methodologies, equipment
- Show productivity gains, defect reduction, cost savings
- Use manufacturing metrics: OEE, cycle time, yield rates`,

    'Retail': `
- Emphasize customer service, sales performance, inventory management
- Include POS systems, merchandising strategies, CRM tools
- Show sales growth, customer satisfaction, inventory turnover
- Use retail metrics: conversion rates, average transaction value`,

    'Hospitality': `
- Emphasize guest satisfaction, service excellence, operations
- Include hospitality systems, service standards, event coordination
- Show guest satisfaction scores, occupancy rates, service improvements
- Use hospitality-specific terminology`,

    'Legal': `
- Emphasize legal research, case management, compliance
- Include legal software, research databases, documentation skills
- Show case outcomes, efficiency improvements, risk mitigation
- Use legal terminology and citation standards`,

    'Marketing': `
- Emphasize campaign performance, brand awareness, digital strategies
- Include marketing tools, analytics platforms, content management
- Show engagement rates, conversion improvements, ROI
- Use marketing metrics: CTR, CAC, LTV`,

    'Human Resources': `
- Emphasize talent acquisition, employee engagement, training
- Include HR systems, recruitment strategies, compliance
- Show hiring efficiency, retention rates, training effectiveness
- Use HR metrics: time-to-hire, employee satisfaction`
  };

  return guidance[industry] || `
- Use industry-appropriate terminology
- Show measurable outcomes relevant to the field
- Include tools and methods specific to this industry
- Demonstrate value in context of ${roleCategory} roles`;
}



/**
 * PURE FALLBACK - Only used when Groq fails
 */
async function basicKeywordExtraction(jobDescription, jobTitle) {
  console.log("📝 [Basic Fallback] Using basic keyword extraction...");
  
  const words = jobDescription
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  const sortedKeywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);

  return {
    industry: 'General',
    role_category: 'General',
    hard_skills: sortedKeywords.slice(0, 10),
    soft_skills: ['communication', 'teamwork', 'problem-solving'],
    tools_and_technologies: sortedKeywords.slice(10, 20),
    keywords: sortedKeywords.slice(20, 30),
    action_verbs: ['managed', 'developed', 'led', 'implemented'],
    all_keywords: sortedKeywords
  };
}


const KEYWORD_SOURCES = {
  datamuse: 'https://api.datamuse.com/words',
  dictionary: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  groq: {
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile'
  }
};

const GROQ_CONFIG = {
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  apiKey: process.env.GROQ_API_KEY,
  model: 'llama-3.3-70b-versatile',
  temperature: 0.4,
  max_tokens: 4000,
  top_p: 0.9
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function cleanText(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
}

/**
 * UNIVERSAL keyword extraction - works for ALL industries
 */
function extractKeywords(text, maxKeywords = 20) {
  if (!text || text.length < 10) return [];
  
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'our', 'their', 'your', 'its', 'about', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over',
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
    'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most',
    'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
    'so', 'than', 'too', 'very', 'just', 'work', 'working', 'role', 'position'
  ]);

  const words = cleanText(text)
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * AI-powered keyword filtering - works for ALL industries
 */
async function filterKeywordsWithAI(keywords) {
  try {
    const prompt = {
      model: GROQ_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert in identifying industry-specific keywords across ALL fields: technology, healthcare, finance, education, manufacturing, retail, hospitality, legal, creative, etc.

Your task: From a list of keywords, identify which ones are professional/technical terms relevant to the industry context.

Return ONLY a JSON array of the relevant keywords: ["keyword1", "keyword2", ...]`
        },
        {
          role: 'user',
          content: `Identify industry-relevant keywords from this list:\n${keywords.join(', ')}\n\nReturn only the professional/technical terms as a JSON array.`
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    };

    const response = await axios.post(
      GROQ_CONFIG.endpoint,
      prompt,
      {
        headers: {
          'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    const content = response.data.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*?\]/);
    
    if (jsonMatch) {
      const filtered = JSON.parse(jsonMatch[0]);
      console.log(`✅ AI filtered ${keywords.length} -> ${filtered.length} industry keywords`);
      return filtered;
    }

    return null;

  } catch (error) {
    console.debug("[filterKeywordsWithAI] Failed:", error.message);
    return null;
  }
}

/**
 * Universal industry keyword filter
 */
async function filterIndustryKeywords(keywords) {
  if (!keywords || keywords.length === 0) return [];

  try {
    const aiFiltered = await filterKeywordsWithAI(keywords);
    if (aiFiltered && aiFiltered.length > 0) {
      // return aiFiltered;
            // ADD: Dictionary enrichment for better keyword variety
            const enriched = await enrichKeywordsWithDictionary({ 
              hard_skills: aiFiltered,
              soft_skills: [],
              tools_and_technologies: [],
              keywords: aiFiltered
            });
            return enriched;
    }
  } catch (error) {
    console.debug("[filterIndustryKeywords] AI filtering unavailable, using fallback");
  }

  // Fallback: Filter based on word length and patterns
  return keywords.filter(keyword => {
    if (keyword.length >= 6) return true;
    if (/[A-Z]{2,}/.test(keyword) || keyword.includes('-')) return true;
    if (/\d/.test(keyword) || keyword.match(/(tion|ment|ance|ence|sis|ogy|ics)$/)) return true;
    return false;
  }).slice(0, 15);
}

// Legacy compatibility function
async function filterTechKeywords(keywords) {
  return await filterIndustryKeywords(keywords);
}

// ============================================================================
// GROQ-BASED KEYWORD EXTRACTION
// ============================================================================
///////////////////////use
async function extractKeywordsWithGroq(jobDescription, jobTitle, industry) {
  try {
    console.log("🤖 [Groq] Extracting keywords for role:", jobTitle);
    
    const prompt = {
      model: KEYWORD_SOURCES.groq.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert career analyst specializing in job market trends across ALL industries (technology, healthcare, finance, education, manufacturing, retail, hospitality, legal, creative, etc.).

Your task is to extract relevant keywords from job descriptions that would help match a candidate's CV to the role.

Return ONLY a valid JSON object with this structure:
{
  "industry": "detected industry (e.g., Healthcare, Finance, Technology, Education, etc.)",
  "role_category": "role type (e.g., Clinical, Administrative, Technical, Creative, etc.)",
  "hard_skills": ["specific technical/professional skills relevant to this industry"],
  "soft_skills": ["transferable skills like communication, leadership, etc."],
  "tools_and_technologies": ["industry-specific tools, software, equipment, methodologies"],
  "certifications": ["relevant certifications or qualifications mentioned"],
  "keywords": ["other important terms from the job description"],
  "action_verbs": ["powerful action verbs relevant to this role"]
}

Be comprehensive and industry-specific. For healthcare: include medical terms, certifications (RN, MD), tools (EMR systems).
For finance: include financial instruments, regulations (SOX, GAAP), tools (Bloomberg, SAP).
For education: include pedagogical methods, curricula, educational technologies.
And so on for ALL industries.`
        },
        {
          role: 'user',
          content: `Job Title: ${jobTitle}
Industry: ${industry || 'To be determined'}

Job Description:
${jobDescription}

Extract all relevant keywords for this role. Be thorough and industry-specific.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    };

    const response = await axios.post(
      KEYWORD_SOURCES.groq.endpoint,
      prompt,
      {
        headers: {
          'Authorization': `Bearer ${KEYWORD_SOURCES.groq.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse JSON response
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const keywords = JSON.parse(jsonMatch[0]);
      console.log("✅ [Groq] Extracted keywords for industry:", keywords.industry);
      return keywords;
    }

    throw new Error("Invalid JSON response from Groq");

  } catch (error) {
    console.error("❌ [Groq] Keyword extraction failed:", error.message);
    return await basicKeywordExtraction(jobDescription, jobTitle);
  }
}


// ============================================================================
// KEYWORD CACHING
// ============================================================================

async function extractAndCacheKeywords(jobDescription, userId, jobId) {
  console.debug(`[extractAndCacheKeywords] Processing for user ${userId}, job ${jobId}`);
  
  if (!jobDescription || jobDescription.length < 50) {
    console.warn("[extractAndCacheKeywords] Job description too short");
    return { allKeywords: [], techKeywords: [], topKeywords: [] };
  }

  const allKeywords = extractKeywords(jobDescription, 20);
  const industryKeywords = await filterIndustryKeywords(allKeywords);
  const topKeywords = allKeywords.slice(0, 5);

  console.debug(`[extractAndCacheKeywords] Extracted: ${allKeywords.length} total, ${industryKeywords.length} industry-specific`);
  // 🚨 ADD THIS VALIDATION
  if (!process.env.MONGODB_URI) {
    console.error("❌ [extractAndCacheKeywords] MONGODB_URI is undefined! Skipping cache.");
    return { 
      allKeywords, 
      techKeywords: industryKeywords,
      topKeywords 
    };
  }

  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const database = client.db('olukayode_sage');
    const keywordsCache = database.collection('job_keywords_cache');

    await keywordsCache.updateOne(
      { userId, jobId },
      {
        $set: {
          userId,
          jobId,
          allKeywords,
          techKeywords: industryKeywords,
          topKeywords,
          extractedAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );

    await client.close();
    console.log(`✅ Keywords cached for user ${userId}, job ${jobId}`);
  } catch (error) {
    console.error("[extractAndCacheKeywords] Cache error:", error);
  }

  return { 
    allKeywords, 
    techKeywords: industryKeywords,
    topKeywords 
  };
}



async function getJobKeywords(jobDescription, userId, jobId) {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const keywordsCache = database.collection('job_keywords_cache');
    const cached = await keywordsCache.findOne({ userId, jobId });
    // await client.close();
    if (cached && cached.allKeywords) {
      console.log(`✅ Using cached keywords for job ${jobId}`);
      return {
        allKeywords: cached.allKeywords,
        techKeywords: cached.techKeywords,
        topKeywords: cached.topKeywords
      };
    }
  } catch (error) {
    console.error("[getJobKeywords] Cache retrieval error:", error);
  }

  return await extractAndCacheKeywords(jobDescription, userId, jobId);
}

// ============================================================================
// MAIN CV TAILORING WITH GROQ
// ============================================================================

async function tailorWithGroq(originalData, jobDetails, userId, jobId) {
  try {
    console.log("🚀 Starting Groq-based CV tailoring...");
    console.debug(`[tailorWithGroq] User: ${userId}, Job: ${jobId}`);
    
    if (!originalData || !jobDetails || !jobDetails.description) {
      console.error("[tailorWithGroq] Missing required input data");
      return null;
    }

    const { allKeywords, techKeywords, topKeywords } = await getJobKeywords(
      jobDetails.description,
      userId,
      jobId
    );

    if (allKeywords.length < 3) {
      console.warn("[tailorWithGroq] Insufficient keywords extracted");
      return null;
    }

    console.log("📊 Keywords extracted:");
    console.log("- Top Keywords:", topKeywords.join(', '));
    console.log("- Industry Keywords:", techKeywords.join(', '));

    const prompt = buildGroqPrompt(originalData, jobDetails, {
      allKeywords,
      techKeywords,
      topKeywords
    });

    console.debug("[tailorWithGroq] Calling Groq API...");
    const response = await callGroqAPI(prompt);

    if (!response) {
      console.error("[tailorWithGroq] Empty response from Groq");
      return null;
    }

    const tailoredData = parseGroqResponse(response);
    
    if (!tailoredData) {
      console.error("[tailorWithGroq] Failed to parse Groq response");
      return null;
    }

    // NEW: Analyze keyword coverage before validation
    const keywordAnalysis = analyzeKeywordCoverage(tailoredData, techKeywords);
    logKeywordReport(keywordAnalysis);

    const isValid = validateTailoredCV(tailoredData, originalData, techKeywords);
    
    if (!isValid) {
      console.error("[tailorWithGroq] Validation failed");
      console.log("💡 Tip: AI may need to retry or use fallback method");
      return null;
    }

    console.log("✅ Groq CV tailoring completed successfully");
    console.log(`   - Keyword coverage: ${keywordAnalysis.overall.coverage.toFixed(1)}%`);
    console.log(`   - Missing keywords: ${keywordAnalysis.missingKeywords.length}`);
    
    // Return data with keyword analysis
    return {
      ...tailoredData,
      _keywordAnalysis: keywordAnalysis // Hidden metadata for debugging
    };

  } catch (error) {
    console.error("[tailorWithGroq] Process failed:", error.message);
    return null;
  }
}

// ============================================================================
// GROQ PROMPT BUILDER
// ============================================================================

function buildGroqPrompt(originalData, jobDetails, keywords) {
  const { allKeywords, techKeywords, topKeywords } = keywords;
  const targetJobTitle = jobDetails.title || jobDetails.role || originalData.jobTitle;
  const industryGuidance = getIndustrySpecificGuidance(
    keywords.industry || 'General', 
    keywords.role_category || 'General'
  );

  return {
    model: GROQ_CONFIG.model,
    messages: [
      {
        role: 'system',
        content: `You are an expert CV writer who creates human-like, ATS-optimized resumes for ALL industries.

CRITICAL RULES:
- Write naturally like a professional career coach, NOT like AI
- Adapt tone and terminology to the specific industry
- Vary sentence structure, length (12-28 words), and tone
- Use specific metrics appropriate to the industry
- NEVER fabricate companies, degrees, certifications, or dates
- ONLY enhance descriptions within existing roles
- Ensure all industry-relevant keywords appear naturally in context`
      },
      {
        role: 'user',
        content: `# UNIVERSAL CV TAILORING REQUEST

## TARGET JOB DETAILS:
**Title:** ${targetJobTitle}
**Company:** ${jobDetails.company || 'Leading Organization'}
**Location:** ${jobDetails.jobLocation || 'Nigeria'}
**Experience Required:** ${jobDetails.experience || 'Not specified'}

**Job Description:**
${jobDetails.description}

**Key Requirements:**
${jobDetails.requirements || 'See job description'}

## KEYWORDS TO INCORPORATE (Industry-Specific):
**Top Priority (MUST appear in summary):** ${topKeywords.join(', ')}
**Professional/Technical Skills (MUST appear in skills section):** ${techKeywords.join(', ')}
**Secondary Keywords:** ${allKeywords.slice(5, 10).join(', ')}

## ORIGINAL CV DATA:
\`\`\`json
${JSON.stringify(originalData, null, 2)}
\`\`\`

## YOUR TASK:

Generate a tailored CV in **valid JSON format** with these exact fields:

### 1. PROFESSIONAL SUMMARY (3-4 sentences)
- Open with strong value proposition using 2-3 top keywords
- Mention years of experience (calculate from work history)
- Highlight 1-2 quantifiable achievements relevant to this industry
- Natural tone, industry-appropriate language

### 2. JOB TITLE
- Adjust to match target role: "${targetJobTitle}"

### 3. SKILLS SECTION
- MUST include ALL industry-relevant keywords: ${techKeywords.join(', ')}
- Keep relevant original skills that transfer to this role
- Remove clearly irrelevant skills
- Group related competencies together
- Return as array of strings

### 4. WORK EXPERIENCE (MOST IMPORTANT!)
For EACH work experience entry:
- Keep: company name, job title, duration (NEVER change these facts)
- Generate 4-6 achievement-focused bullet points:
  * Each bullet 15-25 words (vary lengths)
  * Include 2-3 job keywords naturally per role
  * Add specific metrics appropriate to the industry
  * Use varied action verbs suitable for this field
  * Make achievements relevant to "${targetJobTitle}" role
  * Use industry-specific language and context

### 5. PROJECTS SECTION (if present)
- Keep: project titles, periods
- Enhance descriptions with relevant methodologies/tools
- Show outcomes/impacts with appropriate metrics

### 6. PRESERVE EXACTLY (DO NOT MODIFY):
- name, email, phoneNumber, phone_number, address, dateOfBirth
- education entries
- certifications
- languages, professionalBodies

## OUTPUT FORMAT:
Return ONLY valid JSON matching this structure:

\`\`\`json
{
  "name": "...",
  "email": "...",
  "phoneNumber": "...",
  "phone_number": "...",
  "address": "...",
  "dateOfBirth": "...",
  "jobTitle": "${targetJobTitle}",
  "summary": "3-4 sentences with industry keywords naturally integrated...",
  "skills": ["skill1", "skill2", "skill3", ...],
  "workExperience": [
    {
      "title": "Original Job Title",
      "company": "Original Company Name",
      "duration": "Original Duration",
      "description": "• Achievement bullet 1\\n• Achievement bullet 2\\n• Achievement bullet 3\\n• Achievement bullet 4"
    }
  ],
  "education": [...preserve original...],
  "projects": [...enhanced...],
  "certifications": [...preserve original...],
  "languages": [...preserve original...],
  "professionalBodies": [...preserve original...],
  "profileImage": "...",
  "Profile Image": "..."
}
\`\`\`

Generate the tailored CV now as valid JSON:`
      }
    ],
    temperature: GROQ_CONFIG.temperature,
    max_tokens: GROQ_CONFIG.max_tokens,
    top_p: GROQ_CONFIG.top_p
  };
}

// ============================================================================
// GROQ API CALL
// ============================================================================

async function callGroqAPI(prompt) {
  try {
    console.debug("[callGroqAPI] Making request to Groq...");
    
    const response = await Promise.race([
      axios.post(GROQ_CONFIG.endpoint, prompt, {
        headers: {
          'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Groq API timeout")), 30000)
      )
    ]);

    if (!response.data?.choices?.[0]?.message?.content) {
      console.error("[callGroqAPI] Invalid response structure");
      return null;
    }

    const content = response.data.choices[0].message.content;
    console.debug(`[callGroqAPI] Received response (${content.length} chars)`);
    
    return content;

  } catch (error) {
    console.error("[callGroqAPI] Request failed:", error.message);
    return null;
  }
}

// ============================================================================
// RESPONSE PARSING
// ============================================================================

function parseGroqResponse(responseText) {
  try {
    console.debug("[parseGroqResponse] Parsing response...");
    
    let jsonString = responseText
      .replace(/^```json\n?/i, '')
      .replace(/```$/, '')
      .trim();

    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonString = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonString);
    console.debug("[parseGroqResponse] JSON parsed successfully");
    
    return parsed;

  } catch (error) {
    console.error("[parseGroqResponse] Parse error:", error.message);
    return null;
  }
}

// ============================================================================
// KEYWORD ANALYTICS & REPORTING
// ============================================================================

/**
 * Analyzes keyword distribution across CV sections
 * Returns detailed report of where keywords appear
 */
function analyzeKeywordCoverage(tailoredData, industryKeywords) {
  const analysis = {
    summary: { keywords: [], coverage: 0 },
    skills: { keywords: [], coverage: 0 },
    workExperience: { keywords: [], coverage: 0 },
    projects: { keywords: [], coverage: 0 },
    overall: { keywords: [], coverage: 0 },
    missingKeywords: []
  };

  const summaryText = (tailoredData.summary || '').toLowerCase();
  const skillsText = (tailoredData.skills || []).join(' ').toLowerCase();
  const workExpText = (tailoredData.workExperience || [])
    .map(exp => exp.description || '')
    .join(' ')
    .toLowerCase();
  const projectsText = (tailoredData.projects || [])
    .map(proj => proj.description || '')
    .join(' ')
    .toLowerCase();
  const entireCVText = JSON.stringify(tailoredData).toLowerCase();

  industryKeywords.forEach(keyword => {
    const cleanKeyword = cleanText(keyword);
    let found = false;

    if (summaryText.includes(cleanKeyword)) {
      analysis.summary.keywords.push(keyword);
      found = true;
    }
    if (skillsText.includes(cleanKeyword)) {
      analysis.skills.keywords.push(keyword);
      found = true;
    }
    if (workExpText.includes(cleanKeyword)) {
      analysis.workExperience.keywords.push(keyword);
      found = true;
    }
    if (projectsText.includes(cleanKeyword)) {
      analysis.projects.keywords.push(keyword);
      found = true;
    }
    if (entireCVText.includes(cleanKeyword)) {
      analysis.overall.keywords.push(keyword);
      found = true;
    }

    if (!found) {
      analysis.missingKeywords.push(keyword);
    }
  });

  // Calculate coverage percentages
  const total = industryKeywords.length;
  analysis.summary.coverage = (analysis.summary.keywords.length / total) * 100;
  analysis.skills.coverage = (analysis.skills.keywords.length / total) * 100;
  analysis.workExperience.coverage = (analysis.workExperience.keywords.length / total) * 100;
  analysis.projects.coverage = (analysis.projects.keywords.length / total) * 100;
  analysis.overall.coverage = (analysis.overall.keywords.length / total) * 100;

  return analysis;
}

/**
 * Logs detailed keyword coverage report
 */
function logKeywordReport(analysis) {
  console.log('\n📊 ========== KEYWORD COVERAGE REPORT ==========');
  console.log(`\n✅ OVERALL COVERAGE: ${analysis.overall.coverage.toFixed(1)}% (${analysis.overall.keywords.length}/${analysis.overall.keywords.length + analysis.missingKeywords.length})`);
  
  console.log(`\n📝 SUMMARY: ${analysis.summary.coverage.toFixed(1)}%`);
  console.log(`   Keywords: ${analysis.summary.keywords.join(', ') || 'None'}`);
  
  console.log(`\n🎯 SKILLS: ${analysis.skills.coverage.toFixed(1)}%`);
  console.log(`   Keywords: ${analysis.skills.keywords.join(', ') || 'None'}`);
  
  console.log(`\n💼 WORK EXPERIENCE: ${analysis.workExperience.coverage.toFixed(1)}%`);
  console.log(`   Keywords: ${analysis.workExperience.keywords.join(', ') || 'None'}`);
  
  if (analysis.projects.keywords.length > 0) {
    console.log(`\n🚀 PROJECTS: ${analysis.projects.coverage.toFixed(1)}%`);
    console.log(`   Keywords: ${analysis.projects.keywords.join(', ')}`);
  }
  
  if (analysis.missingKeywords.length > 0) {
    console.log(`\n⚠️ MISSING KEYWORDS (${analysis.missingKeywords.length}):`);
    console.log(`   ${analysis.missingKeywords.join(', ')}`);
  }
  
  console.log('\n===============================================\n');
}

// ============================================================================
// VALIDATION
// ============================================================================

function validateTailoredCV(tailoredData, originalData, industryKeywords) {
  console.debug("[validateTailoredCV] Running validation checks...");

  const checks = [
    // Basic structure validation
    () => tailoredData && typeof tailoredData === 'object',
    () => tailoredData.name === originalData.name,
    () => tailoredData.email === originalData.email,
    () => tailoredData.summary && tailoredData.summary.length > 50,
    () => Array.isArray(tailoredData.skills) && tailoredData.skills.length > 0,
    () => Array.isArray(tailoredData.workExperience) && tailoredData.workExperience.length > 0,
    () => tailoredData.workExperience.every(exp => 
      exp.title && exp.company && exp.duration && exp.description
    ),
    
    // ENHANCED: Check keywords in skills section
    () => {
      const skillsText = tailoredData.skills.join(' ').toLowerCase();
      const matchedKeywords = industryKeywords.filter(kw => 
        skillsText.includes(cleanText(kw))
      );
      console.debug(`[validateTailoredCV] Skills section: ${matchedKeywords.length}/${industryKeywords.length} keywords matched`);
      return matchedKeywords.length >= Math.min(3, industryKeywords.length);
    },
    
    // NEW: Check keywords in professional summary
    () => {
      const summaryText = (tailoredData.summary || '').toLowerCase();
      const matchedInSummary = industryKeywords.filter(kw => 
        summaryText.includes(cleanText(kw))
      );
      console.debug(`[validateTailoredCV] Summary: ${matchedInSummary.length} keywords found`);
      return matchedInSummary.length >= Math.min(2, industryKeywords.length);
    },
    
    // NEW: Check keywords in work experience
    () => {
      const workExpText = tailoredData.workExperience
        .map(exp => exp.description || '')
        .join(' ')
        .toLowerCase();
      const matchedInWorkExp = industryKeywords.filter(kw => 
        workExpText.includes(cleanText(kw))
      );
      console.debug(`[validateTailoredCV] Work experience: ${matchedInWorkExp.length} keywords found`);
      return matchedInWorkExp.length >= Math.min(3, industryKeywords.length);
    },
    
    // NEW: Overall keyword coverage across entire CV
    () => {
      const entireCVText = JSON.stringify(tailoredData).toLowerCase();
      const totalMatched = industryKeywords.filter(kw => 
        entireCVText.includes(cleanText(kw))
      );
      const coveragePercentage = (totalMatched.length / industryKeywords.length) * 100;
      console.debug(`[validateTailoredCV] Overall keyword coverage: ${coveragePercentage.toFixed(1)}% (${totalMatched.length}/${industryKeywords.length})`);
      
      // Require at least 50% keyword coverage
      return coveragePercentage >= 50;
    }
  ];

  const results = checks.map((check, i) => {
    const result = check();
    if (!result) {
      console.error(`[validateTailoredCV] Check ${i + 1} failed`);
    }
    return result;
  });

  const allPassed = results.every(r => r);
  console.debug(`[validateTailoredCV] Validation ${allPassed ? 'PASSED ✅' : 'FAILED ❌'}`);
  
  return allPassed;
}

// ============================================================================
// FALLBACK: NON-AI TAILORING
// ============================================================================

async function tailorWithKeywords(originalData, jobDetails, userId, jobId) {
  try {
    console.log("📝 [Fallback] Using keyword-based tailoring...");

    const { allKeywords, techKeywords, topKeywords } = await getJobKeywords(
      jobDetails.description,
      userId,
      jobId
    );

    const tailoredData = JSON.parse(JSON.stringify(originalData));

    tailoredData.jobTitle = jobDetails.title || originalData.jobTitle;

    tailoredData.summary = enhanceSummary(
      originalData.summary || '',
      topKeywords,
      jobDetails
    );

    tailoredData.skills = enhanceSkills(
      originalData.skills || [],
      techKeywords,
      allKeywords
    );

    if (tailoredData.workExperience && tailoredData.workExperience.length > 0) {
      tailoredData.workExperience = enhanceWorkExperience(
        tailoredData.workExperience,
        techKeywords,
        allKeywords
      );
    }

    if (tailoredData.projects && tailoredData.projects.length > 0) {
      tailoredData.projects = enhanceProjects(
        tailoredData.projects,
        techKeywords
      );
    }

    console.log("✅ [Fallback] Keyword-based tailoring completed");
    return tailoredData;

  } catch (error) {
    console.error("❌ [Fallback] Error:", error.message);
    return originalData;
  }
}

// ============================================================================
// ENHANCEMENT FUNCTIONS
// ============================================================================

function enhanceSummary(originalSummary, topKeywords, jobDetails) {
  let summary = originalSummary || `Experienced professional`;
  
  if (topKeywords.length > 0) {
    summary += ` with expertise in ${topKeywords.slice(0, 3).join(', ')}.`;
  }

  summary += ` Seeking opportunities as ${jobDetails.title || 'in the field'}.`;

  return summary;
}

function enhanceSkills(originalSkills, industryKeywords, allKeywords) {
  const skillsSet = new Set(originalSkills.map(s => s.toLowerCase()));
  const enhancedSkills = [...originalSkills];

  industryKeywords.forEach(skill => {
    if (!Array.from(skillsSet).some(s => s.includes(skill.toLowerCase()))) {
      enhancedSkills.push(skill);
      skillsSet.add(skill.toLowerCase());
    }
  });

  allKeywords.slice(0, 10).forEach(skill => {
    if (!Array.from(skillsSet).some(s => s.includes(skill.toLowerCase()))) {
      enhancedSkills.push(skill);
      skillsSet.add(skill.toLowerCase());
    }
  });

  return enhancedSkills;
}

function enhanceWorkExperience(workExperience, industryKeywords, allKeywords) {
  return workExperience.map((exp, index) => {
    let description = exp.description || '';
    
    const relevantKeywords = industryKeywords.slice(index * 2, (index * 2) + 2);
    
    relevantKeywords.forEach(keyword => {
      if (!description.toLowerCase().includes(keyword.toLowerCase())) {
        description += `\n• Utilized ${keyword} to enhance operational efficiency and deliver results.`;
      }
    });

    return {
      ...exp,
      description
    };
  });
}

function enhanceProjects(projects, industryKeywords) {
  return projects.map((project, index) => {
    let description = project.description || '';
    
    const relevantTech = industryKeywords.slice(index, index + 2);
    if (relevantTech.length > 0) {
      description += ` Technologies used: ${relevantTech.join(', ')}.`;
    }

    return {
      ...project,
      description
    };
  });
}

// ============================================================================
// COVER LETTER GENERATION
// ============================================================================

function extractKeyPhrases(text) {
  if (!text) return [];
  return text.split(/\.|\n/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10)
    .slice(0, 5);
}


async function generateCoverLetter(cvData, jobDescription, companyName = "[Company]", position = "[Position]", userId, jobId) {
  console.log("✉️ [generateCoverLetter] Starting cover letter generation...");
  
  if (!cvData || !jobDescription) {
      console.warn("Insufficient data for cover letter generation");
      return "";
  }

  const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
  });
  
  const keywords = extractKeywords(jobDescription);
  
  // ✅ CRITICAL FIX: Add await since filterTechKeywords is async
  const techKeywords = await filterTechKeywords(keywords);
  
  // 🛡️ SAFETY CHECK: Ensure techKeywords is always an array
  const safeTechKeywords = Array.isArray(techKeywords) ? techKeywords : [];
  console.log(`🔧 Using ${safeTechKeywords.length} safe tech keywords for cover letter`);

  // Identify top relevant skills
  const relevantSkills = (cvData.skills || [])
      .filter(skill => 
          safeTechKeywords.some(kw => cleanText(skill).includes(cleanText(kw))))
      .slice(0, 3);
  
  // Find most relevant experience
  const relevantExp = (cvData.workExperience || [])
  .map(exp => ({
    ...exp,
    relevance: keywords.reduce((score, kw) => {
      const titleMatch = exp.title && cleanText(exp.title).includes(cleanText(kw)) ? 1 : 0;
      const descMatch = exp.description && cleanText(exp.description).includes(cleanText(kw)) ? 1 : 0;
      return score + titleMatch + descMatch;
    }, 0)
  }))
  .sort((a, b) => b.relevance - a.relevance)[0];

  
  // Extract key responsibilities from job description
  const responsibilities = extractKeyPhrases(jobDescription)
      .filter(phrase => phrase.length > 10 && phrase.length < 60)
      .slice(0, 2);
  
  // Generate the cover letter
  return `
${cvData.name || '[Your Name]'}
${cvData.address || '[Your Address]'}
${cvData.phone_number || '[Your Phone]'}
${cvData.email || '[Your Email]'}
${today}

Hiring Manager
${companyName}

Dear Hiring Manager,

I am excited to apply for the ${position} position at ${companyName}. ${relevantSkills.length > 0 ? 
`With my strong background in ${relevantSkills.join(', ')}, ` : 
`With my professional experience, `}I am confident in my ability to contribute effectively to your team.

${relevantExp ? `In my current role as ${relevantExp.title} at ${relevantExp.company || '[Company]'}, I have successfully ${relevantExp.description || '[key achievements]'}. ` : 
`Throughout my career, I have consistently `}${responsibilities.length > 0 ? 
`developed expertise in areas including ${responsibilities.join(' and ')}. ` : ''}

I am particularly drawn to this opportunity because [personalized reason based on company/job]. My combination of technical skills and [soft skills] would allow me to [specific contribution].

I would welcome the opportunity to discuss how my background aligns with your needs. Please find my resume attached for your review.

Sincerely,
${cvData.name || '[Your Name]'}
`;
}

// Helper function to extract key phrases

// Helper function to extract key phrases
function extractKeyPhrases(text) {
  if (!text) return [];
  // Simple implementation - can be enhanced with NLP
  return text.split(/\.|\n/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 10)
      .slice(0, 5);
}
// function generateCoverLetter(cvData, jobDescription, companyName = "[Company]", position = "[Position]") {
//   if (!cvData || !jobDescription) {
//     console.warn("Insufficient data for cover letter generation");
//     return "";
//   }

//   const today = new Date().toLocaleDateString('en-US', { 
//     year: 'numeric', month: 'long', day: 'numeric' 
//   });
  
//   const keywords = extractKeywords(jobDescription);
//   const techKeywords = filterTechKeywords(keywords);

//   const relevantSkills = (cvData.skills || [])
//     .filter(skill => 
//       techKeywords.some(kw => cleanText(skill).includes(cleanText(kw))))
//     .slice(0, 3);
  
//   const relevantExp = (cvData.workExperience || [])
//     .map(exp => ({
//       ...exp,
//       relevance: keywords.reduce((score, kw) => {
//         const titleMatch = exp.title && cleanText(exp.title).includes(cleanText(kw)) ? 1 : 0;
//         const descMatch = exp.description && cleanText(exp.description).includes(cleanText(kw)) ? 1 : 0;
//         return score + titleMatch + descMatch;
//       }, 0)
//     }))
//     .sort((a, b) => b.relevance - a.relevance)[0];
  
//   const responsibilities = extractKeyPhrases(jobDescription)
//     .filter(phrase => phrase.length > 10 && phrase.length < 60)
//     .slice(0, 2);
  
//   return `
// ${cvData.name || '[Your Name]'}
// ${cvData.address || '[Your Address]'}
// ${cvData.phone_number || '[Your Phone]'}
// ${cvData.email || '[Your Email]'}
// ${today}

// Hiring Manager
// ${companyName}

// Dear Hiring Manager,

// I am excited to apply for the ${position} position at ${companyName}. ${relevantSkills.length > 0 ? 
// `With my strong background in ${relevantSkills.join(', ')}, ` : 
// `With my professional experience, `}I am confident in my ability to contribute effectively to your team.

// ${relevantExp ? `In my current role as ${relevantExp.title} at ${relevantExp.company || '[Company]'}, I have successfully ${relevantExp.description || '[key achievements]'}. ` : 
// `Throughout my career, I have consistently `}${responsibilities.length > 0 ? 
// `developed expertise in areas including ${responsibilities.join(' and ')}. ` : ''}

// I am particularly drawn to this opportunity because of your organization's reputation. My combination of technical skills and professional experience would allow me to contribute meaningfully to your team.

// I would welcome the opportunity to discuss how my background aligns with your needs. Please find my resume attached for your review.

// Sincerely,
// ${cvData.name || '[Your Name]'}
// `;
// }

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Main functions
  tailorWithGroq,
  tailorWithKeywords,
  
  // Keyword functions
  extractKeywords,
  extractKeywordsWithGroq,
  filterIndustryKeywords,
  filterTechKeywords, // Legacy compatibility
  getJobKeywords,
  extractAndCacheKeywords,
  enrichKeywordsWithDictionary,
  
  // Utility functions
  cleanText,
  extractKeyPhrases,
  
  // Enhancement functions
  enhanceSummary,
  enhanceSkills,
  enhanceWorkExperience,
  enhanceProjects,
  
  // Validation
  validateTailoredCV,
  analyzeKeywordCoverage,
  logKeywordReport,
  
  // Cover letter
  generateCoverLetter,
  
  // API interaction
  callGroqAPI,
  parseGroqResponse,
  buildGroqPrompt,
  
  // Configuration
  GROQ_CONFIG,
  KEYWORD_SOURCES
};



///////////////////////////////////////////////////////////////////////////////////////////
const getMostRecentJobForUser = async (userId) => {

  try {
    await client.connect();
    console.log('Connected to database');

    const database = client.db("olukayode_sage");

    // Fetch the most recently published job for the user
    const jobResults = await database.collection("application_processing_feeder")
      .find({ userId, published: true }) // Filter jobs by userId and ensure they are published
      .sort({ publishedAt: -1 }) // Sort by publishedAt in descending order (most recent first)
      .limit(1) // Get the most recent job
      .toArray(); // Convert the result to an array

    // Check if a job was found
    if (!jobResults.length) {
      console.log(`User ${userId}: No job found in database. Exiting.`);
      return null;
    }

    const mostRecentJob = jobResults[0]; // Extract the most recent job
    console.log("The most recent Job:", mostRecentJob);
    return mostRecentJob;

  } catch (err) {
    console.error("Error fetching the most recent job:", err);
    return null;
  } finally {
    await client.close();
  }
};











// function extractCompanyName(title) {
//   // Define possible keywords that typically precede the company name
//   const keywords = ['at', 'in', 'with'];

//   // Convert title to lowercase for case-insensitive comparison
//   const lowerTitle = title.toLowerCase();

//   // Try to find a keyword in the title
//   let companyName = "Reputable Company"; // Default if no match is found

//   for (let keyword of keywords) {
//     const index = lowerTitle.indexOf(keyword);

//     // If a keyword is found, extract the company name
//     if (index !== -1) {
//       // Extract the portion after the keyword
//       companyName = title.substring(index + keyword.length).trim();
      
//       // If the company name contains any parentheses (like 'Moniepoint Inc. (Formerly TeamApt Inc.)'),
//       // we remove the content inside the parentheses, leaving only the company name.
//       const parenthesesIndex = companyName.indexOf('(');
//       if (parenthesesIndex !== -1) {
//         companyName = companyName.substring(0, parenthesesIndex).trim();
//       }
      
//       break;  // Stop after finding the first valid company name
//     }
//   }

//   return companyName;
// }

// Function to trigger CV processing dynamically
/////////////////////////////////////////////////////////////////////////////////////////////
// * UPDATED: triggerProcessCVDynamically with Groq integration
// * REPLACES: The existing triggerProcessCVDynamically function
// */
async function triggerProcessCVDynamically(session, sessionToken) {
 try {
   console.log("🚀 Preparing to trigger Groq-based CV processing...");

   // Step 1: Resolve userId
   let userId = session?.userId;
   if (!userId) {
     console.log("🔄 User ID not found in session, fetching using session token...");
     userId = await withRetry(() => fetchUserIdBySessionToken(sessionToken), 3, 1000);
     if (!userId) throw new Error('❌ User ID is missing. Cannot proceed.');
   }
   console.log("✅ User ID successfully resolved:", userId);

   // Step 2: Fetch job data
   let job;
   let exactTimestamp;

   try {
     if (session?.emailId) {
       console.log("📧 Email ID found in session:", session.emailId);
       exactTimestamp = session.emailId;
       job = await withRetry(() => fetchPublishedJobByTimestamp(userId, exactTimestamp), 2, 500);
     }

     if (!job) {
       console.log("🔄 Falling back to fetching most recent job...");
       job = await withRetry(() => getMostRecentJobForUser(userId), 2, 500);
       if (!job) throw new Error("No job found for user");
       exactTimestamp = job.timestamp || new Date().toISOString();
     }
     console.log("✅ Job found:", job.title);

     if (!job?.url || !job?.jobId || !job?.role) {
       throw new Error("❌ Job data is incomplete or missing.");
     }

     // Step 3: Prepare options
     const companyName = extractCompanyName(job.title) || "Reputable Company";
     const options = {
       useAI: true, // Enable Groq AI tailoring
       companyName,
       position: job.title || "the position"
     };

     // Step 4: Process CV with Groq
     await checkMongoDBConnection();
     console.log("⏳ Starting Groq-powered CV tailoring process...");
     const result = await processCV(
       job.url,
       userId,
       sessionToken,
       job.jobId,
       exactTimestamp,
       options
     );

     console.log("🎯 CV tailoring process completed successfully");
     console.log("📊 Tailoring method used:", result.metadata.tailoringMethod);
     return result;

   } catch (jobError) {
     console.error("❌ Job processing error:", jobError);
     throw new Error(`Job processing failed: ${jobError.message}`);
   }

 } catch (error) {
   console.error("❌ Critical error in CV processing pipeline:", error);
   
   if (error.name === 'MongoServerSelectionError') {
     console.error("🔴 MongoDB connection error - please check database service");
   }
   
   throw error;
 }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
 tailorWithGroq,
 processCV,
 triggerProcessCVDynamically,
 extractAndCacheKeywords,
 getJobKeywords
};




// Helper functions
async function withRetry(operation, maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`🔄 Retrying (${i + 1}/${maxRetries}) after error:`, error.message);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

async function checkMongoDBConnection() {
  try {
    // Assuming you have access to your MongoDB client
    await mongoose.connection.db.admin().ping();
    console.log("✅ MongoDB connection is active");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Database connection unavailable");
  }
}

function extractCompanyName(title) {
  if (!title) return "Reputable Company";
  
  const keywords = ['at', 'in', 'with'];
  const lowerTitle = title.toLowerCase();
  let companyName = "Reputable Company";

  for (let keyword of keywords) {
    const index = lowerTitle.indexOf(keyword);
    if (index !== -1) {
      companyName = title.substring(index + keyword.length).trim();
      const parenthesesIndex = companyName.indexOf('(');
      if (parenthesesIndex !== -1) {
        companyName = companyName.substring(0, parenthesesIndex).trim();
      }
      break;
    }
  }

  return companyName;
}

//await triggerProcessCVDynamically(session, sessionToken);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
          //      const transformedCVs = data.map(doc => {
          //       console.log("Is this be you?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
          //       const name = doc.name;
          //       const jobTitle = doc.jobTitle;
          //       const dateOfBirth = doc.dateOfBirth;
          //       const address = doc.address;
          //       const phone_number = doc.phone_number;
          //       const linkedin = doc.linkedin ? [cleanURL(doc.linkedin)] : [];
          //       const email = doc.email;
          //       const profileImage = cleanURL(doc.profileImage || 'https://via.placeholder.com/100');
            
          //       const skillsData = doc.skills.map(skill => ({ name: skill, barClass: '' }));
          //       const educationData = doc.education.map(edu => ({
          //         degree: edu.degree,
          //         institution: edu.school,
          //         period: edu.duration,
          //         description: edu.description
          //       }));
          //       const experienceData = doc.workExperience.map(exp => ({
          //         title: exp.title,
          //         company: exp.company,
          //         period: exp.duration,
          //         description: exp.description
          //       }));
          //       const summaryData = [doc.summary];
          //       const languagesData = doc.languages.map(lang => ({
          //         name: lang.name,
          //         proficiency: lang.proficiency
          //       }));
          //       const certificationsData = doc.certifications.map(cert => ({
          //         name: cert.name,
          //         institution: cert.institution,
          //         year: cert.year
          //       }));
          //       const membershipsData = doc.professionalBodies.map(body => ({
          //         name: body.name,
          //         role: body.role,
          //         year: body.year
          //       }));
          //       const projectsData = doc.projects.map(project => ({
          //         title: project.title,
          //         period: project.period || 'No specific period',
          //         details: project.details || [project.description]
          //       }));
            
          //       return {
          //         name,
          //         jobTitle,
          //         dateOfBirth,
          //         address,
          //         phone_number,
          //         linkedin,
          //         email,
          //         profileImage,
          //         skillsData,
          //         educationData,
          //         experienceData,
          //         summaryData,
          //         languagesData,
          //         certificationsData,
          //         membershipsData,
          //         projectsData
          //       };
          //     });
            
          //     console.log('Transformed CVs:', transformedCVs);
            
          //     transformedCVs.forEach(cv => {
          //       generateHTML(cv);
          //     });
           
          //     return userId;
          
          //   }
          
          
          // } finally {
          //   await client.close();
          // }
          // }
///////////////////////////////////////////////////////////////////////////////////////////
// Previous code remains the same until the transformation section...

// Remove the entire commented block and replace with:

// if (tailoringResult.success && tailoredData) {
//   console.log("✅ Using AI-tailored CV data");
const tailoringResult = await triggerProcessCVDynamically(session, sessionToken);
let tailoredData = tailoringResult?.tailoredCVData;
// ✅ SAFETY FALLBACK: if Groq returned empty/broken data, use raw DB data
if (!tailoredData || !tailoredData.name) {
  console.warn('⚠️ tailoredData is empty or broken — falling back to raw DB data');
  tailoredData = data[0]; // data[0] is the raw user record from Users_CV_biodata
}
console.log("🎯 AI TAILORING RESULT:", {
  tailoredJobTitle: tailoredData?.jobTitle,
  databaseJobTitle: data[0]?.jobTitle,
  tailoredSummary: tailoredData?.summary?.substring(0, 100),
  databaseSummary: data[0]?.summary?.substring(0, 100)
});


transformedCVs = [{
  name: tailoredData.name,
  jobTitle: tailoredData.jobTitle, // ← This is the AI-tailored job title
  dateOfBirth: tailoredData.dateOfBirth,
  address: tailoredData.address,
  phone_number: tailoredData.phone_number,
  linkedin: tailoredData.linkedin ? [cleanURL(tailoredData.linkedin)] : [],
  email: tailoredData.email,
  profileImage: cleanURL(tailoredData.profileImage || 'https://via.placeholder.com/100'),
  
  // Use AI-tailored sections
  skillsData: (tailoredData.skills || []).map(skill => ({ 
    name: skill, 
    barClass: '' 
  })),
  
  educationData: (tailoredData.education || []).map(edu => ({
    degree: edu.degree,
    institution: edu.school || edu.institution,
    period: edu.duration || edu.period,
    description: edu.description
  })),
  
  experienceData: (tailoredData.workExperience || []).map(exp => ({
    title: exp.title,
    company: exp.company,
    period: exp.duration,
    description: exp.description // ← This contains AI-enhanced bullet points
  })),
  
  summaryData: [tailoredData.summary], // ← AI-tailored professional summary
  languagesData: tailoredData.languages || [],
  certificationsData: tailoredData.certifications || [],
  membershipsData: tailoredData.professionalBodies || [],
  
  projectsData: (tailoredData.projects || []).map(project => ({
    title: project.title,
    period: project.period || 'No specific period',
    details: project.details || [project.description]
  }))
}];

console.log('🎯 USING AI-TAILORED CV DATA:', {
  jobTitle: tailoredData.jobTitle,
  summaryLength: tailoredData.summary?.length,
  skillsCount: tailoredData.skills?.length,
  experienceCount: tailoredData.workExperience?.length,
  keywordCoverage: tailoringResult.metadata?.tailoringMethod
});

console.log('Transformed CVs:', transformedCVs);

// Generate HTML with the transformed CVs (either AI-tailored or fallback)
transformedCVs.forEach(cv => {
  generateHTML(cv);
});

return userId;
      }
    } finally {
      await client.close();
    }
  }

fetchDataAndProcess(session, sessionToken);

          
/////////////////////////////////////////////////////////////////////////////////

          // Function to generate a random gender
          function generateRandomGender() {

            const genders = ['Male', 'Female'];
            const randomIndex = Math.floor(Math.random() * genders.length);
            return genders[randomIndex];
          }


          async function generateHTML(cv) {
            const profileImageHTML = `<img src="${cv.profileImage}" alt="${cv.name}" class="profile-image">`;

            const summaryHTML = cv.summaryData.length > 0 ? `
                <div class="summary section">
                    <h2>SUMMARY</h2>
                    ${cv.summaryData.map(summary => `<p>${summary}</p>`).join('')}
                </div>` : '';

            const experienceHTML = cv.experienceData.length > 0 ? `
                <div class="experience section">
                    <h2>EXPERIENCE</h2>
                    ${cv.experienceData.map(exp => `
                        <div class="section">
                            <h3>${exp.title}</h3>
                            <p>${exp.company}</p>
                            <p>${exp.period}</p>
                            <p>${exp.description}</p>
                        </div>`).join('')}
                </div>` : '';

            const projectsHTML = cv.projectsData.length > 0 ? `
                <div class="projects section">
                    <h2>PROJECTS</h2>
                    ${cv.projectsData.map(project => `
                        <div class="section">
                            <h3>${project.title}</h3>
                            <p>${project.period}</p>
                            <ul>
                                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>`).join('')}
                </div>` : '';

            const educationHTML = cv.educationData.length > 0 ? `
                <div class="education section">
                    <h2>EDUCATION</h2>
                    ${cv.educationData.map(edu => `
                        <div class="section">
                            <h3>${edu.degree}</h3>
                            <p>${edu.institution}</p>
                            <p>${edu.period}</p>
                            <p>${edu.description}</p>
                        </div>`).join('')}
                </div>` : '';

            const contactHTML = `
                <div class="contact">
                    <p>${cv.email}</p>
                    <p>${cv.phone_number}</p>
                    ${cv.linkedin.map(link => `<p><a href="${link}">${link}</a></p>`).join('')}
                </div>
            `;

            const skillsHTML = cv.skillsData.length > 0 ? `
                <div class="skills section">
                    <h2>SKILLS</h2>
                    <ul>
                        ${cv.skillsData.map(skill => `<li>${skill.name}</li>`).join('')}
                    </ul>
                </div>` : '';

            const languagesHTML = cv.languagesData.length > 0 ? `
                <div class="languages section">
                    <h2>LANGUAGES</h2>
                    <ul>
                        ${cv.languagesData.map(lang => `<li>${lang.name} - ${lang.proficiency}</li>`).join('')}
                    </ul>
                </div>` : '';

            const certificationsHTML = cv.certificationsData.length > 0 ? `
                <div class="certifications section">
                    <h2>CERTIFICATIONS</h2>
                    ${cv.certificationsData.map(cert => `
                        <div class="certification">
                            <p>${cert.name}</p>
                            <p>${cert.institution} (${cert.year})</p>
                        </div>`).join('')}
                </div>` : '';

            const membershipsHTML = cv.membershipsData.length > 0 ? `
                <div class="memberships section">
                    <h2>PROFESSIONAL MEMBERSHIPS</h2>
                    ${cv.membershipsData.map(member => `
                        <div class="membership">
                            <p>${member.name}</p>
                            <p>${member.role} (${member.year})</p>
                        </div>`).join('')}
                </div>` : '';

            const genderHTML = cv.gender ? `<p><strong>Gender:</strong> ${cv.gender}</p>` : '';
            const dobHTML = cv.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${cv.dateOfBirth}</p>` : '';
            const addressHTML = cv.address ? `<p><strong>Address:</strong> ${cv.address}</p>` : '';

            // const premium_CV = `
            //       <!DOCTYPE html>
            //       <html lang="en">
            //       <head>
            //           <meta charset="UTF-8">
            //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //           <title>${cv.name} Resume</title>
                      
            //           <style>
            //           .profile-image {
            //                   width: 150px;
            //                   height: 150px;
            //                   border-radius: 50%;
            //                 }
                        
            //                     body {
            //                         font-family: Arial, sans-serif;
            //                         margin: 0;
            //                         padding: 0;
            //                         background-color: #f4f4f4;
            //                     }
            //                     .container {
            //                         display: flex;
            //                         max-width: 900px;
            //                         margin: 20px auto;
            //                         background-color: #fff;
            //                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            //                     }
            //                     .sidebar {
            //                         background-color: #0d4a75;
            //                         color: white;
            //                         padding: 20px;
            //                         width: 30%;
            //                         text-align: center;
            //                     }
                              
            //                     .sidebar img {
            //                         border-radius: 50%;
            //                         width: 100px;
            //                         height: 100px;
            //                     }
            //                     .sidebar h1 {
            //                         font-size: 24px;
            //                         margin: 10px 0;
            //                     }
            //                     .sidebar p {
            //                         margin: 5px 0;
            //                     }
            //                     .sidebar .contact, .sidebar .skills, .sidebar .languages, .sidebar .certifications {
            //                       margin-top: 20px;
            //                       text-align: left;
            //                     }
            //                     .sidebar .contact a, .sidebar .languages p {
            //                         color: white;
            //                         text-decoration: none;
            //                     }
            //                     .sidebar .skills ul, .sidebar .languages ul {
            //                         list-style: none;
            //                         padding: 0;
            //                     }
            //                     .sidebar .skills li, .sidebar .languages li {
            //                         margin: 10px 0;
            //                     }
            //                     .bar {
            //                         background-color: #fff;
            //                         border-radius: 10px;
            //                         height: 10px;
            //                         position: relative;
            //                         margin-top: 5px;
            //                     }
            //                     .bar-certification {
            //                       background: linear-gradient(90deg, #ffeb3b 0%, #0d4a75 100%);
            //                       border-radius: 10px;
            //                       height: 10px; /* Increased height */
            //                       margin: 10px 0;
            //                     }
            //                     .bar::after {
            //                         content: '';
            //                         background-color: #0073b1;
            //                         height: 100%;
            //                         border-radius: 10px;
            //                         position: absolute;
            //                         top: 0;
            //                     }
            //                     .bar1::after { width: 90%; }
            //                     .bar2::after { width: 80%; }
            //                     .bar3::after { width: 85%; }
            //                     .bar4::after { width: 70%; }
            //                     .bar5::after { width: 75%; }
            //                     .bar6::after { width: 65%; }
            //                     .bar7::after { width: 60%; }
            //                     .bar8::after { width: 70%; }
            //                     .bar9::after { width: 50%; }
            //                     .bar10::after { width: 55%; }
            //                     .main {
            //                         padding: 20px;
            //                         width: 70%;
            //                     }
            //                     .main h2 {
            //                         border-bottom: 2px solid #0d4a75;
            //                         padding-bottom: 5px;
            //                     }
            //                     .main h3 {
            //                         color: #0d4a75;
            //                     }
            //                     .main .section {
            //                         margin-top: 20px;
            //                     }
                        
            //                     .sidebar .memberships {
            //                       text-align: left;
            //                     }
            //                     .sidebar .memberships {
            //                       margin-top: 20px;
            //                       text-align: left;
            //                     }
                                
            //                     .personal-details {
            //                         margin-top: 20px; /* Adds space between job title and personal details */
            //                     }
            //                     .personal-details p {
            //                         text-align: left;
            //                     }
            //           </style>
            //       </head>
            //       <body>
            //           <div class="container">
            //               <div class="sidebar">
            //                   ${profileImageHTML}
            //                   <h1>${cv.name}</h1>
            //                   <p>${cv.jobTitle}</p>
            //                   ${genderHTML}
            //                   ${dobHTML}
            //                   ${addressHTML}
            //                   ${contactHTML}
            //                   ${skillsHTML}
            //                   ${languagesHTML}
            //                   ${certificationsHTML}
            //                   ${membershipsHTML}
            //               </div>
            //               <div class="main">
            //                   ${summaryHTML}
            //                   ${experienceHTML}
            //                   ${projectsHTML}
            //                   ${educationHTML}
            //               </div>
            //           </div>
            //       </body>
            //       </html>
            //   `;
            // console.log(premium_CV);

            // const determineCVFormat = (subscription) => {
            //   let cvTemplate;
            //   if (subscription === 'Premium') {
            //     cvTemplate = premium_CV;
            //   } else if (subscription === 'Standard') {
            //     cvTemplate = standard_CV;
            //   } else if (subscription === 'Basic') {
            //     cvTemplate = basic_CV;
            //   } else {
            //     throw new Error('Invalid subscription type');
            //   }

            //   return cvTemplate;
            // };


            // const userSubscription = 'Premium'; // This should be dynamically determined based on your logic



                      // // connect to your cluster
                      // const client = await MongoClient.connect('yourMongoURL', { 
                      //   useNewUrlParser: true, 
                      //   useUnifiedTopology: true,
                      // });
                      // // specify the DB's name
                      // const db = client.db('nameOfYourDB');
                      // // execute find query
                      // const items = await db.collection('items').find({}).toArray();
                      // console.log(items);
                      // // close connection
                      // client.close();





                      // let successfulApplications = 0;

                      // async function SuccessfuleuserApprovedapplications(results, rolesListing, userId) {
                      //   for (const job of results) {
                      //     const isValid = await validateJobUrl(job.url); // Assuming this function checks if the job is valid
                      //     if (isValid) {
                      //       await rolesListing.insertOne({ userId, ...job });
                      //       successfulApplications++; // Increment count for each valid job added
                      //     }
                      //   }
                      //   console.log(`User has ${successfulApplications} successfully approved job applications.`);
                      // }
                      

                  // Utility function to fetch subscription details
                  async function fetchSubscriptionDetails(sessionToken) {
                  const client = new MongoClient(process.env.MONGO_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                      });
                    
                      const database = client.db('olukayode_sage');
                      const sessionsCollection = database.collection('sessions');
                      const usersCollection = database.collection('Users_CV_biodata');

                    try {
                      // Ensure connection is established before any database operations
                      await client.connect();
                      console.log('Fetching session data for token:', sessionToken);
                      const sessionData = await sessionsCollection.findOne({ sessionToken });
                  
                      if (!sessionData || !sessionData.userId) {
                        console.error('Invalid session token or user not authenticated:', sessionData);
                        throw new Error('Invalid session token or user not authenticated.');
                      }
                  
                      const userId = sessionData.userId;
                      console.log('User ID found:', userId);
                  
                      console.log('Fetching user subscription details...');
                      const user = await usersCollection.findOne({ _id: userId });
                  
                      if (!user || !user.subscription) {
                        console.error('Subscription details not found for user:', user);
                        throw new Error('Subscription details not found for the user.');
                      }
                  
                      const { plan } = user.subscription;
                      console.log('Subscription plan:', plan);
                  
                      return plan;
                    } catch (error) {
                      console.error('Error fetching subscription details:', error);
                      throw error;
                    } finally {
                      // Conditionally close the connection
                   
                        console.log('Closing database connection...');
                        await client.close();
                      
                    }
                  }


                    // Define CV templates first

                    const basic_CV2= `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f9;
                                color: #333;
                            }
                    
                            .container {
                                width: 90%;
                                max-width: 800px;
                                margin: 30px auto;
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                    
                            .header {
                                background: #1d3557; /* Darker Blue */
                                color: white;
                                padding: 20px 30px;
                                display: flex;
                                align-items: center;
                                gap: 20px;
                            }
                    
                            .profile-image {
                                width: 100px;
                                height: 100px;
                                border-radius: 50%;
                                border: 3px solid #fff;
                                object-fit: cover;
                            }
                    
                            .header-content {
                                flex-grow: 1;
                            }
                    
                            .header-content h1 {
                                font-size: 28px;
                                margin: 0;
                            }
                    
                            .header-content h2 {
                                font-size: 18px;
                                margin: 5px 0;
                                font-weight: 400;
                            }
                    
                            .section {
                                padding: 20px 30px;
                                border-bottom: 1px solid #eee;
                            }
                    
                            .section:last-child {
                                border-bottom: none;
                            }
                    
                            .section-title {
                                font-size: 22px;
                                margin-bottom: 15px;
                                color: #1d3557; /* Darker Blue */
                                position: relative;
                            }
                    
                            .section-title::after {
                                content: '';
                                width: 50px;
                                height: 3px;
                                background: #1d3557; /* Darker Blue */
                                display: block;
                                margin-top: 5px;
                            }
                    
                            .content-block {
                                margin-bottom: 15px;
                            }
                    
                            .content-block h3 {
                                margin: 0;
                                font-size: 18px;
                                color: #333;
                            }
                    
                            .content-block span {
                                display: block;
                                font-size: 14px;
                                color: #888;
                            }
                    
                            .content-block p {
                                margin: 5px 0 0;
                                font-size: 14px;
                                color: #555;
                            }
                    
                            .skills, .languages, .certifications {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 10px;
                            }
                    
                            .badge {
                                background: #f4f4f9;
                                padding: 10px;
                                border-radius: 5px;
                                border: 1px solid #ddd;
                                font-size: 14px;
                                color: #555;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <header class="header">
                                ${profileImageHTML}
                                <div class="header-content">
                                    <h1>${cv.name}</h1>
                                    <h2>${cv.jobTitle}</h2>
                                    <p>${contactHTML}</p>
                                </div>
                            </header>
                    
                            <section class="section">
                                <h2 class="section-title">Summary</h2>
                                ${summaryHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Experience</h2>
                                ${experienceHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Education</h2>
                                ${educationHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Skills</h2>
                                <div class="skills">
                                    ${skillsHTML}
                                </div>
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Projects</h2>
                                ${projectsHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Languages</h2>
                                <div class="languages">
                                    ${languagesHTML}
                                </div>
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Certifications</h2>
                                <div class="certifications">
                                    ${certificationsHTML}
                                </div>
                            </section>
                        </div>
                    </body>
                    </html>
                    `;


                    const basic_CV1= `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Helvetica Neue', Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #ffffff;
                                color: #2c3e50;
                                line-height: 1.6;
                            }
                    
                            .container {
                                max-width: 21cm;
                                width: 100%;
                                min-height: 29.7cm;
                                margin: 20px auto;
                                padding: 40px;
                                background: #ffffff;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                                box-sizing: border-box;
                            }
                    
                            .header {
                                position: relative;
                                padding: 30px 0;
                                margin-bottom: 50px;
                                display: flex;
                                align-items: center;
                                gap: 30px;
                            }
                    
                            .header::after {
                                content: '';
                                position: absolute;
                                bottom: 0;
                                left: -40px;
                                right: -40px;
                                height: 1px;
                                background: linear-gradient(90deg, transparent, #3498db, transparent);
                            }
                    
                            .profile-image {
                                width: 140px;
                                height: 140px;
                                border-radius: 4px;
                                object-fit: cover;
                            }
                    
                            .header-content {
                                flex-grow: 1;
                            }
                    
                            .header-content h1 {
                                font-size: 36px;
                                margin: 0;
                                color: #2c3e50;
                                font-weight: 300;
                                letter-spacing: -0.5px;
                            }
                    
                            .header-content h2 {
                                font-size: 20px;
                                margin: 5px 0 0;
                                color: #3498db;
                                font-weight: 400;
                            }
                    
                            .section {
                                margin-bottom: 40px;
                                position: relative;
                            }
                    
                            .section-title {
                                font-size: 24px;
                                color: #2c3e50;
                                margin: 0 0 25px;
                                font-weight: 300;
                                display: flex;
                                align-items: center;
                                gap: 15px;
                            }
                    
                            .section-title::before {
                                content: '';
                                width: 30px;
                                height: 2px;
                                background-color: #3498db;
                                display: inline-block;
                            }
                    
                            .contact-details {
                                display: flex;
                                justify-content: flex-start;
                                gap: 30px;
                                flex-wrap: wrap;
                                margin-top: 20px;
                            }
                    
                            .contact-item {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                color: #7f8c8d;
                                font-size: 15px;
                            }
                    
                            .experience-item, .education-item {
                                margin-bottom: 30px;
                                position: relative;
                                padding-left: 20px;
                                border-left: 2px solid #f0f2f5;
                            }
                    
                            .experience-item:hover, .education-item:hover {
                                border-left-color: #3498db;
                            }
                    
                            .item-header {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-start;
                                margin-bottom: 10px;
                            }
                    
                            .item-title {
                                font-size: 18px;
                                color: #2c3e50;
                                margin: 0;
                                font-weight: 500;
                            }
                    
                            .item-subtitle {
                                font-size: 16px;
                                color: #3498db;
                                margin: 5px 0;
                                font-weight: 400;
                            }
                    
                            .item-date {
                                color: #95a5a6;
                                font-size: 14px;
                                font-weight: 400;
                            }
                    
                            .item-description {
                                color: #7f8c8d;
                                font-size: 15px;
                                line-height: 1.6;
                                margin: 10px 0 0;
                            }
                    
                            .skills-grid {
                                display: grid;
                                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                                gap: 20px;
                            }
                    
                            .skill-category {
                                background: #f8f9fa;
                                padding: 15px;
                                border-radius: 4px;
                            }
                    
                            .skill-category h3 {
                                margin: 0 0 10px;
                                color: #2c3e50;
                                font-size: 16px;
                                font-weight: 500;
                            }
                    
                            .skill-list {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                                display: flex;
                                flex-wrap: wrap;
                                gap: 8px;
                            }
                    
                            .skill-item {
                                background: #ffffff;
                                padding: 5px 12px;
                                border-radius: 3px;
                                font-size: 14px;
                                color: #7f8c8d;
                                border: 1px solid #e0e0e0;
                            }
                    
                            .languages-list, .certifications-list {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 15px;
                                list-style: none;
                                padding: 0;
                            }
                    
                            .language-item, .certification-item {
                                background: #f8f9fa;
                                padding: 10px 15px;
                                border-radius: 4px;
                                color: #7f8c8d;
                                font-size: 15px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }
                    
                            @media print {
                                .container {
                                    margin: 0;
                                    padding: 20px;
                                    box-shadow: none;
                                }
                                
                                .header::after {
                                    left: 0;
                                    right: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <header class="header">
                                ${profileImageHTML}
                                <div class="header-content">
                                    <h1>${cv.name}</h1>
                                    <h2>${cv.jobTitle}</h2>
                                    <div class="contact-details">
                                        ${contactHTML}
                                    </div>
                                </div>
                            </header>
                    
                            <section class="section">
                                <h2 class="section-title">Summary</h2>
                                ${summaryHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Experience</h2>
                                ${experienceHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Education</h2>
                                ${educationHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Skills</h2>
                                ${skillsHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Projects</h2>
                                ${projectsHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Languages</h2>
                                ${languagesHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Certifications</h2>
                                ${certificationsHTML}
                            </section>
                        </div>
                    </body>
                    </html>
                    `;


                    const basic_CV3 = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Helvetica Neue', Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #ffffff;
                                color: #666666;
                                line-height: 1.6;
                            }
                    
                            .container {
                                max-width: 21cm;
                                width: 100%;
                                min-height: 29.7cm;
                                margin: 20px auto;
                                padding: 30px;
                                background: #ffffff;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                                box-sizing: border-box;
                            }
                    
                            .header {
                                display: flex;
                                align-items: center;
                                margin-bottom: 30px;
                                padding-bottom: 20px;
                                border-bottom: 1px solid #eeeeee;
                            }
                    
                            .profile-image {
                                width: 100px;
                                height: 100px;
                                border-radius: 50%;
                                margin-right: 25px;
                            }
                    
                            .header-content h1 {
                                font-size: 28px;
                                margin: 0 0 5px 0;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                color: #333333;
                            }
                    
                            .header-content h2 {
                                font-size: 18px;
                                margin: 0;
                                color: #666666;
                                font-weight: normal;
                            }
                    
                            .main-content {
                                display: flex;
                                gap: 30px;
                            }
                    
                            .left-column {
                                flex: 0 0 30%; /* Fixed width for left column */
                            }
                    
                            .right-column {
                                flex: 0 0 70%; /* Fixed width for right column */
                            }
                    
                            .section {
                                margin-bottom: 25px;
                            }
                    
                            .section-title {
                                font-size: 16px;
                                text-transform: uppercase;
                                color: #333333;
                                margin-bottom: 15px;
                                letter-spacing: 1px;
                                border-bottom: 1px solid #eeeeee;
                                padding-bottom: 8px;
                            }
                    
                            /* Left column specific styles */
                            .left-column .section-content {
                                font-size: 14px;
                                color: #666666;
                            }
                    
                            .left-column ul {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                            }
                    
                            .left-column li {
                                margin-bottom: 8px;
                                font-size: 14px;
                                color: #666666;
                            }
                    
                            /* Right column specific styles */
                            .experience-item, .education-item {
                                margin-bottom: 20px;
                            }
                    
                            .experience-item h3, .education-item h3 {
                                font-size: 16px;
                                margin: 0 0 5px 0;
                                color: #444444;
                            }
                    
                            .company-date {
                                display: flex;
                                justify-content: space-between;
                                color: #888888;
                                font-size: 14px;
                                margin-bottom: 8px;
                            }
                    
                            .experience-item p, .education-item p {
                                margin: 0;
                                color: #666666;
                                font-size: 14px;
                            }
                    
                            @media print {
                                .container {
                                    margin: 0;
                                    padding: 20px;
                                    box-shadow: none;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <header class="header">
                                ${profileImageHTML}
                                <div class="header-content">
                                    <h1>${cv.name}</h1>
                                    <h2>${cv.jobTitle}</h2>
                                </div>
                            </header>
                    
                            <div class="main-content">
                                <div class="left-column">
                                    <div class="section">
                                        <h2 class="section-title">Education</h2>
                                        <div class="section-content">
                                            ${educationHTML}
                                        </div>
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Expertise</h2>
                                        <div class="section-content">
                                            ${skillsHTML}
                                        </div>
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Languages</h2>
                                        <div class="section-content">
                                            ${languagesHTML}
                                        </div>
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Contact Info</h2>
                                        <div class="section-content">
                                            ${contactHTML}
                                        </div>
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Certifications</h2>
                                        <div class="section-content">
                                            ${certificationsHTML}
                                        </div>
                                    </div>
                                </div>
                    
                                <div class="right-column">
                                    <div class="section">
                                        <h2 class="section-title">Work Experience</h2>
                                        ${experienceHTML}
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Professional Summary</h2>
                                        ${summaryHTML}
                                    </div>
                    
                                    <div class="section">
                                        <h2 class="section-title">Projects</h2>
                                        ${projectsHTML}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;


                    const basic_CV4= `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} Resume</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f4f4;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                    
                            .container {
                                max-width: 900px;
                                margin: 30px auto;
                                background-color: #fff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                            }
                    
                            .header {
                                text-align: center;
                                margin-bottom: 40px;
                            }
                    
                            .header h1 {
                                font-size: 36px;
                                color: #2a3d66;
                                margin: 0;
                            }
                    
                            .header p {
                                font-size: 18px;
                                color: #8a8a8a;
                                margin-top: 5px;
                            }
                    
                            .section-title {
                                font-size: 22px;
                                color: #2a3d66;
                                border-bottom: 2px solid #2a3d66;
                                padding-bottom: 6px;
                                margin-bottom: 20px;
                            }
                    
                            .section {
                                margin-bottom: 40px;
                            }
                    
                            .section p {
                                font-size: 16px;
                                line-height: 1.6;
                                margin-bottom: 15px;
                            }
                    
                            .skills ul, .languages ul, .experience ul, .education ul, .projects ul {
                                list-style-type: none;
                                padding: 0;
                            }
                    
                            .skills li, .languages li, .experience li, .education li, .projects li {
                                background-color: #f8f8f8;
                                margin: 8px 0;
                                padding: 10px;
                                border-radius: 5px;
                            }
                    
                            .contact-info a {
                                color: #2a3d66;
                                text-decoration: none;
                            }
                    
                            .contact-info a:hover {
                                text-decoration: underline;
                            }
                    
                            .contact-info {
                                display: flex;
                                justify-content: center;
                                gap: 20px;
                                margin-top: 20px;
                            }
                    
                            .contact-info div {
                                font-size: 16px;
                                color: #555;
                            }
                    
                            .contact-info div strong {
                                color: #2a3d66;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>${cv.name}</h1>
                                <p>${cv.jobTitle}</p>
                            </div>
                    
                            <div class="section contact-info">
                                <div><strong>Gender:</strong> ${cv.gender}</div>
                                <div><strong>DOB:</strong> ${cv.dob}</div>
                                <div><strong>Address:</strong> ${cv.address}</div>
                                <div><strong>Contact:</strong> ${cv.contact}</div>
                            </div>
                    
                            <div class="section summary">
                                <div class="section-title">Summary</div>
                                <p>${cv.summary}</p>
                            </div>
                    
                            <div class="section experience">
                                <div class="section-title">Experience</div>
                                <ul>
                                ${(cv.workExperience || []).map(exp => `
                                    <li><strong>${exp.title}</strong> at ${exp.company} (${exp.duration})</li>
                                    <p>${exp.description}</p>
                                `).join('')}
                            </ul>
                            </div>
                    
                            <div class="section education">
                                <div class="section-title">Education</div>
                                <ul>
                                  ${(cv.education || []).filter(edu => edu.school && edu.degree).map(education => `
                                      <li><strong>${education.degree}</strong> at ${education.school} (${education.duration})</li>
                                      <p>${education.description || ''}</p>
                                  `).join('')}
                              </ul>
                            </div>
                    
                            <div class="section skills">
                                <div class="section-title">Skills</div>
                                <ul>
                                ${(cv.skills || []).filter(skill => skill.trim() !== '').map(skill => `
                                    <li>${skill}</li>
                                `).join('')}
                            </ul>
                            </div>
                    
                            <div class="section languages">
                                <div class="section-title">Languages</div>
                                <ul>
                                ${(cv.languages || []).map(language => `
                                    <li>${language.name || 'Unknown'} - ${language.proficiency || 'N/A'}</li>
                                `).join('')}
                            </ul>
                            </div>
                    
                            <div class="section projects">
                                <div class="section-title">Projects</div>
                                <ul>
                                ${(cv.projects || []).map(project => `
                                    <li><strong>${project.title}</strong> (${project.period}): ${project.description}</li>
                                `).join('')}
                            </ul>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;


                    const basic_CV5= `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} Resume</title>
                        
                        <style>
                            /* Global Styles */
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f9f9f9;
                                color: #333;
                            }
                    
                            .container {
                                display: flex;
                                max-width: 1000px;
                                margin: 20px auto;
                                background-color: #fff;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                border-radius: 10px;
                                overflow: hidden;
                            }
                    
                            /* Sidebar Styles */
                            .sidebar {
                                background-color: #2c3e50;
                                color: white;
                                padding: 30px;
                                width: 30%;
                                text-align: center;
                            }
                    
                            .sidebar img {
                                border-radius: 50%;
                                width: 120px;
                                height: 120px;
                                border: 4px solid #fff;
                                margin-bottom: 20px;
                            }
                    
                            .sidebar h1 {
                                font-size: 26px;
                                margin: 10px 0;
                                font-weight: 600;
                            }
                    
                            .sidebar p {
                                margin: 5px 0;
                                font-size: 14px;
                                color: #ecf0f1;
                            }
                    
                            .sidebar .contact, .sidebar .skills, .sidebar .languages, .sidebar .certifications, .sidebar .memberships {
                                margin-top: 25px;
                                text-align: left;
                            }
                    
                            .sidebar .contact a {
                                color: #3498db;
                                text-decoration: none;
                                font-size: 14px;
                            }
                    
                            .sidebar .contact a:hover {
                                text-decoration: underline;
                            }
                    
                            .sidebar .skills ul, .sidebar .languages ul {
                                list-style: none;
                                padding: 0;
                            }
                    
                            .sidebar .skills li, .sidebar .languages li {
                                margin: 10px 0;
                                font-size: 14px;
                                color: #ecf0f1;
                            }
                    
                            .sidebar .skills li::before, .sidebar .languages li::before {
                                content: "•";
                                color: #3498db;
                                margin-right: 8px;
                            }
                    
                            .sidebar .certifications p, .sidebar .memberships p {
                                font-size: 14px;
                                color: #ecf0f1;
                                margin: 5px 0;
                            }
                    
                            .sidebar .certifications p strong, .sidebar .memberships p strong {
                                color: #3498db;
                            }
                    
                            /* Main Content Styles */
                            .main {
                                padding: 30px;
                                width: 70%;
                            }
                    
                            .main h2 {
                                color: #2c3e50;
                                font-size: 22px;
                                font-weight: 600;
                                border-bottom: 2px solid #3498db;
                                padding-bottom: 5px;
                                margin-bottom: 20px;
                            }
                    
                            .main h3 {
                                color: #2c3e50;
                                font-size: 18px;
                                font-weight: 600;
                                margin: 10px 0;
                            }
                    
                            .main .section {
                                margin-top: 20px;
                            }
                    
                            .main .section p {
                                font-size: 14px;
                                line-height: 1.6;
                                color: #555;
                            }
                    
                            .main .section ul {
                                padding-left: 20px;
                            }
                    
                            .main .section ul li {
                                margin: 8px 0;
                                font-size: 14px;
                                color: #555;
                            }
                    
                            .main .section ul li::before {
                                content: "•";
                                color: #3498db;
                                margin-right: 8px;
                            }
                    
                            /* Personal Details Styles */
                            .personal-details {
                                margin-top: 20px;
                            }
                    
                            .personal-details p {
                                text-align: left;
                                font-size: 14px;
                                color: #ecf0f1;
                            }
                    
                            .personal-details p strong {
                                color: #3498db;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <!-- Sidebar -->
                            <div class="sidebar">
                                ${profileImageHTML}
                                <h1>${cv.name}</h1>
                                <p>${cv.jobTitle}</p>
                                ${genderHTML}
                                ${dobHTML}
                                ${addressHTML}
                                ${contactHTML}
                                ${skillsHTML}
                                ${languagesHTML}
                                ${certificationsHTML}
                                ${membershipsHTML}
                            </div>
                    
                            <!-- Main Content -->
                            <div class="main">
                                ${summaryHTML}
                                ${experienceHTML}
                                ${projectsHTML}
                                ${educationHTML}
                            </div>
                        </div>
                    </body>
                    </html>
                    `;

                    const standard_CV1 = `
                     
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Georgia', serif;
                                margin: 0;
                                padding: 0;
                                background-color: #ffffff;
                                color: #2c3e50;
                                line-height: 1.6;
                            }
                    
                            .container {
                                max-width: 21cm;
                                width: 100%;
                                min-height: 29.7cm;
                                margin: 20px auto;
                                padding: 40px;
                                background: #ffffff;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                                box-sizing: border-box;
                            }
                    
                            .header {
                                text-align: center;
                                margin-bottom: 40px;
                                padding-bottom: 20px;
                                border-bottom: 3px double #bdc3c7;
                            }
                    
                            .profile-image {
                                width: 120px;
                                height: 120px;
                                border-radius: 50%;
                                margin: 0 auto 20px;
                                display: block;
                                border: 3px solid #f5f6fa;
                                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                            }
                    
                            .header h1 {
                                font-size: 32px;
                                margin: 0 0 10px;
                                color: #2c3e50;
                                text-transform: uppercase;
                                letter-spacing: 2px;
                                font-weight: normal;
                            }
                    
                            .header h2 {
                                font-size: 20px;
                                margin: 0;
                                color: #7f8c8d;
                                font-weight: normal;
                                font-style: italic;
                            }
                    
                            .section {
                                margin-bottom: 35px;
                            }
                    
                            .section-title {
                                font-size: 22px;
                                color: #2c3e50;
                                margin-bottom: 20px;
                                position: relative;
                                padding-bottom: 10px;
                            }
                    
                            .section-title::after {
                                content: '';
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 60px;
                                height: 3px;
                                background-color: #3498db;
                            }
                    
                            .contact-info {
                                text-align: center;
                                margin-bottom: 30px;
                            }
                    
                            .contact-info ul {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                                display: flex;
                                justify-content: center;
                                flex-wrap: wrap;
                                gap: 20px;
                            }
                    
                            .contact-info li {
                                color: #7f8c8d;
                                font-size: 15px;
                            }
                    
                            .experience-item, .education-item {
                                margin-bottom: 25px;
                                position: relative;
                            }
                    
                            .experience-item h3, .education-item h3 {
                                font-size: 18px;
                                color: #34495e;
                                margin: 0 0 5px;
                                font-weight: bold;
                            }
                    
                            .meta-info {
                                display: flex;
                                justify-content: space-between;
                                color: #7f8c8d;
                                font-size: 15px;
                                margin-bottom: 10px;
                                font-style: italic;
                            }
                    
                            .description {
                                color: #5d6d7e;
                                font-size: 15px;
                                line-height: 1.6;
                            }
                    
                            .skills-grid {
                                display: grid;
                                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                                gap: 20px;
                            }
                    
                            .skill-category {
                                margin-bottom: 20px;
                            }
                    
                            .skill-category h3 {
                                font-size: 16px;
                                color: #34495e;
                                margin-bottom: 10px;
                            }
                    
                            .languages-list, .certifications-list {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 15px;
                                padding: 0;
                                list-style: none;
                            }
                    
                            .languages-list li, .certifications-list li {
                                background-color: #f8f9fa;
                                padding: 8px 15px;
                                border-radius: 4px;
                                color: #5d6d7e;
                                font-size: 15px;
                            }
                    
                            @media print {
                                .container {
                                    margin: 0;
                                    padding: 20px;
                                    box-shadow: none;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <header class="header">
                                ${profileImageHTML}
                                <h1>${cv.name}</h1>
                                <h2>${cv.jobTitle}</h2>
                            </header>
                    
                            <section class="contact-info">
                                ${contactHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Professional Summary</h2>
                                ${summaryHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Work Experience</h2>
                                ${experienceHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Education</h2>
                                ${educationHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Skills</h2>
                                ${skillsHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Languages</h2>
                                ${languagesHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Projects</h2>
                                ${projectsHTML}
                            </section>
                    
                            <section class="section">
                                <h2 class="section-title">Certifications</h2>
                                ${certificationsHTML}
                            </section>
                        </div>
                    </body>
                    </html>
                    `;



                    const standard_CV2 = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f4f4;
                                color: #333;
                                margin: 0;
                                padding: 20px;
                            }
                    
                            .resume-container {
                                max-width: 800px;
                                background: #fff;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                margin: auto;
                                padding: 20px;
                                border-radius: 8px;
                            }
                    
                            .header {
                                background: #1E3A5F; /* Dark blue */
                                color: #fff;
                                padding: 20px;
                                text-align: center;
                                border-radius: 8px 8px 0 0;
                            }
                    
                            .header h1 {
                                margin: 0;
                                font-size: 28px;
                            }
                    
                            .header h2 {
                                margin: 5px 0 0;
                                font-size: 18px;
                                font-weight: normal;
                            }
                    
                            .contact-info {
                                text-align: center;
                                margin-top: 10px;
                                font-size: 14px;
                                color: #eee;
                            }
                    
                            .contact-info span {
                                margin-right: 10px;
                            }
                    
                            .content {
                                padding: 20px;
                            }
                    
                            .section {
                                margin-bottom: 20px;
                            }
                    
                            .section h2 {
                                font-size: 20px;
                                border-bottom: 2px solid #1E3A5F;
                                padding-bottom: 5px;
                                color: #1E3A5F;
                                margin-bottom: 10px;
                            }
                    
                            .experience-item, .education-item {
                                margin-bottom: 15px;
                            }
                    
                            .experience-item h3, .education-item h3 {
                                margin: 0;
                                font-size: 16px;
                                color: #1E3A5F;
                            }
                    
                            .experience-item p, .education-item p {
                                margin: 5px 0 0;
                                font-size: 14px;
                                color: #555;
                            }
                    
                            .skills {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 10px;
                            }
                    
                            .skill {
                                background: #1E3A5F;
                                color: #fff;
                                padding: 5px 10px;
                                border-radius: 5px;
                                font-size: 14px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="resume-container">
                            <div class="header">
                                <h1>${cv.name}</h1>
                                <h2>${cv.jobTitle}</h2>
                                <div class="contact-info">
                                    ${contactHTML}
                                </div>
                            </div>
                    
                            <div class="content">
                                <section class="section">
                                    <h2>Summary</h2>
                                    <p>${summaryHTML}</p>
                                </section>
                    
                                <section class="section">
                                    <h2>Experience</h2>
                                    ${experienceHTML}
                                </section>
                    
                                <section class="section">
                                    <h2>Education</h2>
                                    ${educationHTML}
                                </section>
                    
                                <section class="section">
                                    <h2>Skills</h2>
                                    <div class="skills">
                                        ${skillsHTML}
                                    </div>
                                </section>
                    
                                <section class="section">
                                    <h2>Projects</h2>
                                    ${projectsHTML}
                                </section>
                    
                                <section class="section">
                                    <h2>Languages</h2>
                                    ${languagesHTML}
                                </section>
                    
                                <section class="section">
                                    <h2>Certifications</h2>
                                    ${certificationsHTML}
                                </section>
                            </div>
                        </div>
                    </body>
                    </html>
                    `;

                    const standard_CV3 = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} Resume</title>
                        <style>
                            body {
                                font-family: 'Montserrat', sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f9;
                                color: #333;
                            }
                            .container {
                                display: flex;
                                max-width: 950px;
                                margin: 30px auto;
                                background: white;
                                border-radius: 10px;
                                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                                overflow: hidden;
                            }
                            .sidebar {
                                background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
                                color: white;
                                padding: 25px;
                                width: 35%;
                                text-align: center;
                            }
                            .main {
                                padding: 30px;
                                width: 65%;
                            }
                            .section h2 {
                                color: #1a2a6c;
                                border-bottom: 3px solid #b21f1f;
                                padding-bottom: 5px;
                                font-weight: bold;
                            }
                            .sidebar img {
                                width: 130px;
                                height: 130px;
                                border-radius: 50%;
                                margin-bottom: 15px;
                                border: 4px solid white;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="sidebar">
                                ${profileImageHTML}
                                <h1>${cv.name}</h1>
                                ${contactHTML}
                                ${skillsHTML}
                                ${languagesHTML}
                            </div>
                            <div class="main">
                                ${summaryHTML}
                                ${experienceHTML}
                                ${projectsHTML}
                                ${educationHTML}
                                ${certificationsHTML}
                                ${membershipsHTML}
                                ${genderHTML}
                                ${dobHTML}
                                ${addressHTML}
                            </div>
                        </div>
                    </body>
                    </html>`
              ;
                          
                        const premium_CV1 = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>${cv.name} Resume</title>
                            
                            <style>
                            .profile-image {
                                    width: 150px;
                                    height: 150px;
                                    border-radius: 50%;
                                  }
                              
                                      body {
                                          font-family: Arial, sans-serif;
                                          margin: 0;
                                          padding: 0;
                                          background-color: #f4f4f4;
                                      }
                                      .container {
                                          display: flex;
                                          max-width: 900px;
                                          margin: 20px auto;
                                          background-color: #fff;
                                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                      }
                                      .sidebar {
                                          background-color: #0d4a75;
                                          color: white;
                                          padding: 20px;
                                          width: 30%;
                                          text-align: center;
                                      }
                                    
                                      .sidebar img {
                                          border-radius: 50%;
                                          width: 100px;
                                          height: 100px;
                                      }
                                      .sidebar h1 {
                                          font-size: 24px;
                                          margin: 10px 0;
                                      }
                                      .sidebar p {
                                          margin: 5px 0;
                                      }
                                      .sidebar .contact, .sidebar .skills, .sidebar .languages, .sidebar .certifications {
                                        margin-top: 20px;
                                        text-align: left;
                                      }
                                      .sidebar .contact a, .sidebar .languages p {
                                          color: white;
                                          text-decoration: none;
                                      }
                                      .sidebar .skills ul, .sidebar .languages ul {
                                          list-style: none;
                                          padding: 0;
                                      }
                                      .sidebar .skills li, .sidebar .languages li {
                                          margin: 10px 0;
                                      }
                                      .bar {
                                          background-color: #fff;
                                          border-radius: 10px;
                                          height: 10px;
                                          position: relative;
                                          margin-top: 5px;
                                      }
                                      .bar-certification {
                                        background: linear-gradient(90deg, #ffeb3b 0%, #0d4a75 100%);
                                        border-radius: 10px;
                                        height: 10px; /* Increased height */
                                        margin: 10px 0;
                                      }
                                      .bar::after {
                                          content: '';
                                          background-color: #0073b1;
                                          height: 100%;
                                          border-radius: 10px;
                                          position: absolute;
                                          top: 0;
                                      }
                                      .bar1::after { width: 90%; }
                                      .bar2::after { width: 80%; }
                                      .bar3::after { width: 85%; }
                                      .bar4::after { width: 70%; }
                                      .bar5::after { width: 75%; }
                                      .bar6::after { width: 65%; }
                                      .bar7::after { width: 60%; }
                                      .bar8::after { width: 70%; }
                                      .bar9::after { width: 50%; }
                                      .bar10::after { width: 55%; }
                                      .main {
                                          padding: 20px;
                                          width: 70%;
                                      }
                                      .main h2 {
                                          border-bottom: 2px solid #0d4a75;
                                          padding-bottom: 5px;
                                      }
                                      .main h3 {
                                          color: #0d4a75;
                                      }
                                      .main .section {
                                          margin-top: 20px;
                                      }
                              
                                      .sidebar .memberships {
                                        text-align: left;
                                      }
                                      .sidebar .memberships {
                                        margin-top: 20px;
                                        text-align: left;
                                      }
                                      
                                      .personal-details {
                                          margin-top: 20px; /* Adds space between job title and personal details */
                                      }
                                      .personal-details p {
                                          text-align: left;
                                      }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="sidebar">
                                    ${profileImageHTML}
                                    <h1>${cv.name}</h1>
                                    <p>${cv.jobTitle}</p>
                                    ${genderHTML}
                                    ${dobHTML}
                                    ${addressHTML}
                                    ${contactHTML}
                                    ${skillsHTML}
                                    ${languagesHTML}
                                    ${certificationsHTML}
                                    ${membershipsHTML}
                                </div>
                                <div class="main">
                                    ${summaryHTML}
                                    ${experienceHTML}
                                    ${projectsHTML}
                                    ${educationHTML}
                                </div>
                            </div>
                        </body>
                        </html>
                    `;
                          
                    const premium_CV2 = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} Resume</title>
                        <style>
                            body {
                                font-family: 'Roboto', sans-serif;
                                background-color: #f5f5f5;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 100%;
                                max-width: 900px;
                                margin: 0 auto;
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                display: flex;
                            }
                            .sidebar {
                                width: 30%;
                                background-color: #005f73;
                                color: #fff;
                                padding: 20px;
                                border-top-left-radius: 10px;
                                border-bottom-left-radius: 10px;
                                text-align: center;
                            }
                            .sidebar h1 {
                                font-size: 24px;
                                margin-bottom: 10px;
                            }
                            .sidebar p {
                                margin-bottom: 5px;
                                font-size: 14px;
                            }
                            .sidebar .contact, .sidebar .skills, .sidebar .languages {
                                margin-top: 20px;
                                text-align: left;
                            }
                            .sidebar .contact a {
                                color: #fff;
                                text-decoration: none;
                            }
                            .main {
                                width: 70%;
                                padding: 20px;
                            }
                            .main h2 {
                                font-size: 22px;
                                color: #005f73;
                                border-bottom: 2px solid #005f73;
                                padding-bottom: 10px;
                            }
                            .main h3 {
                                font-size: 18px;
                                margin-top: 20px;
                            }
                            .skills ul, .languages ul {
                                list-style: none;
                                padding: 0;
                            }
                            .skills li, .languages li {
                                margin-bottom: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="sidebar">
                                ${profileImageHTML}
                                <h1>${cv.name}</h1>
                                <p>${cv.jobTitle}</p>
                                ${genderHTML}
                                ${dobHTML}
                                ${addressHTML}
                                ${contactHTML}
                                ${skillsHTML}
                                ${languagesHTML}
                            </div>
                            <div class="main">
                                ${summaryHTML}
                                ${experienceHTML}
                                ${projectsHTML}
                                ${educationHTML}
                            </div>
                        </div>
                    </body>
                    </html>
                    `;
                     
                    

                    const premium_CV3 = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${cv.name} Resume</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #e0f7fa;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                display: flex;
                                width: 100%;
                                max-width: 1000px;
                                margin: 30px auto;
                                background-color: #fff;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            .sidebar {
                                width: 30%;
                                background-color: #ff5722;
                                color: #fff;
                                padding: 20px;
                                text-align: center;
                                border-top-left-radius: 10px;
                                border-bottom-left-radius: 10px;
                            }
                            .sidebar h1 {
                                font-size: 28px;
                                font-weight: bold;
                                margin-bottom: 10px;
                            }
                            .sidebar .contact a {
                                color: #fff;
                                text-decoration: none;
                            }
                            .sidebar .skills ul, .sidebar .languages ul {
                                list-style: none;
                                padding: 0;
                            }
                            .main {
                                width: 70%;
                                padding: 20px;
                            }
                            .main h2 {
                                font-size: 26px;
                                color: #ff5722;
                                border-bottom: 2px solid #ff5722;
                                padding-bottom: 10px;
                            }
                            .section {
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="sidebar">
                                ${profileImageHTML}
                                <h1>${cv.name}</h1>
                                <p>${cv.jobTitle}</p>
                                ${genderHTML}
                                ${dobHTML}
                                ${addressHTML}
                                ${contactHTML}
                                ${skillsHTML}
                                ${languagesHTML}
                            </div>
                            <div class="main">
                                ${summaryHTML}
                                ${experienceHTML}
                                ${projectsHTML}
                                ${educationHTML}
                            </div>
                        </div>
                    </body>
                    </html>
                    `;

                          // Arrays to hold the CV designs
                          const basic_cvs = [basic_CV5, basic_CV5, basic_CV5, basic_CV5]; 
                          // const basic_cvs = [basic_CV1, basic_CV2, basic_CV3, basic_CV4];
                          const standard_cvs = [standard_CV3, standard_CV3];
                          // const standard_cvs = [standard_CV1, standard_CV2];
                          const premium_cvs = [premium_CV1, premium_CV2, premium_CV3];

                          // Function to randomly pick an item from an array
                          function getRandomCV(cvs) {
                              const randomIndex = Math.floor(Math.random() * cvs.length);
                              return cvs[randomIndex];
                          }

                          // Select a random design from each category
                          const basic_CV = getRandomCV(basic_cvs);
                          const standard_CV = getRandomCV(standard_cvs);
                          const premium_CV = getRandomCV(premium_cvs);

            
                  // Function to determine CV format based on subscription
                  const determineCVFormat = (subscription) => {
                    let cvTemplate;
                    if (subscription === 'Premium') {
                      cvTemplate = premium_CV;
                      console.log('Subscription type:', subscription); // Debug log
                    } else if (subscription === 'Standard') {
                      cvTemplate = standard_CV;
                      console.log('Subscription type:', subscription); // Debug log
                    } else if (subscription === 'Basic') {
                      cvTemplate = basic_CV;
                      console.log('Subscription type:', subscription); // Debug log
                    } else {
                      throw new Error('Invalid subscription type');
                    }

                    return cvTemplate;
                  };

                  // Usage example
                  const userSubscription = await fetchSubscriptionDetails(sessionToken); // Fetch subscription dynamically
                  const updatedGatePassHTML = determineCVFormat(userSubscription); // Pass userSubscription to determineCVFormat



const generateSecurityGatePass = async (content, filename) => {
  // Enhanced configuration options
  const options = {
    format: 'A4',
    printBackground: true,
    puppeteer: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security'
      ],
      timeout: 120000, // Increased timeout to 120 seconds
      headless: 'new', // Use new headless mode
      // Only set executablePath if Chrome is not in the default location
      ...(process.platform === 'win32' && {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      })
    }
  };

  // Helper function for delay
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Exponential backoff retry logic
  const retryWithExponentialBackoff = async (operation, maxRetries = 5, initialDelay = 2000) => {
    let retries = 0;
    while (true) {
      try {
        return await operation();
      } catch (error) {
        retries++;
        if (retries > maxRetries) {
          throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
        }
        console.log(`Attempt ${retries} failed. Retrying in ${initialDelay * Math.pow(2, retries - 1)}ms...`);
        await delay(initialDelay * Math.pow(2, retries - 1));
      }
    }
  };

  try {
    // Ensure downloads directory exists
    const directory = path.dirname(filename);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Generate PDF with retry logic
    const pdfBuffer = await retryWithExponentialBackoff(async () => {
      const result = await html_to_pdf.generatePdf({ content }, options);
      if (!result || result.length === 0) {
        throw new Error('Generated PDF is empty');
      }
      return result;
    });

    // Write file with error checking
    await fs.promises.writeFile(filename, pdfBuffer);
    console.log(`PDF successfully generated and saved to  : ${filename}`);
    return filename;

  } catch (error) {
    const errorMessage = `PDF generation failed: ${error.message}`;
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
};
            ////////////////////////////////////////////////////////////////////////////////////////////////// Function to clean phone number
            // const sessionId = req.session.id; // Get the session ID from the request
            const generateDynamicFilename = async (database,userId,sessionToken) => {
              await client.connect();
              try {
                const collection = database.collection("Users_CV_biodata");
            
                const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
                console.log(userId,"5555555555555555555555555555555555555555555555555555555555555")
               
                // Find the document using the userId
                const userDocument = await collection.findOne({ userId });
                if (!userDocument) {
                  throw new Error("User document not found");
                }
            
                // Extract relevant fields from the user document
                const userName = userDocument.name || "Unknown_User";
                const jobTitle = userDocument.jobTitle || "Unknown_Position";
                const desiredJobTitle = userDocument.desiredJobTitle || "Unknown_Position";
            
                // Format the current date
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
            
                // Clean the names to be filename-safe (remove special characters and spaces)
                const cleanName = userName.replace(/[^a-zA-Z0-9]/g, "_");
                const cleanJobTitle = jobTitle.replace(/[^a-zA-Z0-9]/g, "_");
                const cleanDesiredJobTitle = desiredJobTitle.replace(/[^a-zA-Z0-9]/g, "_");
            
                // Create the filename using the user name, job title, and desired job title
                const filename = `${cleanName}_${cleanJobTitle}_${cleanDesiredJobTitle}_${formattedDate}.pdf`;
                console.log("Generated filename:", filename);
                return filename;
              } catch (error) {
                console.error("Error generating dynamic filename:", error);
                // Fallback filename if there's an error
                return `application_${Date.now()}.pdf`;
              }
            };


            const cleanPhoneNumber = (phoneNumber) => {
              // Remove non-digit characters
              phoneNumber = phoneNumber.replace(/\D/g, '');

              // Check if the number starts with '0' and replace it with '234'
              if (phoneNumber.startsWith('0')) {
                return '234' + phoneNumber.slice(1);
              }

              // Check if the number starts with '234' and return it as is
              if (phoneNumber.startsWith('234')) {
                return phoneNumber;
              }

              // If the number starts with something else (e.g., '803'), assume it needs '234' prefix
              return '234' + phoneNumber;
            };

            // Function to send CV to the recruiter via WhatsApp
            const sendMessageToGroup = async (phoneNumber, pdfData, pdfFilename) => {
              try {
                await client.connect();
                const database = client.db('olukayode_sage');
  
                const dynamicFilename = await generateDynamicFilename(database);
                const pdfResponse = await axios.post(
                  'https://gate.whapi.cloud/messages/document',
                  {
                    to: phoneNumber,
                    media: `data:application/pdf;base64,${pdfData}`,
                    // filename: pdfFilename
                    filename: dynamicFilename // Use the dynamic filename here
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${process.env.WHAPI_TOKEN}`,
                    },
                  }
                );
                console.log('PDF file sent successfully via WhatsApp:', pdfResponse.data);
                return pdfResponse.data;
              } catch (error) {
                console.error('Error sending PDF via WhatsApp:', error.message);
                throw error;
              }
            };

            let whatsappEmailCoverLetterVariants = [];

            // Function to generate dynamic WhatsApp email cover letters
            const generateWhatsappEmailCoverLetters = async () => {
              try {
                // Fetch first name, role, and company
                const firstName = await getFirstName(); // Fetch user's first name
                const accessedJobTitle = await getAccessedJobTitle(); // Fetch job title details
                const userFullName = await getFullName(); // Fetch full name

                // Destructure role and company, set default values if not provided
                const role = accessedJobTitle?.role ?? '[Role Title]';
                const company = accessedJobTitle?.company ?? 'your reputable company';

                // Use the correct variable to extract the first name
                const firstName2 = userFullName ? userFullName.split(' ')[0] : 'Funmi';

                whatsappEmailCoverLetterVariants = [
                  `Dear Hiring Manager,\n\nI hope this message finds you well. I'm excited to express my interest in the ${role} position at ${company}. I believe my skills and experience align well with the qualifications required for this role, and I'm confident I could contribute effectively to your team. Please find my resume attached for your consideration. I look forward to the possibility of discussing how I can bring value to your organization.\n\nBest regards,\n${userFullName}`,

                  `Dear Hiring Manager,\n\nI am writing to apply for the ${role} position, which I believe closely matches my expertise and professional background. Attached is my resume for your review. I am confident that my skills and experiences position me as a strong candidate for this role. I would welcome the opportunity to further discuss how I can contribute to your team.\n\nKind regards,\n${userFullName}`,

                  `Dear Hiring Manager,\n\nI hope this message reaches you in good spirits. I am very interested in the ${role} position at ${company}, and I am confident that my experience and skills make me a suitable candidate. Please find my resume attached for your review. I would be honored to contribute to your team and help achieve your company's goals.\n\nWarm regards,\n${userFullName}`,

                  `Dear Hiring Manager,\n\nI am pleased to submit my resume in response to the ${role} opening. I am confident that my qualifications and experience match the role's requirements. I am eager to bring my strengths to your team and contribute to ${company}'s continued success. I look forward to the opportunity to discuss this further.\n\nSincerely,\n${userFullName}`,

                  `Dear Hiring Manager,\n\nI am excited to submit my application for the ${role} position at ${company}. My resume is attached for your review, detailing my qualifications and experiences that align well with the role. I would love to discuss how I can contribute to your team and help drive ${company} forward.\n\nThank you for considering my application.\n\nBest regards,\n${userFullName}`
                ];

              } catch (error) {
                console.error("Error generating WhatsApp email cover letters:", error);
                throw error;
              }
            };

            // Function to send WhatsApp email cover letter
            const sendWhatsappEmailCoverLetter = async (phoneNumber) => {
              try {
                // Generate WhatsApp email cover letter variants dynamically
                await generateWhatsappEmailCoverLetters();

                // Select a random cover letter variant
                const randomIndex = Math.floor(Math.random() * whatsappEmailCoverLetterVariants.length);
                const coverLetterText = whatsappEmailCoverLetterVariants[randomIndex];

                const response = await axios.post(
                  'https://gate.whapi.cloud/messages/text',
                  {
                    to: phoneNumber,
                    body: coverLetterText,
                    typing_time: 0,
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      // Authorization: 'Bearer 9Db0rfoHW3hpcfbh9HWTO2X1bqZSsktX',
                      // 'Authorization': 'Bearer 6qJhrwMB5kS6Z1va14C0X9oIqiwWW9lJ',
                      'Authorization': 'Bearer S36GOqY9anD6SGA7KPynscPVxdju24fN',
                    },
                  }
                );

                console.log('WhatsApp Email Cover Letter sent successfully:', response.data);
                return response.data;
              } catch (error) {
                console.error('Error sending WhatsApp email cover letter:', error.message);
                throw error;
              }
            };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
      /////////////////////////////////////////////////////////////////////////
      generateSecurityGatePass(updatedGatePassHTML, gatePassPdfPath, sessionToken)
      .then(async (pdfPath) => {
        const pdfData = fs.readFileSync(pdfPath, { encoding: 'base64' });
    
        try {
          // Fetch the user ID outside of the main try block
          await client.connect();
          const database = client.db('olukayode_sage');
          const sessionsCollection = database.collection('sessions');
          const collection = database.collection('whatsappJobVacancyPost');
    
          // Query the database to find the user by sessionToken
          const sessionData = await sessionsCollection.findOne({ sessionToken });
    
          if (sessionData) {
            const userId = sessionData.userId;
            console.log(`Retrieved User ID: ${userId}`); // Corrected this line to use backticks for template literals

            // emailPdfAttachment(pdfPath, recipientEmail, userId)

            const query = {
              "_id": "whatsappJobPost",
              "userId": userId, // Ensure the query is user-specific
              "Contact Phone Number": { $ne: null },
              "status": "new",
            };
    
            const matchingJob = await collection.findOne(query);
    
            if (matchingJob) {
              console.log("WhatsApp logic triggered.");
    
              // Clean the phone number and store it in a variable
              const recruiterNumber = cleanPhoneNumber(matchingJob["Contact Phone Number"]);
              console.log(`Cleaned phone number: ${recruiterNumber}`);
    
              try {
                // Send PDF first
                await sendMessageToGroup(recruiterNumber, pdfData, gatePassUniqueFilename);
                console.log('PDF sent via WhatsApp');
    
                // Wait a moment before sending cover letter (to ensure proper order)
                await new Promise((resolve) => setTimeout(resolve, 1000));
    
                // Send cover letter using the same phone number
                await sendWhatsappEmailCoverLetter(recruiterNumber);
                console.log('Cover letter sent via WhatsApp');
    
                // Update the document status
                const updateResult = await collection.updateOne(
                  { "_id": "whatsappJobPost", "userId": userId }, // Update user-specific document
                  {
                    $set: {
                      status: 'treated',
                      processedAt: new Date(),
                    },
                  }
                );
    
                if (updateResult.matchedCount > 0) {
                  console.log("Document marked as treated.");
                } else {
                  console.log("No matching document found for update.");
                }
              } catch (error) {
                console.error('Error sending WhatsApp messages:', error);
                throw error;
              }
            } else {
              if (recipientEmail) {
                await emailPdfAttachment(pdfPath, recipientEmail, userId);
                console.log('PDF sent via Email');
              } else {
                console.log('No email provided. Cannot send PDF via Email.');
              }
            }
          } else {
            console.log("User ID not found.");
          }
        } catch (error) {
          console.error('Error during main processing:', error);
          throw error;
        } finally {
          await client.close();
          console.log('Database connection closed.');
        }
      })
      .catch((error) => {
        console.error('Error in processing:', error);
      });
    

const emailPdfAttachment = async (pdfPath, recipientEmail, userId) => {
  try {
    // Fetch the user ID outside of the main try block
    await client.connect();
    const database = client.db('olukayode_sage');
    const sessionsCollection = database.collection('sessions');
    const collection = database.collection('whatsappJobVacancyPost');

    // Query the database to find the user by sessionToken
    const sessionData = await sessionsCollection.findOne({ sessionToken });

    if (sessionData) {
      const userId = sessionData.userId;

      if (!userId) {
        console.error("User ID is missing. Cannot send email.");
        return;
      }

      // Logic to send PDF via email
      await sendEmailWithAttachment(pdfPath, recipientEmail, { userId });
      console.log(`PDF sent via email to: ${recipientEmail}`);
    }
  } catch (error) {
    console.error('Error sending PDF via email:', error.message);
    throw error;
  }
};


 
            const generateEmailCoverLetters = async (userId) => {
              const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
              try {
                await client.connect();
                console.log('Connected to database');
            
                const database = client.db("olukayode_sage");
            
                // Fetch userId dynamically
                const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
                console.log("User ID:", userId, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            
                // Fetch the most recently published job role
                const jobResults = await database.collection("application_processing_feeder")
                  .find({ userId, published: true }) // Find all matching jobs
                  .sort({ publishedAt: -1 }) // Sort in descending order (most recent first)
                  .limit(1) // Get only the most recent job
                  .toArray(); // Convert to array
          
                                  // Check if a job was found
                      if (!jobResults.length) {
                        console.log(`User ${userId}: No job found in database. Exiting.`);
                        return ['Error: No job found'];
                      }

                      const accessedJobTitle = jobResults[0]; // Extract first job
                      console.log("The most recent Job:", accessedJobTitle);

                      // Extract job details
                      const role = accessedJobTitle?.title ?? '[Role Title]';
                      const company = accessedJobTitle?.company ?? 'your reputable company';
                      const applicationEmail = accessedJobTitle?.applicationEmail || null;
                      
/////////////////////////////////////////////////////////send email to backend team if email is not available
                    //  if (applicationEmail && applicationEmail !== "Not provided") {
                    // console.log(`User ${userId}: Email address found for@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ${role}. `);

                          // Fetch user's full name
                  const userFullName = await getFullName();

                  // Generate dynamic email cover letters
                  return [
                    `Dear Hiring Manager,\n\nI hope this message finds you well. I'm excited to express my interest in the ${role} position at ${company}. Please find my resume attached for your consideration.\n\nBest regards,\n${userFullName}`,

                    `Dear Hiring Manager,\n\nI am writing to apply for the ${role} position. Attached is my resume for your review. I would welcome the opportunity to discuss further.\n\nKind regards,\n${userFullName}`,

                    `Dear Hiring Manager,\n\nI hope this message reaches you in good spirits. I am very interested in the ${role} position at ${company}. Please find my resume attached for your review.\n\nWarm regards,\n${userFullName}`,

                    `Dear Hiring Manager,\n\nPlease find my resume attached in response to the ${role} opening. I look forward to discussing this opportunity further.\n\nSincerely,\n${userFullName}`,

                    `Dear Hiring Manager,\n\nI am excited to submit my application for the ${role} position at ${company}. My resume is attached for your review. Thank you for considering my application.\n\nBest regards,\n${userFullName}`
                  ];
                } catch (error) {
                  console.error("Error generating email cover letters:", error);
                  return ['Error generating email cover letters'];
                }
                      };


const sendEmailWithAttachment = async (pdfPath, email, session, sessionToken) => {
  if (!pdfPath || !email) {
    console.error("PDF path or email is missing. Aborting email sending.");
    return;
  }

  try {
    await client.connect();
    const database = client.db("olukayode_sage");
    const applicationProcessingFeeder = database.collection("application_processing_feeder");
    const applicationStatusCollection = database.collection("application_status");

    const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
    
    // ✅ Call getAccessedJobTitle ONCE at the beginning
    const accessedJob = await getAccessedJobTitle(session);
    
    if (!accessedJob?.role) {
      console.error(`User ${userId}: No valid role title found. Aborting email sending.`);
      return;
    }
    
    const applicationEmail = accessedJob?.applicationEmail || null;
    
    if (!userId) {
      console.error("User ID is missing. Cannot proceed.");
      return;
    }

    // ✅ NORMALIZE USER ID - Remove + prefix for Gmail tokens lookup
    const normalizedUserId = userId.replace(/^\+/, ''); // Remove leading +
    
    // ✅ Check authorization with normalized ID
    const userGmailTokensCollection = database.collection("user_gmail_tokens");
    const userAuth = await userGmailTokensCollection.findOne({ 
      userId: normalizedUserId  // ✅ Use normalized ID
    });
    
    console.log(`🔍 Looking up Gmail auth for normalized userId: ${normalizedUserId}`);
    console.log(`🔍 UserAuth found:`, !!userAuth, userAuth?.isAuthorized);
      
      let fromEmail;
      if (!userAuth || !userAuth.isAuthorized) {
        console.warn("⚠️ User not authorized — sending via Suntrenia SMTP");
        fromEmail = process.env.EMAIL_USER;
      } else {
        fromEmail = userAuth.userEmail;
      }
    console.log(`📨 Using authorized sender email: ${fromEmail}`);
    console.log(`Retrieved User IDbbbbbbbbbbbbbbbbbbbbbbb: ${userId}`);

    // Rest of your code remains the same...
    const roleId = accessedJob._id;
    
    // ✅ Fetch the user's name from the database
    const userCollection = database.collection("Users_CV_biodata");
    const user = await userCollection.findOne({ _id: userId });
    let applicantName = user?.name?.trim() || "Unknown";
    let firstName = applicantName.split(" ")[0];
    let appliedRole = accessedJob.role.trim();
    let uniqueCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    let formattedDateToday = new Date().toISOString().slice(0, 10);

    // ✅ Generate the new filename
    const newFilename = `${applicantName}_${appliedRole}_${formattedDateToday}_${uniqueCode}.pdf`;
    const newPdfPath = path.join(path.dirname(pdfPath), newFilename);
    
    // ✅ Rename the file before sending
    fs.renameSync(pdfPath, newPdfPath);

    // ✅ Generate email content
    const emailCoverLetterVariants = await generateEmailCoverLetters(accessedJob);
    if (!emailCoverLetterVariants?.length) {
      console.error(`User ${userId}: No cover letter variants available.`);
      return;
    }

    const selectedMessage = emailCoverLetterVariants[Math.floor(Math.random() * emailCoverLetterVariants.length)];

    // ✅ Determine the recipient email
    console.log(`Application Email (raw)hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh: '${applicationEmail}'`);

    let recipientEmail;

    if (!applicationEmail || applicationEmail?.trim() === "Not provided") {
      recipientEmail = "applications.suntrenia@gmail.com";
    } else {
      /////////////////////////////testing mode
      //recipientEmail = "akoredekayode@yahoo.com";
       recipientEmail = applicationEmail?.trim().toLowerCase(); // ✅ Use this in production
    }

    console.log(`Recipient Email: ${recipientEmail}`);

    let emailSubject, emailText, emailHtml;

    if (recipientEmail !== "applications.suntrenia@gmail.com") {
      emailSubject = `Application for the Role of ${accessedJob.originalTitle || accessedJob.role}`;
      emailText = selectedMessage;
      emailHtml = null;
    } else {
      emailSubject = "Urgent: Missing Email Address for Role Application";
      emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.6; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: left; margin-bottom: 20px;">
                <h2 style="font-size: 18px; color: #333333; margin: 0;">Urgent: Missing Email Address for Role Application</h2>
              </div>
              <div style="color: #555555;">
                <p>Dear Team,</p>
                <p>This is an urgent notification regarding a role application that lacks an email address. Manual intervention is required.</p>
                <p><strong>Subscriber Name:</strong> ${applicantName}</p>
                <p><strong>Role:</strong> ${accessedJob.originalTitle || appliedRole}</p>
                <p><strong>Company:</strong> ${accessedJob.company || 'No company details available'}</p>
                <p><strong>Job URL:</strong> <a href="${accessedJob.url}">${accessedJob.url}</a></p>
                <p>Please take immediate action to address this issue. Manual application is expected.</p>
                <p>Thank you for your prompt attention to this matter.</p>
              </div>
              <div style="margin-top: 30px;">
                <p style="margin: 0;"><strong>Kayode</strong></p>
                <p style="margin: 0; color: #777777;">Founder & CEO, Suntrenia</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // ✅ Send email with the renamed attachment
    const emailResponse = await transporter.sendMail({
      from: fromEmail,
      // from: fromEmail || `"${firstName}" <testmyitproject@gmail.com>`,
      to: recipientEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      attachments: [{ filename: newFilename, path: newPdfPath }],
    });

    console.log(`User ${userId}: Email sent with attachment: %s`, emailResponse.messageId);

    // ✅ Mark the role as processed
    await applicationProcessingFeeder.updateOne(
      { _id: roleId, userId },
      {
        $set: {
          role_processed: true,
          email_sent_at: new Date(),
          status: "Email Sent",
          application: "Approved"
        },
      }
    );

    // ✅ Update the application success count
    let userStatus = await applicationStatusCollection.findOne({ userId });

    if (!userStatus) {
      userStatus = { userId, successfulApplications: 0, rejectedApplications: 0 };
      await applicationStatusCollection.insertOne(userStatus);
    }

    const newSuccessCount = userStatus.successfulApplications + 1;

    await applicationStatusCollection.updateOne(
      { userId },
      { $set: { successfulApplications: newSuccessCount } }
    );

    console.log(`User ${userId}: Updated successful applications count to ${newSuccessCount}`);
    console.log(`User ${userId}: Role marked as processed with email sent.`);
    
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}
}
//////////////////////////////////////////////////////////////////////////////////////////////

 
} else if (userResponse.includes("decline") || userResponse.includes("not interested")) {
  console.log("Recognized as a negative response:", userResponse);
  const responses = [
    "Thank you for letting us know. Should you change your mind, feel free to reach out again.",
    "Noted. Should you reconsider, we'll be here to assist you further.",
    "Understood. Feel free to reconnect if you decide to explore our services later.",
    "Got it. Should you have a change of heart, don't hesitate to get in touch with us again.",
    "Acknowledged. If your circumstances change, we're here to help.",
    "Thank you for informing us. Remember, our doors are always open if you reconsider.",
    "I understand. Our assistance remains available if you have a change of plans."
  ];

  botReply = responses[Math.floor(Math.random() * responses.length)];

 
         try {
          await client.connect();
          const database = client.db('olukayode_sage');
          const applicationProcessingFeeder = database.collection('application_processing_feeder');
      
          // Validate session and retrieve user ID
          let userId = session?.userId;
          if (!userId) {
              console.warn("User ID not found in session. Attempting to fetch from session token.");
              userId = await fetchUserIdBySessionToken(sessionToken);
      
              if (!userId) {
                  console.error("Failed to retrieve User ID from session token.");
                  return null; // Prevents breaking the code
              }
          }
      
          console.log(`User ${userId}: Starting getAccessedJobTitle process.`);
      
          // Fetch a document for the specific user that hasn't been published yet
          const accessedRole = await applicationProcessingFeeder.findOne({
              userId, 
              url: { $ne: null },
              published: { $ne: true }
          });
      
          if (!accessedRole || !accessedRole.url || accessedRole.published) {
              console.log(`User ${userId}: No unprocessed or unpublished document with a valid URL found.`);
              return null;
          }
      
          // Extract and clean the role and other details
          const cleanedRole = cleanJobTitle(accessedRole.title);
      
          // Update the role in the `application_processing_feeder` collection
          await applicationProcessingFeeder.updateOne(
              { _id: accessedRole._id },
              {
                  $set: {
                      role_processed: true,
                      status: 'Treated',
                      application: 'Declined',
                      processedAt: new Date(),
                  },
              }
          );
          
          console.log(`User ${userId}: Role marked as treated.`);
      } catch (error) {
          console.error(`Error processing job role:`, error);
      } finally {
          await client.close();
          console.log("Database connection closed.");
      }
      
   
    } else {
        botReply = "I'm sorry, I couldn't understand your response. Could you please confirm if you'd like to proceed with the application? Alternatively, if you prefer to speak with us directly, feel free to reach out through any of the following channels:\n\n" +
          "Email: info@suntrenia.com\n" +
          "Phone: 07034995589\n" +
          "WhatsApp: 08027946808\n\n" +
          "We're here to assist you and ensure a smooth experience. Please don't hesitate to get in touch.";
      }

      // Send the appropriate bot reply to the user

      await sendReplyToRecipient(from, botReply, emailId, jobId);
      // await sendReplyToRecipient(from, botReply);
    } else {
      console.log("Unrecognized, sending fallback response:", userResponse);
      // botReply = "I'm sorry, I couldn't understand your response. Could you please confirm if you'd like to proceed with the application?";
    }
  }
} catch (err) {
  console.error("Error fetching email responses:", err);
} finally {
  if (mongoClient) {
    await mongoClient.close();
  }
}
}
  


/////////////////////////////////////////////////////////////////////////////////////////////////
function generateHtmlMessage(textMessage, jobId, userId) {
  return `
      <div style="background: linear-gradient(to bottom, #4b0038, #2c001e); padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 15px; border-radius: 10px; color: #333;">
          <h2 style="text-align: center; color: #4b0038; font-size: 22px; margin-bottom: 20px;">Exciting Job Opportunity</h2>
          <p style="line-height: 1.6;">${textMessage.replace(/\n/g, '<br>')}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
          <p style="text-align: center; margin-top: 15px;">
            <a href="#"><img src="https://example.com/facebook-icon.png" alt="Facebook" width="24" style="margin: 0 10px;"></a>
            <a href="#"><img src="https://example.com/twitter-icon.png" alt="Twitter" width="24" style="margin: 0 10px;"></a>
            <a href="#"><img src="https://example.com/linkedin-icon.png" alt="LinkedIn" width="24" style="margin: 0 10px;"></a>
            <a href="#"><img src="https://example.com/instagram-icon.png" alt="Instagram" width="24" style="margin: 0 10px;"></a>
          </p>
        </div>
      </div>
    `;
}
///////////////////////////////////////////////////////////////////////////////////////////////
async function sendReplyToRecipient(recipientEmail, botReply, jobId, userId) {
  try {
    // Connect to MongoDB and fetch the saved subject
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = client.db('olukayode_sage'); // Replace with your database name
    const collection = db.collection('user_application_records'); // Replace with your collection name
    // Fetch the most recent subject (or customize the query)
    const savedData = await collection.findOne({}, { sort: { sentAt: -1 } });

    const subject = savedData ? savedData.subject : 'Re: Follow-Up on Your Job Opportunity';

    // Define mail options
    const mailOptions = {
      from: `"Suntrenia" <${process.env.EMAIL_USER}>`,
      // to: "akoredekayode@yahoo.com",
      to: recipientEmail,
      subject: `Re: ${subject}`, // Concatenate "Re: " with the fetched subject
      text: botReply, // Plain text body (bot reply)
      html: generateHtmlMessage(botReply, jobId, userId), // HTML body (formatted bot reply)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Reply sent: %s', info.messageId);

    // Close the MongoDB connection
    await client.close();

  } catch (error) {
    console.error('Error sending reply:', error);
  }
}

// Periodically check for responses (every minute)
// setInterval(checkForResponses, 60 * 1000); // 60 * 1000 ms = 1 minute
// setInterval(checkForResponses, 7 * 60 * 1000); // 5 minutes instead of 1
///////////////////////////////////////////////////////////////

///////////////getting better 4/12/24/////////////////////////////////////////////////////////////////////////////////////////

async function checkDatabaseForFallback(userId) {
  if (!userId) {
    console.error('[checkDatabaseForFallback] userId is required');
    return;
  }
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const database = client.db('olukayode_sage');
  const jobPostCollection = database.collection('whatsappJobVacancyPost');
  const userBiodataCollection = database.collection('Users_CV_biodata');
  // ✅ Use userId-specific customId
  const customId = `${userId}_whatsappJobPost`;
  try {
    await client.connect();
    // Query the job post document for this specific user
    const jobPost = await jobPostCollection.findOne({ 
      $or: [{ _id: customId }, { userId }] 
    });
    // Query the user biodata document for this specific user
    const userBiodata = await userBiodataCollection.findOne({ _id: userId });
    const isPremium = userBiodata?.subscription?.plan === 'Premium';
    const userPhone = (userBiodata?.phoneNumber || '').replace(/^\+/, '');
    // Logic to determine messaging method and fallback
    if (jobPost) {
   
      if (jobPost.status === 'new') {
        if (jobPost.phoneNumber || jobPost["Application Email"]) {
          console.log("Document exists with status 'new' and contains a phone number or email address. Fallback will not be triggered.");
        
          // return false; // Do not trigger fallback
// //////////////////////////////Activate Emergenc Job advert
           sendEmergencyMessage(userId, userPhone)
            return false; // Do not trigger fallback
        } else {
          console.log("Document exists with status 'new' but does not contain a phone number or email address. Checking subscription for fallback.");

          if (isPremium) {
            console.log("User has premium subscription. Attempting to send message via WhatsApp  111111111111111.");
             //const whatsappSuccess = await sendMessage();
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=")
            const whatsappSuccess = await  sendMessage(userId, userPhone);

           ;
            if (!whatsappSuccess) {
              console.log("Can we confirm if this works.");
              // await promptUserByEmail();
            }
          } else {
            console.log("User does not have premium subscription. Fallback will default to email.");
            await promptuserbymail();
          }

          return true; // Trigger fallback
        }
      } else if (jobPost.status === 'treated') {
        console.log("Document exists with status 'treated'. Checking subscription for fallback.");
        console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
        if (isPremium) {

          // const whatsappSuccess = await sendMessage();
          const whatsappSuccess = await  sendMessage('287c5d1af24af77785f5348f', '2349010400099');
     
          if (!whatsappSuccess || 
            typeof whatsappSuccess !== 'object' || 
            whatsappSuccess.sent !== true) {
          console.log("WhatsApp message failed. Sending email as fallback.");
          await promptuserbymail();
            }

        } else {
          console.log("User does not have premium subscription. Fallback will default to email.");
          await promptuserbymail();
        }

        return true; // Trigger fallback
      }
    } else {
      console.log("Document does not exist. Checking subscription for fallback.");

      if (isPremium) {
        console.log("User has premium subscription. Attempting to send message via WhatsApp.3333333333333333333.");
        // const whatsappSuccess = await sendMessage();
        const whatsappSuccess = await  sendMessage('287c5d1af24af77785f5348f', '2349010400099');
       if (!whatsappSuccess || 
        typeof whatsappSuccess !== 'object' || 
        whatsappSuccess.sent !== true) {
        console.log("WhatsApp message failed. Sending email as fallback.");
        await promptuserbymail();
      }
      } else {
        console.log("User does not have premium subscription. Fallback will default to email.");
        await promptuserbymail();
      }

      return true; // Trigger fallback
    }
  } catch (error) {
    console.error('Error accessing the database:', error.message);
    return true; // Default to triggering fallback in case of an error
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}
// checkDatabaseForFallback()
///////////////////////////////////////////////////////////////////////////////////

// Function to select a random message variant
function selectRandomMessageVariant() {
  const index = Math.floor(Math.random() * messageVariants.length);
  return messageVariants[index];
}

// Function to generate a unique identifier for each conversation thread
const generateThreadId = () => {
  return Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
};

// Function to send a message to the subscriber
const sendMessageToSubscriber = async (subscriber, message, threadId) => {
  try {
    const response = await axios.post(
      'https://gate.whapi.cloud/messages/text',
      {
        to: subscriber,
        // to: '2347035517578',
        body: message,
        typing_time: 0,
        thread_id: threadId, // Include the thread ID in the message
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WHAPI_TOKEN}`,
        },
      }
    );

    console.log('Message sent successfully:', response.data);
    return response.data; // Explicitly return the response data
  } catch (error) {
    console.error('Error sending message..:', error.message);
    return null; // Return null instead of nothing if there's an error
  }
};

// Function to send a message (called with user ID and subscriber)
async function sendMessage(userId, subscriber) {
  const randomVariantFunction = selectRandomMessageVariant();
  const message = await randomVariantFunction(userId);
  const threadId = generateThreadId();
  return await sendMessageToSubscriber(subscriber, message, threadId);
}

// Call the function with a user ID and subscriber phone number
// sendMessage('287c5d1af24af77785f5348f', '2349010400099');

// Function to select a random message variant (alternative version)
function selectRandomMessage() {
  const index = crypto.randomInt(0, messageVariants.length);
  return messageVariants[index];
}




///////////////////////////////////////////////////////////////////////////////////////////////



////////////////logic to activate emergency urgentmessage
const emergencymessage = `
    🌟 URGENT JOB ALERT! 🌟

    Hi {{name}},

    This is {{senderName}} from Suntrenia. We’ve found an exciting job opportunity exclusively for you!

    - Position: {{jobTitle}}
    - Salary: {{salaryRange}}
    - Company: {{companyName}}

    Your profile matches perfectly! Respond NOW to let us apply on your behalf:

    Reply: "YES", "OKAY", "PROCEED", or "NOT INTERESTED".

    We’ll handle the rest. Don’t miss this rare privilege! 🚀

    Best regards,
    {{senderName}}
    Suntrenia
`;

const populateMessage = (template, data) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
};

const sendEmergencyJobAdvertMessageToSubscriber = async (subscriber, emergencymessage) => {
  try {
    const response = await axios.post(
      'https://gate.whapi.cloud/messages/text',
      {
        to: subscriber,
        body: emergencymessage ,
        typing_time: 0,
        // thread_id: threadId,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX'
        },
      }
    );
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message...:', error.response?.data || error.message);
    return null;
  }
};

async function sendEmergencyMessage(userId, subscriber) {
  const data = {
    name: 'John Doe', // Example data; replace with actual data
    senderName: 'Kayode',
    jobTitle: 'Procurement Manager',
    salaryRange: '150k - 900k',
    companyName: 'Reputable Corp',
  };
  const message = populateMessage(emergencymessage, data);
  // const threadId = generateThreadId2(); // Ensure this function exists and works
  return await sendEmergencyJobAdvertMessageToSubscriber(subscriber, emergencymessage);
}


/////////////////////////////////////////////////////////////////////////////////////////
const getUserResponseFromWhatsApp = async () => {
  try {
    // ✅ WhatsApp group IDs where job vacancies are posted
    const JOB_GROUP_IDS = [
      process.env.WHATSAPP_JOB_GROUP_1 || '2349010400099@g.us',
      process.env.WHATSAPP_JOB_GROUP_2 || '',
      process.env.WHATSAPP_JOB_GROUP_3 || '',
    ].filter(Boolean); // Remove empty entries

    const threeMinutesAgo = Math.floor(Date.now() / 1000) - 180;
    let allMessages = [];

    // ✅ Try WHAPI first, fall back to Waha if it fails
// ✅ THREE-TIER WhatsApp message fetching:
    // PRIMARY: Baileys (free, always running)
    // FALLBACK1: WHAPI (paid, needs valid WHAPI_TOKEN)
    // FALLBACK2: Empty array (graceful degradation)

const fetchMessagesFromWhapi = async () => {
  // ✅ Read cursor — timestamp of last processed WHAPI message
  const cursorClient = new MongoClient(uri);
  let sinceTimestamp = Math.floor(Date.now() / 1000) - (3 * 60); // default: 3 mins ago
  try {
    await cursorClient.connect();
    const cursorDb = cursorClient.db('olukayode_sage');
    const cursor = await cursorDb.collection('whapi_cursor').findOne({ key: 'last_processed' });
    if (cursor?.lastTimestamp) {
      sinceTimestamp = cursor.lastTimestamp;
      console.log(`[WHAPI] Fetching messages since: ${new Date(sinceTimestamp * 1000).toISOString()}`);
    }
  } catch (e) {
    console.warn('[WHAPI] Could not read cursor, using 3-min default:', e.message);
  } finally {
    await cursorClient.close();
  }

  const response = await axios.request({
    method: 'GET',
    url: 'https://gate.whapi.cloud/messages/list/?count=100',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.WHAPI_TOKEN}`
    }
  });

  const allMsgs = response.data.messages || [];

  // ✅ Only keep messages newer than last processed timestamp
  const freshMsgs = allMsgs.filter(msg => (msg.timestamp || 0) > sinceTimestamp);
  console.log(`[WHAPI] ${allMsgs.length} total fetched, ${freshMsgs.length} new since last poll`);

  if (freshMsgs.length === 0) return [];

  // ✅ Save the newest timestamp as the new cursor
  const newestTimestamp = Math.max(...freshMsgs.map(m => m.timestamp || 0));
  try {
    const saveClient = new MongoClient(uri);
    await saveClient.connect();
    const saveDb = saveClient.db('olukayode_sage');
    await saveDb.collection('whapi_cursor').updateOne(
      { key: 'last_processed' },
      { $set: { lastTimestamp: newestTimestamp, updatedAt: new Date() } },
      { upsert: true }
    );
    await saveClient.close();
    console.log(`[WHAPI] ✅ Cursor updated to: ${new Date(newestTimestamp * 1000).toISOString()}`);
  } catch (e) {
    console.warn('[WHAPI] Could not save cursor:', e.message);
  }

  return freshMsgs.map(msg => ({
    from: msg.from || msg.chatId,
    chatId: msg.chatId || msg.from,
    timestamp: msg.timestamp,
    text: { body: msg.text?.body || msg.body || '' }
  }));
};

    const fetchMessagesFromBaileys = async () => {
      // ✅ Baileys stores messages in memory via baileysMessages global cache
      // Messages are pushed into baileysMessages[] by the Baileys listener
      // defined in startBaileys() at the top of app.js
      if (!global.baileysMessages || global.baileysMessages.length === 0) {
        console.log('[Baileys] No messages in cache yet');
        return [];
      }
      const threeMinutesAgoMs = Date.now() - 3 * 60 * 1000;
      const fresh = global.baileysMessages.filter(m => m.receivedAt >= threeMinutesAgoMs);
      console.log(`[Baileys] ${fresh.length} fresh messages from cache`);
      // Clear processed messages to avoid reprocessing
      global.baileysMessages = global.baileysMessages.filter(m => m.receivedAt >= threeMinutesAgoMs);
      return fresh;
    };

    // PRIMARY: Try Baileys first
    try {
      allMessages = await fetchMessagesFromBaileys();
      console.log(`[WhatsApp] Baileys: fetched ${allMessages.length} messages`);
    } catch (baileysError) {
      console.warn('[WhatsApp] Baileys failed:', baileysError.message);
      allMessages = [];
    }

    // FALLBACK1: Try WHAPI if Baileys returned nothing
    if (allMessages.length === 0 && process.env.WHAPI_TOKEN) {
      try {
        allMessages = await fetchMessagesFromWhapi();
        console.log(`[WhatsApp] WHAPI fallback: fetched ${allMessages.length} messages`);
      } catch (whapiError) {
        console.warn('[WhatsApp] WHAPI also failed:', whapiError.message);
        allMessages = [];
      }
    }

    // ✅ Filter messages from job groups OR known sender within last 3 minutes
    const filteredMessages = allMessages.filter(message => {
      const fromJobGroup = JOB_GROUP_IDS.some(groupId => 
        message.from === groupId || message.chatId === groupId
      );
      const fromKnownSender = message.from === '2349010400099';
      const sentWithinLastThreeMinutes = message.timestamp >= threeMinutesAgo;
      return (fromJobGroup || fromKnownSender) && sentWithinLastThreeMinutes;
    });

    // console.log("Filtered Messages:", filteredMessages);
    return filteredMessages;

  } catch (error) {
    console.error('Error retrieving user response:', error.message);
    return [];
  }
};

let lastProcessedMessageId = null; // Track the ID of the last processed message

const pollForMessages = async () => {
  try {
    // Generate a unique thread ID for this conversation
    const threadId = generateThreadId();

    // Send an initial message from the bot to the user
    const botMessage = selectRandomMessage();
    await sendMessageToSubscriber(subscriber, botMessage, threadId);

    // Continuously poll for new messages
    while (true) {
      // Retrieve user's response from WhatsApp
      const messages = await getUserResponseFromWhatsApp(threadId);

      // Process user's response
      messages.forEach(async message => {
        // Check if message is an object
        if (typeof message === 'object') {
          const messageId = message.id; // Extract message ID
          // Check if this message is newer than the last processed message
          if (lastProcessedMessageId === null || messageId > lastProcessedMessageId) {
            lastProcessedMessageId = messageId; // Update the last processed message ID
            const userText = message.text.body.toLowerCase(); // Extract text directly from the message object
            let botReply;
            // Check if it's the first user response
            if (
              userText.includes("proceed") ||
              userText.includes("okay") ||
              userText.includes("yes") ||
              userText.includes("ok") ||
              userText.includes("continue") ||
              userText.includes("thank you") ||
              userText.includes("sure") ||
              userText.includes("please do")
            ) {

              // User approves
              const randomResponse = Math.floor(Math.random() * 5); // Generate a random number between 0 and 4
              switch (randomResponse) {
                case 0:
                  botReply = "Thank you for considering our services. We're excited to move forward with your application. For more details about the job role and your application status, please visit the 'Manage Application' tab on your user dashboard.";
                  break;
                case 1:
                  botReply = "We appreciate your interest and are ready to proceed with your application. For further information about the job role and your application status, please check the 'Manage Application' tab on your user dashboard.";
                  break;
                case 2:
                  botReply = "Your decision to apply is noted. We'll handle your application with care. To learn more about the role and track your application status, please visit the 'Manage Application' tab on your user dashboard.";
                  break;
                case 3:
                  botReply = "Great choice! We're processing your application. For more details about the role and to check your application status, please go to the 'Manage Application' tab on your user dashboard.";
                  break;
                case 4:
                  botReply = "Thank you for your response. We’ll ensure everything is in place for your application. For additional information about the job role and to monitor your application status, please visit the 'Manage Application' tab on your user dashboard.";
                  break;
                default:
                  botReply = "Thank you for your response. We will proceed with the application. For details about the job role and to check your application status, please visit the 'Manage Application' tab on your user dashboard.";


                  await sendMessageToSubscriber(subscriber, botReply, threadId);

              }


              // Define recipient's email address
             const recipientEmail = subscriber?.email || process.env.EMAIL_USER;
              const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
                },
              });
              const gatePassDownloadsFolderPath = path.join(__dirname, '..', 'downloads');

              // const gatePassUniqueFilename = () => {
              //   return `${applicantName}__${accessedRoleTime}_accessed_role_${uniqueCode}.pdf`;
              // };
              
              const gatePassUniqueFilename = (applicantName, appliedRole, formattedDateToday, uniqueCode) => {
                return `${applicantName}__${appliedRole}__${formattedDateToday}_${uniqueCode}.pdf`;
              };
              // // const gatePassUniqueFilename = `TailoredResume_${formattedDateToday}_UserName_Job_Title.pdf`;
              // const gatePassPdfPath = path.join(gatePassDownloadsFolderPath, gatePassUniqueFilename);
              const gatePassPdfPath = path.join(
                gatePassDownloadsFolderPath,
                gatePassUniqueFilename(applicantName, appliedRole, formattedDateToday, uniqueCode)
              );
              // const gatePassPdfPath = path.join(gatePassDownloadsFolderPath, gatePassUniqueFilename()); // Call the function to get the string
              app.use(express.json());


              function cleanURL(url) {
                const httpsIndex = url.indexOf('https://');
                if (httpsIndex !== -1) {
                  const cleanedURL = url.substring(httpsIndex);
                  console.log('Cleaned URL:', cleanedURL); // Log the cleaned URL
                  return cleanedURL;
                }
                console.log('Original URL (no change):', url); // Log the original URL if 'https://' is not found
                return url; // Return the URL as is if 'https://' is not found
              }

let session
// async function fetchDataAndProcess(session) {
//   if (!session || !session.userId) {
//     console.error('Invalid session or missing userId:', session);
//     throw new Error('User ID not found in session.');
//   }

//   const userId = session.userId;
//   console.log('Processing data for userId:', userId);

//   const { client, collection } = await connectToDatabase();

//   if (!collection) {
//     console.log('No collection found');
//     await client.close();
//     return;
//   }

//   try {
//     const data = await collection.find({ userId }).toArray(); // Fetch documents specific to the user
//     console.log(`Fetched data for userId ${userId}:`, data);

//     // Process each document
//     const transformedCVs = data.map(doc => {
//       const name = `${doc.name}`;
//       const jobTitle = doc.jobTitle;
//       const dateOfBirth = doc.dateOfBirth;
//       const address = doc.address;
//       const phone_number = doc.phone_number;
//       const linkedin = doc.linkedin ? [cleanURL(doc.linkedin)] : [];
//       const email = doc.email;
//       const profileImage = cleanURL(doc.profileImage || 'https://via.placeholder.com/100'); // Default image

//       const skillsData = Array.isArray(doc.skills)
//         ? doc.skills.map(skill => ({ name: skill, barClass: '' }))
//         : [];

//       const educationData = Array.isArray(doc.education)
//         ? doc.education.map(edu => ({
//             degree: edu.degree,
//             institution: edu.school,
//             period: `${edu.duration}`,
//             description: edu.description
//           }))
//         : [];

//       const experienceData = Array.isArray(doc.workExperience)
//         ? doc.workExperience.map(exp => ({
//             title: exp.title,
//             company: exp.company,
//             period: `${exp.duration}`,
//             description: exp.description
//           }))
//         : [];

//       const summaryData = [doc.summary];

//       const languagesData = Array.isArray(doc.languages)
//         ? doc.languages.map(lang => ({
//             name: lang.name,
//             proficiency: lang.proficiency
//           }))
//         : [];

//       const certificationsData = Array.isArray(doc.certifications)
//         ? doc.certifications.map(cert => ({
//             name: cert.name,
//             institution: cert.institution,
//             year: cert.year
//           }))
//         : [];

//       const membershipsData = Array.isArray(doc.professionalBodies)
//         ? doc.professionalBodies.map(body => ({
//             name: body.name,
//             role: body.role,
//             year: body.year
//           }))
//         : [];

//       const projectsData = Array.isArray(doc.projects)
//         ? doc.projects.map(project => ({
//             title: project.title,
//             period: project.period || 'No specific period',
//             details: project.details || [project.description]
//           }))
//         : [];

//       return {
//         name,
//         jobTitle,
//         dateOfBirth,
//         address,
//         phone_number,
//         linkedin,
//         email,
//         profileImage,
//         skillsData,
//         educationData,
//         experienceData,
//         summaryData,
//         languagesData,
//         certificationsData,
//         membershipsData,
//         projectsData
//       };
//     });

//     console.log('Transformed CVs:', transformedCVs);

//     // Generate HTML for each CV
//     transformedCVs.forEach(cv => {
//       generateHTML(cv);
//     });

//   } catch (error) {
//     console.error(`Error fetching or processing data for userId ${userId}:`, error);
//   } finally {
//     await client.close();
//     console.log('Database connection closed.');
//   }
// }
async function fetchDataAndProcess(session) {
  if (!session || !session.userId) {
    console.error('Invalid session or missing userId:', session);
    throw new Error('User ID not found in session.');
  }

  const userId = session.userId;
  console.log('Processing data for userId:', userId);

  const { client, collection } = await connectToDatabase();

  if (!collection) {
    console.log('No collection found');
    await client.close();
    return;
  }

  try {
    const data = await collection.find({ userId }).toArray();
    console.log(`Fetched data for userId ${userId}:`, data);

    console.log("🚀 Starting AI CV tailoring process...");
    const tailoringResult = await triggerProcessCVDynamically(session, sessionToken);

    if (tailoringResult && tailoringResult.tailoredCVData) {
      console.log("✅ AI tailoring successful - using tailored data for CV generation");
      
      const tailoredData = tailoringResult.tailoredCVData;
      
      const transformedCVs = [{
        name: tailoredData.name,
        jobTitle: tailoredData.jobTitle,
        dateOfBirth: tailoredData.dateOfBirth,
        address: tailoredData.address,
        phone_number: tailoredData.phone_number,
        linkedin: tailoredData.linkedin ? [cleanURL(tailoredData.linkedin)] : [],
        email: tailoredData.email,
        profileImage: cleanURL(tailoredData.profileImage || 'https://via.placeholder.com/100'),
        
        skillsData: (tailoredData.skills || []).map(skill => ({ name: skill, barClass: '' })),
        educationData: (tailoredData.education || []).map(edu => ({
          degree: edu.degree,
          institution: edu.school || edu.institution,
          period: edu.duration || edu.period,
          description: edu.description
        })),
        experienceData: (tailoredData.workExperience || []).map(exp => ({
          title: exp.title,
          company: exp.company,
          period: exp.duration,
          description: exp.description
        })),
        summaryData: [tailoredData.summary],
        languagesData: tailoredData.languages || [],
        certificationsData: tailoredData.certifications || [],
        membershipsData: tailoredData.professionalBodies || [],
        projectsData: (tailoredData.projects || []).map(project => ({
          title: project.title,
          period: project.period || 'No specific period',
          details: project.details || [project.description]
        }))
      }];
      
      console.log('🎯 USING AI-TAILORED CV DATA:', {
        jobTitle: tailoredData.jobTitle,
        summaryLength: tailoredData.summary?.length,
        skillsCount: tailoredData.skills?.length,
        experienceCount: tailoredData.workExperience?.length
      });

      transformedCVs.forEach(cv => {
        generateHTML(cv);
      });
      
    } else {
      console.log("⚠️ AI tailoring failed, falling back to original data");
      
  
if (tailoringResult.success && tailoredData) {
  console.log("✅ Using AI-tailored CV data");
  
  transformedCVs = [{
    name: tailoredData.name,
    jobTitle: tailoredData.jobTitle, // ← This is the AI-tailored job title
    dateOfBirth: tailoredData.dateOfBirth,
    address: tailoredData.address,
    phone_number: tailoredData.phone_number,
    linkedin: tailoredData.linkedin ? [cleanURL(tailoredData.linkedin)] : [],
    email: tailoredData.email,
    profileImage: cleanURL(tailoredData.profileImage || 'https://via.placeholder.com/100'),
    
    // Use AI-tailored sections
    skillsData: (tailoredData.skills || []).map(skill => ({ 
      name: skill, 
      barClass: '' 
    })),
    
    educationData: (tailoredData.education || []).map(edu => ({
      degree: edu.degree,
      institution: edu.school || edu.institution,
      period: edu.duration || edu.period,
      description: edu.description
    })),
    
    experienceData: (tailoredData.workExperience || []).map(exp => ({
      title: exp.title,
      company: exp.company,
      period: exp.duration,
      description: exp.description // ← This contains AI-enhanced bullet points
    })),
    
    summaryData: [tailoredData.summary], // ← AI-tailored professional summary
    languagesData: tailoredData.languages || [],
    certificationsData: tailoredData.certifications || [],
    membershipsData: tailoredData.professionalBodies || [],
    
    projectsData: (tailoredData.projects || []).map(project => ({
      title: project.title,
      period: project.period || 'No specific period',
      details: project.details || [project.description]
    }))
  }];
  
  console.log('🎯 USING AI-TAILORED CV DATA:', {
    jobTitle: tailoredData.jobTitle,
    summaryLength: tailoredData.summary?.length,
    skillsCount: tailoredData.skills?.length,
    experienceCount: tailoredData.workExperience?.length,
    keywordCoverage: tailoringResult.metadata?.tailoringMethod
  });
  
} else {
  console.log("⚠️ AI tailoring failed, falling back to original data");
  
  // Fallback to original database data
  transformedCVs = data.map(doc => {
    const name = doc.name;
    const jobTitle = doc.jobTitle;
    const dateOfBirth = doc.dateOfBirth;
    const address = doc.address;
    const phone_number = doc.phone_number;
    const linkedin = doc.linkedin ? [cleanURL(doc.linkedin)] : [];
    const email = doc.email;
    const profileImage = cleanURL(doc.profileImage || 'https://via.placeholder.com/100');
    
    const skillsData = doc.skills.map(skill => ({ 
      name: skill, 
      barClass: '' 
    }));
    
    const educationData = doc.education.map(edu => ({
      degree: edu.degree,
      institution: edu.school,
      period: edu.duration,
      description: edu.description
    }));
    
    const experienceData = doc.workExperience.map(exp => ({
      title: exp.title,
      company: exp.company,
      period: exp.duration,
      description: exp.description
    }));
    
    const summaryData = [doc.summary];
    
    const languagesData = doc.languages.map(lang => ({
      name: lang.name,
      proficiency: lang.proficiency
    }));
    
    const certificationsData = doc.certifications.map(cert => ({
      name: cert.name,
      institution: cert.institution,
      year: cert.year
    }));
    
    const membershipsData = doc.professionalBodies.map(body => ({
      name: body.name,
      role: body.role,
      year: body.year
    }));
    
    const projectsData = doc.projects.map(project => ({
      title: project.title,
      period: project.period || 'No specific period',
      details: project.details || [project.description]
    }));
    
    return {
      name,
      jobTitle,
      dateOfBirth,
      address,
      phone_number,
      linkedin,
      email,
      profileImage,
      skillsData,
      educationData,
      experienceData,
      summaryData,
      languagesData,
      certificationsData,
      membershipsData,
      projectsData
    };
  });
}

console.log('Transformed CVs:', transformedCVs);

// Generate HTML with the transformed CVs (either AI-tailored or fallback)
transformedCVs.forEach(cv => {
  generateHTML(cv);
});

return userId;
      }
    } finally {
      await client.close();
    }
  }

fetchDataAndProcess(session, sessionToken);

              async function generateHTML(cv) {
                const profileImageHTML = `<img src="${cv.profileImage}" alt="${cv.name}" class="profile-image">`;

                const summaryHTML = cv.summaryData.length > 0 ? `
      <div class="summary section">
          <h2>SUMMARY</h2>
          ${cv.summaryData.map(summary => `<p>${summary}</p>`).join('')}
      </div>` : '';

                const experienceHTML = cv.experienceData.length > 0 ? `
      <div class="experience section">
          <h2>EXPERIENCE</h2>
          ${cv.experienceData.map(exp => `
              <div class="section">
                  <h3>${exp.title}</h3>
                  <p>${exp.company}</p>
                  <p>${exp.period}</p>
                  <p>${exp.description}</p>
              </div>`).join('')}
      </div>` : '';

                const projectsHTML = cv.projectsData.length > 0 ? `
      <div class="projects section">
          <h2>PROJECTS</h2>
          ${cv.projectsData.map(project => `
              <div class="section">
                  <h3>${project.title}</h3>
                  <p>${project.period}</p>
                  <ul>
                      ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                  </ul>
              </div>`).join('')}
      </div>` : '';

                const educationHTML = cv.educationData.length > 0 ? `
      <div class="education section">
          <h2>EDUCATION</h2>
          ${cv.educationData.map(edu => `
              <div class="section">
                  <h3>${edu.degree}</h3>
                  <p>${edu.institution}</p>
                  <p>${edu.period}</p>
                  <p>${edu.description}</p>
              </div>`).join('')}
      </div>` : '';

                const contactHTML = `
      <div class="contact">
          <p>${cv.email}</p>
          <p>${cv.phone_number}</p>
          ${cv.linkedin.map(link => `<p><a href="${link}">${link}</a></p>`).join('')}
      </div>
  `;

                const skillsHTML = cv.skillsData.length > 0 ? `
      <div class="skills section">
          <h2>SKILLS</h2>
          <ul>
              ${cv.skillsData.map(skill => `<li>${skill.name}</li>`).join('')}
          </ul>
      </div>` : '';

                const languagesHTML = cv.languagesData.length > 0 ? `
      <div class="languages section">
          <h2>LANGUAGES</h2>
          <ul>
              ${cv.languagesData.map(lang => `<li>${lang.name} - ${lang.proficiency}</li>`).join('')}
          </ul>
      </div>` : '';

                const certificationsHTML = cv.certificationsData.length > 0 ? `
      <div class="certifications section">
          <h2>CERTIFICATIONS</h2>
          ${cv.certificationsData.map(cert => `
              <div class="certification">
                  <p>${cert.name}</p>
                  <p>${cert.institution} (${cert.year})</p>
              </div>`).join('')}
      </div>` : '';

                const membershipsHTML = cv.membershipsData.length > 0 ? `
      <div class="memberships section">
          <h2>PROFESSIONAL MEMBERSHIPS</h2>
          ${cv.membershipsData.map(member => `
              <div class="membership">
                  <p>${member.name}</p>
                  <p>${member.role} (${member.year})</p>
              </div>`).join('')}
      </div>` : '';

                const genderHTML = cv.gender ? `<p><strong>Gender:</strong> ${cv.gender}</p>` : '';
                const dobHTML = cv.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${cv.dateOfBirth}</p>` : '';
                const addressHTML = cv.address ? `<p><strong>Address:</strong> ${cv.address}</p>` : '';

                        const premium_CV = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${cv.name} Resume</title>
                    
                    <style>
                    .profile-image {
                            width: 150px;
                            height: 150px;
                            border-radius: 50%;
                          }
                      
                              body {
                                  font-family: Arial, sans-serif;
                                  margin: 0;
                                  padding: 0;
                                  background-color: #f4f4f4;
                              }
                              .container {
                                  display: flex;
                                  max-width: 900px;
                                  margin: 20px auto;
                                  background-color: #fff;
                                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                              }
                              .sidebar {
                                  background-color: #0d4a75;
                                  color: white;
                                  padding: 20px;
                                  width: 30%;
                                  text-align: center;
                              }
                            
                              .sidebar img {
                                  border-radius: 50%;
                                  width: 100px;
                                  height: 100px;
                              }
                              .sidebar h1 {
                                  font-size: 24px;
                                  margin: 10px 0;
                              }
                              .sidebar p {
                                  margin: 5px 0;
                              }
                              .sidebar .contact, .sidebar .skills, .sidebar .languages, .sidebar .certifications {
                                margin-top: 20px;
                                text-align: left;
                              }
                              .sidebar .contact a, .sidebar .languages p {
                                  color: white;
                                  text-decoration: none;
                              }
                              .sidebar .skills ul, .sidebar .languages ul {
                                  list-style: none;
                                  padding: 0;
                              }
                              .sidebar .skills li, .sidebar .languages li {
                                  margin: 10px 0;
                              }
                              .bar {
                                  background-color: #fff;
                                  border-radius: 10px;
                                  height: 10px;
                                  position: relative;
                                  margin-top: 5px;
                              }
                              .bar-certification {
                                background: linear-gradient(90deg, #ffeb3b 0%, #0d4a75 100%);
                                border-radius: 10px;
                                height: 10px; /* Increased height */
                                margin: 10px 0;
                              }
                              .bar::after {
                                  content: '';
                                  background-color: #0073b1;
                                  height: 100%;
                                  border-radius: 10px;
                                  position: absolute;
                                  top: 0;
                              }
                              .bar1::after { width: 90%; }
                              .bar2::after { width: 80%; }
                              .bar3::after { width: 85%; }
                              .bar4::after { width: 70%; }
                              .bar5::after { width: 75%; }
                              .bar6::after { width: 65%; }
                              .bar7::after { width: 60%; }
                              .bar8::after { width: 70%; }
                              .bar9::after { width: 50%; }
                              .bar10::after { width: 55%; }
                              .main {
                                  padding: 20px;
                                  width: 70%;
                              }
                              .main h2 {
                                  border-bottom: 2px solid #0d4a75;
                                  padding-bottom: 5px;
                              }
                              .main h3 {
                                  color: #0d4a75;
                              }
                              .main .section {
                                  margin-top: 20px;
                              }
                      
                              .sidebar .memberships {
                                text-align: left;
                              }
                              .sidebar .memberships {
                                margin-top: 20px;
                                text-align: left;
                              }
                              
                              .personal-details {
                                  margin-top: 20px; /* Adds space between job title and personal details */
                              }
                              .personal-details p {
                                  text-align: left;
                              }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="sidebar">
                            ${profileImageHTML}
                            <h1>${cv.name}</h1>
                            <p>${cv.jobTitle}</p>
                            ${genderHTML}
                            ${dobHTML}
                            ${addressHTML}
                            ${contactHTML}
                            ${skillsHTML}
                            ${languagesHTML}
                            ${certificationsHTML}
                            ${membershipsHTML}
                        </div>
                        <div class="main">
                            ${summaryHTML}
                            ${experienceHTML}
                            ${projectsHTML}
                            ${educationHTML}
                        </div>
                    </div>
                </body>
                </html>
            `;
                  
                // console.log(premium_CV);
                async function fetchSubscriptionDetails(sessionToken) {
                    const client = new MongoClient(process.env.MONGO_URI, {
                      useNewUrlParser: true,
                      useUnifiedTopology: true,
                    });
                  
                    const database = client.db('olukayode_sage');
                    const sessionsCollection = database.collection('sessions');
                    const usersCollection = database.collection('Users_CV_biodata');

                  try {
                    // Ensure connection is established before any database operations
                    await client.connect();
                    console.log('Fetching session data for token:', sessionToken);
                    const sessionData = await sessionsCollection.findOne({ sessionToken });
                
                    if (!sessionData || !sessionData.userId) {
                      console.error('Invalid session token or user not authenticated:', sessionData);
                      throw new Error('Invalid session token or user not authenticated.');
                    }
                
                    const userId = sessionData.userId;
                    console.log('User ID found:', userId);
                
                    console.log('Fetching user subscription details...');
                    const user = await usersCollection.findOne({ _id: userId });
                
                    if (!user || !user.subscription) {
                      console.error('Subscription details not found for user:', user);
                      throw new Error('Subscription details not found for the user.');
                    }
                
                    const { plan } = user.subscription;
                    console.log('Subscription plan:', plan);
                
                    return plan;
                  } catch (error) {
                    console.error('Error fetching subscription details:', error);
                    throw error;
                  } finally {
                    // Conditionally close the connection
                 
                      console.log('Closing database connection...');
                      await client.close();
                    
                  }
                }

                // Function to determine CV format based on subscription
                const determineCVFormat = (subscription) => {
                  let cvTemplate;
                  if (subscription === 'Premium') {
                 
                    cvTemplate = premium_CV;
                    console.log('Subscription type:', subscription); // Debug log
                  } else if (subscription === 'Standard') {
                   
                    cvTemplate = standard_CV;
                    console.log('Subscription type:', subscription); // Debug log
                  } else if (subscription === 'Basic') {
                    cvTemplate = basic_CV;
                    console.log('Subscription type:', subscription); // Debug log
                  } else {
                    throw new Error('Invalid subscription type');
                  }

                  return cvTemplate;
                };

                // Usage example
                const userSubscription = await fetchSubscriptionDetails(sessionToken); // Fetch subscription dynamically
                const updatedGatePassHTML = determineCVFormat(userSubscription); // Pass userSubscription to determineCVFormat

         
/////////////////////////////////////////////////////existing working
                // const generateSecurityGatePass = async (content, filename) => {
                //   const options = { format: 'A4', 
                //   printBackground: true, 
                //   puppeteer: {
                //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
                //     timeout: 60000, // Increase timeout to 60 seconds
                //     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Adjust path for your system
                //       }
                //     };
                //   try {
                //     let pdfBuffer = await html_to_pdf.generatePdf({ content }, options);

                //     // Convert HTML content to PDF2
                //     // const pdfBuffer = await html_to_pdf.generatePdf({ content }, options);
                //     if (!fs.existsSync(gatePassDownloadsFolderPath)) {
                //       fs.mkdirSync(gatePassDownloadsFolderPath, { recursive: true });
                //     }

                //       // Add retry logic for PDF generation
                //       let retries = 5;
              
                //       while (retries > 0) {
                //         try {
                //           pdfBuffer = await html_to_pdf.generatePdf({ content }, options);
                //           break;
                //         } catch (err) {
                //           retries--;
                //           if (retries === 0) throw err;
                //           console.log(`PDF generation failed, retrying... (${retries} attempts left)`);
                //           await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
                //         }
                //       }

                //     fs.writeFileSync(filename, pdfBuffer);
                //     console.log(`PDF saved successfully to: ${filename}`);
                //     return filename;
                //   } catch (error) {
                //     console.error('Error generating PDF111111111111111111111111:', error);
                //     throw error;
                //   }
                // };
                      //////////////////////////////////////////////////////////////////////////////////////////
                      const generateSecurityGatePass = async (content, filename) => {
                        // Enhanced configuration options
                        const options = {
                          format: 'A4',
                          printBackground: true,
                          puppeteer: {
                            args: [
                              '--no-sandbox',
                              '--disable-setuid-sandbox',
                              '--disable-dev-shm-usage',
                              '--disable-gpu',
                              '--disable-web-security'
                            ],
                            timeout: 120000, // Increased timeout to 120 seconds
                            headless: 'new', // Use new headless mode
                            // Only set executablePath if Chrome is not in the default location
                            ...(process.platform === 'win32' && {
                              executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                            })
                          }
                        };

                        // Helper function for delay
                        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

                        // Exponential backoff retry logic
                        const retryWithExponentialBackoff = async (operation, maxRetries = 5, initialDelay = 2000) => {
                          let retries = 0;
                          while (true) {
                            try {
                              return await operation();
                            } catch (error) {
                              retries++;
                              if (retries > maxRetries) {
                                throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
                              }
                              console.log(`Attempt ${retries} failed. Retrying in ${initialDelay * Math.pow(2, retries - 1)}ms...`);
                              await delay(initialDelay * Math.pow(2, retries - 1));
                            }
                          }
                        };

                        try {
                          // Ensure downloads directory exists
                          const directory = path.dirname(filename);
                          if (!fs.existsSync(directory)) {
                            fs.mkdirSync(directory, { recursive: true });
                          }

                          // Generate PDF with retry logic
                          const pdfBuffer = await retryWithExponentialBackoff(async () => {
                            const result = await html_to_pdf.generatePdf({ content }, options);
                            if (!result || result.length === 0) {
                              throw new Error('Generated PDF is empty');
                            }
                            return result;
                          });

                          // Write file with error checking
                          await fs.promises.writeFile(filename, pdfBuffer);
                          console.log(`PDF successfully generated and saved to: ${filename}`);
                          return filename;

                        } catch (error) {
                          const errorMessage = `PDF generation failed: ${error.message}`;
                          console.error(errorMessage, error);
                          throw new Error(errorMessage);
                        }
                      };

                // Generate PDF and send it via WhatsApp and Email
                generateSecurityGatePass(updatedGatePassHTML, gatePassPdfPath)
                  .then(pdfPath => {
                    const pdfData = fs.readFileSync(pdfPath, { encoding: 'base64' });
                    sendMessageToGroup(groupId, pdfData, gatePassUniqueFilename);
                    // Send the PDF via email if recipient's email is defined
                    if (recipientEmail) {
                      sendEmailWithAttachment(pdfPath, recipientEmail);
                    }
                  })
                  .catch(error => {
                    console.error('Error generating PDF2222222222222222222222222222222222:', error);
                  });
                // Function to send PDF via WhatsApp


                      
            const generateEmailCoverLetters = async (userId) => {
              const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
              try {
                await client.connect();
                console.log('Connected to database');
            
                const database = client.db("olukayode_sage");
            
                // Fetch userId dynamically
                const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
                console.log("User ID:", userId, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            
                // Fetch the most recently published job role
                const jobResults = await database.collection("application_processing_feeder")
                  .find({ userId, published: true }) // Find all matching jobs
                  .sort({ publishedAt: -1 }) // Sort in descending order (most recent first)
                  .limit(1) // Get only the most recent job
                  .toArray(); // Convert to array
          
                                  // Check if a job was found
                      if (!jobResults.length) {
                        console.log(`User ${userId}: No job found in database. Exiting.`);
                        return ['Error: No job found'];
                      }

                      const accessedJobTitle = jobResults[0]; // Extract first job
                      console.log("The most recent Job:", accessedJobTitle);

                      // Extract job details
                      const role = accessedJobTitle?.title ?? '[Role Title]';
                      const company = accessedJobTitle?.company ?? 'your reputable company';
                      const applicationEmail = accessedJobTitle?.applicationEmail || null;
                      
             
              
                if (!applicationEmail || applicationEmail === "Not provided") {
                  console.log(`User ${userId}: No email found for ${role}. Adding to processing queue...`);
                
                  // // Insert job into queue & trigger next steps
                  // await queueJobAndProcess(accessedJobTitle, userId);
                
                  return ['Error: No email found, job added to processing queue'];
                }
                

                          // Fetch user's full name
                          const userFullName = await getFullName();

                          // Generate dynamic email cover letters
                          return [
                            `Dear Hiring Manager,\n\nI hope this message finds you well. I'm excited to express my interest in the ${role} position at ${company}. Please find my resume attached for your consideration.\n\nBest regards,\n${userFullName}`,

                            `Dear Hiring Manager,\n\nI am writing to apply for the ${role} position. Attached is my resume for your review. I would welcome the opportunity to discuss further.\n\nKind regards,\n${userFullName}`,

                            `Dear Hiring Manager,\n\nI hope this message reaches you in good spirits. I am very interested in the ${role} position at ${company}. Please find my resume attached for your review.\n\nWarm regards,\n${userFullName}`,

                            `Dear Hiring Manager,\n\nPlease find my resume attached in response to the ${role} opening. I look forward to discussing this opportunity further.\n\nSincerely,\n${userFullName}`,

                            `Dear Hiring Manager,\n\nI am excited to submit my application for the ${role} position at ${company}. My resume is attached for your review. Thank you for considering my application.\n\nBest regards,\n${userFullName}`
                          ];
                        } catch (error) {
                          console.error("Error generating email cover letters:", error);
                          return ['Error generating email cover letters'];
                        }
                      };

                const sendEmailWithAttachment = async (pdfPath, email,sessionToken) => {
                        // Fetch user ID from session or session token
                  const userId = session?.userId || (await fetchUserIdBySessionToken(sessionToken));
                  console.log(userId,"444444444444444444444444444444444444444444444444444444444444444444")
                  if (!userId) {
                    console.error("User ID is missing. Cannot proceed.");
                    return;
                  }
                  console.log(`Retrieved User ID: ${userId}`);
                  try {
                    await client.connect();
                    const accessedJob = await getAccessedJobTitle(); // Fetch job details from the database

                    if (!accessedJob || !accessedJob.role) {
                      console.error('No valid role title found, aborting email sending.');
                      return;
                    }

                    // Unpack accessedJob details
                    const {
                      _id: roleId,
                      role: roleTitle,
                      applicationEmail,
                      url,
                      salaryRange,
                      jobLocation,
                      qualification,
                      experience,
                      jobField,
                      jobDescription,
                      keyResponsibilities,
                      skills,
                      requirements,
                      postedDate,
                      deadline,
                    } = accessedJob;

                    // Check if role is already processed
                    const database = client.db('olukayode_sage');
                    const applicationProcessingFeeder = database.collection('application_processing_feeder');
                    const existingRole = await applicationProcessingFeeder.findOne({ _id: roleId });
                  
                    if (existingRole && existingRole.role_processed) {
                      console.log('Role has already been processed, skipping email sending.');
                      return;
                    }

                    // Generate cover letters and select a random one
                    const emailCoverLetterVariants = await generateEmailCoverLetters(accessedJob);
                    if (!emailCoverLetterVariants || emailCoverLetterVariants.length === 0) {
                      console.error('No email cover letters available, aborting.');
                      return;
                    }

                    const randomIndex = Math.floor(Math.random() * emailCoverLetterVariants.length);
                    const selectedMessage = emailCoverLetterVariants[randomIndex];
                  console.log("Cover letter generteddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
                    // Send the email
                    const info = await transporter.sendMail({
                     from: `"${firstName}" <${process.env.EMAIL_USER}>`,
          
                      to: email,
                       //to: applicationEmail, // Ensuring the correct application email is used    
                      subject: `Application for the Role of ${roleTitle}`,
                      text: selectedMessage,
                      attachments: [
                        {
                          filename: path.basename(pdfPath),
                          path: pdfPath,
                        },
                      ],
                    });

                    console.log('Email sent successfully with attachment:', info.messageId);

                    // Mark role as processed in the database
                    await applicationProcessingFeeder.updateOne(
                      { _id: roleId },
                      {
                        $set: {
                          role_processed: true,
                          status: 'Treated',
                          application: 'Approved',
                          published: true,
                          publishedAt: new Date(),
                          processedAt: new Date(),
                        },
                      }
                    );

                    console.log("Role marked as treated and published");

                  } catch (error) {
                    console.error('Error sending email with attachment:', error);
                    throw error;
                  } finally {
                    if (client) {
                      await client.close();
                    }
                  }
                }
              }

            }
            
            else if (
              userText.includes("not interested") ||
              userText.includes("not apply") ||
              userText.includes("no please") ||
              userText.includes("no")
            ) {

              const randomResponseIndex = Math.floor(Math.random() * 8); // Generate a random number between 0 and 6
              switch (randomResponseIndex) {
                case 0:
                  botReply = "Thank you for letting us know. Should you change your mind, feel free to reach out again.";
                  break;
                case 1:
                  botReply = "Noted. Should you reconsider, we'll be here to assist you further.";
                  break;
                case 2:
                  botReply = "Understood. Feel free to reconnect if you decide to explore our services later.";
                  break;
                case 3:
                  botReply = "Got it. Should you have a change of heart, don't hesitate to get in touch with us again.";
                  break;
                case 4:
                  botReply = "Acknowledged. If your circumstances change, we're here to help.";
                  break;
                case 5:
                  botReply = "Thank you for informing us. Remember, our doors are always open if you reconsider.";
                  break;
                case 6:
                  botReply = "I understand. Our assistance remains available if you have a change of plans.";
                  break;
                case 7:
                  botReply = "Received. Feel free to reach out if you have any questions in the future.";
                  break;
                default:
                  botReply = "Thank you for letting us know. Should you change your mind, feel free to reach out again.";
              }

              // Mark role as processed and published in the database after the email is sent
              try {
                await applicationProcessingFeeder.updateOne(
                  { _id: roleId }, // Query for the specific role by `_id`
                  {
                    $set: {
                      role_processed: true,
                      status: 'Treated',
                      application: 'Declined',
                      published: true, // Mark the role as published
                      publishedAt: new Date(), // Set the publication timestamp
                      processedAt: new Date(),
                    },
                  }
                );
                console.log("Role marked as treated and published..............................................................ccccccccccccccccccccccccccccc");
              } catch (error) {
                console.error('Error marking role as treated and published:', error);
              } finally {
                await client.close(); // Ensure the client is closed after operations
              }
            } else {
              botReply = "I'm sorry, I couldn't understand your response. Could you please confirm if you'd like to proceed with the application? Alternatively, if you prefer to speak with us directly, feel free to reach out through any of the following channels:\n\n" +
                "Email: info@suntrenia.com\n" +
                "Phone: 07034995589\n" +
                "WhatsApp: 08027946808\n\n" +
                "We're here to assist you and ensure a smooth experience. Please don't hesitate to get in touch.";
            }

            // Send bot's reply to the user with the same thread ID
            await sendMessageToSubscriber(subscriber, botReply, threadId);
          }

        } else {
          console.error('Received message with non-object:', message);
        }
      });

      // Wait for a while before polling for messages again
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Start the Long-Polling process
pollForMessages();
//////////////////////////////////////////////////////////////////////////
//////////////////////took it up

// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true in production with HTTPS
// }));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: uri, // Use your existing MongoDB URI
      dbName: 'olukayode_sage',
      ttl: 15 * 60 // 15 minutes
  }),
  cookie: { 
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 15 * 60 * 1000 // 15 minutes
  }
}));



// app.post('/upload', upload.single('profileImage'), async (req, res) => {
//   try {
//     if (!req.session.userId) {
//       return res.status(401).json({ success: false, message: 'User not logged in' });
//     }

//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('Users_CV_biodata');

//     const userId = req.session.userId;

//     const profileImageCode = `${crypto.randomBytes(12).toString('hex')}_${req.file.location}`;

//     const result = await kaydata.updateOne(
//       { _id: userId },
//       { $set: { profileImage: profileImageCode, 'Profile Image': profileImageCode } }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     res.json({
//       success: true,
//       message: 'Profile image uploaded successfully',
//       imageUrl: req.file.location,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   } finally {
//     await client.close();
//   }
// });

////////////////////////////////working
// // Route to upload profile image and store session ID
// app.post('/upload', upload.single('profileImage'), async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('Users_CV_biodata');

//     const customId = crypto.randomBytes(12).toString('hex'); // Generate unique ID
//     const profileImageCode = customId + "_" + req.file.location;

//     const result = await kaydata.insertOne({
//       _id: customId,
//       profileImage: profileImageCode,
//       'Profile Image': profileImageCode,
//       sessionId: req.session.id // Save session ID in the document
//     });

//     console.log('Inserted document customId:', customId);
//     console.log('Inserted document ID:', result.insertedId);

//     // Store customId in session
//     req.session.customId = customId;

//     res.json({
//       success: true,
//       imageUrl: req.file.location,
//       customId: customId
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false });
//   } finally {
//     await client.close();
//   }
// });
// /////////////////////////////////////////////////////////////////////////////
// // Route to upload profile image and store session ID
// app.post('/upload', upload.single('profileImage'), async (req, res) => {
//   console.log('Session:', req.session);
//   try {
//         if (!req.session.userId) {
//       return res.status(401).json({ success: false, message: 'User not logged in' });
//     }

//     await client.connect();
//     const database = client.db('olukayode_sage');
//     // const kaydata = database.collection('users');
//     const collection = database.collection('Users_CV_biodata');

//     const userId = req.session.userId;
//     const customId = crypto.randomBytes(12).toString('hex'); // Generate unique ID
//     const profileImageCode = customId + "_" + req.file.location;

//     // const result = await kaydata.insertOne({

//     //   _id: userId,
//     //   profileImage: profileImageCode,
//     //   'Profile Image': profileImageCode,
//     //   sessionId: req.session.id // Save session ID in the document
//     // });

//     const result = await kaydata.updateOne(
//       { _id: userId }, // Match based on userId
//       {
//         $set: {
//           profileImage: profileImageCode,
//           'Profile Image': profileImageCode,
//           sessionId: req.session.id // Save session ID in the document
//         }
//       },
//       { upsert: true } // Insert if not exists, update if exists
//     );

//     console.log('Inserted document customId:', customId);
//     console.log('Inserted document ID:', result.insertedId);

//     // Store customId in session
//     req.session.customId = customId;

//     res.json({
//       success: true,
//       imageUrl: req.file.location,
//       customId: customId
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false });
//   } finally {
//     await client.close();
//   }
// });





/////////////////////////////////////////////////////////


// Route to upload profile image and store session ID
app.post('/upload', upload.single('profileImage'), async (req, res) => {
  console.log('Session:', req.session);

  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    // Establish database connection
    await client.connect();
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata');

    // Extract userId from session
    const userId = req.session.userId;

    // Generate unique ID for the profile image
    const customId = crypto.randomBytes(12).toString('hex'); 
    const profileImageCode = customId + "_" + req.file.location;

    // Update or insert user data with profile image and session ID
    const result = await collection.updateOne(
      { _id: userId }, // Match document by userId
      {
        $set: {
          profileImage: profileImageCode, // Save profile image code
          // sessionId: req.session.id // Save session ID
          "Profile Image":profileImageCode,
        }
      },
      { upsert: true } // Insert if not found, otherwise update
    );

    console.log('Profile image updated for user:', userId);
    console.log('Database operation result:', result);

    // Store the custom ID in the session
    req.session.customId = customId;

    // Respond with success
    res.json({
      success: true,
      imageUrl: req.file.location,
      customId: customId
    });
  } catch (error) {
    console.error('Error while uploading profile image:', error);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  } finally {
    // Ensure database connection is closed
    await client.close();
  }
});


// // Route to submit CV and update data based on session ID
// app.post('/submit-cv', async (req, res) => {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   try {
//     if (!req.session.userId) {
//       return res.status(401).json({ success: false, message: 'User not logged in' });
//     }

    
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const collection = database.collection('users');


//     const userId = req.session.userId;
//     const userData = req.body;
//     const { name, jobTitle, dateOfBirth, address, email, phone_number, skills, workExperience, education, subscription, summary, projects, certifications, professionalBodies, languages } = userData;

//     const customId = req.session.customId; // Retrieve customId from session

//     if (!customId ) {
//       return res.status(400).send('Custom ID is required');
//     }

//     const userDocument = {
//       name,
//       jobTitle,
//       dateOfBirth,
//       address,
//       email,
//       phone_number,
//       skills,
//       workExperience,
//       education,
//       subscription,
//       summary,
//       projects,
//       certifications,
//       professionalBodies,
//       languages
//     };



//     const result = await collection.updateOne(
//       { _id: userId }, // Match based on userId
//       { $set: userDocument }, // Update fields with userDocument values
//       { upsert: true } // Insert a new document if no match is found
//     );
  
//     if (result.matchedCount > 0 || result.upsertedCount > 0) {
//       res.status(200).send('CV updated successfully');
//     } else if (result.upsertedCount > 0) {
//       res.status(200).send('CV submitted successfully');
//     } else {
//       res.status(400).send('Failed to update or insert CV');
//     }

//   } catch (error) {
//     console.error('Error connecting to database:', error);
//     res.status(500).send('Error submitting CV');
//   } finally {
//     await client.close();
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////
app.post('/submit-cv', async (req, res) => {
  console.log(req.body);  // Log the incoming data to ensure it's correct
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    // Check for user session
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    // Validate and retrieve necessary data
    const userId = req.session.userId;
    const userData = req.body;
    const { 
      name, jobTitle, dateOfBirth, address, email, phone_number, skills, 
      workExperience, education, subscription, summary, projects, 
      certifications, professionalBodies, languages 
    } = userData;


    // Connect to MongoDB
    await client.connect();
    const database = client.db('olukayode_sage');
    // const collection = database.collection('users');
    const collection = database.collection('Users_CV_biodata');
    // Construct user document for update
    const userDocument = {
      name,
      jobTitle,
      dateOfBirth,
      address,
      email,
      phone_number,
      skills,
      workExperience,
      education,
      subscription,
      summary,
      projects,
      certifications,
      professionalBodies,
      languages,
    };

    // Perform update or upsert operation
    const result = await collection.updateOne(
      { _id: userId }, // Match based on userId
      { $set: userDocument }, // Update fields
      { upsert: true } // Insert if no match is found
    );

    // Handle response
    if (result.matchedCount > 0) {
      res.status(200).json({ success: true, message: 'CV updated successfully' });
    } else if (result.upsertedCount > 0) {
      res.status(201).json({ success: true, message: 'CV submitted successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Failed to update or insert CV' });
    }
  } catch (error) {
    console.error('Error submitting CV:', error);
    res.status(500).json({ success: false, message: 'Error submitting CV' });
  } finally {
    // Ensure the database connection is closed
    await client.close();
  }
});

app.post('/authorize', express.urlencoded({ extended: true }), (req, res) => {
  const { decision } = req.body;

  if (decision === 'yes') {
    console.log('✅ User granted email access.');
    // You can trigger your WebSocket message or next flow here
    res.send(`
      <html>
        <body style="text-align:center;font-family:sans-serif;padding-top:50px;">
          <h2 style="color:green;">Access Granted</h2>
          <p>You can now close this page. Your email is authorized successfully.</p>
          <script>
            setTimeout(() => window.close(), 3000);
          </script>
        </body>
      </html>
    `);
  } else {
    console.log('❌ User denied email access.');
    res.send(`
      <html>
        <body style="text-align:center;font-family:sans-serif;padding-top:50px;">
          <h2 style="color:red;">Access Denied</h2>
          <p>Your email authorization was declined.</p>
          <script>
            setTimeout(() => window.close(), 3000);
          </script>
        </body>
      </html>
    `);
  }
});

app.get("/authorize", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head><title>Email Authorization</title></head>
  <body style="font-family: Poppins; text-align:center; margin-top:50px;">
    <h2>Grant Email Access</h2>
    <p>To continue, please authorize us to send applications using your email.</p>
    <button onclick="window.location.href='/auth/google'">Authorize with Google</button>
    <button onclick="window.location.href='/auth/outlook'">Authorize with Outlook</button>
  </body>
  </html>
  `;
  res.send(html);
});

//////////////////////////////////////////////////////////////////
app.get('/fetch-cv-data', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Check for user session
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    const userId = req.session.userId;

    // Connect to MongoDB
    await client.connect();
    const database = client.db('olukayode_sage');
    // const collection = database.collection('users');
    const collection = database.collection('Users_CV_biodata');
    // Fetch the CV data for the logged-in user
    const userCvData = await collection.findOne({ _id: userId });

    if (!userCvData) {
      return res.status(404).json({ success: false, message: 'No CV data found for this user' });
    }

    // Return the user's CV data
    res.status(200).json({ success: true, data: userCvData });
  } catch (error) {
    console.error('Error fetching CV data:', error);
    res.status(500).json({ success: false, message: 'Error fetching CV data' });
  } finally {
    // Ensure the database connection is closed
    await client.close();
  }
});


////////////////////////////////////////////////////////////////////////////////////
// app.post('/update-job-preferences', upload.none(), async (req, res) => {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Check for user session
//     if (!req.session.userId) {
//       return res.status(401).json({ success: false, message: 'User not logged in' });
//     }

//     const userId = req.session.userId;
//     const { jobPreferences } = req.body;

//     // Validate jobPreferences
//     if (!jobPreferences || Object.keys(jobPreferences).length === 0) {
//       return res.status(400).json({ success: false, message: 'Invalid job preferences data' });
//     }

//     // Parse job preferences (if sent as a string)
//     let parsedPreferences;
//     try {
//       parsedPreferences = JSON.parse(jobPreferences);
//     } catch (error) {
//       return res.status(400).json({ success: false, message: 'Job preferences must be a valid JSON object' });
//     }
   
//     // Connect to MongoDB
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     // const collection = database.collection('users');
//     const collection = database.collection(' Users_CV_biodata');
//     // Update or upsert job preferences
//     const result = await collection.updateOne(
//       { _id: userId }, // Match based on userId
//       { $set: { jobPreferences: parsedPreferences } }, // Update job preferences
//       { upsert: true } // Insert if no match is found
//     );

//     // Handle response
//     if (result.matchedCount > 0) {
//       res.status(200).json({ success: true, message: 'Job preferences updated successfully' });
//     } else if (result.upsertedCount > 0) {
//       res.status(201).json({ success: true, message: 'Job preferences created successfully' });
//     } else {
//       res.status(400).json({ success: false, message: 'Failed to update or create job preferences' });
//     }
//   } catch (error) {
//     console.error('Error updating job preferences:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   } finally {
//     // Ensure the database connection is closed
//     await client.close();
//   }
// });
///////////////////////////////////////////////////////////////////////
app.post('/update-job-preferences', upload.none(), async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Check for user session
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    const userId = req.session.userId;
    const { jobPreferences } = req.body;

    // Validate jobPreferences
    if (!jobPreferences) {
      return res.status(400).json({ success: false, message: 'Invalid job preferences data' });
    }

    // Parse job preferences (if sent as a string)
    let parsedPreferences;
    try {
      parsedPreferences = typeof jobPreferences === 'string' 
        ? JSON.parse(jobPreferences) 
        : jobPreferences;
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Job preferences must be a valid JSON object' });
    }
   
    // Connect to MongoDB
    await client.connect();
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata'); // Fixed: removed extra space
    
    // IMPORTANT: Update ONLY the existing user document - NO UPSERT
    // This prevents creating duplicate documents
    const result = await collection.updateOne(
      { _id: userId }, // Match based on userId (_id should match your session userId)
      { 
        $set: { 
          jobPreferences: parsedPreferences,
          updatedAt: new Date() // Track when job preferences were last updated
        } 
      }
      // REMOVED: upsert: true - This was causing duplicates
    );

    // Handle response
    if (result.matchedCount > 0) {
      res.status(200).json({ 
        success: true, 
        message: 'Job preferences updated successfully' 
      });
    } else {
      // User document doesn't exist - this shouldn't happen if user is logged in
      console.error(`No user found with _id: ${userId}`);
      res.status(404).json({ 
        success: false, 
        message: 'User profile not found. Please complete your profile first.' 
      });
    }
  } catch (error) {
    console.error('Error updating job preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message // Include error details for debugging
    });
  } finally {
    // Ensure the database connection is closed
    await client.close();
  }
});


app.post('/api/submit-subscription', async (req, res) => {
  const { plan, date } = req.body; // Plan and start date received from the frontend
  const userId = req.session.userId;  // Get user ID from session, ensuring it's authenticated

  if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
  }

  // Load plan config from DB (falls back to defaults if DB fails)
  const planConfig = await getPlanConfig();
  const planKey = plan.toLowerCase();
  if (!planConfig[planKey]) {
      return res.status(400).json({ message: "Invalid subscription plan" });
  }
  const durationInDays = planConfig[planKey].durationDays;

  // Calculate expiration date based on the duration
  const startDate = new Date(date); // Start date from the request
  const expirationDate = new Date(startDate);
  expirationDate.setDate(startDate.getDate() + durationInDays); // Add duration in days to the start date

  // Format dates to be more readable
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formattedStartDate = formatDate(startDate);
  const formattedExpirationDate = formatDate(expirationDate);

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
      await client.connect();
      const database = client.db('olukayode_sage');
      const collection = database.collection('Users_CV_biodata');
      
      // Fetch the user from the database using _id, assuming userId corresponds to _id
      const user = await collection.findOne({ _id: userId });  // Match _id with session's userId

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const userEmail = user.email;
      const userName = user.name.split(' ')[0]; // Extracting the first name from the full name

      const subscriptionData = {
        plan,
        date,
        durationInDays, // Add duration to the subscription data
        expirationDate: expirationDate.toISOString(), // Store expiration date in ISO format
    };

      // Add the subscription to the user's data
      const result = await collection.updateOne(
          { _id: userId },  // Ensure we're updating the document with the correct _id
          { 
              $set: { 
                  subscription: subscriptionData
              }
          }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      // Auto-unlock Interview Helper for Intellijob subscribers
      await collection.updateOne(
        { _id: userId },
        {
          $set: {
            'interviewHelper.access': true,
            'interviewHelper.source': 'intellijob_subscription',
            'interviewHelper.unlockedAt': new Date()
          }
        }
      );

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: 465,
        secure: true, // port 465 requires secure:true (Nigerian ISPs block 587)
        auth: {
          user: process.env.EMAIL_USER, // stored in .env
          pass: process.env.EMAIL_PASS, // stored in .env
        },
      });



      const mailOptions = {
        from: `"Suntrenia" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Subscription Confirmation - ${plan} Plan`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                        color: #374151; 
                        line-height: 1.6; 
                        margin: 0; 
                        padding: 0; 
                        background-color: #f9fafb;
                    }
                    .container { 
                        max-width: 580px; 
                        margin: 0 auto; 
                        background-color: #ffffff; 
                        border-radius: 12px; 
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white; 
                        padding: 25px 30px; 
                        text-align: center; 
                    }
                    .header h1 { 
                        margin: 0; 
                        font-size: 22px; 
                        font-weight: 600;
                        letter-spacing: -0.025em;
                    }
                    .content { 
                        padding: 25px 35px; 
                    }
                    .greeting {
                        font-size: 16px;
                        margin-bottom: 8px;
                        color: #111827;
                        font-weight: 500;
                    }
                    .plan-highlight {
                        background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
                        border-left: 4px solid #667eea;
                        padding: 16px 20px;
                        margin: 20px 0;
                        border-radius: 0 8px 8px 0;
                    }
                    .details-box {
                        background-color: #f8fafc;
                        border-radius: 8px;
                        padding: 20px 25px;
                        margin: 25px 0;
                        border: 1px solid #e5e7eb;
                    }
                    .detail-row {
                        display: flex;
                        margin-bottom: 12px;
                        padding-bottom: 12px;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .detail-row:last-child {
                        margin-bottom: 0;
                        padding-bottom: 0;
                        border-bottom: none;
                    }
                    .detail-label {
                        font-weight: 500;
                        width: 45%;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .detail-value {
                        width: 55%;
                        color: #111827;
                        font-weight: 500;
                        font-size: 14px;
                    }
                    .footer { 
                        text-align: center; 
                        padding: 25px 30px; 
                        background-color: #f8fafc;
                        color: #6b7280;
                        font-size: 12px;
                        border-top: 1px solid #e5e7eb;
                    }
                    .button {
                        display: inline-block;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 28px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 500;
                        font-size: 14px;
                        margin: 20px 0;
                        border: none;
                        cursor: pointer;
                    }
                    .highlight {
                        color: #667eea;
                        font-weight: 600;
                    }
                    p {
                        margin: 16px 0;
                        font-size: 14px;
                        color: #374151;
                        line-height: 1.6;
                    }
                    .welcome-text {
                        font-size: 14px;
                        color: #6b7280;
                        margin-bottom: 20px;
                    }
                    .support-text {
                        font-size: 14px;
                        color: #6b7280;
                        margin-top: 25px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to Suntrenia!</h1>
                    </div>
                    <div class="content">
                        <div class="greeting">Hello ${userName},</div>
                        <p class="welcome-text">Thank you for choosing Suntrenia! We're excited to confirm that your subscription has been successfully activated.</p>
                        
                        <div class="plan-highlight">
                            <strong style="font-size: 15px; color: #111827;">Subscription Plan:</strong> 
                            <span style="color: #667eea; font-weight: 600; font-size: 15px;">${plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
                        </div>
                        
                        <div class="details-box">
                            <div class="detail-row">
                                <div class="detail-label">Start Date:</div>
                                <div class="detail-value">${formattedStartDate}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Expiration Date:</div>
                                <div class="detail-value">${formattedExpirationDate}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Duration:</div>
                                <div class="detail-value">${durationInDays} days</div>
                            </div>
                        </div>
                        
                        <p>You now have access to all the features included in your ${plan} plan. We're committed to providing you with the best experience possible.</p>
                        
                        <p class="support-text">If you have any questions or need assistance, our support team is here to help. Simply reply to this email or contact us at <a href="mailto:support@suntrenia.com" style="color: #667eea;">support@suntrenia.com</a>.</p>
                        
                        <div style="text-align: center;">
                            <a href="#" class="button">Access Your Account</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p style="margin: 0 0 8px 0; color: #6b7280;">&copy; ${new Date().getFullYear()} Suntrenia. All rights reserved.</p>
                        <p style="margin: 0; color: #9ca3af;">This is an automated message, please do not reply directly to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Reply sent: %s', info.messageId);

    const statusCode = 200;
    const responsePayload = { message: "Subscription successfully submitted and email sent" };
    
    console.log('Sending Response:', { status: statusCode, payload: responsePayload });
    
    res.status(statusCode).json(responsePayload);

    // Trigger main application cycle for all plans
    try {
      const sessionForMain = req.session;
      if (sessionForMain && sessionForMain.userId) {
        console.log(`[Subscription] Triggering main cycle for ${plan} plan, user ${sessionForMain.userId}`);
        main(req, res).catch(err => console.error('[Subscription] main() error:', err.message));
      }
    } catch(triggerErr) {
      console.error('[Subscription] Failed to trigger main:', triggerErr.message);
    }
    

  } catch (error) {
      console.error('Error submitting subscription:', error);
      res.status(500).json({ message: 'Error processing subscription' });
  } finally {
      await client.close();
  }
});
/////////

// Endpoint or function to get subscription details
async function getSubscriptionDetails(req, res) {
  const userId = req.session.userId; // Get user ID from session

  if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
  }

  // Connect to MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
      await client.connect();
      const database = client.db('olukayode_sage');
      const collection = database.collection('users');
      
      // Find the user in the database by their userId
      const user = await collection.findOne({ userId });
      
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Assuming subscription data is stored under the 'subscription' field
      const subscription = user.subscription;

      if (!subscription) {
          return res.status(404).json({ message: "Subscription data not found" });
      }

      // Convert dates to Date objects for calculation
      const startDate = new Date(subscription.date);
      const expirationDate = new Date(subscription.expirationDate);

      // Calculate elapsed time in days
      const currentDate = new Date();
      const elapsedTime = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      // Subscription status (active or expired)
      const subscriptionStatus = (currentDate > expirationDate) ? 'Expired' : 'Active';

      // Calculate remaining time in days
      const remainingTime = Math.floor((expirationDate - currentDate) / (1000 * 60 * 60 * 24)); // Days until expiration

      // Prepare individual subscription details for response
      const subscriptionData = {
          subscriptionPlan: subscription.plan, // Subscription plan
          subscriptionDuration: subscription.durationInDays, // Duration of subscription
          subscriptionElapsed: elapsedTime, // Elapsed time (in days)
          subscriptionStarts: startDate.toISOString().split('T')[0], // Start date in YYYY-MM-DD format
          subscriptionExpires: expirationDate.toISOString().split('T')[0], // Expiration date in YYYY-MM-DD format
          subscriptionStatus, // Status: "Active" or "Expired"
          remainingTime, // Remaining days until expiration
      };

      // Send response with subscription details
      res.status(200).json({ subscriptionData });

  } catch (error) {
      console.error('Error fetching subscription data:', error);
      res.status(500).json({ message: 'Error fetching subscription data' });
  } finally {
      await client.close();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ════════════════════════════════════════════════════════════════════════════
// PARAKLEET AI INTERVIEW HELPER INTEGRATION
// ════════════════════════════════════════════════════════════════════════════

// POST /subscribe-interview-helper
// For users who want ONLY the interview coaching, without Intellijob job-hunting
app.post('/subscribe-interview-helper', ensureAuthenticated, async (req, res) => {
  const { plan, date, paymentReference } = req.body;
  // plan: 'interview_monthly' | 'interview_quarterly' | 'interview_yearly'
  const userId = req.session.userId;

  const planDurations = {
    interview_monthly:   30,
    interview_quarterly: 90,
    interview_yearly:    365,
  };

  if (!planDurations[plan]) {
    return res.status(400).json({ message: 'Invalid interview helper plan' });
  }

  const startDate      = new Date(date || Date.now());
  const expirationDate = new Date(startDate);
  expirationDate.setDate(startDate.getDate() + planDurations[plan]);

  const mongoClient = new MongoClient(uri);
  try {
    await mongoClient.connect();
    const db         = mongoClient.db('olukayode_sage');
    const collection = db.collection('Users_CV_biodata');

    await collection.updateOne(
      { _id: userId },
      {
        $set: {
          'interviewHelper.access':         true,
          'interviewHelper.source':         'standalone_subscription',
          'interviewHelper.plan':           plan,
          'interviewHelper.startDate':      startDate.toISOString(),
          'interviewHelper.expirationDate': expirationDate.toISOString(),
          'interviewHelper.paymentRef':     paymentReference || null,
          'interviewHelper.unlockedAt':     new Date()
        }
      }
    );

    res.json({
      success:        true,
      message:        'Interview Helper activated',
      expiresAt:      expirationDate.toISOString(),
    });
  } catch (err) {
    console.error('[InterviewHelper] Subscription error:', err.message);
    res.status(500).json({ message: 'Failed to activate interview helper' });
  } finally {
    await mongoClient.close();
  }
});

// GET /api/interview-helper/status
// Returns whether the current user has Interview Helper access and why
app.get('/api/interview-helper/status', ensureAuthenticated, async (req, res) => {
  const userId    = req.session.userId;
  const mongoClient = new MongoClient(uri);
  try {
    await mongoClient.connect();
    const db   = mongoClient.db('olukayode_sage');
    const user = await db.collection('Users_CV_biodata').findOne({ _id: userId });

    if (!user) return res.json({ hasAccess: false });

    // Check same logic as middleware
    const sub = user.subscription;
    if (sub?.plan && sub?.expirationDate && new Date(sub.expirationDate) > new Date()) {
      return res.json({ hasAccess: true, source: 'intellijob_subscription', plan: sub.plan });
    }

    if (user.jobPlacedThroughUs === true) {
      return res.json({ hasAccess: true, source: 'job_placement' });
    }

    const ih = user.interviewHelper;
    if (ih?.access && ih?.source === 'standalone_subscription' && new Date(ih.expirationDate) > new Date()) {
      return res.json({ hasAccess: true, source: 'standalone_subscription', plan: ih.plan, expiresAt: ih.expirationDate });
    }

    return res.json({
      hasAccess: false,
      upgradeOptions: [
        { plan: 'interview_monthly',   label: 'Monthly — Interview Helper Only',    durationDays: 30  },
        { plan: 'interview_quarterly', label: 'Quarterly — Interview Helper Only',  durationDays: 90  },
        { plan: 'interview_yearly',    label: 'Yearly — Interview Helper Only',     durationDays: 365 },
      ]
    });
  } catch (err) {
    console.error('[InterviewHelper] status error:', err.message);
    res.status(500).json({ hasAccess: false });
  } finally {
    await mongoClient.close();
  }
});

// GET /api/active-job
// Called by the Parakleet extension on startup to pre-fill job role & company
app.get('/api/active-job', async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) return res.json({ role: '', company: '' });

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('olukayode_sage');

    // Find the most recently active application for this user
    const activeApp = await db.collection('application_status').findOne(
      { userId, status: { $in: ['interview', 'interviewing', 'shortlisted'] } },
      { sort: { updatedAt: -1 } }
    );

    res.json({
      role:    activeApp?.jobTitle   || activeApp?.role    || '',
      company: activeApp?.company    || activeApp?.employer || '',
    });
  } catch (err) {
    console.error('[InterviewHelper] active-job error:', err.message);
    res.json({ role: '', company: '' });
  } finally {
    await client.close();
  }
});

// POST /api/mark-job-placed
// Call this after a placement is confirmed to permanently unlock Interview Helper
app.post('/api/mark-job-placed', ensureAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const mongoClient = new MongoClient(uri);

  try {
    await mongoClient.connect();
    const db = mongoClient.db('olukayode_sage');
    const collection = db.collection('Users_CV_biodata');

    await collection.updateOne(
      { _id: userId },
      {
        $set: {
          jobPlacedThroughUs: true,
          'interviewHelper.access': true,
          'interviewHelper.source': 'job_placement',
          'interviewHelper.unlockedAt': new Date()
        }
      }
    );

    res.json({ success: true, message: 'Interview Helper unlocked by placement' });
  } catch (err) {
    console.error('[InterviewHelper] mark-job-placed error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to mark job placement' });
  } finally {
    await mongoClient.close();
  }
});

// ════════════════════════════════════════════════════════════════════════════
// Register Parakleet AI routes
// ════════════════════════════════════════════════════════════════════════════
const { requireInterviewHelperAccess } = require('./middleware/interviewHelperAuth');
// Ensure tmp directories exist before loading routes
['tmp/audio', 'tmp/cv'].forEach(dir => {
  const full = require('path').join(__dirname, dir);
  if (!require('fs').existsSync(full)) require('fs').mkdirSync(full, { recursive: true });
});
const transcribeRouter = require('./routes/transcribe');
const coachRouter      = require('./routes/coach');

// Ensure tmp directories exist
['tmp/audio', 'tmp/cv'].forEach(dir => {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// Register Parakleet routes with access middleware
app.use('/api', requireInterviewHelperAccess, transcribeRouter);
app.use('/api', requireInterviewHelperAccess, coachRouter);


// ============================================================
// USER SETTINGS PANEL
// ============================================================
app.get('/user/settings', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const client = new MongoClient(process.env.MONGO_URI);
  let user = {};
  try {
    await client.connect();
    user = await client.db('olukayode_sage').collection('Users_CV_biodata').findOne(
      { _id: userId },
      { projection: { name: 1, email: 1, subscription: 1, autoMode: 1, interviewHelper: 1 } }
    ) || {};
  } catch(e) { console.error('[UserSettings]', e.message); }
  finally { await client.close(); }

  const autoMode = user.autoMode === true;
  const plan = user.subscription?.plan || 'None';

  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Settings — Suntrenia</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#1a1a2e;font-family:Inter,sans-serif;color:#f0f0f0;}
    .topbar{background:#16213e;border-bottom:1px solid rgba(124,58,237,0.3);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:fixed;top:0;width:100%;z-index:100;}
    .logo{color:#7c3aed;font-size:20px;font-weight:700;}
    .nav a{color:#a0a0b0;text-decoration:none;font-size:14px;margin-left:20px;}
    .content{padding:80px 24px 40px;max-width:700px;margin:0 auto;}
    .page-title{font-size:20px;font-weight:700;margin-bottom:24px;}
    .card{background:#16213e;border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:22px;margin-bottom:16px;}
    .card-title{font-size:14px;font-weight:600;margin-bottom:16px;color:#a78bfa;text-transform:uppercase;letter-spacing:0.5px;}
    .setting-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
    .setting-row:last-child{border-bottom:none;padding-bottom:0;}
    .setting-label{font-size:14px;font-weight:500;}
    .setting-desc{font-size:12px;color:#a0a0b0;margin-top:3px;max-width:400px;line-height:1.5;}
    .toggle{position:relative;width:44px;height:24px;flex-shrink:0;}
    .toggle input{opacity:0;width:0;height:0;}
    .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#2d2d4d;border-radius:24px;transition:0.3s;}
    .slider:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background:white;border-radius:50%;transition:0.3s;}
    input:checked+.slider{background:#7c3aed;}
    input:checked+.slider:before{transform:translateX(20px);}
    .btn{padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;}
    .btn-primary{background:#7c3aed;color:white;}
    .btn-secondary{background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);}
    .btn-success{background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);}
    .alert{padding:12px 16px;border-radius:8px;margin-bottom:20px;font-size:14px;}
    .alert-success{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10b981;}
    .info-val{font-size:13px;color:#f0f0f0;font-weight:500;}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="logo">Suntrenia</div>
    <div class="nav">
      <a href="/dashboard">Dashboard</a>
      <a href="/user/settings">Settings</a>
      <a href="/logout">Logout</a>
    </div>
  </div>
  <div class="content">
    <div class="page-title">Account Settings</div>
    ${req.query.success ? `<div class="alert alert-success">✅ ${decodeURIComponent(req.query.success)}</div>` : ''}

    <div class="card">
      <div class="card-title">Profile</div>
      <div class="setting-row">
        <div><div class="setting-label">Name</div></div>
        <div class="info-val">${user.name || '-'}</div>
      </div>
      <div class="setting-row">
        <div><div class="setting-label">Email</div></div>
        <div class="info-val">${user.email || '-'}</div>
      </div>
      <div class="setting-row">
        <div><div class="setting-label">Current Plan</div></div>
        <div class="info-val">${plan}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Application Mode</div>
      <div class="setting-row">
        <div>
          <div class="setting-label">Auto Mode (Do Not Disturb)</div>
          <div class="setting-desc">When enabled, Suntrenia applies to jobs automatically without asking for your approval. At the end of each day, you'll receive a WhatsApp summary of all jobs applied for.</div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="autoModeToggle" ${autoMode ? 'checked' : ''} onchange="toggleAutoMode(this)">
          <span class="slider"></span>
        </label>
      </div>
      <div class="setting-row">
        <div>
          <div class="setting-label">Consent Mode</div>
          <div class="setting-desc">When Auto Mode is off, you'll be prompted via WhatsApp to approve or decline each job application before it's sent.</div>
        </div>
        <span style="font-size:12px;color:${autoMode ? '#a0a0b0' : '#10b981'};font-weight:600">${autoMode ? 'Inactive' : 'Active'}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Gmail Authorization</div>
      <div class="setting-row">
        <div>
          <div class="setting-label">Connect your Gmail</div>
          <div class="setting-desc">Authorize Suntrenia to send job applications from your own Gmail address. This makes your applications look more professional and personal.</div>
        </div>
        <a href="/settings/email-authorization" class="btn btn-secondary">Manage</a>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Interview Helper</div>
      <div class="setting-row">
        <div>
          <div class="setting-label">Interview Helper Access</div>
          <div class="setting-desc">AI-powered interview preparation tool. Unlocked automatically with your subscription.</div>
        </div>
        <span style="font-size:12px;color:${user.interviewHelper?.access ? '#10b981' : '#ef4444'};font-weight:600">${user.interviewHelper?.access ? '✅ Unlocked' : '🔒 Locked'}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Subscription</div>
      <div class="setting-row">
        <div>
          <div class="setting-label">Top Up or Change Plan</div>
          <div class="setting-desc">Activate a new plan or extend your current subscription.</div>
        </div>
        <a href="/dashboard#topup" class="btn btn-primary">Top Up</a>
      </div>
    </div>
  </div>

  <script>
    async function toggleAutoMode(checkbox) {
      const mode = checkbox.checked;
      try {
        const res = await fetch('/user/toggle-automode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ autoMode: mode })
        });
        const data = await res.json();
        if (data.success) {
          window.location.href = '/user/settings?success=' + encodeURIComponent('Mode updated to ' + (mode ? 'Auto (Do Not Disturb)' : 'Consent'));
        } else {
          alert('Failed: ' + (data.message || 'Unknown error'));
          checkbox.checked = !mode;
        }
      } catch(e) {
        alert('Network error.');
        checkbox.checked = !mode;
      }
    }
  </script>
</body>
</html>`);
});

app.post('/user/toggle-automode', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const { autoMode } = req.body;
  if (typeof autoMode !== 'boolean') return res.status(400).json({ success: false, message: 'Invalid value' });
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await client.db('olukayode_sage').collection('Users_CV_biodata').updateOne(
      { _id: userId },
      { $set: { autoMode, autoModeUpdatedAt: new Date() } }
    );
    res.json({ success: true });
  } catch(e) {
    res.status(500).json({ success: false, message: e.message });
  } finally {
    await client.close();
  }
});
// ============================================================


// ════════════════════════════════════════════════════════════════════════════
// ============================================================
// ADMIN DASHBOARD
// ============================================================

const adminAuth=(req,res,next)=>{if(req.session.isAdmin)return next();res.redirect('/admin/login');};
app.get('/admin/login',(req,res)=>{res.send(`<!DOCTYPE html><html><head><title>Suntrenia Admin</title><meta name='viewport' content='width=device-width,initial-scale=1'><link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' rel='stylesheet'><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#1a1a2e;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,sans-serif;}.card{background:#16213e;border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:40px;width:100%;max-width:400px;box-shadow:0 4px 24px rgba(0,0,0,0.4);}.logo{color:#7c3aed;font-size:24px;font-weight:700;text-align:center;margin-bottom:4px;}.subtitle{color:#a0a0b0;font-size:13px;text-align:center;margin-bottom:28px;}input{width:100%;background:#0f3460;border:1px solid rgba(124,58,237,0.3);color:#f0f0f0;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:14px;outline:none;}input:focus{border-color:#7c3aed;}button{width:100%;background:#7c3aed;color:white;border:none;border-radius:8px;padding:12px;font-size:15px;font-weight:600;cursor:pointer;}button:hover{background:#6d28d9;}.error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:13px;padding:10px 14px;border-radius:8px;margin-bottom:16px;text-align:center;}</style></head><body><div class='card'><div class='logo'>Suntrenia</div><div class='subtitle'>Admin Panel</div>${req.query.error?'<div class=\'error\'>Invalid password</div>':''}<form method='POST' action='/admin/login'><input type='password' name='password' placeholder='Enter admin password' required autofocus><button type='submit'>Login</button></form></div></body></html>`);});
app.post('/admin/login',(req,res)=>{if(req.body.password===process.env.ADMIN_PASSWORD){req.session.isAdmin=true;res.redirect('/admin');}else{res.redirect('/admin/login?error=1');}});
app.get('/admin/logout',(req,res)=>{req.session.isAdmin=false;res.redirect('/admin/login');});
app.post('/admin/set-mode', adminAuth, async (req, res) => { const { mode } = req.body; if (!['TESTING_MODE','NORMAL_MODE'].includes(mode)) return res.redirect('/admin?error=Invalid+mode'); const client = new MongoClient(process.env.MONGO_URI); try { await client.connect(); await client.db('olukayode_sage').collection('app_settings').updateOne({ _id: 'global' }, { $set: { mode, updatedAt: new Date() } }, { upsert: true }); res.redirect('/admin?success=Mode+updated+to+' + mode); } catch(e) { res.redirect('/admin?error=' + encodeURIComponent(e.message)); } finally { await client.close(); } });
app.post('/admin/toggle-whatsapp-scraping',adminAuth,async(req,res)=>{
  const{enabled}=req.body;
  const client=new MongoClient(process.env.MONGO_URI);
  try{
    await client.connect();
    await client.db('olukayode_sage').collection('app_settings').updateOne(
      {_id:'global'},
      {$set:{whatsappScraping:enabled==='true',updatedAt:new Date()}},
      {upsert:true}
    );
    if(enabled!=='true'&&global.whatsappPollInterval){clearInterval(global.whatsappPollInterval);global.whatsappPollInterval=null;console.log('[WhatsApp] Polling interval cleared by admin');}const msg=enabled==='true'?'WhatsApp+scraping+resumed':'WhatsApp+scraping+paused';
    res.redirect('/admin?success='+msg);
  }catch(e){
    res.redirect('/admin?error='+encodeURIComponent(e.message));
  }finally{
    await client.close();
  }
});
app.post('/admin/toggle-job-group',adminAuth,async(req,res)=>{const{groupId,active}=req.body;if(!groupId)return res.redirect('/admin?error=Group+ID+required');const client=new MongoClient(process.env.MONGO_URI);try{await client.connect();await client.db('olukayode_sage').collection('whatsapp_job_groups').updateOne({groupId},{$set:{groupId,active:active==='true',updatedAt:new Date()}},{upsert:true});res.redirect('/admin?success=Group+updated');}catch(e){res.redirect('/admin?error='+encodeURIComponent(e.message));}finally{await client.close();}});
app.post('/admin/delete-job-group',adminAuth,async(req,res)=>{const{groupId}=req.body;const client=new MongoClient(process.env.MONGO_URI);try{await client.connect();await client.db('olukayode_sage').collection('whatsapp_job_groups').deleteOne({groupId});res.redirect('/admin?success=Group+deleted');}catch(e){res.redirect('/admin?error='+encodeURIComponent(e.message));}finally{await client.close();}});
app.post('/admin/refresh-user',adminAuth,async(req,res)=>{const{userId}=req.body;if(!userId)return res.redirect('/admin?error=User+ID+required');const client=new MongoClient(process.env.MONGO_URI);try{await client.connect();const db=client.db('olukayode_sage');await db.collection('application_status').updateOne({userId},{$set:{successfulApplications:0,refreshedAt:new Date(),refreshedBy:'admin'}},{upsert:true});const result=await db.collection('applicationProcessingFeeder').updateMany({userId,role_processed:true},{$set:{role_processed:false,status:'Pending',application:'Pending',refreshedAt:new Date()}});console.log('[Admin] Refreshed user '+userId+', unprocessed '+result.modifiedCount+' roles');res.redirect('/admin?success=User+refreshed+successfully');}catch(e){res.redirect('/admin?error='+encodeURIComponent(e.message));}finally{await client.close();}});
app.post('/admin/stop-user',adminAuth,async(req,res)=>{const{userId}=req.body;if(!userId)return res.redirect('/admin?error=User+ID+required');const client=new MongoClient(process.env.MONGO_URI);try{await client.connect();await client.db('olukayode_sage').collection('application_status').updateOne({userId},{$set:{isStopped:true,stoppedAt:new Date(),stoppedBy:'admin'}},{upsert:true});res.redirect('/admin?success=User+stopped');}catch(e){res.redirect('/admin?error='+encodeURIComponent(e.message));}finally{await client.close();}});
app.post('/admin/resume-user',adminAuth,async(req,res)=>{const{userId}=req.body;if(!userId)return res.redirect('/admin?error=User+ID+required');const client=new MongoClient(process.env.MONGO_URI);try{await client.connect();await client.db('olukayode_sage').collection('application_status').updateOne({userId},{$set:{isStopped:false,resumedAt:new Date(),resumedBy:'admin'}},{upsert:true});res.redirect('/admin?success=User+resumed');}catch(e){res.redirect('/admin?error='+encodeURIComponent(e.message));}finally{await client.close();}});
app.get('/admin', adminAuth, async (req, res) => {
  const client = new MongoClient(process.env.MONGO_URI);
  let currentMode = 'TESTING_MODE', jobGroups = [], recentApps = [], users = [];
  let adminPlans = {}, waPollInterval = 30, waScrapingEnabled = true;
  let appsToday = 0, appsThisWeek = 0, appsAllTime = 0;
  let planCounts = {}, activeCount = 0, stoppedCount = 0;
  let oauthCount = 0, smtpCount = 0, failedCount = 0;
  let topSenders = [], modeHistory = [];

  try {
    await client.connect();
    const db = client.db('olukayode_sage');

    // Settings & mode
    const settings = await db.collection('app_settings').findOne({ _id: 'global' });
    currentMode = settings?.mode || 'TESTING_MODE';
    const whatsappScraping = settings?.whatsappScraping !== false;
    modeHistory = settings?.history || [];

    // Job groups
    jobGroups = await db.collection('whatsapp_job_groups').find({}).toArray();

    // Recent apps
    recentApps = await db.collection('applicationProcessingFeeder')
      .find({ role_processed: true }).sort({ processedAt: -1 }).limit(15).toArray();

    // Users
    const userDocs = await db.collection('Users_CV_biodata')
      .find({}, { projection: { _id: 1, name: 1, email: 1, subscription: 1 } })
      .limit(50).toArray();
    const statuses = await db.collection('application_status').find({}).toArray();
    const statusMap = {};
    statuses.forEach(s => { statusMap[s.userId] = s; });
    users = userDocs.map(u => ({ ...u, status: statusMap[u._id] || {} }));

    // Analytics: apps today / week / all time
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    appsAllTime = await db.collection('applicationProcessingFeeder')
      .countDocuments({ role_processed: true });
    appsToday = await db.collection('applicationProcessingFeeder')
      .countDocuments({ role_processed: true, processedAt: { $gte: startOfDay } });
    appsThisWeek = await db.collection('applicationProcessingFeeder')
      .countDocuments({ role_processed: true, processedAt: { $gte: startOfWeek } });

    // Analytics: plan counts
    userDocs.forEach(u => {
      const plan = u.subscription?.plan || 'None';
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });

    // Analytics: active vs stopped
    statuses.forEach(s => {
      if (s.isStopped) stoppedCount++; else activeCount++;
    });

    // Analytics: top senders
    const senderPipeline = [
      { $match: { role_processed: true } },
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ];
    topSenders = await db.collection('applicationProcessingFeeder')
      .aggregate(senderPipeline).toArray();

    // Analytics: OAuth vs SMTP
    oauthCount = await db.collection('user_gmail_tokens').countDocuments({});
    smtpCount = userDocs.length - oauthCount;

    // Analytics: failed sends
    failedCount = await db.collection('applicationProcessingFeeder')
      .countDocuments({ role_processed: false, status: 'failed' });

  } catch (e) {
    console.error('[Admin]', e.message);
  } finally {
    await client.close();
  }

  const isTesting = currentMode === 'TESTING_MODE';
  const sm = req.query.success ? `<div class="alert-success">${decodeURIComponent(req.query.success)}</div>` : '';
  const em = req.query.error ? `<div class="alert-error">${decodeURIComponent(req.query.error)}</div>` : '';

  const gRows = jobGroups.map(g => `
    <tr>
      <td style="font-family:monospace;font-size:12px">${g.groupId}</td>
      <td><span class="${g.active ? 'badge-green' : 'badge-red'}">${g.active ? 'Active' : 'Inactive'}</span></td>
      <td>
        <form method="POST" action="/admin/toggle-job-group" style="display:inline;margin-right:4px">
          <input type="hidden" name="groupId" value="${g.groupId}">
          <input type="hidden" name="active" value="${g.active ? 'false' : 'true'}">
          <button class="btn-sm btn-warning">${g.active ? 'Deactivate' : 'Activate'}</button>
        </form>
        <form method="POST" action="/admin/delete-job-group" style="display:inline">
          <input type="hidden" name="groupId" value="${g.groupId}">
          <button class="btn-sm btn-danger" onclick="return confirm('Delete?')">Delete</button>
        </form>
      </td>
    </tr>`).join('');

  const uRows = users.map(u => {
    const stopped = u.status?.isStopped === true;
    const plan = u.subscription?.plan || 'None';
    const appCount = u.status?.successfulApplications || 0;
    return `<tr>
      <td style="font-family:monospace;font-size:11px">${u._id}</td>
      <td>${u.name || '-'}</td>
      <td style="font-size:12px">${u.email || '-'}</td>
      <td><span class="badge-purple">${plan}</span></td>
      <td style="text-align:center">${appCount}</td>
      <td><span class="${stopped ? 'badge-red' : 'badge-green'}">${stopped ? 'Stopped' : 'Active'}</span></td>
      <td style="white-space:nowrap">
        <form method="POST" action="/admin/refresh-user" style="display:inline;margin-right:4px">
          <input type="hidden" name="userId" value="${u._id}">
          <button class="btn-sm btn-success" onclick="return confirm('Reset this user?')">Refresh</button>
        </form>
        ${stopped
          ? `<form method="POST" action="/admin/resume-user" style="display:inline">
               <input type="hidden" name="userId" value="${u._id}">
               <button class="btn-sm btn-primary">Resume</button>
             </form>`
          : `<form method="POST" action="/admin/stop-user" style="display:inline">
               <input type="hidden" name="userId" value="${u._id}">
               <button class="btn-sm btn-danger" onclick="return confirm('Stop this user?')">Stop</button>
             </form>`
        }
      </td>
    </tr>`;
  }).join('');

  const aRows = recentApps.map(a => `
    <tr>
      <td style="font-family:monospace;font-size:11px">${a.userId || '-'}</td>
      <td>${a.role || a.title || '-'}</td>
      <td style="font-size:12px">${a.processedAt ? new Date(a.processedAt).toLocaleString() : '-'}</td>
      <td><span class="badge-green">Treated</span></td>
    </tr>`).join('');

  const topSenderRows = topSenders.map(s => `
    <tr>
      <td style="font-family:monospace;font-size:11px">${s._id || '-'}</td>
      <td style="text-align:center"><span class="badge-purple">${s.count}</span></td>
    </tr>`).join('');

  const planRows = Object.entries(planCounts).map(([plan, count]) => `
    <tr>
      <td><span class="badge-purple">${plan}</span></td>
      <td style="text-align:center;font-weight:600">${count}</td>
    </tr>`).join('');

  const activeGroups = jobGroups.filter(g => g.active).length;
  const inactiveGroups = jobGroups.length - activeGroups;

  // Load plan config and whatsapp settings for admin panel
  try {
    adminPlans = await getPlanConfig();
  } catch(e) { console.error('[Admin] Could not load plan config:', e.message); }
  try {
    const _wClient2 = new MongoClient(process.env.MONGO_URI);
    await _wClient2.connect();
    const _wSettings2 = await _wClient2.db('olukayode_sage').collection('app_settings').findOne({ _id: 'global' });
    await _wClient2.close();
    if (_wSettings2) {
      waPollInterval = _wSettings2.pollIntervalMinutes || 30;
      waScrapingEnabled = _wSettings2.whatsappScraping !== false;
    }
  } catch(e) { console.error('[Admin] Could not load wa settings:', e.message); }

  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Suntrenia Admin</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#1a1a2e;font-family:Inter,sans-serif;color:#f0f0f0;}
    .topbar{background:#16213e;border-bottom:1px solid rgba(124,58,237,0.3);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:fixed;top:0;width:100%;z-index:100;}
    .logo{color:#7c3aed;font-size:20px;font-weight:700;}
    .topbar a{color:#a0a0b0;text-decoration:none;font-size:14px;margin-left:16px;}
    .mode-indicator{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;}
    .testing{background:rgba(245,158,11,0.15);color:#f59e0b;border:1px solid rgba(245,158,11,0.3);}
    .normal{background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3);}
    .content{padding:80px 24px 40px;max-width:1300px;margin:0 auto;}
    .alert-success{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);color:#10b981;padding:12px 16px;border-radius:8px;margin-bottom:20px;font-size:14px;}
    .alert-error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;padding:12px 16px;border-radius:8px;margin-bottom:20px;font-size:14px;}
    .section-title{font-size:18px;font-weight:700;margin:28px 0 14px;color:#a78bfa;letter-spacing:0.3px;}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:16px;}
    .stat-card{background:#16213e;border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:18px 20px;}
    .stat-label{color:#a0a0b0;font-size:11px;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
    .stat-value{font-size:26px;font-weight:700;color:#7c3aed;}
    .stat-value.green{color:#10b981;}
    .stat-value.red{color:#ef4444;}
    .stat-value.yellow{color:#f59e0b;}
    .card{background:#16213e;border:1px solid rgba(124,58,237,0.15);border-radius:12px;padding:22px;margin-bottom:20px;}
    .card-title{font-size:14px;font-weight:600;margin-bottom:14px;color:#e0e0f0;}
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    @media(max-width:700px){.two-col{grid-template-columns:1fr;}}
    .mode-toggle{display:flex;gap:12px;flex-wrap:wrap;}
    .mode-btn{padding:10px 24px;border-radius:8px;border:none;font-size:14px;font-weight:600;cursor:pointer;transition:0.2s;}
    .mode-btn-active{background:#7c3aed;color:white;}
    .mode-btn-inactive{background:transparent;border:1px solid rgba(124,58,237,0.4);color:#a0a0b0;}
    .mode-desc{color:#a0a0b0;font-size:13px;margin-top:12px;line-height:1.6;}
    table{width:100%;border-collapse:collapse;font-size:13px;}
    th{text-align:left;padding:9px 12px;color:#a0a0b0;border-bottom:1px solid rgba(124,58,237,0.1);font-weight:500;font-size:11px;text-transform:uppercase;}
    td{padding:9px 12px;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle;}
    .badge-green{background:rgba(16,185,129,0.15);color:#10b981;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-red{background:rgba(239,68,68,0.15);color:#ef4444;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-purple{background:rgba(124,58,237,0.15);color:#a78bfa;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .badge-yellow{background:rgba(245,158,11,0.15);color:#f59e0b;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
    .btn-sm{padding:5px 12px;border-radius:6px;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:0.2s;}
    .btn-primary{background:#7c3aed;color:white;}
    .btn-success{background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);}
    .btn-danger{background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);}
    .btn-warning{background:rgba(245,158,11,0.2);color:#f59e0b;border:1px solid rgba(245,158,11,0.3);}
    .add-group{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;}
    .add-group input{flex:1;min-width:200px;background:#0f3460;border:1px solid rgba(124,58,237,0.3);color:#f0f0f0;border-radius:8px;padding:9px 14px;font-size:13px;outline:none;}
    .add-group button{background:#7c3aed;color:white;border:none;border-radius:8px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;}
    .table-wrap{overflow-x:auto;}
    .bar-wrap{margin-top:6px;}
    .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:13px;}
    .bar-label{width:80px;color:#a0a0b0;font-size:12px;text-align:right;}
    .bar-bg{flex:1;background:rgba(124,58,237,0.1);border-radius:4px;height:10px;}
    .bar-fill{height:10px;border-radius:4px;background:#7c3aed;}
    .bar-count{width:30px;text-align:right;font-size:12px;color:#a78bfa;font-weight:600;}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="logo">Suntrenia Admin</div>
    <div>
      <span class="mode-indicator ${isTesting ? 'testing' : 'normal'}">${isTesting ? 'TESTING MODE' : 'NORMAL MODE'}</span>
      <a href="/">App</a>
      <a href="/admin/logout">Logout</a>
    </div>
  </div>
  <div class="content">
    ${sm}${em}

    <div class="section-title">Overview</div>
    <div class="stats">
      <div class="stat-card"><div class="stat-label">Total Users</div><div class="stat-value">${users.length}</div></div>
      <div class="stat-card"><div class="stat-label">Active Users</div><div class="stat-value green">${activeCount}</div></div>
      <div class="stat-card"><div class="stat-label">Stopped Users</div><div class="stat-value red">${stoppedCount}</div></div>
      <div class="stat-card"><div class="stat-label">Job Groups</div><div class="stat-value">${jobGroups.length}</div></div>
      <div class="stat-card"><div class="stat-label">Apps Today</div><div class="stat-value green">${appsToday}</div></div>
      <div class="stat-card"><div class="stat-label">Apps This Week</div><div class="stat-value">${appsThisWeek}</div></div>
      <div class="stat-card"><div class="stat-label">Apps All Time</div><div class="stat-value">${appsAllTime}</div></div>
      <div class="stat-card"><div class="stat-label">Failed Sends</div><div class="stat-value ${failedCount > 0 ? 'red' : 'green'}">${failedCount}</div></div>
    </div>

    <div class="section-title">Analytics</div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">Users by Subscription Plan</div>
        <table>
          <thead><tr><th>Plan</th><th style="text-align:center">Users</th></tr></thead>
          <tbody>${planRows || '<tr><td colspan=2 style="color:#a0a0b0;text-align:center;padding:16px">No data</td></tr>'}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Top 5 Senders</div>
        <table>
          <thead><tr><th>User ID</th><th style="text-align:center">Apps Sent</th></tr></thead>
          <tbody>${topSenderRows || '<tr><td colspan=2 style="color:#a0a0b0;text-align:center;padding:16px">No data yet</td></tr>'}</tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Email Send Method</div>
        <div class="bar-wrap">
          <div class="bar-row">
            <div class="bar-label">Gmail OAuth</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${users.length ? Math.round((oauthCount/users.length)*100) : 0}%;background:#10b981"></div></div>
            <div class="bar-count">${oauthCount}</div>
          </div>
          <div class="bar-row">
            <div class="bar-label">SMTP</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${users.length ? Math.round((smtpCount/users.length)*100) : 0}%;background:#7c3aed"></div></div>
            <div class="bar-count">${smtpCount < 0 ? 0 : smtpCount}</div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Failed</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${appsAllTime ? Math.round((failedCount/appsAllTime)*100) : 0}%;background:#ef4444"></div></div>
            <div class="bar-count">${failedCount}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">WhatsApp Groups</div>
        <div class="bar-wrap">
          <div class="bar-row">
            <div class="bar-label">Active</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${jobGroups.length ? Math.round((activeGroups/jobGroups.length)*100) : 0}%;background:#10b981"></div></div>
            <div class="bar-count">${activeGroups}</div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Inactive</div>
            <div class="bar-bg"><div class="bar-fill" style="width:${jobGroups.length ? Math.round((inactiveGroups/jobGroups.length)*100) : 0}%;background:#ef4444"></div></div>
            <div class="bar-count">${inactiveGroups}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-title">Controls</div>
    <div class="card">
      <div class="card-title">Application Mode</div>
      <div class="mode-toggle">
        <form method="POST" action="/admin/set-mode">
          <input type="hidden" name="mode" value="TESTING_MODE">
          <button class="mode-btn ${isTesting ? 'mode-btn-active' : 'mode-btn-inactive'}">Testing Mode</button>
        </form>
        <form method="POST" action="/admin/set-mode">
          <input type="hidden" name="mode" value="NORMAL_MODE">
          <button class="mode-btn ${!isTesting ? 'mode-btn-active' : 'mode-btn-inactive'}">Normal Mode</button>
        </form>
      </div>
      <div class="mode-desc">Testing: first email after 1 min. Normal: first email after 30-45 min. Changes apply on the next cycle.</div>
    </div>

    <div class="card">
      <div class="card-title">WhatsApp Job Groups</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Group ID</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${gRows || '<tr><td colspan=3 style="color:#a0a0b0;text-align:center;padding:20px">No groups yet</td></tr>'}</tbody>
        </table>
      </div>
      <form method="POST" action="/admin/toggle-job-group" class="add-group">
        <input type="text" name="groupId" placeholder="Enter WhatsApp Group ID" required>
        <input type="hidden" name="active" value="true">
        <button type="submit">+ Add Group</button>
      </form>
    </div>

    <div class="section-title">Users</div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Plan</th><th>Apps Sent</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${uRows || '<tr><td colspan=7 style="color:#a0a0b0;text-align:center;padding:20px">No users found</td></tr>'}</tbody>
        </table>
      </div>
    </div>

    <div class="section-title">Recent Applications</div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>User ID</th><th>Role</th><th>Processed At</th><th>Status</th></tr></thead>
          <tbody>${aRows || '<tr><td colspan=4 style="color:#a0a0b0;text-align:center;padding:20px">No applications yet</td></tr>'}</tbody>
        </table>
      </div>
    </div>

    <div class="section-title">💰 Plan Configuration</div>
    <div class="card">
      <div class="card-title">Edit plan prices, durations and descriptions. Changes reflect immediately across the subscription page and payment gateways.</div>
      <form method="POST" action="/admin/update-plan-config">
        <div class="two-col" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:16px">
          ${['basic','standard','premium'].map(key => {
            const p = adminPlans[key] || {};
            return `<div style="background:#0f3460;border:1px solid rgba(124,58,237,0.2);border-radius:10px;padding:18px">
              <div style="font-size:14px;font-weight:700;color:#a78bfa;margin-bottom:14px;text-transform:capitalize">${key} Plan</div>
              <div style="margin-bottom:10px">
                <label style="font-size:11px;color:#a0a0b0;text-transform:uppercase;letter-spacing:0.5px">Price (₦)</label>
                <input name="${key}[price]" value="${p.price||''}" type="number" min="0" required
                  style="width:100%;background:#16213e;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 10px;color:#f0f0f0;margin-top:4px;font-size:13px">
              </div>
              <div style="margin-bottom:10px">
                <label style="font-size:11px;color:#a0a0b0;text-transform:uppercase;letter-spacing:0.5px">Duration (days)</label>
                <input name="${key}[durationDays]" value="${p.durationDays||''}" type="number" min="1" required
                  style="width:100%;background:#16213e;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 10px;color:#f0f0f0;margin-top:4px;font-size:13px">
              </div>
              <div style="margin-bottom:10px">
                <label style="font-size:11px;color:#a0a0b0;text-transform:uppercase;letter-spacing:0.5px">Max Applications</label>
                <input name="${key}[applications]" value="${p.applications||''}" type="number" min="1" required
                  style="width:100%;background:#16213e;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 10px;color:#f0f0f0;margin-top:4px;font-size:13px">
              </div>
              <div style="margin-bottom:10px">
                <label style="font-size:11px;color:#a0a0b0;text-transform:uppercase;letter-spacing:0.5px">Highlight (e.g. Get 4 Days Free)</label>
                <input name="${key}[highlight]" value="${p.highlight||''}"
                  style="width:100%;background:#16213e;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 10px;color:#f0f0f0;margin-top:4px;font-size:13px">
              </div>
              <div>
                <label style="font-size:11px;color:#a0a0b0;text-transform:uppercase;letter-spacing:0.5px">Description</label>
                <textarea name="${key}[description]" rows="3"
                  style="width:100%;background:#16213e;border:1px solid rgba(124,58,237,0.3);border-radius:6px;padding:8px 10px;color:#f0f0f0;margin-top:4px;font-size:12px;resize:vertical">${p.description||''}</textarea>
              </div>
              <input type="hidden" name="${key}[active]" value="true">
            </div>`;
          }).join('')}
        </div>
        <button type="submit" class="btn-sm btn-primary" style="padding:10px 24px;font-size:14px">💾 Save Plan Config</button>
      </form>
    </div>

    <div class="section-title">📱 WhatsApp Scraping Controls</div>
    <div class="card">
      <form method="POST" action="/admin/toggle-whatsapp-scraping" style="display:inline;margin-right:12px">
        <input type="hidden" name="enabled" value="${waScrapingEnabled ? 'false' : 'true'}">
        <button type="submit" class="btn-sm ${waScrapingEnabled ? 'btn-danger' : 'btn-success'}">
          ${waScrapingEnabled ? '⏸ Pause Scraping' : '▶ Resume Scraping'}
        </button>
      </form>
      <span style="font-size:13px;color:#a0a0b0">Status: <span style="color:${waScrapingEnabled ? '#10b981' : '#ef4444'};font-weight:600">${waScrapingEnabled ? 'Running' : 'Paused'}</span></span>

      <div style="margin-top:20px">
        <div class="card-title">Poll Frequency</div>
        <form method="POST" action="/admin/update-whatsapp-config" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:8px">
          <input type="hidden" name="whatsappScraping" value="${waScrapingEnabled}">
          <select name="pollIntervalMinutes"
            style="background:#0f3460;border:1px solid rgba(124,58,237,0.3);color:#f0f0f0;border-radius:8px;padding:9px 14px;font-size:13px;outline:none;cursor:pointer">
            ${[
              {val:30,  label:'Every 30 minutes'},
              {val:60,  label:'Every 1 hour'},
              {val:180, label:'Every 3 hours'},
              {val:360, label:'Every 6 hours'},
              {val:720, label:'Every 12 hours'},
              {val:1440,label:'Every 24 hours'},
            ].map(o => `<option value="${o.val}" ${waPollInterval==o.val?'selected':''}>${o.label}</option>`).join('')}
          </select>
          <button type="submit" class="btn-sm btn-primary">Apply Frequency</button>
          <span style="font-size:12px;color:#a0a0b0">Current: every ${waPollInterval} minute(s). Restart server to apply frequency changes.</span>
        </form>
      </div>
    </div>

  </div>
</body>
</html>`);
});

// ============================================================
// PAYMENT GATEWAY — PAYSTACK + MONNIFY
// ============================================================

// Price map loaded dynamically from DB via getPlanConfig()
async function getPaymentPriceInfo(plan) {
  const config = await getPlanConfig();
  const p = config[plan.toLowerCase()];
  if (!p) return null;
  return { naira: p.price, kobo: p.price * 100, label: p.name + ' Plan' };
}

// Helper — activate plan after confirmed payment
async function activatePlanAfterPayment(userId, plan, req) {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    const _planCfg = await getPlanConfig();
    const durationInDays = (_planCfg[plan.toLowerCase()] && _planCfg[plan.toLowerCase()].durationDays) || 20;
    const startDate = new Date();
    const expirationDate = new Date(startDate);
    expirationDate.setDate(startDate.getDate() + durationInDays);
    const subscriptionData = {
      plan: plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase(),
      date: startDate.toISOString(),
      durationInDays,
      expirationDate: expirationDate.toISOString(),
    };
    await db.collection('Users_CV_biodata').updateOne(
      { _id: userId },
      {
        $set: {
          subscription: subscriptionData,
          'interviewHelper.access': true,
          'interviewHelper.source': 'intellijob_subscription',
          'interviewHelper.unlockedAt': new Date(),
        }
      }
    );
    await db.collection('payment_logs').insertOne({
      userId,
      plan: subscriptionData.plan,
      amount: (await getPaymentPriceInfo(plan))?.naira || 0,
      activatedAt: new Date(),
      expiresAt: expirationDate,
    });
    console.log(`[Payment] Plan ${plan} activated for user ${userId}`);
    // Trigger main application cycle
    if (req && req.session) {
      main(req, { status: () => ({ json: () => {} }), json: () => {}, send: () => {}, redirect: () => {} }).catch(err => console.error('[Payment] main() error:', err.message));
    }
  } catch(e) {
    console.error('[Payment] activatePlan error:', e.message);
  } finally {
    await client.close();
  }
}

// PAYSTACK — Initiate payment
app.post('/api/initiate-payment', isAuthenticated, async (req, res) => {
  const { plan } = req.body;
  const userId = req.session.userId;
  const priceInfo = await getPaymentPriceInfo(plan);
  if (!plan || !priceInfo) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const user = await client.db('olukayode_sage').collection('Users_CV_biodata')
      .findOne({ _id: userId }, { projection: { email: 1, name: 1 } });
    await client.close();
    const reference = `SUN_${plan.toUpperCase()}_${userId.replace(/[^a-zA-Z0-9]/g,'')}_${Date.now()}`;
    const paystackRes = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: user.email,
      amount: priceInfo.kobo,
      reference,
      callback_url: `${process.env.APP_BASE_URL}/api/verify-payment`,
      metadata: {
        userId,
        plan: plan.toLowerCase(),
        userName: user.name,
        custom_fields: [
          { display_name: 'Plan', variable_name: 'plan', value: priceInfo.label },
          { display_name: 'User ID', variable_name: 'userId', value: userId },
        ]
      }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const { authorization_url } = paystackRes.data.data;
    res.json({ success: true, paymentUrl: authorization_url, reference });
  } catch(e) {
    console.error('[Paystack] initiate error:', e.message);
    res.status(500).json({ success: false, message: 'Could not initiate payment. Please try again.' });
  }
});

// PAYSTACK — Verify payment (callback URL after checkout)
app.get('/api/verify-payment', async (req, res) => {
  const { reference, trxref } = req.query;
  const ref = reference || trxref;
  if (!ref) return res.redirect('/dashboard?error=' + encodeURIComponent('No payment reference found'));
  try {
    const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${ref}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });
    const data = paystackRes.data.data;
    if (data.status !== 'success') {
      return res.redirect('/dashboard?error=' + encodeURIComponent('Payment was not successful. Please try again.'));
    }
    const { userId, plan } = data.metadata;
    if (!userId || !plan) {
      return res.redirect('/dashboard?error=' + encodeURIComponent('Payment metadata missing. Contact support.'));
    }
    await activatePlanAfterPayment(userId, plan, req);
    res.redirect('/dashboard?success=' + encodeURIComponent(`${plan.charAt(0).toUpperCase()+plan.slice(1)} plan activated! Your applications will start shortly.`));
  } catch(e) {
    console.error('[Paystack] verify error:', e.message);
    res.redirect('/dashboard?error=' + encodeURIComponent('Payment verification failed. Contact support if charged.'));
  }
});

// PAYSTACK — Webhook (server-to-server confirmation)
app.post('/api/paystack-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = require('crypto').createHmac('sha512', secret).update(req.body).digest('hex');
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Invalid signature');
  }
  const event = JSON.parse(req.body);
  if (event.event === 'charge.success') {
    const { metadata, status } = event.data;
    if (status === 'success' && metadata?.userId && metadata?.plan) {
      await activatePlanAfterPayment(metadata.userId, metadata.plan, null);
    }
  }
  res.sendStatus(200);
});

// MONNIFY — Initiate payment (returns payment link)
app.post('/api/initiate-monnify-payment', isAuthenticated, async (req, res) => {
  const { plan } = req.body;
  const userId = req.session.userId;
  const priceInfo = await getPaymentPriceInfo(plan);
  if (!plan || !priceInfo) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const user = await client.db('olukayode_sage').collection('Users_CV_biodata')
      .findOne({ _id: userId }, { projection: { email: 1, name: 1 } });
    await client.close();
    const reference = `SUN_MON_${plan.toUpperCase()}_${Date.now()}`;
    // Get Monnify access token
    const authStr = Buffer.from(`${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`).toString('base64');
    const tokenRes = await axios.post('https://api.monnify.com/api/v1/auth/login', {}, {
      headers: { Authorization: `Basic ${authStr}` }
    });
    const accessToken = tokenRes.data.responseBody.accessToken;
    // Initialize transaction
    const monnifyRes = await axios.post('https://api.monnify.com/api/v1/merchant/transactions/init-transaction', {
      amount: priceInfo.naira,
      customerName: user.name || 'Suntrenia User',
      customerEmail: user.email,
      paymentReference: reference,
      paymentDescription: priceInfo.label,
      currencyCode: 'NGN',
      contractCode: process.env.MONNIFY_CONTRACT_CODE,
      redirectUrl: `${process.env.APP_BASE_URL}/api/verify-monnify-payment`,
      paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
      metadata: { userId, plan: plan.toLowerCase() }
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { checkoutUrl } = monnifyRes.data.responseBody;
    res.json({ success: true, paymentUrl: checkoutUrl, reference });
  } catch(e) {
    console.error('[Monnify] initiate error:', e.message);
    res.status(500).json({ success: false, message: 'Could not initiate Monnify payment.' });
  }
});

// MONNIFY — Verify payment (redirect callback)
app.get('/api/verify-monnify-payment', async (req, res) => {
  const { paymentReference } = req.query;
  if (!paymentReference) return res.redirect('/dashboard?error=' + encodeURIComponent('No payment reference'));
  try {
    const authStr = Buffer.from(`${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`).toString('base64');
    const tokenRes = await axios.post('https://api.monnify.com/api/v1/auth/login', {}, {
      headers: { Authorization: `Basic ${authStr}` }
    });
    const accessToken = tokenRes.data.responseBody.accessToken;
    const verifyRes = await axios.get(
      `https://api.monnify.com/api/v2/transactions/${encodeURIComponent(paymentReference)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const txData = verifyRes.data.responseBody;
    if (txData.paymentStatus !== 'PAID') {
      return res.redirect('/dashboard?error=' + encodeURIComponent('Payment not confirmed. Try again.'));
    }
    const { userId, plan } = txData.metaData || {};
    if (!userId || !plan) {
      return res.redirect('/dashboard?error=' + encodeURIComponent('Payment metadata missing.'));
    }
    await activatePlanAfterPayment(userId, plan, req);
    res.redirect('/dashboard?success=' + encodeURIComponent(`${plan.charAt(0).toUpperCase()+plan.slice(1)} plan activated successfully!`));
  } catch(e) {
    console.error('[Monnify] verify error:', e.message);
    res.redirect('/dashboard?error=' + encodeURIComponent('Monnify verification failed. Contact support.'));
  }
});

// MONNIFY — Webhook
app.post('/api/monnify-webhook', async (req, res) => {
  try {
    const hash = require('crypto')
      .createHmac('sha512', process.env.MONNIFY_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash !== req.headers['monnify-signature']) {
      return res.status(401).send('Invalid signature');
    }
    const { eventType, eventData } = req.body;
    if (eventType === 'SUCCESSFUL_TRANSACTION') {
      const { metaData, paymentStatus } = eventData;
      if (paymentStatus === 'PAID' && metaData?.userId && metaData?.plan) {
        await activatePlanAfterPayment(metaData.userId, metaData.plan, null);
      }
    }
    res.sendStatus(200);
  } catch(e) {
    console.error('[Monnify] webhook error:', e.message);
    res.sendStatus(500);
  }
});
// ============================================================
// ============================================================
// USER DATA API ENDPOINTS
// ============================================================
app.get('/api/get-user-status', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    const user = await db.collection('Users_CV_biodata').findOne(
      { _id: userId },
      { projection: { autoMode: 1, interviewHelper: 1 } }
    ) || {};
    const status = await db.collection('application_status').findOne({ userId }) || {};
    res.json({
      autoMode: user.autoMode || false,
      successfulApplications: status.successfulApplications || 0,
      isStopped: status.isStopped || false,
      interviewHelper: user.interviewHelper?.access || false
    });
  } catch(e) {
    console.error('[get-user-status]', e.message);
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.get('/api/get-user-apps', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('olukayode_sage');
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    const recent = await db.collection('applicationProcessingFeeder')
      .find({ userId, role_processed: true })
      .sort({ processedAt: -1 }).limit(20).toArray();
    const total = await db.collection('applicationProcessingFeeder')
      .countDocuments({ userId, role_processed: true });
    const today = await db.collection('applicationProcessingFeeder')
      .countDocuments({ userId, role_processed: true, processedAt: { $gte: startOfDay } });
    const week = await db.collection('applicationProcessingFeeder')
      .countDocuments({ userId, role_processed: true, processedAt: { $gte: startOfWeek } });
    const autoLogs = await db.collection('autoMode_daily_log')
      .find({ userId, date: { $gte: startOfDay } }).toArray();
    res.json({ total, today, week, recent, autoLogs });
  } catch(e) {
    console.error('[get-user-apps]', e.message);
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.get('/api/get-subscription-details', isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const user = await client.db('olukayode_sage').collection('Users_CV_biodata')
      .findOne({ _id: userId }, { projection: { subscription: 1 } });
    if (!user || !user.subscription) {
      return res.json({ subscriptionData: null });
    }
    const sub = user.subscription;
    const startDate = new Date(sub.date);
    const expirationDate = new Date(sub.expirationDate);
    const currentDate = new Date();
    const elapsedTime = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const subscriptionStatus = currentDate > expirationDate ? 'Expired' : 'Active';
    res.json({
      subscriptionData: {
        subscriptionPlan: sub.plan,
        subscriptionDuration: sub.durationInDays,
        subscriptionElapsed: elapsedTime,
        subscriptionStarts: startDate.toISOString().split('T')[0],
        subscriptionExpires: expirationDate.toISOString().split('T')[0],
        subscriptionStatus
      }
    });
  } catch(e) {
    console.error('[get-subscription-details]', e.message);
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

// ============================================================
// PLAN CONFIG — SINGLE SOURCE OF TRUTH
// ============================================================
const DEFAULT_PLANS = {
  basic:    { name: 'Basic',    price: 9500,  applications: 20, durationDays: 15, description: 'Full job search and application automation. Personalised job matches handled for you.', highlight: '', active: true },
  standard: { name: 'Standard', price: 19000, applications: 20, durationDays: 20, description: 'Everything in Basic plus priority processing, personalised recommendations, and career webinars.', highlight: 'Get 4 Days Free', active: true },
  premium:  { name: 'Premium',  price: 48000, applications: 24, durationDays: 30, description: 'Everything in Standard plus direct recruiter connections, AI resume optimization, interview prep, and VIP listings.', highlight: 'Get 7 Days Free', active: true }
};

async function getPlanConfig() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const doc = await client.db('olukayode_sage').collection('plan_config').findOne({ _id: 'plans' });
    if (doc && doc.basic && doc.standard && doc.premium) {
      return { basic: doc.basic, standard: doc.standard, premium: doc.premium };
    }
    return DEFAULT_PLANS;
  } catch(e) {
    console.error('[PlanConfig] Failed to read, using defaults:', e.message);
    return DEFAULT_PLANS;
  } finally {
    await client.close();
  }
}

app.get('/api/get-plan-config', async (req, res) => {
  try {
    const plans = await getPlanConfig();
    res.json({ success: true, plans });
  } catch(e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.post('/admin/update-plan-config', adminAuth, async (req, res) => {
  const { basic, standard, premium } = req.body;
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const update = {};
    if (basic.price) update.basic = {
      name: 'Basic',
      price: parseInt(basic.price),
      applications: parseInt(basic.applications),
      durationDays: parseInt(basic.durationDays),
      description: basic.description || DEFAULT_PLANS.basic.description,
      highlight: basic.highlight || '',
      active: basic.active === 'true'
    };
    if (standard.price) update.standard = {
      name: 'Standard',
      price: parseInt(standard.price),
      applications: parseInt(standard.applications),
      durationDays: parseInt(standard.durationDays),
      description: standard.description || DEFAULT_PLANS.standard.description,
      highlight: standard.highlight || '',
      active: standard.active === 'true'
    };
    if (premium.price) update.premium = {
      name: 'Premium',
      price: parseInt(premium.price),
      applications: parseInt(premium.applications),
      durationDays: parseInt(premium.durationDays),
      description: premium.description || DEFAULT_PLANS.premium.description,
      highlight: premium.highlight || '',
      active: premium.active === 'true'
    };
    await client.db('olukayode_sage').collection('plan_config').updateOne(
      { _id: 'plans' },
      { $set: { ...update, updatedAt: new Date(), updatedBy: 'admin' } },
      { upsert: true }
    );
    res.redirect('/admin?success=Plan+configuration+updated+successfully');
  } catch(e) {
    res.redirect('/admin?error=' + encodeURIComponent(e.message));
  } finally {
    await client.close();
  }
});

app.post('/admin/update-whatsapp-config', adminAuth, async (req, res) => {
  const { whatsappScraping, pollIntervalMinutes } = req.body;
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await client.db('olukayode_sage').collection('app_settings').updateOne(
      { _id: 'global' },
      { $set: {
        whatsappScraping: whatsappScraping === 'true',
        pollIntervalMinutes: parseInt(pollIntervalMinutes) || 30,
        updatedAt: new Date()
      }},
      { upsert: true }
    );
    res.redirect('/admin?success=WhatsApp+config+updated');
  } catch(e) {
    res.redirect('/admin?error=' + encodeURIComponent(e.message));
  } finally {
    await client.close();
  }
});
// ============================================================
// ============================================================
const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////





