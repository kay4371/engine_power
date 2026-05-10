///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');
const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const { PorterStemmer } = natural;
const nodemailer = require("nodemailer");
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
const pdf = require('html-pdf');
const PDFDocument = require('pdfkit');
const fetch = require('node-fetch');
const FormData = require('form-data');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const mongoUrl = 'mongodb+srv://OlukayodeUser:Kayode4371@cluster0.zds6pi9.mongodb.net/olukayode_sage?retryWrites=true&w=majority';
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
// Set up a route for the new visitor page




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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(helmet());
app.use(logger('dev'));
app.use(cors());


app.use((req, res, next) => {
  req.generatedCode = generatedCode;
  next();
});
const token = process.env.TOKEN;
// const token = process.env.TOKEN;
const token2 = process.env.TOKEN2;
const WHAPI_TOKEN3 = process.env.WHAPI_TOKEN3

// S36GOqY9anD6SGA7KPynscPVxdju24fN


// notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX


// // Set up S3 client
// const s3 = new aws.S3({
//    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
//    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-west-2"
// })


// // Set up multer and S3 storage
// const uploadS3 = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: 'profile-picture-upload-youtube1',
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString() + '-' + file.originalname);
//       },
//     })
//   });


// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIAVBYTAVV7RFPLPENC",
  secretAccessKey: "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",
  region: "us-west-2"
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


app.use(session({
  secret: sessionSecret, // Use the generated secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));




// Set up MongoDB connection
let registrationDetails = []; // Define a variable to store registration details
const uri = 'mongodb+srv://OlukayodeUser:Kayode4371@cluster0.zds6pi9.mongodb.net/olukayode_sage?retryWrites=true&w=majority'
const client = new MongoClient(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })




// Helper function to connect to MongoDB
async function getDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('olukayode_sage'); // replace with your actual database name
}


app.use(express.json());
// app.use(session({
//   secret: sessionSecret,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: uri,
//     dbName: 'olukayode_sage',
//     collectionName: 'sessions'
//   }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));


app.use(session({
  secret: generatedCode, // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));




app.get("/", (req, res) => {
  res.sendFile(path.join(htmlDir, 'index.html'));
});


// ///////with harshing////////////////////////////////////////
// // Check login status endpoint
// app.get('/check_login_status', (req, res) => {
//   // Check if the user is logged in based on the session
//   if (req.session && req.session.userId) {
//       // User is logged in
//       res.status(200).send('User logged in');
//   } else {
//       // User is not logged in
//       res.status(401).send('User not logged in');
//   }
// });



// // Logout endpoint
// app.post('/logout', (req, res) => {
//   // Clear session data
//   req.session.destroy(err => {
//       if (err) {
//           console.error('Error destroying session:', err);
//           res.status(500).json({ message: 'Error logging out' });
//       } else {
//           // Respond with a success message
//           res.status(200).json({ message: 'Logout successful' });
//       }
//   });
// });


// app.post('/register', async (req, res) => {
//   console.log('Received Registration Request:', req.body);

//   const { phoneNumber, selectedRole, verificationCode, name, email, password, confirmPassword } = req.body;

//   if (!phoneNumber || !selectedRole || !name || !email || !password || !confirmPassword) {
//     console.log('Validation Failed - Missing Parameters');
//     return res.status(400).json({ message: 'Bad Request - Missing parameters' });
//   }

//   const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const db = client.db("olukayode_sage");
//     const collection = db.collection('user_config_databse');
//     const collection2 = db.collection('registered_user_config_database');
//     const userConfig = await collection.findOne({ phoneNumber });

//     if (!userConfig) {
//       console.log('Access Denied - Phone number not configured for any role');
//       return res.status(403).json({ message: 'Access Denied - Phone number not configured for any role' });
//     }

//     if (selectedRole !== userConfig.configuredRole) {
//       console.log('Access Denied - Invalid account type');
//       return res.status(403).json({ message: 'Access Denied - Invalid account type' });
//     }

//     console.log("Entered code:", verificationCode);
//     console.log("Generated code:", globalVerificationCode);

//     // Add more logging to see the comparison result
//     const isValidVerificationCode = verifyCode(verificationCode, globalVerificationCode);
//     console.log('Is Valid Verification Code:', isValidVerificationCode);

//     if (!isValidVerificationCode) {
//       console.log('Access Denied - Invalid verification code');
//       return res.status(403).json({ message: 'Access Denied - Invalid verification code' });
//     }

//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, 10); // Use an appropriate saltRounds value

//     // Save user details along with the hashed password in the database
//     const result = await collection2.insertOne({
//       _id: new ObjectId(),
//       name,
//       email,
//       phoneNumber,
//       configuredRole: selectedRole,
//       configured: true,
//       passwordHash: hashedPassword,
//     });

//     const token = jwt.sign({ phoneNumber, selectedRole }, secretKey, { expiresIn: '7m' });
//     console.log('Registration successful - Token:', token);
//     res.status(200).json({ message: 'Registration successful', token, verificationCode: globalVerificationCode });
//     // res.redirect('/index.html'); 
//   } catch (error) {
//     console.error(error);
//     // res.status(500).json({ message: 'Error registering user' });
//   } finally {
//     await client.close();
//   }
// });


// app.post('/configureUserAccount', async (req, res) => {
//   const { phoneNumber, configuredRole } = req.body;

//   // Validate input
//   if (!phoneNumber || !configuredRole) {
//     console.log('Validation Failed - Missing Parameters');
//     return res.status(400).json({ message: 'Bad Request - Missing parameters' });
//   }

//   // Normalize the phone number before processing
//   const cleanedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
//   const normalizedPhoneNumber = cleanedPhoneNumber.startsWith('0') ? `+234${cleanedPhoneNumber.slice(1)}` : `+234${cleanedPhoneNumber}`;

//   // Create a new MongoClient
//   const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to MongoDB
//     await client.connect();

//     // Select the database and collection
//     const db = client.db(dbName);
//     const collectionName = 'user_config_databse'; // Replace with your collection name
//     const collection = db.collection(collectionName);

//     // Check if the user is already configured
//     const existingUser = await collection.findOne({ phoneNumber: normalizedPhoneNumber });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Bad Request - Phone number already configured for ' + existingUser.configuredRole });
//     }

//     // Save user configuration status to MongoDB
//     await collection.insertOne({ phoneNumber: normalizedPhoneNumber, configuredRole, configured: true });

//     res.status(200).json({ message: 'User account configured successfully' });
  
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error configuring user account' });
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });


// let globalVerificationCode = "";

// // Move the function to the global scope
// const generateVerificationCode2 = () => {
//   const codeLength = 4; // Adjust the code length as needed
//   const min = Math.pow(10, codeLength - 1);
//   const max = Math.pow(10, codeLength) - 1;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// app.post('/generateVerificationCode', async (req, res) => {
//   // Log the received parameters for debugging
//   console.log('Received Parameters:', req.body);

//   const { phoneNumber, verificationCode, name, email, password, confirmPassword, role } = req.body;

//   // Validate input
//   if (!phoneNumber || !name || !email || !password || !confirmPassword || !role) {
//     console.log('Validation Failed - Missing Parameters');
//     return res.status(400).json({ message: 'Bad Request - Missing parameters' });
//   }

//   // Check if password matches confirm password
//   if (password !== confirmPassword) {
//     console.log('Validation Failed - Passwords do not match');
//     return res.status(400).json({ message: 'Bad Request - Passwords do not match' });
//   }

//   // Create a new MongoClient
//   const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to MongoDB
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const collection = database.collection('user_config_databse');

//     // Check if the user is configured
//     const user = await collection.findOne({ phoneNumber, configured: true });

//     if (!user) {
//       console.log('User not configured. Cannot generate verification code.');
//       return res.status(400).json({ message: 'Bad Request - User not configured' });
//     }

//     // Extract the first name or the first word of the name
//     const firstName = name.split(' ')[0];

//     // Check if phoneNumber is a string before attempting to clean and format it
//     const cleanAndFormatPhoneNumber2 = (phoneNumber) => {
//       if (typeof phoneNumber !== 'string') {
//         console.error('Invalid phoneNumber:', phoneNumber);
//         return phoneNumber;
//       }

//       const cleanedNumber = phoneNumber.replace(/\D/g, '');
//       const formattedNumber = cleanedNumber.startsWith('234') ? cleanedNumber : `234${cleanedNumber.slice(1)}`;
//       return formattedNumber;
//     };

//     const formattedNumber = cleanAndFormatPhoneNumber2(phoneNumber);

//     console.log("nnn", formattedNumber);

//     // Generate a verification code for the user
//     const generatedCode = generateVerificationCode2();
//     globalVerificationCode = generatedCode;
//     console.log('Generated Code:', globalVerificationCode);

//     // Send the verification code message only when the validation conditions are met
//     const messageCode = `Dear ${firstName},\n\nYour *${role} account* setup is underway. Please use the one-time verification code: *${generatedCode}* to complete the process. This code is valid for 7 minutes.\n\nWelcome to Mota Security Oracle!`;

//     const token2 = process.env.TOKEN;

//     const options = {
//       method: 'POST',
//       url: 'https://gate.whapi.cloud/messages/text',
//       headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: `Bearer ${token2}`,
//       },
//       data: {
//         to: `${formattedNumber}@s.whatsapp.net`,
//         body: messageCode,
//       },
//     };

//     const response = await axios.request(options);
//     console.log(response.data);

//     res.status(200).json({ success: true, message: 'Verification code sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error sending Verification' });
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });

  // Register a new user
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const db = await getDb();
      const userCollection = db.collection('users');
      const hashedPassword = await bcrypt.hash(password, 10);
      await userCollection.insertOne({ username, password: hashedPassword });
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    }
  });
  
  // Login a user
  app.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;
  
    try {
      const db = await getDb();
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ phoneNumber });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found. Please create an account.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const token = jwt.sign({ userId: user._id }, sessionSecret, { expiresIn: '1h' });
      req.session.token = token;
  
      res.json({
        token,
        userName: user.name, // Assuming user has a name field
        redirect: '/dashboard' // Adjust redirect URL as needed
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
  app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to your dashboard');
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

const groupId= "2347035517578"


// Function to generate and save PDF
// function generateAndSavePdf(content, filename) {
//   const options = { format: 'A4' }; // Optional format setting

//   const file = { content };

//   html_to_pdf.generatePdf(file, options)
//     .then(pdfBuffer => {
//       // Create downloads folder if it doesn't exist
//       const downloadsDir = path.join(__dirname, 'downloads');
//       if (!fs.existsSync(downloadsDir)) {
//         fs.mkdirSync(downloadsDir);
//       }

//       const filePath = path.join(downloadsDir, filename + '.pdf');
//       fs.writeFile(filePath, pdfBuffer, err => {
//         if (err) {
//           console.error('Error saving PDF:', err);
//         } else {
//           console.log(`PDF saved successfully to: ${filePath}`);
//         }
//       });
//     })
//     .catch(error => {
//       console.error('Error generating PDF:', error);
//     });
// }

// // Example usage: Replace "<h1>Welcome...</h1>" with your HTML content
// const htmlContent = "<h1>Welcome to html-pdf-node</h1>";
// const filename = "my_pdf"; // Customize the filename

// generateAndSavePdf(htmlContent, filename);


// let options = { format: 'A4' };
// // Example of options with args //
// // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
// // or //
// let file = { url: "https://example.com" };
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//   console.log("PDF Buffer:-", pdfBuffer);
// });



const generateSVGMap = () => {
  // Your dynamic SVG generation logic goes here
  return `
  
  <div class="map-container">
   
    <svg width="800" height="610">   

  <rect x="10" y="10" width="740" height="900" fill="#f0f0f0" stroke="#ccc" stroke-width="2" />
  
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="20" fill="#000000" text-anchor="middle">Security Incident Map</text>

  <svg id="nigerian-map" x="20" y="20" width="750" height="650" viewBox="0 100 800 500">

 <path
 d="m 291.01165,491.65874 0.6,0.77 4.83,-0.89 2.71,0.27 2.05,1.34 0.33,1.46 0,0 0.07,4.36 -0.55,2.86 0.05,0.73 0.94,1.03 14.09,0.86 1.24,1.86 0.22,2.19 0.7,1.04 3.21,2.33 1.34,0.21 0,0 1.08,1.29 -0.59,3.72 0.15,3.78 1.37,4.63 0.73,1.68 1.71,2 0.76,2.55 -0.6,1.21 -3.42,-0.76 0,0 -2.69,-2.61 -2.54,-0.84 -2.76,-2.14 -0.58,-2.11 -1.19,-1.47 -3.4,-0.91 -2.42,0.14 -0.28,0.91 0.53,3.51 -1.84,5.1 0.32,0.45 2.23,-0.16 -0.7,2.44 -0.73,0.9 -6.08,-0.16 -1.1,0.98 -0.07,0.75 1.07,1.94 -1.21,5.81 -0.03,2.4 0.66,2.49 -1.17,2.89 -2.52,1.94 0.09,0.77 -0.47,0.64 0.22,1.47 0.59,0.67 0.02,1.17 -0.67,1.62 1.79,3.37 0.13,1.85 0,0 -2.36,-1.79 -2.94,-1.41 -1.8,0.43 -3.28,-1.22 -2.79,0.12 -1.11,0.64 -3.13,0.58 -1.8,-0.27 -1.45,-1.41 -0.59,-1.1 0.16,-1.1 1.37,-3.7 3.42,-4.33 2.39,-4.19 -0.05,-2.78 -0.66,-1.72 -0.54,-0.05 0,0 3.09,-10.25 2.1,-3.87 1.82,-1.68 1.18,-3.04 0.89,-0.9 0.43,-2.01 -0.36,-3.45 0.28,-2.05 -1.51,-2.44 1.23,-0.77 -0.38,-8.47 -0.47,-1.35 -1.04,-1.45 -5.34,-1.78 -2.01,-1.69 0,0 1.27,-2.22 1.36,-1.3 z"
 title="Abia"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-AB" />


<path
 d="m 682.64165,187.16874 -0.13,1.83 -0.82,1.76 -1.02,1.57 -1.1,0.83 -1.77,2.9 -1.36,4.89 -2.66,2.45 -0.48,1.1 -0.61,3.01 0.72,3.61 0.77,1.06 0,1.7 -1.61,1.66 -0.26,4.61 -0.97,1.67 0.13,3.45 -0.78,1.94 -2.05,2.57 -0.26,3.02 -1.61,1.04 -1.44,2.61 -5.87,1.16 -4.18,5.88 0.15,0.98 1.54,1.62 0.04,0.64 -1.15,2.74 -1.85,1.39 -0.03,1.77 0.69,1.6 2.69,1.33 1.01,1.59 -2.16,3.09 -0.13,2.25 -0.54,1.29 0.27,1.11 -1.08,1.47 0.33,0.78 -0.22,1.41 0.43,0.63 -0.74,2.2 -1.02,1.64 -0.97,-0.13 -1.7,1.32 -8.01,0.82 -2.75,2.16 -1.62,0.29 -3.76,3.39 -3.76,1.98 0.09,1.34 2.37,0.27 0.49,0.42 0.09,7.48 -0.73,0.69 -0.83,4.41 0.84,2.07 -1.16,4.03 0.3,1.32 -2.81,4.8 -2.64,2.3 -0.01,1 0.71,0.99 -0.82,2.05 1.27,3.92 -1.13,1.85 -1.09,0.38 -1.67,-0.23 -1.46,0.54 -0.57,1.1 -0.16,2.73 -0.98,0.74 -0.99,1.85 -2.18,0.19 -3.4,2.76 -0.83,0.12 -5.88,-1.64 -0.66,0.66 -0.24,1.71 -1.18,1.16 -0.81,3.05 -1.77,2.34 -2.33,0.14 -1.12,0.89 -2.47,-0.28 -1.85,1.21 -1.91,0.33 -0.72,0.82 -0.68,4.04 1.44,5.22 0.58,5.77 -0.06,1.04 -0.77,0.56 -2.43,4.51 0.62,2.51 0.22,3.73 -4.13,6.35 -3.49,3.09 -1.76,3.01 -0.48,2 -1.12,1.47 -0.41,3.45 -1.11,1.56 0.69,6.14 0.65,1.8 -2.93,1.48 -1.96,0.27 -2.75,3.14 0,0 -1.22,-0.88 0.05,-1.56 -1.94,-4.62 -0.38,-3.54 -0.74,-1.73 0.58,-5.49 -1.04,-2.02 -2.15,-2.6 -4.32,-3.84 -2.5,-3.15 -1.52,-1.12 -1.42,-0.43 -1.64,0.38 -2.83,4.01 -2.72,1.99 -2.71,-2.45 -2.91,-4.7 -2.52,-6.73 0.82,-1.58 4.14,-4.78 3.8,-3.22 5.08,-5.48 8.63,-11.52 6.12,-5.22 0.44,-2.08 -0.38,-5.78 5.99,-11.44 1,-3.62 -0.26,-1.81 -2.02,-3.84 -4.14,-1.47 -2.66,-2.94 -0.34,-3.84 0.46,-2.17 -5.26,-9.82 -2.08,-1.29 -4.65,-1.08 -1.46,-1.92 -5.45,-10.18 0,0 6.2,-0.91 3.37,-1.43 9.4,-5.66 5.75,-4 1.1,-2.33 -0.52,-3.7 0.68,-10.23 0,0 6.34,0.97 2.7,-0.19 4.57,-1.32 1.74,-1.07 1.7,-1.9 3.73,-5.55 6.2,-7.06 2.51,-0.87 6.29,-0.49 5.9,-2.22 2.44,-2.62 0.82,-2.66 3.32,-0.14 2.35,-1.14 2.22,-3.7 2.1,-2.16 2.51,-1.47 8.52,0.79 2.87,1.03 2.58,1.55 2.84,3.11 2.43,1.15 2.38,1.02 4.39,-0.01 1.14,-1.22 1.48,-7.76 2.71,-5.68 1.22,-3.64 0.88,-4.1 0.28,-8.01 3.09,-0.43 0.62,0.74 3.75,1.14 3.86,-0.29 5.62,-1.74 0,0 z"
 title="Adamawa"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-AD" />


<path
 d="m 302.91165,585.31874 0,0.01 0,0 -0.02,-0.02 0,0 0.02,0.01 z m 7.57,-0.7 0.97,0.5 0.92,-0.19 0.88,-0.14 0.33,0.28 -3.58,0.75 -0.49,-0.59 0.97,-0.61 z m 40.31,-7.56 0.88,2.09 -0.76,0.82 -1.07,0.22 -0.22,-1.24 0.56,-0.1 0.35,-0.9 0.26,-0.89 z m -51.56,-11.07 -0.12,-1.85 -1.79,-3.36 0.67,-1.63 -0.02,-1.17 -0.59,-0.67 -0.22,-1.47 0.47,-0.65 -0.09,-0.77 2.52,-1.94 1.18,-2.89 -0.66,-2.49 0.02,-2.41 1.21,-5.81 -1.07,-1.94 0.07,-0.75 1.1,-0.98 6.09,0.16 0.73,-0.9 0.7,-2.44 -2.23,0.16 -0.32,-0.45 1.84,-5.1 -0.53,-3.51 0.29,-0.91 2.42,-0.14 3.4,0.91 1.19,1.47 0.58,2.11 2.75,2.14 2.54,0.84 2.69,2.61 0,0 -0.85,0.1 -1.15,2.45 0.66,1.79 0.84,0.31 0.78,1.94 4.77,-0.56 4.96,2.68 0.4,2.1 -0.61,6.1 1.63,5.13 3.41,4.91 3.19,2.8 3.77,4.33 3.67,2.81 0.59,1.01 0,0 -0.43,2.16 0.79,0.44 0.03,2.5 -0.5,0.45 -0.41,-0.67 -0.07,0.58 1.19,1.17 -0.6,1.8 -0.74,0.19 0.1,1.03 -1.03,1.15 0.24,0.17 -1.05,2.38 -5.23,-0.63 -5.74,-0.07 -10.71,0.55 -12.05,1.68 -0.52,-0.46 -1.82,0.36 -0.93,-0.48 -0.88,0.36 -0.95,-0.09 -0.02,0.03 0.5,0.81 0.27,0.43 -3.32,1.32 -0.98,-1.7 -1.17,-0.65 -0.86,-0.19 -0.96,-1.06 0.38,-0.91 -0.09,-0.12 -0.53,0.5 -0.5,-0.38 0,0 -0.61,-1.17 0.04,-0.64 0.51,-0.32 -0.58,-4.55 0.96,-4.27 -0.63,-2.3 -1.98,-3.47 z"
 title="Akwa Ibom"
  fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-AK" />


<path
 d="m 262.67165,444.90874 0.44,0.4 0.09,3.62 3.83,-0.13 2.44,1.41 2.05,0.08 3.73,1.7 0.36,0.79 -1.25,3.45 -0.75,1.08 -1.69,1.14 -1.85,2.48 0.24,0.96 -0.62,0.83 -0.43,2.35 0.39,0.54 3.85,1.16 1.42,1.8 1.34,3.64 1.31,1.85 -0.3,0.96 -0.82,0.29 0.41,1.37 -0.5,1.62 0.72,0.74 1.89,-1.13 0.61,0.13 0.59,2.58 1.33,0.63 -0.35,2.15 1.88,3.79 0.18,1.51 0.76,0.98 2.39,1.4 1.66,-0.96 1.08,0.09 1.12,0.74 -0.04,0.54 0.83,0.17 0,0 -4.4,2.31 -1.36,1.3 -1.27,2.22 0,0 -5.32,1.42 -5.38,-1.25 -6.31,1.16 -1.78,1.04 -0.93,3.55 -2.37,4.61 -2.68,0.27 -4.51,-1.92 -1.62,0.8 -3,3.83 -2.09,0.83 0,0 -2.4,-0.21 -1.11,-1.28 0,0 1.01,-1.17 1.92,-3.9 0.34,-2.64 1.77,-4.69 2.5,-4.55 0.38,-6.01 1.28,-3.65 -1.23,-3.77 -1.48,-7.29 0.08,-1.37 -1.13,-1.13 -2.13,-9.57 0,0 -0.07,-0.29 0,0 1.67,-0.77 3.59,0.66 1.43,-0.89 1.84,-2.51 0.06,-2.73 1.24,-4.12 2.24,-2.31 1.54,-0.86 z"
 title="Anambra"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-AN" />


<path
 d="m 491.94165,87.518745 7.74,6.19 1.14,2.93 0.77,7.079995 -0.19,1.81 3.16,4.66 0.21,6.74 0.33,2.7 0.95,2.71 0.2,3.87 8.35,20.91 -0.23,4.92 -1.05,2.72 -0.99,6.78 1.63,1.53 3.04,0.37 0,0 -0.8,0.24 -2.71,3.76 -6.04,3.28 -2.57,3.7 -2.01,1.75 -1.49,0.76 -3.91,0.88 -1.44,1.36 -1.38,2.03 -0.97,4.94 -2.61,7.43 -3.61,5.07 -0.2,1.38 7.38,2.99 1.14,1.71 0.87,7.15 0.88,1.15 7.2,2.62 2.08,4.94 -0.48,8.63 0.4,2.86 -0.83,1.76 -3.9,0.63 -1.99,0.92 -1.31,1.91 0.33,1.62 4.29,4.38 2.5,1.41 9.15,7.09 1.23,3.79 0.61,6.19 2.58,5.28 1.69,2.12 -0.13,0.95 -0.58,0.16 0,0 -3.99,-0.03 -6.44,-1.09 -10.59,4.85 -5.85,-0.78 -4.59,2.65 0,0 -6.36,-3.43 -6.18,-4.04 -11.07,-4.74 -9.26,-4.93 -2.57,-0.51 -7.6,-3.95 -3.03,1.78 -0.3,1.44 3.17,4.06 0.27,1.74 -0.5,1.67 -4.76,1.3 -2.89,5.21 -4.39,1.41 -10.04,0.59 -5.47,-1.48 -4.8,-0.27 -1.51,-0.53 -1.56,-1.34 -1.65,-4.07 -0.9,-1.16 -0.79,-0.71 -3.92,-1.42 -0.6,-0.85 0.09,-1.69 2.38,-4.47 0.23,-1.17 -0.26,-5.94 -0.97,-3.13 -1.8,-1.92 -1.06,-0.21 -10.97,2.19 0.04,-12.38 -0.78,-4.8 -2.61,-4.16 -2.78,-0.88 -3.18,-0.08 -1.53,0.49 0,0 -2.53,-2.71 -2.79,-1.75 -0.27,-0.73 2.35,-4.2 0.53,-3.96 0,0 0.99,-0.56 2.59,-4.09 1.33,-3.85 -0.08,-2 -0.77,-1.67 -3.86,-4.33 -0.45,-1.99 -0.4,-6.89 0.45,-3.5 1.6,-4.57 1.02,-0.43 2.7,0.16 2.04,-0.51 2.74,-3.21 2.65,-4.11 4.74,-4.17 0.67,-1.1 2.48,-1.57 1.69,-0.3 1.14,1.07 1.14,0.09 5.52,-2.17 0,0 1,-0.19 6,1.1 7.43,2.41 3.35,-1.46 2.3,0.73 1.78,3.67 3.13,0.21 7.7,-0.48 3.57,-0.91 1.14,0.3 2.67,4.9 0.54,2.15 -0.83,7.85 0.81,2.05 1.35,1.36 5.7,1.19 5.6,-1.39 1.56,0.17 1.86,1.36 2.46,0.62 1.86,-0.57 -1.11,-3.43 0.04,-1.8 1.53,-1.91 2.53,-1.36 4.04,-0.99 1.44,-0.78 1.85,-1.39 1.1,-2.72 -1.04,-1.46 -8.87,-0.56 -5.72,-1.27 -6.39,-0.77 -2.99,-1.85 -5.3,-7.42 -1.05,-2.5 -0.47,-2.57 -3.84,0.94 -1.18,-1.11 -0.55,-1.74 2.51,-5 -0.52,-4.32 -1.46,-4.42 -1.81,-0.5 -2.75,0.27 -2.12,1.03 -2.61,0.04 -1.35,-0.63 0.49,-4.26 3.22,-4.54 6.16,-0.46 5.47,-3.04 10.94,-3.73 6.23,-2.51 1.19,-0.94 -0.03,-2.25 -0.57,-1.88 6.71,-20.589995 4.54,-1.95 3.48,-0.55 0.99,0.82 0.83,1.64 0.12,1.39 z"
 title="Bauchi"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-BA" />
<path
 d="m 309.66165,367.75874 9.13,2.48 8.51,1.25 8.71,3.55 4.92,2.82 5.25,0.99 1.07,-0.14 3.32,2.8 5.33,2.23 1.14,-1.1 0.09,-1.36 -4.7,-11.64 -0.08,-2.52 1.02,-2.86 1.24,-1.41 3.95,-2.2 1.38,-0.28 2.59,-0.18 2.68,0.44 10.09,3.72 6.86,1.55 4.88,0.41 3.96,-0.22 0.01,-0.7 11.79,8.93 0,0 -3.79,5.97 1.9,0.57 6.12,-2.63 7.47,-0.95 8.18,0.48 7.48,1.77 5.14,4.9 4.44,5.65 8.37,7.57 -0.14,0.65 1.17,1.36 -0.26,1.04 0.56,1.78 -0.59,3.23 -2.38,5.89 0.29,5.92 -0.92,1.43 -3.09,1.94 -3.44,3.25 -3.31,6.16 -2.11,11.5 0.61,0.73 -0.33,1.08 -0.03,8.76 -1.9,8.19 0,0 -0.72,0.3 -2.12,-0.73 -0.78,1.42 0.1,2 -2.82,1.74 -1.79,0.22 -2.78,-0.44 0,0 -0.65,-1.55 -4.88,-6.63 -5.53,-5.73 -1.49,-0.72 -3.09,-0.22 -9.57,2.24 -4.38,-0.44 -1.21,-0.89 0.66,-4.77 -0.56,-1.64 -8.64,-5.38 -5.43,-1.69 -2.11,-0.07 -2.31,0.59 -2.11,0.67 -1.52,1.2 0.77,4.5 -3.14,1.92 -3.13,0.83 -3.84,-0.14 -2.06,-0.67 -1.92,0.45 -1.36,1.75 -2.36,1.96 -2.99,0.49 0,0 -1.7,-2.27 -0.84,-4.26 -1.76,-1.3 -1.02,2.31 -3.41,0.37 -1.77,2.88 -1.92,0.93 -2.95,-0.25 -3.45,0.4 -1.25,8.23 -0.99,2.05 -1.41,0.59 -1.78,-0.74 -4.01,-3.68 -0.65,-1.54 0.17,-0.91 0,0 2.28,-6.42 -0.9,-5.62 -1.42,-2.14 -1.52,-1.15 -2.81,-0.35 -2.21,2.11 -2.1,0.73 -2.92,-1.52 -3.58,-2.76 -2.89,-3.35 -2.74,-6.51 0.13,-0.53 0,0 0.41,-0.5 0.84,0.58 3.37,3.29 0.82,-0.1 1.35,1.05 1.76,0 0.34,-4.42 0.96,-1.44 6.44,-3.12 3.3,-3.11 1.94,-5.83 0.42,-3.93 0.47,-1.29 1.23,-1.21 0.36,-1.81 -1.48,-0.47 -3.31,0.32 -1.27,-1.05 -1.24,-5.53 -0.57,-6.81 -0.01,-6.9 -0.73,-1.85 -2.7,-2.61 -1.88,-3.22 -0.54,-5.87 z"
 title="Benue"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-BE" />
<path
 d="m 662.15165,11.078745 0.7,5.65 -0.83,3 3.49,6.26 -0.2,2.52 -0.46,0.49 0.28,-2.17 -1.04,1.33 -0.22,1.92 2.38,2.55 2.46,0.61 -0.65,0.67 0.28,0.54 0.78,0.19 4.46,7.53 2.83,3.08 1.05,0.22 1.72,0.96 1.63,1.2 3.87,0.75 0.26,0.86 -0.58,-0.01 -0.56,1.1 -0.2,-1.04 -0.66,0.58 -0.74,-0.04 1.44,1.6 0.27,1.76 3.88,-1.16 2.31,-2.61 2.47,-2.02 1.6,-0.67 -1.08,1.76 0.15,0.45 0.65,-0.19 0.57,2.34 -0.33,0.22 -0.67,-1.38 -0.85,0.48 -0.57,1.23 -2.02,0.57 0.67,1.88 -1.19,1.13 -1.86,3.73 0.41,0.77 1.37,-0.45 -0.07,2.44 -0.58,1.15 0.85,0.04 -0.34,1.36 -1.15,1.54 0.4,0.57 1.57,-0.43 0.29,0.55 -2.63,1.39 1.97,0.5 -0.15,0.89 1.2,0.05 -0.75,0.85 -1.32,0.33 0.12,0.42 1.24,-0.23 0.12,0.6 -0.48,0.44 -0.23,-0.37 -1.01,0.23 0.24,0.75 0.74,-0.12 -0.85,1.67 1.51,0.21 0.22,1.34 -0.57,0.74 0.26,1.25 0.97,0.22 0.53,1.21 -0.24,1.15 1.95,0.55 0.34,1.46 0.61,0.52 1.61,-0.95 0.46,0.2 0.71,1.91 1.22,0.71 0.31,1.08 2.16,0.77 -0.03,1.1 0.67,1 -0.37,1.19 0.71,0.64 1.11,0.55 1.41,-0.5 2,0.26 -0.27,1.04 0.83,0.06 0.39,-0.69 1.81,-0.07 1.47,-0.81 2.46,-0.08 0.17,1.22 1.07,0.09 -0.12,0.91 -1.25,0.32 0.22,0.53 -0.38,0.64 0.95,0.28 2.25,2.61 3.42,-0.53 1.03,-0.05 0.43,0.81 1.72,-0.87 2.93,0.87 3.5,-0.35 0.68,0.31 0.85,0.12 1.61,0.34 0.79,1.2 1.27,0.34 0.34,0.87 -0.67,0.02 0.08,1.119995 2.17,1.01 0.7,1.37 -0.72,1.39 2.99,0.77 0.76,1.5 -0.54,0.46 1.13,0.54 0.78,0.12 0.12,-0.49 0.97,-0.08 0.51,-0.51 1.33,2.51 -1.37,1.29 -0.32,1.8 -0.74,0.87 0.68,2 -1.72,1.16 -0.06,1.57 2.2,3.78 -1.21,1.74 0.23,1.35 -2.32,2.77 0.01,1.5 0.29,3.79 -0.7,1.23 -2.81,2.15 -0.06,0.55 1.26,1.72 2.01,1.13 2.16,2.18 0.44,2.16 -0.62,4.68 -1.26,0.93 -6.36,2.57 -3.88,0.9 -1.7,3.09 -8.09,3.17 -3.28,2.07 -1.93,2.65 -4.46,1.94 -2.32,0.04 -2.72,-2.37 -2.52,-0.44 -1.07,-0.83 -1.07,0.16 -0.61,0.76 -0.58,2.32 -2.08,2.36 -0.78,2.68 -0.72,1.05 -1.46,0.96 0.24,1.49 -0.65,0.21 -1.08,1.68 -2.32,2.04 -1.21,2.91 -3.24,1.61 -2.42,0.54 -0.77,0.75 -0.19,1.74 0,0 -5.62,1.74 -3.86,0.29 -3.75,-1.14 -0.62,-0.74 -3.09,0.43 -0.28,8.01 -0.88,4.1 -1.22,3.64 -2.71,5.68 -1.48,7.76 -1.14,1.22 -4.39,0.01 -2.38,-1.02 -2.43,-1.15 -2.84,-3.11 -2.58,-1.55 -2.87,-1.03 -8.52,-0.79 -2.51,1.47 -2.1,2.16 -2.22,3.7 -2.35,1.14 -3.32,0.14 -0.82,2.66 -2.44,2.62 -5.9,2.22 -6.29,0.49 -2.51,0.87 -6.2,7.06 -3.73,5.55 -1.7,1.9 -1.74,1.07 -4.57,1.32 -2.7,0.19 -6.34,-0.97 0,0 -3.91,-2.2 -1.81,-1.6 -3.13,-6.17 -5.66,-2.34 -1.83,-1.82 -2.43,-3.51 -0.81,-2.83 5.18,-7.56 0.62,-3.02 -1.35,-3.3 0,0 3.04,-0.69 3.41,-4.53 -0.28,-8.39 0.61,-2.77 1.72,-2.83 2.66,-1.92 11.21,-3.02 6.11,-3.65 2.09,-3.08 0.24,-2.94 -0.76,-4.15 -0.04,-2.97 0.9,-2.86 2.89,-3.35 3.3,-5.9 4.54,-4.43 0.99,-2.11 -0.84,-3.33 -3.13,-3.75 -4.91,0.21 -0.64,-0.36 -0.15,-1.94 4.72,-9.14 -1.69,-7.44 0.13,-3.5 2.54,-16.29 0.05,-5.789995 -1.72,-3.83 0.55,-2.2 7.06,-6.31 2.37,-3.08 1.84,-4.21 -0.48,-3.74 -4.8,-3.84 -1.45,-1.82 -1.23,-3.85 1.49,-8.02 0.08,-4.21 0,0 1.45,-0.12 4.38,0.88 0.03,-1.19 0.59,-0.41 0.07,-0.74 0.19,-1.71 1.48,-1.33 1.14,0.24 1.35,-0.73 -0.34,-1.16 0.73,-1.08 -0.23,-0.32 -0.89,-0.19 0.4,-1.13 0.77,-1.33 0.8,-1.78 0.64,-0.6 2.28,0.35 1.38,-0.87 0.96,0.09 0.61,0.74 0.96,-1.11 0.23,-1.44 1.34,-0.23 1.47,-0.29 0.29,-0.46 -0.34,-0.4 0.98,-1.17 2.11,-0.48 0.62,-1.24 1.37,-0.78 0.16,-0.79 0.58,-0.74 0.4,-0.74 -0.02,-0.86 1.1,-0.43 0.43,-1.02 -0.81,-0.31 0.57,-0.61 1.23,0.63 -0.29,-1.57 1.1,0.12 0.06,0.47 0.85,0.29 1.1,-0.14 1.87,-1.67 1.02,-0.37 0.32,0.38 1.98,-0.1 1.39,-1.33 1.02,0.49 0.05,-1.08 1.08,-0.36 1.02,0.09 -0.89,1.17 1.47,0.79 0.92,-1.31 1.35,1.04 -0.2,-1.31 1.48,-0.51 -0.31,2.08 0.92,0.12 0.45,-0.97 1.15,-0.25 0.92,1.39 0.96,-2.53 1.66,-0.84 0.02,-0.44 -0.55,-0.19 0.19,-0.71 1.19,0.2 0.64,-0.8 -0.64,-0.17 -0.4,-1.02 1.68,-1.6 -0.06,-0.58 1.49,-0.67 -0.05,-0.93 1.05,-1.06 1.24,-0.24 0.39,-1.06 z"
 title="Borno"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-BO" />
<path
 d="m 251.22165,579.30874 -0.21,-0.62 -0.68,0.1 -3.96,-2.6 -1.2,-4.38 -1.38,-1.87 -1.99,-0.02 -6.54,2.54 -1.04,-0.26 -0.35,-1.94 0.42,-1.46 -3.31,-1.44 -0.5,-0.83 0.07,-4.34 1.9,-2.67 0.76,-2.05 0.03,-1.27 -1.29,0.16 -0.84,-0.78 1.33,-4.44 4.49,-7.84 2.77,0.17 0.55,-0.5 0.75,-2.49 1.54,-0.79 -0.23,-1.81 1.58,-1.07 0.95,-1.48 -0.03,-1.94 -0.63,-1.54 -0.76,-0.58 -1.92,-0.83 -2.94,0.49 -1.04,-0.28 0.77,2.47 -1.2,0.85 -5.08,2.19 -3.49,-0.44 -2.74,0.49 -2.01,4.1 -2.11,0.52 -0.79,-0.6 -1.47,-0.08 -0.36,0.95 0.26,2.31 -2.83,1.56 -1.62,0.56 -3.01,-0.24 -1.23,1.99 -2.31,0.62 -1.89,-0.67 -0.99,-1.66 -2.11,-1.28 -0.75,0.5 -1.48,3.07 -3.3,1.64 -2.62,-0.42 -7.48,4.1 -0.94,-0.37 -2.32,0.4 -1,-1.1 -2.69,-1.6 -3.05,-0.71 -2.9,-1.66 -2.1,-2.1 -0.56,0.72 -0.72,-0.57 -1.43,0.53 -0.36,-0.5 -1.63,0.84 2.36,4.61 1.91,5.81 -0.34,0.79 0.95,1.52 0.35,1.86 4.06,6.77 0.19,1.44 0.94,0.55 0.01,0.17 0.05,1.1 7.5,10.38 1.19,0.62 -0.02,0.75 2.77,1.35 -0.27,0.41 1.05,0.75 0.12,0.65 2.56,1.59 0.19,-0.39 0.31,0.34 -0.22,0.24 0.02,0.34 2.61,2.16 0.48,-0.02 -0.14,-0.77 -0.45,-0.21 1.58,-0.46 -0.76,0.7 0.33,0.72 -0.26,0.27 0.07,0.51 2.32,1.7 5.07,2.36 0.19,-2 -0.79,-0.51 -0.55,-1.25 0.34,0.12 0.29,0.89 0.79,0.22 -0.12,-0.7 0.41,0.03 -0.02,0.7 0.52,0.17 0.26,0.77 -0.62,1.18 0.26,0.43 -0.34,1.3 0.4,0.29 5.18,1.32 0.19,-2.23 0.65,-0.58 0.38,3.84 8.34,-0.7 -0.64,-2.4 1.03,-3.05 0.65,-1.1 -0.29,-1.37 -1.91,-1.15 0.48,-0.05 1.19,0.27 0.96,1.58 0.6,-1.13 -0.55,-0.79 0.09,-2.14 -0.84,-1.35 0.31,-0.74 0.17,1.03 0.69,0.55 0.03,0.38 0.74,2.02 -0.1,3.1 2.72,-2.47 -0.58,-0.63 0.1,-1.94 1.91,-0.6 0.5,-0.63 0.69,1.61 0.12,1.29 -0.48,1.03 0.6,1.32 0.05,1.61 1.34,0.26 1.08,1.51 0.48,-0.05 -0.19,0.33 0.22,0.43 2.17,-0.48 0.19,0.34 -0.62,0.65 1.53,0.79 8.46,-0.91 0.02,-0.48 -0.4,-0.51 -0.07,-0.77 -0.1,-0.34 0.67,-0.86 0.6,-0.58 -0.52,2.04 0.22,0.39 2.03,1.76 0.96,-0.98 3.53,-0.38 -0.5,-2.47 -0.09,-0.38 -0.38,-1.13 -1.15,-0.75 -0.19,-0.99 0.02,-0.19 0.29,-1.06 -0.53,-2.25 -0.41,-0.55 0.35,-0.36 0.76,0.9 1.25,4.2 0.38,-0.58 -0.65,-5.23 1.7,-3.39 0.26,-1.83 z m -78.3,-19.41 0,0 0.01,0.01 -0.01,-0.01 z m 59.51,37.48 -8.22,0.99 -2.8,-0.1 -0.22,-0.7 1.36,-2.52 0.15,-0.02 0.45,0.04 0.14,-1.3 1.98,-2.19 0.12,-0.31 0.43,-0.89 0.45,-0.19 -0.59,-0.77 -0.18,-1.3 0.55,-0.35 1.03,-0.19 0.9,1.34 -0.5,1.33 0.78,1.62 -0.22,1.57 1.63,0.44 0.65,0.92 2.11,2.58 z"
 title="Bayelsa"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-BY" />
<path
 d="m 348.48165,451.12874 2.99,-0.49 2.36,-1.96 1.36,-1.75 1.92,-0.45 2.06,0.67 3.84,0.14 3.13,-0.83 3.14,-1.92 -0.77,-4.5 1.52,-1.2 2.11,-0.67 2.31,-0.59 2.11,0.07 5.43,1.69 8.64,5.38 0.56,1.64 -0.66,4.77 1.21,0.89 4.38,0.44 9.57,-2.24 3.09,0.22 1.49,0.72 5.53,5.73 4.88,6.63 0.65,1.55 0,0 -2.17,8.34 -5.15,-2.21 -0.78,1.84 -0.02,1.98 -0.58,0.73 -1.08,0.94 -2.8,4.86 -3.23,0.94 -1.63,1.19 -1.2,1.18 -0.95,2.5 -0.99,0.97 -8.72,7.77 -3.81,2.73 -1.12,0.33 -1.64,2.3 -1.69,0.87 -1.3,1.48 0.4,0.86 1.36,1.04 -1.05,1.48 0.4,0.83 -0.45,0.96 -1.47,1.87 -0.57,-0.58 0.05,1.5 5.1,5.64 0.31,1.76 -2.4,4.05 -0.64,2.4 -1.12,1.36 0.21,3.89 -1.81,5.88 0.15,6.56 -2.54,4.2 -1.89,0.77 -0.08,0.84 -1.34,1.04 -1.22,3.3 -1.25,1.04 0.97,1.02 -0.9,0.35 -0.98,1.24 0.05,0.57 -1.01,0.38 0.09,1.76 -1.97,0.75 -1.02,1.25 -0.02,0.96 1.2,1.14 0.34,1.53 -2.42,1.46 -1.09,-0.24 -0.68,-0.72 -1.03,0.82 -0.64,1.52 -0.75,0.53 -0.16,1.47 0.67,0.07 0.6,-1.75 0.26,2.51 -0.36,0.56 -0.43,-0.67 -0.6,0.14 0.58,1.44 -1.48,0.27 0.06,0.76 -1.78,0.29 -1.47,-0.6 0.51,-1.77 1.07,-0.12 -1.27,-1.61 -0.8,1.22 -1.16,0.48 -2.07,-0.46 -0.65,-1.15 0.77,-0.7 0.21,-0.16 -0.31,-0.91 -1.36,0.41 -1.13,-0.63 -2.38,2.18 0,0 -0.59,-1.01 -3.67,-2.81 -3.78,-4.34 -3.18,-2.8 -3.41,-4.91 -1.63,-5.13 0.61,-6.1 -0.39,-2.1 -4.96,-2.68 -4.77,0.56 -0.79,-1.94 -0.83,-0.31 -0.66,-1.79 1.15,-2.45 0.85,-0.1 0,0 3.42,0.76 0.6,-1.21 -0.76,-2.55 -1.71,-2 -0.73,-1.68 -1.37,-4.63 -0.15,-3.78 0.59,-3.72 -1.08,-1.29 0,0 0.38,-2.39 2.34,-3.11 -0.36,-2.66 1.46,-1.26 0.34,-1.35 1.98,-2.29 0.08,-2.42 -1.14,-1.8 0.19,-0.98 2.27,-1.08 2.62,-0.18 2.69,4.5 1.34,-2.08 2.16,-0.77 2.2,-1.71 0.28,-1.31 1.88,-0.29 2.18,1.26 0.84,-0.91 0.68,-2.3 0.1,-2.59 0.8,-1.47 6.92,-8.39 0.02,-1.4 -1.86,-2.6 -0.01,-1.6 1.65,-1.63 2.19,-0.37 0.83,-1.7 -0.24,-1.05 -1.38,-1 -0.41,-1.5 -0.52,-0.37 0.1,-1.94 -1.28,-1.12 -0.5,-1.71 -2.7,-1.87 -1.99,-2.62 z"
 title="Cross River"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-CR" />
<path
 d="m 252.45165,479.95874 -1.48,-7.29 0.08,-1.37 -1.13,-1.13 -2.13,-9.57 -1.88,2.04 -4.1,-0.38 -3.73,0.81 -8.19,5.12 -7.35,3.1 -4.03,4.53 -0.64,0.05 -2.58,-3.94 -1.01,-0.42 -1.67,-0.31 -1.78,1.58 -0.89,2.03 -0.15,2.37 0.4,0.75 1.46,0.81 0.54,4.82 2.03,3.59 1.96,2.42 1.88,1.46 2.23,0.81 0.29,1.75 -0.7,3.24 -1.55,1.91 -1.63,1.66 -3.08,2.03 -2.29,3.07 -2.78,1.99 -1.81,0.6 -5.23,1.04 -2.13,-0.56 0.7,-1.8 -1.6,-1.61 2.04,-4.03 -0.47,-0.83 -3.91,-2.35 -2,-2.83 -4.67,-2.62 -3.17,-1.25 -1.64,-1.34 -5.12,1.85 -1.85,2.38 -1.77,-0.4 -2.27,-1.98 -1.38,-0.29 -3.17,0.67 -2.98,-0.72 -0.99,0.31 -0.63,0.3 -0.06,1.03 0.89,1.57 -0.52,1.06 -4.1,3.22 -1.66,0.07 -0.05,-2.47 -0.66,-2.55 0.7,-2.93 -0.15,-1.43 -1.66,-1.67 -5.43,-2.8 -6.9,16.74 2.48,4.48 1.39,0.88 0.58,-1.6 1.31,-1.25 7.76,-4.22 1.26,-0.22 1.85,-1.28 1.13,-0.54 0.36,0.51 -0.02,0.17 -2,0.95 -1.01,1.6 -0.07,0.26 -0.83,-0.53 -2.25,0.98 -3.18,2.51 -0.34,0.75 -1.98,-0.45 -1.05,0.82 -0.79,3.14 0.26,1.54 2.63,4.5 3.18,3.14 1.12,-0.53 3.01,-1.34 2.97,0.41 0.74,-3.16 1.15,-2.15 -0.02,-0.38 0.4,-0.3 0,0.01 0.38,0.12 -0.23,0.14 -0.24,1.9 -1.12,2.27 1,2.13 1.91,0.63 1.63,-0.27 1.58,-3.18 1.6,0.1 0.19,-0.25 0,0.01 2.99,1.54 1.12,0.67 0.19,0.48 -1.19,-0.34 0.27,0.77 0.1,1.32 -1.33,-0.35 0.97,-0.67 -0.33,-1.34 -1.12,-0.72 -3.13,-0.29 -0.6,0.14 0.09,1.63 -0.55,1.13 -2.34,1.97 1,-1.58 -1.79,0.15 -2.1,-0.55 -4.44,-0.67 -1.96,0.19 -0.12,0.84 -1.62,1.08 -1.26,1.67 2.77,3.96 3.04,2.61 6.04,2.63 5.09,0.29 0.02,-0.65 -1.19,-1.39 -0.95,-2.9 -0.26,-0.45 0.07,-0.74 0.47,-0.12 -0.19,0.82 1,2.2 0.83,-0.6 0.36,0 -0.07,0.22 -0.95,1.08 0.26,0.5 2.65,1.12 0.57,-0.21 1.65,-4.8 0.84,-1.46 0.96,-0.62 -0.64,-0.33 3.2,0.12 0.48,0.15 1.05,-0.46 0.46,-1.13 0.74,-0.38 1.12,0.17 0.95,0.91 0.61,-0.66 0.09,0.23 -0.12,0.75 -0.89,0.04 -1.38,-0.94 -1.01,1.68 -1.58,0.79 -1.81,-0.12 0.22,0.86 -0.96,-0.98 -1.32,0.36 -0.55,3.02 0.27,1.32 0.58,1.08 0.45,0.72 3.36,1.09 -0.3,0.8 -1.55,-1.12 -0.65,0.36 -0.03,0.7 -0.07,0.22 -0.49,0.13 0.32,-1.47 -0.31,-0.12 -0.43,-0.34 -0.45,-0.46 -0.45,0.48 -0.74,0.5 -0.36,0.53 -0.79,0.12 -1.12,0.57 0.91,0.46 2.05,-0.1 -2.97,0.96 -0.4,0.63 -1,-1.61 -0.6,0.05 -0.28,-0.02 -2.53,0.15 -1.17,0.63 -0.07,-0.39 -0.69,-0.07 -0.41,-0.31 -0.67,0.22 -0.83,-0.43 0.05,2.44 1.91,7.63 -0.24,1.66 2.08,2.26 2.05,-0.88 2.65,-0.17 -0.89,-1.35 -0.09,-1.12 0.15,-0.24 0.5,-2.38 0.29,-0.03 -0.15,0.6 0.15,0.41 -0.52,2.69 0.88,0.55 -0.1,1.53 -0.8,0.31 2.1,2.1 2.9,1.66 3.05,0.71 2.69,1.6 1,1.1 2.32,-0.4 0.94,0.37 7.48,-4.1 2.62,0.42 3.3,-1.64 1.48,-3.07 0.75,-0.5 2.11,1.28 0.99,1.66 1.89,0.67 2.31,-0.62 1.23,-1.99 3.01,0.24 1.62,-0.56 2.83,-1.56 -0.26,-2.31 0.36,-0.95 1.47,0.08 0.79,0.6 2.11,-0.52 2.01,-4.1 2.74,-0.49 3.49,0.44 5.08,-2.19 1.2,-0.85 -0.77,-2.47 -0.57,-1.04 0.21,-0.44 3.52,-1.81 0.19,-5.3 0.7,-1.48 2.05,-1.42 0.89,-1.75 0.82,-3.18 -1.09,-3.54 0.23,-0.35 1.01,-1.17 1.92,-3.9 0.34,-2.63 1.76,-4.69 2.5,-4.55 0.38,-6.01 1.27,-3.65 -1.18,-3.74 z"
 title="Delta"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-DE" />
<path
 d="m 319.74165,453.93874 -0.17,0.91 0.65,1.54 4.01,3.68 1.78,0.74 1.41,-0.59 0.99,-2.05 1.25,-8.23 3.45,-0.4 2.95,0.25 1.92,-0.93 1.77,-2.88 3.41,-0.37 1.02,-2.31 1.76,1.3 0.84,4.26 1.7,2.27 0,0 0.49,2.89 1.99,2.62 2.7,1.87 0.5,1.71 1.28,1.12 -0.1,1.94 0.52,0.37 0.41,1.5 1.38,1 0.24,1.05 -0.83,1.7 -2.19,0.37 -1.65,1.63 0.01,1.6 1.86,2.6 -0.02,1.4 -6.92,8.39 -0.8,1.47 -0.1,2.59 -0.68,2.3 -0.84,0.91 -2.18,-1.26 -1.88,0.29 -0.28,1.31 -2.2,1.71 -2.16,0.77 -1.34,2.08 -2.69,-4.5 -2.62,0.18 -2.27,1.08 -0.19,0.98 1.14,1.8 -0.08,2.42 -1.98,2.29 -0.34,1.35 -1.46,1.26 0.36,2.66 -2.34,3.11 -0.38,2.39 0,0 -1.34,-0.21 -3.21,-2.33 -0.7,-1.04 -0.22,-2.19 -1.24,-1.86 -14.09,-0.86 -0.94,-1.03 -0.05,-0.73 0.55,-2.86 -0.07,-4.36 0,0 3.63,-1.01 1.99,1.7 0.77,0.09 2.11,2.51 0.73,0.07 0.65,-1.44 -0.8,-2.92 -0.15,-2.64 2.67,-2.73 0.8,-1.73 -0.99,-6.64 -0.62,-2.55 -1.08,-1.07 0.02,-1.23 2.74,-6.11 0.01,-5.82 -0.65,-1.15 -0.38,-3.29 -1.48,-4.9 6.45,0.55 z"
 title="Ebonyi"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-EB" />
<path
 d="m 208.35165,395.48874 0.77,0.64 1.75,-0.37 0.7,0.36 0.28,0.68 -0.38,0.89 0.46,0.65 2.18,-0.25 0.27,0.8 -0.96,1.85 -0.23,1.93 0.28,1.05 1.08,0.78 2.13,0.53 5.94,-2.93 1.56,2.1 0.65,-0.07 1.26,1.41 0.55,-0.06 1.96,2.23 2.26,-0.19 0.74,-0.51 2.56,0.15 1.06,2.01 0.07,1.22 0.85,0.61 0.48,1.74 0.74,0.56 -0.24,0.51 0.66,1.63 3.75,-0.84 0.43,0.38 1.46,-0.99 1.87,-0.41 1.75,1.41 0.55,2.12 1.45,1.08 0.79,2.01 0.15,3.41 -0.31,1.92 -1.62,3.94 0.06,4.16 -1.91,4.82 -2.16,3.55 1.28,2.15 -0.93,5.52 0.89,2.6 1.41,2.01 1.03,6.03 0,0 0.07,0.29 0,0 -1.88,2.03 -4.09,-0.38 -3.73,0.81 -8.19,5.11 -7.35,3.1 -4.03,4.53 -0.65,0.04 -2.58,-3.94 -1.01,-0.41 -1.66,-0.32 -1.79,1.59 -0.89,2.02 -0.15,2.37 0.4,0.75 1.46,0.81 0.54,4.82 2.03,3.58 1.96,2.42 1.88,1.46 2.23,0.81 0.28,1.74 -0.69,3.24 -1.55,1.91 -1.62,1.66 -3.08,2.03 -2.3,3.07 -2.77,1.99 -1.81,0.6 -5.24,1.04 -2.13,-0.57 0.7,-1.8 -1.6,-1.61 2.03,-4.03 -0.47,-0.83 -3.9,-2.35 -2,-2.83 -4.68,-2.62 -3.16,-1.25 -1.64,-1.34 -5.12,1.85 -1.85,2.38 -1.77,-0.4 -2.27,-1.98 -1.38,-0.29 -3.17,0.67 -2.97,-0.72 -0.99,0.31 -0.64,0.3 -0.06,1.03 0.89,1.57 -0.52,1.06 -4.09,3.23 -1.66,0.07 -0.05,-2.47 -0.66,-2.55 0.71,-2.93 -0.15,-1.43 -1.66,-1.67 -5.43,-2.79 0,0 0.39,-1.16 -1.23,-2.26 -1.33,-1.04 -1.56,-0.09 -1.65,-2.94 -1.94,-1.36 -0.7,-0.06 -0.44,-0.91 0.25,-0.59 -0.28,0.44 0.8,-0.7 0.96,-3.63 0.58,-0.61 2.95,-0.87 0.84,-3.74 1.74,-1.71 0.84,-1.96 0.35,-1.72 -0.57,-1.45 -1.4,-2.28 -1.23,-0.64 0,-2.84 0.81,-0.98 -0.1,-2.22 0.49,-0.96 1.75,-1.62 0.45,-1.03 1.73,-0.8 0.79,-2.27 0.96,-0.69 0.09,-1.95 0.45,-0.78 2.2,-1.01 2.13,0.4 2.28,-0.38 1.68,0.36 6.64,0.11 3.29,-0.38 1.64,0.34 1.74,2.08 -2.01,2.26 2.1,5.46 0.74,-0.03 3.77,-3.16 1.34,0.12 1.19,1.48 0.81,0.35 2.68,-1.02 1.51,-3.39 0.95,-4.96 0.25,-0.25 1.19,0.51 0.01,-1.63 0.88,-0.52 -0.15,-0.81 -1.18,-1.28 0.61,-4.64 1.24,-1.66 1.52,-0.73 0.37,-0.85 -0.32,-0.84 3.23,-6.89 -0.15,-1.39 0.47,-1.04 1.76,-1.83 2.15,-1.05 1.43,-3.54 -0.43,-0.28 -0.77,-2.48 0.87,-2.89 -2.01,-0.82 -0.4,-0.84 0.18,-1.39 1.41,-1.72 1.56,0.14 0.89,-0.6 z"
 title="Edo"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-ED" />
<path
 d="m 148.66165,367.10874 0.41,-0.17 0.61,1.67 1.03,0.49 4.48,-1.25 0.95,0.37 1.47,2.06 0.95,0.49 2.33,-0.23 2.3,0.62 1.95,-0.58 1.29,0.55 1.04,-2.16 -0.29,-0.63 0.82,-2.22 4.11,-1.34 5.76,-0.09 0,0 -1.09,0.42 -0.03,4.28 0.55,0.45 2.48,-1.42 3.67,-0.64 2.31,0.27 0.56,0.7 -0.28,1.37 -1.34,0.64 -2.29,3.01 -0.08,1.56 1.32,3.75 1.32,0.96 1.28,0.03 1.85,1.69 6.82,2.39 0,0 -1.52,2.4 -0.82,0.3 -1.5,-1.25 -1.86,0.39 -0.85,2.06 -2.18,1.45 -2.4,2.48 -1.13,2.14 -1.71,8.1 -1.7,3.92 -3.05,4.43 -5.53,3.49 -2.27,-0.59 -1.09,-2.68 0.16,-0.86 -1.04,-3.19 -1.42,-2.22 -1.55,-0.52 -6.97,0.31 -7.78,-0.44 -4.55,1.45 0,0 -0.83,-1.7 -0.84,-3.79 -2.85,-6.11 -0.69,-4.78 1.19,-3.99 -0.81,-2.81 0.12,-1.4 1.9,-4.25 1.62,-1.5 2.18,-0.94 1.99,-1.64 z"
 title="Ekiti"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-EK" />
<path
 d="m 262.67165,444.90874 2.73,-5.01 0.91,0.25 0.18,2.28 0.74,0.05 1.33,2.01 0.69,0.34 1.24,-0.33 4.97,-5.39 5.98,-3.86 6.18,-7.42 2.44,-0.91 2.14,-2.1 3.31,-0.76 2.44,0.75 1.11,1.62 0,0 -0.13,0.53 2.74,6.51 2.89,3.35 3.58,2.76 2.92,1.52 2.1,-0.73 2.21,-2.11 2.81,0.35 1.52,1.15 1.42,2.14 0.9,5.62 -2.28,6.42 0,0 -1.79,0.36 -6.45,-0.55 1.48,4.9 0.38,3.29 0.65,1.15 -0.01,5.82 -2.74,6.11 -0.02,1.23 1.08,1.07 0.62,2.55 0.99,6.64 -0.8,1.73 -2.67,2.73 0.15,2.64 0.8,2.92 -0.65,1.44 -0.73,-0.07 -2.11,-2.51 -0.77,-0.09 -1.99,-1.7 -3.63,1.01 0,0 -0.33,-1.46 -2.05,-1.34 -2.71,-0.27 -4.83,0.89 -0.6,-0.77 0,0 -0.83,-0.17 0.04,-0.54 -1.12,-0.74 -1.08,-0.09 -1.66,0.96 -2.39,-1.4 -0.76,-0.98 -0.18,-1.51 -1.88,-3.79 0.35,-2.15 -1.33,-0.63 -0.59,-2.58 -0.61,-0.13 -1.89,1.13 -0.72,-0.74 0.5,-1.62 -0.41,-1.37 0.82,-0.29 0.3,-0.96 -1.31,-1.85 -1.34,-3.64 -1.42,-1.8 -3.85,-1.16 -0.39,-0.54 0.43,-2.35 0.62,-0.83 -0.24,-0.96 1.85,-2.48 1.69,-1.14 0.75,-1.08 1.25,-3.45 -0.36,-0.79 -3.73,-1.7 -2.05,-0.08 -2.44,-1.41 -3.83,0.13 -0.09,-3.62 z"
 title="Enugu"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-EN" />
<path
 d="m 287.74165,288.29874 6.12,-0.63 3.2,0.32 1.52,0.85 1.13,-0.85 1.81,-3.04 1.06,-0.54 1.07,0.43 1.47,3.11 0.94,0.31 1.18,-0.79 0,0 -0.07,2.44 -0.42,0.62 -1.03,0.07 -0.53,0.61 -2.11,6.52 -0.08,5.62 0.51,2.19 -0.55,7 -1.98,5.27 -1.52,7.95 -0.79,0.36 -1.08,3.4 -1.04,1.64 -3.78,4.62 -6.96,3.64 -4.63,1.06 -2.91,1.2 -11.13,1.75 0,0 -1.4,0.46 -7.46,-0.15 0,0 -1.83,0.21 -1.42,-0.47 -1.95,-4.91 0.46,-1.37 -0.75,-30.21 0.36,-13.66 0.34,-0.38 2.68,-0.33 11.03,-0.47 1.76,0.63 9.19,8.1 0.94,-0.24 z"
 title="Federal Capital Territory"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-FC" />
<path
 d="m 517.00165,163.43874 0.91,-0.88 4.17,-1.51 4.04,0.17 2.98,1.01 2.18,1.29 8.49,6.26 4.75,6.4 3.42,3.58 -1,1.54 1.58,-1.02 3.68,3.38 0.67,4.87 -1.2,11.85 0.77,6.45 0.3,0.51 6.78,-0.01 0,0 1.35,3.3 -0.62,3.02 -5.18,7.56 0.81,2.83 2.43,3.51 1.83,1.82 5.66,2.34 3.13,6.17 1.81,1.6 3.91,2.2 0,0 -0.68,10.23 0.52,3.7 -1.1,2.33 -5.75,4 -9.4,5.66 -3.37,1.43 -6.2,0.91 0,0 -6.37,0.47 -12.46,-0.02 -5.9,0.6 -3.57,-0.71 0,0 0.58,-0.16 0.13,-0.95 -1.69,-2.12 -2.58,-5.28 -0.61,-6.19 -1.23,-3.79 -9.15,-7.09 -2.5,-1.41 -4.29,-4.38 -0.33,-1.62 1.31,-1.91 1.99,-0.92 3.9,-0.63 0.83,-1.76 -0.4,-2.86 0.48,-8.63 -2.08,-4.94 -7.2,-2.62 -0.88,-1.15 -0.87,-7.15 -1.14,-1.71 -7.38,-2.99 0.2,-1.38 3.61,-5.07 2.61,-7.43 0.97,-4.94 1.38,-2.03 1.44,-1.36 3.91,-0.88 1.49,-0.76 2.01,-1.75 2.57,-3.7 6.04,-3.28 2.71,-3.76 z"
 title="Gombe"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-GO" />
<path
 d="m 283.98165,497.48874 2.01,1.69 5.34,1.78 1.04,1.45 0.47,1.35 0.38,8.47 -1.23,0.77 1.51,2.44 -0.28,2.05 0.36,3.45 -0.43,2.01 -0.89,0.9 -1.18,3.04 -1.82,1.68 -2.1,3.87 -3.09,10.25 0,0 -2.57,0.95 -4.52,-1.13 -2.13,0.04 -4.15,1.06 -4.69,-1.11 -6.72,0.14 -2.14,-0.41 -2.16,-1.65 -1.72,-3.4 -1.84,-1.3 -0.26,-1.37 1.09,-2.76 0.52,-4.63 -0.45,-1.66 -2.12,-0.77 -3.46,0.67 -1.51,-0.44 2.75,-13.09 0,0 2.09,-0.83 3,-3.83 1.62,-0.8 4.51,1.92 2.68,-0.27 2.37,-4.61 0.93,-3.55 1.78,-1.04 6.31,-1.16 5.38,1.25 z"
 title="Imo"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-IM" />
<path
 d="m 434.10165,67.298745 1.79,1.18 6,0.73 3.14,-1.8 2.1,-3.99 5.32,-2.59 3.16,-0.63 2.82,-1.37 6.33,-1.96 2.21,1.25 2.13,4.78 0.69,4.35 1.46,2.53 1.12,-0.72 5.86,-1.86 4.99,2.22 2.03,-0.61 1.85,0.88 2.21,3.4 1.76,11.53 0.87,2.9 0,0 -11.06,6.93 -0.12,-1.39 -0.83,-1.64 -0.99,-0.82 -3.48,0.55 -4.54,1.95 -6.71,20.589995 0.57,1.88 0.03,2.25 -1.19,0.94 -6.23,2.51 -10.94,3.73 -5.47,3.04 -6.16,0.46 -3.22,4.54 -0.49,4.26 1.35,0.63 2.61,-0.04 2.12,-1.03 2.75,-0.27 1.81,0.5 1.46,4.42 0.52,4.32 -2.51,5 0.55,1.74 1.18,1.11 3.84,-0.94 0.47,2.57 1.05,2.5 5.3,7.42 2.99,1.85 6.39,0.77 5.72,1.27 8.87,0.56 1.04,1.46 -1.1,2.72 -1.85,1.39 -1.44,0.78 -4.04,0.99 -2.53,1.36 -1.53,1.91 -0.04,1.8 1.11,3.43 -1.86,0.57 -2.46,-0.62 -1.86,-1.36 -1.56,-0.17 -5.6,1.39 -5.7,-1.19 -1.35,-1.36 -0.81,-2.05 0.83,-7.85 -0.54,-2.15 -2.67,-4.9 -1.14,-0.3 -3.57,0.91 -7.7,0.48 -3.13,-0.21 -1.78,-3.67 -2.3,-0.73 -3.35,1.46 -7.43,-2.41 -6,-1.1 -1,0.19 0,0 -0.08,-2.24 1.08,-3.72 7.12,-6.88 -0.89,-1.15 -2.09,-0.53 -2.83,-2.64 -1.48,-2.75 -0.5,-2 -1.09,-0.99 -5.06,0.15 -0.2,-1.96 0.5,-2.09 3.36,-4.69 0.19,-2.05 1.06,-1.84 -0.19,-2.46 -2.28,-7.18 -1.25,0.53 -1.47,1.75 -2.32,1.42 -1.82,0.18 -1.37,-0.25 -0.01,-2.57 -0.57,-1.44 -3.14,0.25 -1.9,1.19 0,-1.03 -1.65,-0.72 0.53,-1.72 1.18,-1.39 0.08,-5.61 -0.8,-2.94 -0.92,-0.81 -1.85,-0.56 -5.44,-0.56 -0.83,-0.42 -1.02,-1.389995 0.57,-2.01 -1.1,-3.08 -3.81,-2.12 -1.13,-1.38 -0.45,-5.92 -7.78,-2.02 -3.77,0.35 -3.99,1.93 -1.73,1.35 -0.62,2.6 -1.87,3.61 -1.07,-1.12 -0.1,-1.96 -3.51,-6.28 0,0 -1.24,-2.62 -0.83,-0.7 -4.94,-0.12 -2.86,-0.93 -0.59,-0.72 -0.07,-3.85 0.75,-3.4 -0.02,-2.69 0.46,-0.3 10.39,-1.38 5.37,0.99 9.22,-0.78 1.17,1.23 1.41,4.68 0.68,0.94 2.66,1.67 1.99,0.52 2.62,-1.51 0.64,1.56 1.49,0.7 3.68,-0.55 4.18,-1.74 3.19,-2.58 1.03,-2.63 0.58,-0.75 2,-0.88 0.01,-0.86 0,0 1.27,-0.39 10.06,0.44 9.02,1.42 5.24,-0.75 6.06,0.78 10.03,0.45 z"
 title="Jigawa"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-JI" />
<path
 d="m 316.55165,159.39874 3.09,0.02 2.44,-0.67 4.18,-3.83 4.8,-2.84 1.65,0 4.08,-1.24 1.22,0.19 1.13,0.82 0.32,1.25 -2.11,4.02 0.53,2.57 1.04,1.18 3.53,1.83 3.75,1.23 3.51,4.13 1.53,0.55 2.78,-0.03 2.45,0.59 5.38,4.43 3.59,6.42 0.38,3.88 -1.01,2.44 -1.01,4.91 1.2,6.05 -0.2,1.73 -0.72,1.1 -3.55,0.96 -0.55,0.79 0.6,2.08 1.06,1.07 7.02,0.97 1.98,2.75 1.6,1.05 3,0.64 1.05,-0.29 0,0 -0.53,3.96 -2.35,4.2 0.27,0.73 2.79,1.75 2.53,2.71 0,0 -0.37,0.29 -0.21,2.9 -0.55,1.43 -1.32,1.56 -2.19,0.73 -1.9,1.4 -2.13,4.97 -0.22,2.71 1.36,2.82 0.75,3.52 -2.39,1.97 -0.34,1.1 0.18,1.97 -0.7,7.81 0.53,2.1 -0.42,1.07 -1.91,1.55 -0.4,3.08 -1.76,1.28 0.21,4.74 -1.05,1.4 0.1,1.16 3.26,5.28 2.57,3.08 1.71,1.21 1,2.09 0.12,3.41 -1.67,3.94 0,0 -1.09,0.57 -2.65,5.61 -3.31,5.4 -0.82,0.72 -1.61,0.42 -2.47,-0.13 -0.6,-1.9 -5.34,-5.91 -3.81,-0.24 -1.5,-1.25 -1.33,-0.22 -1.29,0.98 -0.89,1.9 -4.16,4.75 -2.35,1.6 -1.15,0.21 -1.34,-0.96 -0.4,-1.31 0.05,-9.7 -1.03,-1.61 -4.22,-2.44 -0.32,-3.25 -2.93,-2.67 -1.1,-0.39 -1.01,0.35 -1.65,2.12 -0.94,2.54 -2.31,2.1 -1.1,0 -1.75,-1.06 -1.34,0.25 -2.44,-1.79 -0.93,-0.14 -1.5,0.61 -0.7,-0.79 -0.6,-1.88 -0.75,-0.11 -1.34,1.02 0,0 -1.18,0.79 -0.94,-0.31 -1.47,-3.11 -1.07,-0.43 -1.06,0.54 -1.81,3.04 -1.13,0.85 -1.52,-0.85 -3.2,-0.32 -6.12,0.63 0,0 -1.23,-0.42 -2.46,0.6 1.38,-4.13 -3.39,-2.78 0.09,-2.32 0.56,-0.93 2.45,-1.29 0.79,-0.87 0.6,-2.79 3.09,-3.17 -0.58,-1.88 -3,-1.62 0.83,-3.02 -3.62,-1.36 -1.13,-0.77 -0.17,-0.91 0.29,-0.64 0.88,-0.42 3.23,-0.41 0.63,-1.51 -0.1,-3.09 -0.92,-3.88 -0.16,-5.06 -0.33,-1.01 -1.37,-0.67 -12.87,0.08 -6.67,-2.49 -1.71,-1.66 -1.03,-1.98 0.91,-1.24 2.17,-1.36 1.62,-1.68 0.85,-1.48 4.24,-2.6 1.02,-1.79 0.31,-1.98 -3.23,-1.75 -4.83,-1.66 1.35,-4.14 0.05,-2.57 -1.98,-3.8 -1.61,-0.44 -2.25,0.67 -1.39,-0.14 -0.28,-4.5 -0.48,-1.92 -0.61,-0.51 -4.73,-0.5 -1.18,1.2 0.67,2.39 -0.64,0.98 -3.97,-0.56 -7.63,2.86 -1.04,-2.66 -1.02,-1 -2.91,0.13 -2.1,0.61 -2.46,1.5 -5.59,4.5 -5.38,7.01 -1.41,0.89 -1.43,-0.6 -1.22,-3.52 -3.05,-2 -0.22,-1.37 0.33,-2.31 1.84,-1.8 -0.24,-3.81 0.74,-2 -0.14,-1.48 -1.44,-2.38 0.4,-4.79 3.04,-5.38 0,0 1.68,-0.12 1.28,-0.76 2.86,-4.16 5.27,-4.71 5.64,-0.95 7.94,0.57 4.71,-0.62 2.33,-1.51 3.04,-3.1 1.51,-3.23 0.64,-3.55 1.71,-3.41 0.85,-1.14 2.75,-1.77 2.34,-2.38 1.01,0.03 0,0 4.41,0.88 1.94,-0.18 1.36,0.9 0.79,1.74 -0.23,1.07 -2.89,2.69 -0.39,1.32 6.35,1.93 4.25,4.29 1.75,0.23 2.69,-1.52 1.38,-1.91 -1.81,-3.36 -0.12,-2.04 3.45,-1.09 1.95,0.11 2.77,1.1 1.4,-0.09 0.58,-0.54 -0.01,-1.39 1.2,-2.97 3.06,-2.59 1.39,-0.28 6.78,2.29 2.05,1.73 0.97,1.58 1.57,0.78 5.62,-2.24 0.84,-2.05 z"
 title="Kaduna"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KD" />
<path
 d="m 90.771651,42.718745 6.62,-0.14 1.86,0.74 4.629999,-1.58 0.76,0.31 1.65,2.12 3.19,1.82 1.06,1.1 9.56,3.12 2.95,2.07 3.06,0.68 1.82,-0.43 0.63,-0.56 2.49,-3.69 1.16,-0.31 1.08,0.88 0.4,1.25 -1.62,3.93 0.09,2.4 -1.42,2.98 -0.42,3.7 1.86,2.15 1.8,4.28 -0.18,3.32 -1.3,6.06 0.04,2.04 1.68,5.52 -0.24,8.02 -0.64,1.56 -1.02,0.04 -3.17,-2.04 -2.68,0.02 -3.95,1.18 -1.28,1.48 -1.01,3.779995 -0.14,9.94 0.79,13.05 -2.12,9.79 -2.61,5.63 -1.16,4.77 2.55,3.65 0.76,0.51 2.78,0.29 1.71,-1.35 2.4,-3 12,-5.45 1.69,-0.12 1.89,0.86 2.04,-0.72 0.77,1.75 0.94,0.07 1.62,-0.97 0,0 0.86,-0.48 1.82,0 4.11,2.25 6.34,-1.46 0.82,-2.32 1.06,-0.62 0.79,-0.15 0.91,0.64 2.09,0.31 3.61,-0.65 1.08,0.57 1.69,3.3 2.87,0.11 3.65,2.41 5.47,-0.76 3.79,0.5 2.49,-0.59 1.22,-0.81 4.85,0.62 4.35,1.77 1.41,2.15 -0.01,2.47 -2.05,6.49 0,1.2 5.38,2.71 1.93,3.01 1.38,7.58 0.21,5.48 0,0 -1.36,-1.1 -1.85,-0.36 -3.42,2.76 -1.28,2.2 -3.93,0.41 -12.1,5.08 -10.67,0.69 -1.64,-1.25 -0.36,-4.02 0.37,-4.81 -0.48,-1.78 -3.75,-2.47 -0.81,-1.26 -0.98,-6.51 -1.69,-1.6 -2.84,-0.71 -3.64,-0.04 -9.86,1.59 -7.87,1.83 -4.43,1.62 -4.85,2.59 -1.37,2.07 0.16,1.54 0.87,1.26 3.63,2.01 5.4,2.19 5.36,0.53 1.05,2.01 1.71,-0.03 0.78,0.74 1.12,6.56 -0.25,1.07 -2.18,1.45 -0.63,1.47 0.49,1.45 2.74,1.63 1.17,1.36 -0.07,2.07 -1.01,1.49 -3.8,0.97 -5.22,2.64 -5,-0.52 -1.55,0.42 -0.9,0.75 -0.04,9.59 -0.45,1.37 1.25,2.83 1.81,1.97 1.86,3.03 0.75,2.44 -0.28,1.53 -1.77,2.13 -2.64,1.57 -3.38,0.26 -7.42,2.5 -0.5,5.85 -0.56,0.48 -4.32,-0.46 -1.42,-0.99 -0.02,-2.28 1.03,-3.28 0.29,-3.94 -2.93,-2.66 -1.12,-2.41 0.18,-6.32 1.46,-3.26 1.84,-2 1.48,-1.01 3.92,-1.44 4.62,-4.43 2.43,-10.71 0.2,-4.05 -0.51,-0.74 -2.89,-1.06 -1.58,0.1 -8.4,-5.7 -5.24,-1.69 -2.94,0.07 -4.5,0.85 -6.189999,-0.36 -12.17,0.81 -1.86,-0.29 -3.49,-1.42 -11.04,-6.08 -2.89,-0.36 -0.89,0.52 0,0 -1.29,-0.01 -12.13,-10.28 4.33,-20.39 2.12,-4.71 4.89,-4.18 -0.82,-3.26 -2.42,-1.82 -0.57,-4.87 3.17,-3.84 -2.36,-8.76 0.39,-5.22 1.27,-4.3 -0.93,-15.849995 10.82,-9.33 7.73,-6.05 9.53,-14.62 2.08,-9.63 z"
 title="Kebbi"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KE" />
<path
 d="m 347.91165,83.288745 3.51,6.28 0.1,1.96 1.07,1.12 1.87,-3.61 0.62,-2.6 1.73,-1.35 3.99,-1.93 3.77,-0.35 7.78,2.02 0.45,5.92 1.13,1.38 3.81,2.12 1.1,3.08 -0.57,2.01 1.02,1.389995 0.83,0.42 5.44,0.56 1.85,0.56 0.92,0.81 0.8,2.94 -0.08,5.61 -1.18,1.39 -0.53,1.72 1.65,0.72 0,1.03 1.9,-1.19 3.14,-0.25 0.57,1.44 0.01,2.57 1.37,0.25 1.82,-0.18 2.32,-1.42 1.47,-1.75 1.25,-0.53 2.28,7.18 0.19,2.46 -1.06,1.84 -0.19,2.05 -3.36,4.69 -0.5,2.09 0.2,1.96 5.06,-0.15 1.09,0.99 0.5,2 1.48,2.75 2.83,2.64 2.09,0.53 0.89,1.15 -7.12,6.88 -1.08,3.72 0.08,2.24 0,0 -5.52,2.17 -1.14,-0.09 -1.14,-1.07 -1.69,0.3 -2.48,1.57 -0.67,1.1 -4.74,4.17 -2.65,4.11 -2.74,3.21 -2.04,0.51 -2.7,-0.16 -1.02,0.43 -1.6,4.57 -0.45,3.5 0.4,6.89 0.45,1.99 3.86,4.33 0.77,1.67 0.08,2 -1.33,3.85 -2.59,4.09 -0.99,0.56 0,0 -1.05,0.29 -3,-0.64 -1.6,-1.05 -1.98,-2.75 -7.02,-0.97 -1.06,-1.07 -0.6,-2.08 0.55,-0.79 3.55,-0.96 0.72,-1.1 0.2,-1.73 -1.2,-6.05 1.01,-4.91 1.01,-2.44 -0.38,-3.88 -3.59,-6.42 -5.38,-4.43 -2.45,-0.59 -2.78,0.03 -1.53,-0.55 -3.51,-4.13 -3.75,-1.23 -3.53,-1.83 -1.04,-1.18 -0.53,-2.57 2.11,-4.02 -0.32,-1.25 -1.13,-0.82 -1.22,-0.19 -4.08,1.24 -1.65,0 -4.8,2.84 -4.18,3.83 -2.44,0.67 -3.09,-0.02 0,0 -3.6,-2.68 -1.11,-2.26 -0.78,-3.61 1.52,-2.67 0.07,-2.21 1.82,-1.63 3.75,-1.03 2.45,-1.7 2.71,-0.07 0.95,-0.58 -3.14,-7.8 0.67,-4.06 -2.09,-4.58 0.86,-6.33 -0.7,-12.32 0.27,-2.89 2.18,-2.28 4.25,-2.369995 7.64,-2.38 3.68,-1.93 0.78,-0.85 1.13,-4.39 2.14,-4.61 1.28,-0.52 z"
 title="Kano"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KN" />
<path
 d="m 219.65165,323.91874 2.2,0.57 2.77,1.58 3.52,3.25 2.77,4.32 2.55,8.25 3.71,2.3 2.71,2.69 5.47,7.27 2.72,2.54 1.63,0.25 0.33,-0.35 0.62,-2.89 1.24,-2.53 0.19,-0.26 0.99,0.88 0.46,-0.09 0.06,-2.97 3.57,-1.74 1.12,-3.25 0,0 7.46,0.15 1.4,-0.46 0,0 -0.6,2.64 -1.55,2.66 0,0.86 0.82,1.69 2.19,2.66 0.54,6.17 -1.17,4.71 -0.04,4.69 -1.61,1.67 -0.85,2.12 -0.17,3.74 0.69,0.56 4.26,-2.95 9.26,-4.07 12.4,-3.37 7.07,-0.7 3.58,0.68 7.7,0.57 0,0 -0.32,2.84 0.54,5.87 1.88,3.22 2.7,2.61 0.73,1.85 0.01,6.9 0.57,6.81 1.24,5.53 1.27,1.05 3.31,-0.32 1.48,0.47 -0.36,1.81 -1.23,1.21 -0.47,1.29 -0.42,3.93 -1.94,5.83 -3.3,3.11 -6.44,3.12 -0.96,1.44 -0.34,4.42 -1.76,0 -1.35,-1.05 -0.82,0.1 -3.37,-3.29 -0.84,-0.58 -0.41,0.5 0,0 -1.11,-1.62 -2.44,-0.75 -3.31,0.76 -2.14,2.1 -2.44,0.91 -6.18,7.42 -5.98,3.86 -4.97,5.39 -1.24,0.33 -0.69,-0.34 -1.33,-2.01 -0.74,-0.05 -0.18,-2.28 -0.91,-0.25 -2.73,5.01 0,0 0,0 0,0 -1.34,1.87 -1.54,0.86 -2.24,2.31 -1.24,4.12 -0.06,2.73 -1.84,2.51 -1.43,0.89 -3.59,-0.66 -1.67,0.77 0,0 -1.03,-6.03 -1.41,-2.01 -0.89,-2.6 0.93,-5.52 -1.28,-2.15 2.16,-3.55 1.91,-4.82 -0.06,-4.16 1.62,-3.94 0.31,-1.92 -0.15,-3.41 -0.79,-2.01 -1.45,-1.08 -0.55,-2.12 -1.75,-1.41 -1.87,0.41 -1.46,0.99 -0.43,-0.38 -3.75,0.84 -0.66,-1.63 0.24,-0.51 -0.74,-0.56 -0.48,-1.74 -0.85,-0.61 -0.07,-1.22 -1.06,-2.01 -2.56,-0.15 -0.74,0.51 -2.26,0.19 -1.96,-2.23 -0.55,0.06 -1.26,-1.41 -0.65,0.07 -1.56,-2.1 -5.94,2.93 -2.13,-0.53 -1.08,-0.78 -0.28,-1.05 0.23,-1.93 0.96,-1.85 -0.27,-0.8 -2.18,0.25 -0.46,-0.65 0.38,-0.89 -0.28,-0.68 -0.7,-0.36 -1.75,0.37 -0.77,-0.64 0,0 -0.23,-0.78 -4.74,-4.17 -2.04,-2.7 0.71,-4.14 -2.51,-0.43 -4.62,0.88 0,0 -6.82,-2.39 -1.85,-1.69 -1.28,-0.03 -1.32,-0.96 -1.32,-3.75 0.08,-1.56 2.29,-3.01 1.34,-0.64 0.28,-1.37 -0.56,-0.7 -2.31,-0.27 -3.67,0.64 -2.48,1.42 -0.55,-0.45 0.03,-4.28 1.09,-0.42 0,0 0.75,-1.44 -0.82,-2.41 -4.76,-2.58 -0.13,-0.59 -2.42,-1.81 -0.07,-0.67 -2.41,-2.45 -1.92,-3.7 0.17,-0.99 2.14,-2.43 2.29,-3.91 3.71,-4.04 3.6,-2.29 1.77,2.62 2.17,1.76 7.04,3.01 1.84,0.08 2.76,1.08 3.71,-0.21 2.13,0.69 3.92,-0.12 6.3,1.52 3.03,-0.5 1.57,-3.76 0.64,-6.49 2.31,-7.79 z"
 title="Kogi"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KO" />
<path
 d="m 322.66165,35.138745 9.16,1.35 5.19,1.38 3.58,1.94 2.92,2.5 2.73,0.73 9.89,9.64 3.29,-0.88 2.92,0.38 3.03,1.55 2.29,1.75 1.85,2.11 1.04,2.44 2.96,1.37 5.26,1.27 12.11,3.92 0,0 -0.01,0.86 -2,0.88 -0.58,0.75 -1.03,2.63 -3.19,2.58 -4.18,1.74 -3.68,0.55 -1.49,-0.7 -0.64,-1.56 -2.62,1.51 -1.99,-0.52 -2.66,-1.67 -0.68,-0.94 -1.41,-4.68 -1.17,-1.23 -9.22,0.78 -5.37,-0.99 -10.39,1.38 -0.46,0.3 0.02,2.69 -0.75,3.4 0.07,3.85 0.59,0.72 2.86,0.93 4.94,0.12 0.83,0.7 1.24,2.62 0,0 -4.63,0.36 -1.28,0.52 -2.14,4.61 -1.13,4.39 -0.78,0.85 -3.68,1.93 -7.64,2.38 -4.25,2.369995 -2.18,2.28 -0.27,2.89 0.7,12.32 -0.86,6.33 2.09,4.58 -0.67,4.06 3.14,7.8 -0.95,0.58 -2.71,0.07 -2.45,1.7 -3.75,1.03 -1.82,1.63 -0.07,2.21 -1.52,2.67 0.78,3.61 1.11,2.26 3.6,2.68 0,0 -0.99,1.1 -0.84,2.05 -5.62,2.24 -1.57,-0.78 -0.97,-1.58 -2.05,-1.73 -6.78,-2.29 -1.39,0.28 -3.06,2.59 -1.2,2.97 0.01,1.39 -0.58,0.54 -1.4,0.09 -2.77,-1.1 -1.95,-0.11 -3.45,1.09 0.12,2.04 1.81,3.36 -1.38,1.91 -2.69,1.52 -1.75,-0.23 -4.25,-4.29 -6.35,-1.93 0.39,-1.32 2.89,-2.69 0.23,-1.07 -0.79,-1.74 -1.36,-0.9 -1.94,0.18 -4.41,-0.88 0,0 0.02,-2.33 1.25,-6.1 -0.9,-3.69 -1.91,-1.9 -0.16,-1.07 0.45,-3.76 1.56,-4.14 0.65,-4 1.5,-0.84 6.61,-0.13 1.28,0.87 4.88,-3.97 0.55,-3.2 3.34,0.81 1.89,-1.62 -0.5,-1.95 -1.16,-1.43 -2.68,-2.29 -2.53,-1.16 -1.26,-1.21 1.82,-3.63 1.09,-5.16 -0.95,-2.47 0.13,-1.68 -0.69,-3.05 -2.5,-5.199995 0.4,-3.57 -1.31,-3.21 -0.39,-4.75 -1,-5.17 0.07,-6.05 -0.99,-6.17 1.44,-10.82 0,0 4.86,-1.57 5.28,-5.36 8.7,0.78 3.58,-0.74 23.4,-14.15 1.28,-0.33 z"
 title="Katsina"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KT" />
<path
 d="m 62.361651,236.35874 5.38,-0.92 11.32,-0.35 3.62,0.93 13.98,15.86 1.99,3.1 5.609999,6.48 2.29,1.58 1.7,-0.18 1.04,0.48 0.27,2.94 -0.73,4.65 0.06,5.38 0.88,3.68 1.3,0.39 7.57,-0.79 0.84,0.74 0.43,1.62 -0.19,3.43 0.35,1.4 0.66,1.02 3.21,2.41 3.04,0.39 1.07,0.55 0.9,2.11 0.74,5.45 1.89,1.32 2,-0.01 9.16,-3.56 2.41,-0.16 6.35,3.01 1.42,1.1 6.35,7.23 2.25,0.69 3.96,-1.16 4.52,0.81 3.73,1.61 0.64,-0.27 11.77,7.32 5.19,3.67 0.93,1.49 1.46,0.71 1.84,0.6 4.92,0.32 3.39,-0.91 7.52,-0.31 8.26,1.71 0,0 -2.46,3.35 -2.31,7.79 -0.64,6.49 -1.57,3.76 -3.03,0.5 -6.3,-1.52 -3.92,0.12 -2.13,-0.69 -3.71,0.21 -2.76,-1.08 -1.84,-0.08 -7.04,-3.01 -2.17,-1.76 -1.77,-2.62 -3.6,2.29 -3.71,4.04 -2.29,3.91 -2.14,2.43 -0.17,0.99 1.92,3.7 2.41,2.45 0.07,0.67 2.42,1.81 0.13,0.59 4.76,2.58 0.82,2.41 -0.75,1.44 0,0 -5.76,0.09 -4.11,1.34 -0.82,2.22 0.29,0.63 -1.04,2.16 -1.29,-0.55 -1.95,0.58 -2.3,-0.62 -2.33,0.23 -0.95,-0.49 -1.47,-2.06 -0.95,-0.37 -4.48,1.25 -1.03,-0.49 -0.61,-1.67 -0.41,0.17 0,0 -0.39,-0.54 -1.67,0.8 -3.49,0.13 -1.48,-3.17 -2.18,-0.58 -4.74,1.7 -2.65,-0.38 0.08,0.88 -0.18,-0.85 -0.36,0.09 -3.55,1.61 -2.6,0.31 -8.27,-0.22 0,0 -0.49,-0.66 -1.45,-0.07 -0.71,-0.94 -1.9,-4.81 -0.39,-2.77 -0.78,-0.66 -0.03,-0.8 -3.46,-2.25 -2.95,-4.24 -1.22,-3.44 -0.09,-2.1 -0.79,-2.77 -1.97,-2.63 -2.999999,-7.11 -1.66,-1.91 -1.32,-5.29 -0.81,-1.58 1.03,-4.5 2.08,-1.55 0.35,-1.6 0.57,-0.59 3.159999,-2.09 2.34,-3.16 -0.16,-1.3 -1.31,-0.78 -2.829999,1.8 -2.21,0.08 -3.83,-1.08 -1.1,0.13 -2.4,-1.54 -5.7,-1.74 -3.25,-2.42 -1.69,-2.04 -0.54,-2.48 -4.08,-2.46 -2.04,0.09 -3.82,2.08 -1.69,3.71 -0.02,2.65 -0.45,1.11 -4.42,3.43 -6.64,2.92 -5.79,3.3 -2.49,1.94 -1.13,0.26 -3.01,2.21 -7,3.26 -0.93,0.15 -0.53,-0.75 -0.45,0.11 -0.91,-1.13 -0.69,-0.19 -2.57,0.27 -6.93,5.53 -1.66,0.66 -3.91,3.44 -0.19,0.99 -1.5,0.79 -4.08,0.72 -3.17,0.02 -3.19,2.78 0,0 0.56,-1.78 -0.59,-1.36 -0.01,-3.54 -0.71,-0.9 0.24,-1.44 0.55,-1.39 -0.39,-2.71 -0.97,-1.79 0.74,-1.4 1.43,-0.91 -0.4,-3.34 0.69,-0.23 0.34,-1.72 -0.2,-0.62 0.02,-0.88 0.69,-1.64 0.43,-1.56 -0.41,-0.76 -0.27,-0.77 -0.35,-0.78 0.13,-1.17 0.25,-1.73 0.16,-0.69 5.37,0.18 0.71,-0.16 1.05,-1.18 3.55,-0.56 0.66,0.82 1.24,0.45 1.49,-0.1 4.95,-1.73 0.25,-1.76 1.95,-3.88 0.17,-3.74 1.91,-1.88 -0.34,-5.82 -1.28,-4.01 0.31,-1.42 1.16,-1.88 2.47,-1.38 0.82,-1.83 2.59,-3.62 0.85,-3.1 1.04,-0.59 2.14,0.25 2.09,-1.73 0.1,-1.22 -1.34,-2.56 -0.32,-1.93 0.37,-1.34 1.11,-1.22 6.75,-2.7 3.39,0.24 1.14,-0.3 2.02,-2.06 0.12,-1.3 2.36,-2.59 0.57,-2.41 0.25,-4.97 0.85,-1.1 2.08,-0.86 z"
 title="Kwara"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-KW" />
<path
 d="m 3.411651,463.64874 1.25,0.4 3.41,-0.43 1.94,0.89 3.46,-2.44 0,-1.61 0.41,-0.11 3.55,0.53 13.71,-0.19 1.06,-1.01 0.77,-3.95 2.08,-1.65 0.09,-2.35 1.36,-2.51 1.85,0.25 3.41,1.43 1.2,0.8 0.81,1.43 4.57,-0.48 -0.51,-1.45 1.59,-1.06 37.58,0.39 1.07,0.21 0.54,0.9 -2.73,2.88 -0.23,0.94 0.73,1.24 0.04,1.46 2.19,1.09 3.22,-2.16 3.45,-0.41 1.06,1.48 0.12,0.95 -1.12,1.06 -2.8,1.31 -0.56,1.03 0.22,0.7 0.92,0.74 2.77,0.77 1.13,1.31 0.58,0.14 1.12,-0.58 5.269999,0.65 0.35,1.25 -0.36,2.36 0,0 -9.529999,-1.15 -2.19,-0.67 -12.02,-1.84 -8.59,-0.46 -9.91,0.94 -15.11,0.16 -0.57,0.31 -0.19,1.32 -0.53,-0.1 0.24,0.34 -5.42,-0.82 -6.02,0.01 -21.6,0.73 -9.49,1.1 -0.36,-3.11 z"
 title="Lagos"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-LA" />
<path
 d="m 307.24165,287.46874 1.34,-1.02 0.75,0.11 0.6,1.88 0.7,0.79 1.5,-0.61 0.93,0.14 2.44,1.79 1.34,-0.25 1.75,1.06 1.1,0 2.31,-2.1 0.94,-2.54 1.65,-2.12 1.01,-0.35 1.1,0.39 2.93,2.67 0.32,3.25 4.22,2.44 1.03,1.61 -0.05,9.7 0.4,1.31 1.34,0.96 1.15,-0.21 2.35,-1.6 4.16,-4.75 0.89,-1.9 1.29,-0.98 1.33,0.22 1.5,1.25 3.81,0.24 5.34,5.91 0.6,1.9 2.47,0.13 1.61,-0.42 0.82,-0.72 3.31,-5.4 2.65,-5.61 1.09,-0.57 0,0 1.69,1.65 2.42,0.11 2.08,0.85 0.63,4.48 1.93,3.41 2.16,0.98 5.32,0.56 3.7,0 2.77,-1.35 1.04,0.56 2.01,2.21 -0.79,2.93 -2.7,4.01 -2.11,1.98 -1.41,0.2 -1.46,1.05 -1.55,2.86 -1.55,1.36 -0.32,2.25 0.64,1.72 2.09,2.43 0.32,1.24 -0.3,5.41 1.44,2.07 5.15,2.71 3.66,1.3 8.19,-0.15 9.76,-2.79 10.36,4.33 2.52,2.07 1.46,2.68 0,0 -2.58,3.68 -2.74,0.82 -4.51,-0.95 -0.33,-0.41 -1.52,0.23 -1,-1.07 -1.73,-0.9 -1.86,0 -1.28,0.86 -1.33,2.14 -0.73,2.86 1.71,1.36 2.03,2.51 0.35,2.88 -0.54,0.65 1,2.68 -0.11,1.19 -11.23,7.21 -1.21,1.39 0,0 -11.79,-8.93 -0.01,0.7 -3.96,0.22 -4.88,-0.41 -6.86,-1.55 -10.09,-3.72 -2.68,-0.44 -2.59,0.18 -1.38,0.28 -3.95,2.2 -1.24,1.41 -1.02,2.86 0.08,2.52 4.7,11.64 -0.09,1.36 -1.14,1.1 -5.33,-2.23 -3.32,-2.8 -1.07,0.14 -5.25,-0.99 -4.92,-2.82 -8.71,-3.55 -8.51,-1.25 -9.13,-2.48 0,0 -7.7,-0.57 -3.58,-0.68 -7.07,0.7 -12.4,3.37 -9.26,4.07 -4.26,2.95 -0.69,-0.56 0.17,-3.74 0.85,-2.12 1.61,-1.67 0.04,-4.69 1.17,-4.71 -0.54,-6.17 -2.19,-2.66 -0.82,-1.69 0,-0.86 1.55,-2.66 0.6,-2.64 0,0 11.13,-1.75 2.91,-1.2 4.63,-1.06 6.96,-3.64 3.78,-4.62 1.04,-1.64 1.08,-3.4 0.79,-0.36 1.52,-7.95 1.98,-5.27 0.55,-7 -0.51,-2.19 0.08,-5.62 2.11,-6.52 0.53,-0.61 1.03,-0.07 0.42,-0.62 z"
 title="Nassarawa"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-NA" />
<path
 d="m 65.001651,173.89874 0.89,-0.52 2.89,0.36 11.04,6.08 3.49,1.42 1.86,0.29 12.17,-0.81 6.189999,0.36 4.5,-0.85 2.94,-0.07 5.24,1.69 8.4,5.7 1.58,-0.1 2.89,1.06 0.51,0.74 -0.2,4.05 -2.43,10.71 -4.62,4.43 -3.92,1.44 -1.48,1.01 -1.84,2 -1.46,3.26 -0.18,6.32 1.12,2.41 2.93,2.66 -0.29,3.94 -1.03,3.28 0.02,2.28 1.42,0.99 4.32,0.46 0.56,-0.48 0.5,-5.85 7.42,-2.5 3.38,-0.26 2.64,-1.57 1.77,-2.13 0.28,-1.53 -0.75,-2.44 -1.86,-3.03 -1.81,-1.97 -1.25,-2.83 0.45,-1.37 0.04,-9.59 0.9,-0.75 1.55,-0.42 5,0.52 5.22,-2.64 3.8,-0.97 1.01,-1.49 0.07,-2.07 -1.17,-1.36 -2.74,-1.63 -0.49,-1.45 0.63,-1.47 2.18,-1.45 0.25,-1.07 -1.12,-6.56 -0.78,-0.74 -1.71,0.03 -1.05,-2.01 -5.36,-0.53 -5.4,-2.19 -3.63,-2.01 -0.87,-1.26 -0.16,-1.54 1.37,-2.07 4.85,-2.59 4.43,-1.62 7.87,-1.83 9.86,-1.59 3.64,0.04 2.84,0.71 1.69,1.6 0.98,6.51 0.81,1.26 3.75,2.47 0.48,1.78 -0.37,4.81 0.36,4.02 1.64,1.25 10.67,-0.69 12.1,-5.08 3.93,-0.41 1.28,-2.2 3.42,-2.76 1.85,0.36 1.36,1.1 0,0 3.32,4.4 3.8,6.64 1.59,4.09 -0.07,0.84 0,0 -3.04,5.38 -0.4,4.79 1.44,2.38 0.14,1.48 -0.74,2 0.24,3.81 -1.84,1.8 -0.33,2.31 0.22,1.37 3.05,2 1.22,3.52 1.43,0.6 1.41,-0.89 5.38,-7.01 5.59,-4.5 2.46,-1.5 2.1,-0.61 2.91,-0.13 1.02,1 1.04,2.66 7.63,-2.86 3.97,0.56 0.64,-0.98 -0.67,-2.39 1.18,-1.2 4.73,0.5 0.61,0.51 0.48,1.92 0.28,4.5 1.39,0.14 2.25,-0.67 1.61,0.44 1.98,3.8 -0.05,2.57 -1.35,4.14 4.83,1.66 3.23,1.75 -0.31,1.98 -1.02,1.79 -4.24,2.6 -0.85,1.48 -1.62,1.68 -2.17,1.36 -0.91,1.24 1.03,1.98 1.71,1.66 6.67,2.49 12.87,-0.08 1.37,0.67 0.33,1.01 0.16,5.06 0.92,3.88 0.1,3.09 -0.63,1.51 -3.23,0.41 -0.88,0.42 -0.29,0.64 0.17,0.91 1.13,0.77 3.62,1.36 -0.83,3.02 3,1.62 0.58,1.88 -3.09,3.17 -0.6,2.79 -0.79,0.87 -2.45,1.29 -0.56,0.93 -0.09,2.32 3.39,2.78 -1.38,4.13 2.46,-0.6 1.23,0.42 0,0 -8.65,12.34 -0.94,0.24 -9.19,-8.1 -1.76,-0.63 -11.03,0.47 -2.68,0.33 -0.34,0.38 -0.36,13.66 0.75,30.21 -0.46,1.37 1.95,4.91 1.42,0.47 1.83,-0.21 0,0 -1.12,3.25 -3.57,1.74 -0.06,2.97 -0.46,0.09 -0.99,-0.88 -0.19,0.26 -1.24,2.53 -0.62,2.89 -0.33,0.35 -1.63,-0.25 -2.72,-2.54 -5.47,-7.27 -2.71,-2.69 -3.71,-2.3 -2.55,-8.25 -2.77,-4.32 -3.52,-3.25 -2.77,-1.58 -2.2,-0.57 0,0 -8.26,-1.71 -7.52,0.31 -3.39,0.91 -4.92,-0.32 -1.84,-0.6 -1.46,-0.71 -0.93,-1.49 -5.19,-3.67 -11.77,-7.32 -0.64,0.27 -3.73,-1.61 -4.52,-0.81 -3.96,1.16 -2.25,-0.69 -6.35,-7.23 -1.42,-1.1 -6.35,-3.01 -2.41,0.16 -9.16,3.56 -2,0.01 -1.89,-1.32 -0.74,-5.45 -0.9,-2.11 -1.07,-0.55 -3.04,-0.39 -3.21,-2.41 -0.66,-1.02 -0.35,-1.4 0.19,-3.43 -0.43,-1.62 -0.84,-0.74 -7.57,0.79 -1.3,-0.39 -0.88,-3.68 -0.06,-5.38 0.73,-4.65 -0.27,-2.94 -1.04,-0.48 -1.7,0.18 -2.29,-1.58 -5.609999,-6.48 -1.99,-3.1 -13.98,-15.86 -3.62,-0.93 -11.32,0.35 -5.38,0.92 0,0 0.49,-3.02 -1.96,-0.7 -2.1,-2.02 -1.75,-3.54 3.08,-6.97 -0.14,-1.69 0.89,-1.14 2.58,-1.33 6.08,3.19 1,-3.12 0.25,-2.99 2.82,-6.43 -0.66,-6.2 -2.69,-1.9 -2.97,-5.6 1.21,-4.6 0.13,-2.04 -1.23,-5.05 -2.13,-0.82 0.42,-1.95 -0.28,-1.95 0.51,-1.95 z"
 title="Niger"
 fill="blue"
 stroke="#888888"
 stroke-width="2"
 id="NG-NI" />
<path
 d="m 0.96165097,375.38874 5.97000003,-4.29 3.49,-0.21 1.9,0.93 1.24,1.79 0.41,1.43 0.15,6.48 0.56,2.36 1.31,2.17 0.84,0.13 0.94,-5.56 0.57,-1.25 0.47,-0.45 1.37,0 0.88,0.61 0.54,1.75 -0.16,3.09 -1.74,5.98 -0.41,-0.24 -0.51,0.57 0.52,3.66 2.12,2.51 3.05,2.47 1.02,3.04 3.2,4.51 3.01,2.36 2.34,1.13 4.05,0.28 1.74,-0.49 2.78,-3.97 1.14,-4.24 1.62,-1.48 2.6,0.29 1.75,4.34 1.59,1.13 1.02,-0.26 1.13,-1.11 2.47,-0.6 6.2,0.22 1.17,1.89 0.33,5.66 0.41,0.71 2.98,1.22 0.64,1.1 -0.1,2.22 1.1,2.7 0.41,2.87 -3.97,4.01 -0.33,1.13 0.37,0.28 6.09,-0.25 2.7,-0.58 3.04,0.13 3.18,-1.24 1.51,-1.37 5.89,-0.88 0,0 2.74,-1.08 1.4,-1.11 0.94,0.39 0.52,0.84 0.59,4.28 1.97,-0.01 3.85,-1.98 3.389999,0.59 2.97,7.11 3.06,-1.96 1.1,-0.02 1.15,0.69 2.12,-0.92 4.16,-0.26 0.31,0.13 -0.3,1.01 0,0 -0.75,5.5 -1.06,3.26 -2.35,2.1 -2.06,0.97 -3.63,3.28 -2.98,4.92 0.03,3.41 2.01,1.97 4.81,0.81 1.83,-0.13 1.42,-1.06 1.65,-2.27 1.76,-0.51 0.65,0.78 -0.02,4.47 0.85,3.57 -0.72,1.81 -2.44,0.66 -0.77,1.14 -1.12,0.68 -2.4,0.11 -1.32,1.34 0.98,0.43 2.79,-0.25 3.3,1.74 0.21,1.08 -0.82,1.72 -4.01,-0.28 0,0 -5,-2.24 -4.38,-0.93 0,0 0.36,-2.36 -0.35,-1.25 -5.269999,-0.65 -1.12,0.58 -0.58,-0.14 -1.13,-1.31 -2.77,-0.77 -0.92,-0.74 -0.22,-0.7 0.56,-1.03 2.8,-1.31 1.12,-1.06 -0.12,-0.95 -1.06,-1.48 -3.45,0.41 -3.22,2.16 -2.19,-1.09 -0.04,-1.46 -0.73,-1.24 0.23,-0.94 2.73,-2.88 -0.54,-0.9 -1.07,-0.21 -37.58,-0.39 -1.59,1.06 0.51,1.45 -4.57,0.48 -0.81,-1.43 -1.2,-0.8 -3.41,-1.43 -1.85,-0.25 -1.36,2.51 -0.09,2.35 -2.08,1.65 -0.77,3.95 -1.06,1.01 -13.71,0.19 -3.55,-0.53 -0.41,0.11 0,1.61 -3.46,2.44 -1.94,-0.89 -3.41,0.43 -1.25,-0.4 0,0 0.42,-3.28 1.13,-1.18 0.63,-1.54 -1.34,-3.74 1.3,-2.16 2.11,-1.8 0.2,-2.74 -0.21,-0.96 -2.14,-0.28 -0.78,-0.39 -0.41,-0.86 -0.17,-1.82 1.2,-1.9 -0.34,-1.07 0.48,-3.46 -0.22,-0.98 -1.3,-0.14 -0.54,-0.61 0.15,-2.86 1.4,-1.61 3.06,-1.78 -2.46,-2.23 -0.48,-0.96 1.87,-2.2 0.59,-1.92 -0.66,-4.66 -1.53,-1.66 -0.12,-9.69 2.37,-0.08 0.82,-0.48 0.04,-0.72 -0.42,-3.5 -2.68,-2.04 -0.22,-1.76 -0.98,-1.52 -0.3,-4.2 0.25,-8.96 -0.3,-0.95 -0.82,-0.35 -0.97,-2.58 -1.69000003,-2.17 z"
 title="Ogun"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-OG" />
<path
 d="m 194.92165,384.14874 4.62,-0.88 2.51,0.43 -0.71,4.14 2.04,2.7 4.74,4.17 0.23,0.78 0,0 -2.45,3.49 -0.9,0.6 -1.56,-0.14 -1.41,1.72 -0.18,1.38 0.4,0.84 2.02,0.82 -0.88,2.89 0.77,2.49 0.42,0.28 -1.43,3.54 -2.15,1.05 -1.76,1.83 -0.47,1.04 0.15,1.39 -3.23,6.89 0.32,0.83 -0.37,0.85 -1.51,0.73 -1.24,1.67 -0.62,4.63 1.18,1.28 0.16,0.82 -0.88,0.51 -0.01,1.63 -1.19,-0.51 -0.25,0.25 -0.95,4.96 -1.51,3.39 -2.68,1.03 -0.81,-0.36 -1.19,-1.48 -1.34,-0.12 -3.77,3.16 -0.74,0.03 -2.1,-5.46 2.01,-2.25 -1.74,-2.09 -1.64,-0.34 -3.29,0.39 -6.64,-0.11 -1.68,-0.36 -2.28,0.38 -2.12,-0.39 -2.2,1.01 -0.46,0.78 -0.09,1.96 -0.95,0.68 -0.79,2.27 -1.73,0.8 -0.45,1.04 -1.76,1.61 -0.49,0.96 0.09,2.22 -0.8,0.99 0,2.84 1.23,0.64 1.39,2.28 0.58,1.45 -0.36,1.72 -0.83,1.96 -1.74,1.71 -0.85,3.74 -2.94,0.86 -0.58,0.62 -0.96,3.62 -0.8,0.7 0.28,-0.44 -0.25,0.6 0.44,0.91 0.7,0.05 1.94,1.36 1.65,2.94 1.56,0.1 1.33,1.04 1.24,2.26 -0.39,1.16 0,0 -6.9,16.74 0,0 -4.86,-5.94 -9.17,-9.24 -14.82,-11.96 -2.7,-1.66 0,0 4,0.28 0.83,-1.73 -0.21,-1.07 -3.3,-1.74 -2.79,0.25 -0.98,-0.43 1.32,-1.35 2.4,-0.1 1.11,-0.68 0.78,-1.14 2.44,-0.66 0.72,-1.82 -0.84,-3.57 0.01,-4.47 -0.64,-0.78 -1.77,0.51 -1.65,2.27 -1.42,1.06 -1.83,0.13 -4.8,-0.81 -2.01,-1.96 -0.03,-3.41 2.98,-4.92 3.63,-3.28 2.06,-0.96 2.35,-2.1 1.07,-3.25 0.74,-5.51 0,0 2.67,-1.42 2.15,-4.97 4.29,-3.44 2.32,-0.02 2.51,1.24 2.91,2.22 1.81,0.03 0.64,-1.26 -0.23,-1.63 0.41,-2.11 -0.46,-3.98 1.56,-6.54 0.84,-0.57 5.86,-1.59 -0.62,-2.4 0,0 4.55,-1.45 7.78,0.43 6.97,-0.31 1.55,0.53 1.42,2.21 1.03,3.19 -0.16,0.86 1.09,2.69 2.28,0.59 5.53,-3.5 3.04,-4.43 1.71,-3.92 1.7,-8.1 1.13,-2.14 2.4,-2.48 2.18,-1.45 0.85,-2.06 1.86,-0.38 1.5,1.24 0.82,-0.3 1.49,-2.44 z"
 title="Ondo"
 fill="green"
 stroke="#888888"
 stroke-width="2"

 id="NG-ON" />
<path
 d="m 117.18165,366.88874 8.27,0.22 2.6,-0.31 3.55,-1.61 0.36,-0.09 0.18,0.85 -0.08,-0.88 2.65,0.38 4.74,-1.7 2.18,0.58 1.48,3.17 3.49,-0.13 1.67,-0.8 0.39,0.54 0,0 -1.52,5.3 -1.99,1.64 -2.18,0.94 -1.62,1.5 -1.9,4.25 -0.12,1.4 0.81,2.81 -1.19,3.99 0.69,4.78 2.85,6.11 0.84,3.79 0.83,1.7 0,0 0.62,2.41 -5.86,1.58 -0.84,0.58 -1.56,6.54 0.46,3.98 -0.4,2.11 0.23,1.63 -0.64,1.26 -1.81,-0.03 -2.91,-2.22 -2.51,-1.24 -2.32,0.01 -4.28,3.45 -2.15,4.96 -2.67,1.43 0,0 0.3,-1.01 -0.31,-0.13 -4.16,0.26 -2.12,0.92 -1.15,-0.69 -1.1,0.02 -3.06,1.96 -2.97,-7.11 -3.389999,-0.59 -3.85,1.98 -1.97,0.01 -0.59,-4.28 -0.52,-0.84 -0.94,-0.39 -1.4,1.11 -2.74,1.08 0,0 2.34,-9.84 0.43,-5.29 1.67,-8.72 -0.87,-0.49 -3.05,-4.88 -3.11,-2.33 -0.27,-0.93 -0.14,-0.88 1.15,-1.09 0.78,-1.76 0.87,-9.27 0.6,-0.28 4.3,1.34 2.32,-0.75 0.78,-0.99 0.13,-2.3 1.06,-0.57 2.81,-3.32 3.009999,1.84 3.59,5.56 2.13,-0.93 0.65,-1.43 2.05,-1.16 0.98,-1.39 0.28,0.39 1.83,-1.51 2.29,-0.76 0.25,0.38 0.99,-1.34 0.31,-1.28 z"
 title="Osun"
 fill="white"
 stroke="#888888"
 stroke-width="2"
 id="NG-OS" />
<path
 d="m 5.381651,335.88874 3.19,-2.78 3.17,-0.02 4.08,-0.72 1.5,-0.79 0.19,-0.99 3.91,-3.44 1.66,-0.66 6.93,-5.53 2.57,-0.27 0.69,0.19 0.91,1.13 0.45,-0.11 0.53,0.75 0.93,-0.15 7,-3.26 3.01,-2.21 1.13,-0.26 2.49,-1.94 5.79,-3.3 6.64,-2.92 4.42,-3.43 0.45,-1.11 0.02,-2.65 1.69,-3.71 3.82,-2.08 2.04,-0.09 4.08,2.46 0.54,2.48 1.69,2.04 3.25,2.42 5.7,1.74 2.4,1.54 1.1,-0.13 3.83,1.08 2.21,-0.08 2.829999,-1.8 1.31,0.78 0.16,1.3 -2.34,3.16 -3.159999,2.09 -0.57,0.59 -0.35,1.6 -2.08,1.55 -1.03,4.5 0.81,1.58 1.32,5.29 1.66,1.91 2.999999,7.11 1.97,2.63 0.79,2.77 0.09,2.1 1.22,3.44 2.95,4.24 3.46,2.25 0.03,0.8 0.78,0.66 0.39,2.77 1.9,4.81 0.71,0.94 1.45,0.07 0.49,0.66 0,0 0.53,3.2 -0.31,1.28 -0.99,1.34 -0.25,-0.38 -2.29,0.76 -1.83,1.51 -0.28,-0.39 -0.98,1.39 -2.05,1.16 -0.65,1.43 -2.13,0.93 -3.59,-5.56 -3.009999,-1.84 -2.81,3.32 -1.06,0.57 -0.13,2.3 -0.78,0.99 -2.32,0.75 -4.3,-1.34 -0.6,0.28 -0.87,9.27 -0.78,1.76 -1.15,1.09 0.14,0.88 0.27,0.93 3.11,2.33 3.05,4.88 0.87,0.49 -1.67,8.72 -0.43,5.29 -2.34,9.84 0,0 -5.89,0.88 -1.51,1.37 -3.18,1.24 -3.04,-0.13 -2.7,0.58 -6.09,0.25 -0.37,-0.28 0.33,-1.13 3.97,-4.01 -0.41,-2.87 -1.1,-2.7 0.1,-2.22 -0.64,-1.1 -2.98,-1.22 -0.41,-0.71 -0.33,-5.66 -1.17,-1.89 -6.2,-0.22 -2.47,0.6 -1.13,1.11 -1.02,0.26 -1.59,-1.13 -1.75,-4.34 -2.6,-0.29 -1.62,1.48 -1.14,4.24 -2.78,3.97 -1.74,0.49 -4.05,-0.28 -2.34,-1.13 -3.01,-2.36 -3.2,-4.51 -1.02,-3.04 -3.05,-2.47 -2.12,-2.51 -0.52,-3.66 0.51,-0.57 0.41,0.24 1.74,-5.98 0.16,-3.09 -0.54,-1.75 -0.88,-0.61 -1.37,0 -0.47,0.45 -0.57,1.25 -0.94,5.56 -0.84,-0.13 -1.31,-2.17 -0.56,-2.36 -0.15,-6.48 -0.41,-1.43 -1.24,-1.79 -1.9,-0.93 -3.49,0.21 -5.97000003,4.29 0,0 1.07000003,-2.08 0.73,-4.3 1.33,-4.15 -0.3,-1.12 0.37,-2.7 1.13,-2.26 0.36,-2.89 -2.44,-3.06 -1.17,-3.99 0.08,-2.02 1.05,-1.87 -0.44,-2.05 0.48,-0.7 1.25,-0.3 1.37,-2.88 -0.43,-0.44 0.73,-0.97 0.01,-1.07 z"
 title="Oyo"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-OY" />
<path
 d="m 379.00165,223.49874 1.53,-0.49 3.18,0.08 2.78,0.88 2.61,4.16 0.78,4.8 -0.04,12.38 10.97,-2.19 1.06,0.21 1.8,1.92 0.97,3.13 0.26,5.94 -0.23,1.17 -2.38,4.47 -0.09,1.69 0.6,0.85 3.92,1.42 0.79,0.71 0.9,1.16 1.65,4.07 1.56,1.34 1.51,0.53 4.8,0.27 5.47,1.48 10.04,-0.59 4.39,-1.41 2.89,-5.21 4.76,-1.3 0.5,-1.67 -0.27,-1.74 -3.17,-4.06 0.3,-1.44 3.03,-1.78 7.6,3.95 2.57,0.51 9.26,4.93 11.07,4.74 6.18,4.04 6.36,3.43 0,0 1.56,3.94 0.21,2.15 -0.51,4.08 0.76,5.96 2.3,3.86 1.05,6.02 -0.55,1.33 0.3,2.25 0.43,0 0.21,5.54 -1.78,3.08 -12.18,5.86 -1.9,-0.11 -9.52,2.1 -2.49,1.44 -2.06,4.19 -4.74,5.72 -7.11,3.76 -7.68,7.65 -2.43,1.19 -4.41,1.01 -4.11,0.54 -3.85,-0.25 0,0 -1.46,-2.68 -2.52,-2.07 -10.36,-4.33 -9.76,2.79 -8.19,0.15 -3.66,-1.3 -5.15,-2.71 -1.44,-2.07 0.3,-5.41 -0.32,-1.24 -2.09,-2.43 -0.64,-1.72 0.32,-2.25 1.55,-1.36 1.55,-2.86 1.46,-1.05 1.41,-0.2 2.11,-1.98 2.7,-4.01 0.79,-2.93 -2.01,-2.21 -1.04,-0.56 -2.77,1.35 -3.7,0 -5.32,-0.56 -2.16,-0.98 -1.93,-3.41 -0.63,-4.48 -2.08,-0.85 -2.42,-0.11 -1.69,-1.65 0,0 1.67,-3.94 -0.12,-3.41 -1,-2.09 -1.71,-1.21 -2.57,-3.08 -3.26,-5.28 -0.1,-1.16 1.05,-1.4 -0.21,-4.74 1.76,-1.28 0.4,-3.08 1.91,-1.55 0.42,-1.07 -0.53,-2.1 0.7,-7.81 -0.18,-1.97 0.34,-1.1 2.39,-1.97 -0.75,-3.52 -1.36,-2.82 0.22,-2.71 2.13,-4.97 1.9,-1.4 2.19,-0.73 1.32,-1.56 0.55,-1.43 0.21,-2.9 z"
 title="Plateau"
 fill="red"
 stroke="#888888"
 stroke-width="2"
 id="NG-PL" />
<path
 d="m 277.72165,584.56874 -1.46,1.39 0.02,0.77 -0.62,-0.24 0.22,-1.42 1.44,-0.82 0.4,0.32 z m -3.14,-1.84 -1.72,-0.98 -0.55,0.15 -0.55,0.15 -0.21,-0.69 0.86,-0.79 -0.31,-0.67 0.31,-0.65 -0.07,-1.05 -0.57,-0.81 -0.91,-0.17 -0.22,0.16 -0.71,-1.7 -0.27,-0.17 0.14,-0.46 -0.86,-0.86 -0.27,0.36 -0.96,0.15 -0.19,0.82 0.57,1.03 0.5,1.05 0.41,2.04 -0.48,-0.23 -0.45,0.63 1.07,3.48 -0.14,1.27 1.17,4.04 -0.24,0.22 0.77,0.46 2.06,-0.43 0.4,-0.45 0.13,-0.58 1.75,0.49 0.03,-2.23 0.67,-1.56 -1.16,-2.02 z m -3.8,-10.26 0.41,0.46 2.18,0.09 0.19,-0.91 -0.41,-0.31 -1.69,0.3 -0.68,0.37 z m 1.27,-2.46 0.36,1.13 0.52,0.19 -0.29,-1.9 -0.59,0.58 z m 7.2,9.74 -1.44,-2.86 -1,-0.7 -1.63,-0.81 -0.27,-0.12 -0.84,0.65 0.65,0.09 1.31,1.13 0.14,0.21 -0.23,0.46 0.52,0.93 0.12,1.92 1.29,1.2 0.91,0.17 0.67,-1.41 -0.2,-0.86 z m 5.92,6.12 -2.08,-2.62 -1.31,1.63 0.79,0.79 0.81,-0.24 0.38,0.91 0.76,0 0.22,0.62 1.17,-0.5 1.08,1.08 1.86,-1.49 -0.62,-0.55 -3.06,0.37 z m -19.91,-6.61 -1.12,0.53 -0.28,1.32 1.14,0.4 1.44,1.08 1.03,2.28 -0.29,-3.36 -0.36,-0.15 0.26,-1.49 -1.82,-0.61 z m 18.13,2.56 -2.37,-1.62 -1.55,-2.35 -0.03,-0.27 -0.48,-1.7 -0.48,0.43 -0.4,-0.36 0.43,-0.67 -0.03,-1.49 -0.12,-0.07 -0.57,1.85 -2.25,-0.7 -0.53,-0.1 -0.88,-1.08 -0.07,-1.52 -0.36,-0.29 -0.07,-0.46 -0.26,-0.17 -0.15,-0.65 0.5,-0.79 -0.98,-1.22 -0.81,0.53 -0.34,0.89 0.65,1.54 -2.06,0.77 -0.41,0.36 -0.93,0.38 -0.52,0.05 -1,0.77 -0.46,0.62 -0.09,-1.51 -0.58,0.74 -0.22,0.51 1,1.65 0.55,2.45 -1.31,0.45 -0.53,0.21 -1.38,-1.61 -0.71,-1.9 -1.45,-2.41 -1.5,-0.51 0.56,-1.55 -0.68,-2.22 0.98,-0.81 0.35,-0.48 -0.53,-0.67 -1.81,-0.24 -1.81,-1.11 -0.28,1.59 -0.89,0.57 -0.33,-0.77 -1.27,-0.14 -0.34,-0.34 -0.64,0.19 -0.77,0.03 -0.62,-0.87 -0.19,-0.14 -0.55,0.41 0.19,0.99 -0.14,0.33 0.46,0.31 1.27,1.27 -0.12,1.53 0.98,4.64 3.22,3.31 0.02,1.18 -1.81,1.46 -0.1,0.58 1.82,6.56 0.55,3.32 2.41,2.48 -0.29,0.33 -7.24,0.69 -2.24,-0.75 -0.09,-2.71 -0.24,-2.54 0.14,-0.46 -0.03,-0.17 -0.46,-2.71 -0.19,-0.75 1.94,-3.67 -0.19,-2.67 -0.67,0.15 -0.68,0.1 -3.96,-2.6 -1.2,-4.38 -1.38,-1.87 -1.99,-0.02 -6.54,2.54 -1.04,-0.26 -0.35,-1.94 0.42,-1.46 -3.31,-1.44 -0.5,-0.83 0.07,-4.34 1.9,-2.67 0.76,-2.05 0.03,-1.27 -1.29,0.16 -0.84,-0.78 1.33,-4.44 4.49,-7.84 2.77,0.17 0.55,-0.5 0.75,-2.49 1.54,-0.79 -0.23,-1.81 1.58,-1.07 0.95,-1.48 -0.03,-1.94 -0.63,-1.54 -0.76,-0.58 -1.92,-0.83 -2.94,0.49 -1.04,-0.28 -0.57,-1.04 0.21,-0.44 3.52,-1.81 0.19,-5.3 0.7,-1.48 2.05,-1.42 0.89,-1.75 0.82,-3.18 -1.09,-3.54 0.23,-0.35 1.11,1.28 2.4,0.21 -2.75,13.08 1.51,0.44 3.47,-0.67 2.12,0.78 0.44,1.66 -0.52,4.62 -1.09,2.76 0.26,1.37 1.84,1.3 1.72,3.41 2.16,1.65 2.14,0.41 6.72,-0.14 4.7,1.12 4.15,-1.07 2.13,-0.03 4.51,1.13 2.57,-0.95 0.55,0.05 0.66,1.72 0.06,2.78 -2.4,4.19 -3.41,4.33 -1.37,3.71 -0.16,1.09 0.6,1.11 1.45,1.41 1.8,0.27 3.13,-0.59 1.11,-0.64 2.79,-0.12 3.28,1.22 1.81,-0.42 2.94,1.4 2.35,1.79 1.95,3.49 0.63,2.3 -0.96,4.27 0.58,4.55 -0.51,0.32 -0.04,0.64 0.61,1.17 -1.22,0.77 -0.84,-0.72 -0.17,-0.98 -1.22,-0.27 -0.55,-0.26 -0.26,0.46 -1.39,1.18 -0.58,-0.24 -0.26,-0.36 -0.38,-0.02 -0.71,0.39 -1.5,-2.36 -1.27,0.96 -0.93,-0.36 -1.6,-0.5 -0.65,-1.03 -0.67,0.19 -0.74,-0.86 -0.62,0.51 -0.19,0.79 -0.89,0.33 0.34,1.08 0.27,1.03 0.24,0.6 0.78,0.6 0.77,-0.24 0.57,0.08 0.86,-0.31 -0.17,1.75 -1.77,0.17 -1.44,0.53 -0.74,-1.2 -0.1,-0.33 -1.05,-1.17 -0.15,-0.94 0.11,-0.22 z m 21.52,4.31 -0.69,-0.39 -0.43,-0.03 -0.88,-0.36 -0.02,-0.02 -0.4,-0.36 -0.42,0.46 -0.32,-0.13 0.35,-0.54 -0.88,-1.49 -0.9,0.53 -1.04,-0.9 -0.36,-0.34 -0.17,-0.51 -1.39,0.01 -0.26,0.28 -1.23,0.87 -1.33,-0.05 -0.46,0.04 -0.43,-0.23 -0.63,-0.63 -0.53,-0.31 -0.09,-0.81 -1.24,0.34 -1.03,0.02 0.02,-0.42 -1.25,-0.34 -0.91,-0.46 -1.34,-0.09 -0.48,0.24 -0.23,0.58 -0.02,0.79 1.72,0 0.09,0.08 1.17,1.07 0.23,0.67 0.36,1.37 0.84,0.31 0.16,-0.4 0.34,0.28 1.07,0.03 0.06,0.22 -1.84,0.74 -0.43,0.15 -0.69,2.4 5.47,0.77 4.18,-0.92 5.93,-0.14 -0.19,-1.22 0.52,-1.16 z m -48.68,-18.07 0.79,-0.17 0.92,-0.79 0.08,-1.12 1.29,0.9 1.6,0.63 -0.96,1.17 0.43,1.85 0.27,0.32 -0.03,0.58 -0.6,0.94 0.22,0.64 1.01,0.31 1.26,1.35 2.07,4.36 -0.93,0.61 -0.42,0.84 0.15,0.91 3.15,1.85 0.6,2.9 0.88,1.32 -0.12,1.39 0.48,1.61 1.48,1.13 -1.12,1.39 -0.96,0.36 -0.86,-0.5 -0.6,0.41 -6.38,-1.39 -0.81,-2.54 0.53,-0.62 -0.6,0.02 -1.36,-3.89 -0.81,-1.9 0.1,-2.06 1.63,-1.56 -0.17,-1.35 -1.81,-1.66 -1.69,-1.15 -0.76,-4.06 -0.29,-0.58 0.02,-1.82 -0.77,-1.08 1.24,-0.74 0.88,0.63 0.67,0 0.3,0.56 z"
 title="Rivers"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-RI" />
<path
 d="m 178.43165,0.2287449 12.88,5.68 20.53,7.2500001 4,2.35 4.64,-1.49 3.65,-0.02 8.54,4.12 15.88,15.56 5.98,10.42 0,0 -3.03,2.6 -7.1,4 -9.51,-1.28 -1.9,-0.66 -1.7,-2.05 -2.27,-0.68 -4.97,-0.19 -0.59,5.48 -0.73,1.89 -0.5,0.22 -2.7,-1.44 -2.79,0 -4.85,1.56 -2.11,1.82 -0.11,0.7 0.78,5.14 0.07,8.44 -1.35,1 -4.04,1.64 -10.02,0.79 -6.09,0.95 -5.83,8.58 -1.88,1.87 -3.07,1.91 0.06,2.88 1.43,4.64 0.65,4.25 -0.74,3.029995 -2.46,1.7 -6.11,0.53 -1.28,-0.29 -4.8,0.64 -2.64,-0.31 -4.47,0.33 -9.33,-1.67 -0.92,0.6 -0.93,4.51 0.1,18.21 -0.66,13.78 0,0 -1.62,0.97 -0.94,-0.07 -0.77,-1.75 -2.04,0.72 -1.89,-0.86 -1.69,0.12 -12,5.45 -2.4,3 -1.71,1.35 -2.78,-0.29 -0.76,-0.51 -2.55,-3.65 1.16,-4.77 2.61,-5.63 2.12,-9.79 -0.79,-13.05 0.14,-9.94 1.01,-3.779995 1.28,-1.48 3.95,-1.18 2.68,-0.02 3.17,2.04 1.02,-0.04 0.64,-1.56 0.24,-8.02 -1.68,-5.52 -0.04,-2.04 1.3,-6.06 0.18,-3.32 -1.8,-4.28 -1.86,-2.15 0.42,-3.7 1.42,-2.98 -0.09,-2.4 1.62,-3.93 -0.4,-1.25 -1.08,-0.88 -1.16,0.31 -2.49,3.69 -0.63,0.56 -1.82,0.43 -3.06,-0.68 -2.95,-2.07 -9.56,-3.12 -1.06,-1.1 -3.19,-1.82 -1.65,-2.12 -0.76,-0.31 -4.629999,1.58 -1.86,-0.74 -6.62,0.14 0,0 0.09,-16.44 4.14,-0.02 16.559999,-14.58 25.12,-5.0100001 2.41,2.14 5.71,0.48 6.45,-0.72 4.85,0.56 5.33,-0.16 5.25,-6.26"
 title="Sokoto"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-SO" />
<path
 d="m 488.91165,275.87874 4.59,-2.65 5.85,0.78 10.59,-4.85 6.44,1.09 3.99,0.03 0,0 3.57,0.71 5.9,-0.6 12.46,0.02 6.37,-0.47 0,0 5.45,10.18 1.46,1.92 4.65,1.08 2.08,1.29 5.26,9.82 -0.46,2.17 0.34,3.84 2.66,2.94 4.14,1.47 2.02,3.84 0.26,1.81 -1,3.62 -5.99,11.44 0.38,5.78 -0.44,2.08 -6.12,5.22 -8.63,11.52 -5.08,5.48 -3.8,3.22 -4.14,4.78 -0.82,1.58 2.52,6.73 2.91,4.7 2.71,2.45 2.72,-1.99 2.83,-4.01 1.64,-0.38 1.42,0.43 1.52,1.12 2.5,3.15 4.32,3.84 2.15,2.6 1.04,2.02 -0.58,5.49 0.74,1.73 0.38,3.54 1.94,4.62 -0.05,1.56 1.22,0.88 0,0 -4.94,5.48 -1.09,1.94 -0.89,2.92 0.38,5.92 0.92,3.32 1.33,2.12 -0.18,1.29 -0.98,0.73 -4.04,-0.35 -0.68,0.46 -2.06,0.06 -0.18,1.64 -1.72,0.75 -1.54,1.93 -1.91,0.43 -1.09,4.21 -2.12,0.65 -1.37,2.72 0.06,0.5 0.94,-0.05 0.46,0.44 0.09,1.77 0.88,0.11 0.19,0.89 -0.99,0.43 -0.62,1.15 0.94,1.52 -0.08,1.04 -1.92,1.11 -0.22,3.22 -1.46,1.44 -0.57,1.91 -1.81,0.78 -1.77,-0.83 -0.6,0.54 -1.24,0.15 -0.46,0.64 0.46,0.88 -0.18,1.73 -0.44,0.5 -3.75,0.68 -0.42,0.22 -0.2,1.37 -1.37,-0.18 -3.03,-2.03 -2.25,1.01 -0.67,-0.7 -3.01,-0.66 -1.42,-1.22 -0.58,0.05 -1.22,1.41 -2.03,-0.08 0.24,-8.73 -2.03,-2.16 -2.24,-0.11 -2.36,2.14 -2.84,-0.48 -1.86,-0.85 -1.43,-3.38 -1.18,-2.19 -1.22,-0.81 -1.17,-0.07 -1.31,-2.11 -0.12,-0.73 1.66,-4.79 -2.66,-1.84 -1.49,-0.2 -0.6,0.74 -1.69,-2.15 -1.03,-0.08 -1.5,-1.61 -0.77,-0.07 -0.36,-1.52 -1.25,-0.63 -0.4,0.46 -1.47,-0.36 -1.85,-1.58 0.52,-1.93 -0.4,-2.09 -1.65,-1.31 -0.76,4.76 0.08,2.89 -1.39,6.02 -0.88,1 -1.67,0.57 -0.34,0.87 -0.64,0.11 -0.94,-0.97 -15.69,1.52 -2.64,-3.08 0.62,-1.75 -0.85,-2.06 -0.19,-1.18 0.07,-0.81 -0.89,-0.32 -8.2,7.4 -0.64,1.12 -2.44,1.72 -1.12,1.84 -4.62,4.63 -1.34,-0.72 -2.2,-0.1 -1.6,-0.22 -0.8,-0.61 -0.9,2.13 0.3,0.79 -0.76,0.97 -0.38,1.8 0.36,2.03 -0.28,1.07 -0.6,0.37 -1.02,2.82 -1.35,5.37 -0.5,0.39 -0.68,-0.34 -1.32,0.37 -1.03,-1.32 -0.44,0.46 0,0 1.9,-8.19 0.03,-8.76 0.33,-1.08 -0.61,-0.73 2.11,-11.5 3.31,-6.16 3.44,-3.25 3.09,-1.94 0.92,-1.43 -0.29,-5.92 2.38,-5.89 0.59,-3.23 -0.56,-1.78 0.26,-1.04 -1.17,-1.36 0.14,-0.65 -8.37,-7.57 -4.44,-5.65 -5.14,-4.9 -7.48,-1.77 -8.18,-0.48 -7.47,0.95 -6.12,2.63 -1.9,-0.57 3.79,-5.97 0,0 1.21,-1.39 11.23,-7.21 0.11,-1.19 -1,-2.68 0.54,-0.65 -0.35,-2.88 -2.03,-2.51 -1.71,-1.36 0.73,-2.86 1.33,-2.14 1.28,-0.86 1.86,0 1.73,0.9 1,1.07 1.52,-0.23 0.33,0.41 4.51,0.95 2.74,-0.82 2.58,-3.68 0,0 3.85,0.25 4.11,-0.54 4.41,-1.01 2.43,-1.19 7.68,-7.65 7.11,-3.76 4.74,-5.72 2.06,-4.19 2.49,-1.44 9.52,-2.1 1.9,0.11 12.18,-5.86 1.78,-3.08 -0.21,-5.54 -0.43,0 -0.3,-2.25 0.55,-1.33 -1.05,-6.02 -2.3,-3.86 -0.76,-5.96 0.51,-4.08 -0.21,-2.15 z"
 title="Taraba"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-TA" />
<path
 d="m 526.42165,32.448745 12.45,0.19 9.56,1.2 10.76,4.18 11.69,2.55 2.73,1.51 6.09,5.17 4.78,3 1.58,0.14 0.3,-0.82 1,-0.28 1.65,0.65 0.62,-0.52 -0.55,-1.18 1.49,0.16 1.7,0.94 1.66,-0.42 0.83,0.71 0.63,1.07 1.04,-0.62 2.85,0.61 0.74,0.5 0.93,0.12 0.99,-0.01 0,0 -0.08,4.21 -1.49,8.02 1.23,3.85 1.45,1.82 4.8,3.84 0.48,3.74 -1.84,4.21 -2.37,3.08 -7.06,6.31 -0.55,2.2 1.72,3.83 -0.05,5.789995 -2.54,16.29 -0.13,3.5 1.69,7.44 -4.72,9.14 0.15,1.94 0.64,0.36 4.91,-0.21 3.13,3.75 0.84,3.33 -0.99,2.11 -4.54,4.43 -3.3,5.9 -2.89,3.35 -0.9,2.86 0.04,2.97 0.76,4.15 -0.24,2.94 -2.09,3.08 -6.11,3.65 -11.21,3.02 -2.66,1.92 -1.72,2.83 -0.61,2.77 0.28,8.39 -3.41,4.53 -3.04,0.69 0,0 -6.78,0.01 -0.3,-0.51 -0.77,-6.45 1.2,-11.85 -0.67,-4.87 -3.68,-3.38 -1.58,1.02 1,-1.54 -3.42,-3.58 -4.75,-6.4 -8.49,-6.26 -2.18,-1.29 -2.98,-1.01 -4.04,-0.17 -4.17,1.51 -0.91,0.88 0,0 -3.04,-0.37 -1.63,-1.53 0.99,-6.78 1.05,-2.72 0.23,-4.92 -8.35,-20.91 -0.2,-3.87 -0.95,-2.71 -0.33,-2.7 -0.21,-6.74 -3.16,-4.66 0.19,-1.81 -0.77,-7.079995 -1.14,-2.93 -7.74,-6.19 0,0 -0.87,-2.9 -1.76,-11.53 -2.21,-3.4 -1.85,-0.88 -2.03,0.61 -4.99,-2.22 -5.86,1.86 -1.12,0.72 -1.46,-2.53 -0.69,-4.35 -2.13,-4.78 -2.21,-1.25 -6.33,1.96 -2.82,1.37 -3.16,0.63 -5.32,2.59 -2.1,3.99 -3.14,1.8 -6,-0.73 -1.79,-1.18 0,0 7.38,-7.5 3.25,-4.6 4.08,-3.51 5.19,-5.85 3.98,-2.54 9.05,-4.06 16.06,-0.94 12.55,-4.7 19.58,-1.07 z"
 title="Yobe"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-YO" />
<path
 d="m 258.59165,50.268745 5.45,6.52 5.08,-0.11 3.34,-0.61 0,0 -1.44,10.82 0.99,6.17 -0.07,6.05 1,5.17 0.39,4.75 1.31,3.21 -0.4,3.57 2.5,5.199995 0.69,3.05 -0.13,1.68 0.95,2.47 -1.09,5.16 -1.82,3.63 1.26,1.21 2.53,1.16 2.68,2.29 1.16,1.43 0.5,1.95 -1.89,1.62 -3.34,-0.81 -0.55,3.2 -4.88,3.97 -1.28,-0.87 -6.61,0.13 -1.5,0.84 -0.65,4 -1.56,4.14 -0.45,3.76 0.16,1.07 1.91,1.9 0.9,3.69 -1.25,6.1 -0.02,2.33 0,0 -1.01,-0.03 -2.34,2.38 -2.75,1.77 -0.85,1.14 -1.71,3.41 -0.64,3.55 -1.51,3.23 -3.04,3.1 -2.33,1.51 -4.71,0.62 -7.94,-0.57 -5.64,0.95 -5.27,4.71 -2.86,4.16 -1.28,0.76 -1.68,0.12 0,0 0.07,-0.84 -1.59,-4.09 -3.8,-6.64 -3.32,-4.4 0,0 -0.21,-5.48 -1.38,-7.58 -1.93,-3.01 -5.38,-2.71 0,-1.2 2.05,-6.49 0.01,-2.47 -1.41,-2.15 -4.35,-1.77 -4.85,-0.62 -1.22,0.81 -2.49,0.59 -3.79,-0.5 -5.47,0.76 -3.65,-2.41 -2.87,-0.11 -1.69,-3.3 -1.08,-0.57 -3.61,0.65 -2.09,-0.31 -0.91,-0.64 -0.79,0.15 -1.06,0.62 -0.82,2.32 -6.34,1.46 -4.11,-2.25 -1.82,0 -0.86,0.48 0,0 0.66,-13.78 -0.1,-18.21 0.93,-4.51 0.92,-0.6 9.33,1.67 4.47,-0.33 2.64,0.31 4.8,-0.64 1.28,0.29 6.11,-0.53 2.46,-1.7 0.74,-3.029995 -0.65,-4.25 -1.43,-4.64 -0.06,-2.88 3.07,-1.91 1.88,-1.87 5.83,-8.58 6.09,-0.95 10.02,-0.79 4.04,-1.64 1.35,-1 -0.07,-8.44 -0.78,-5.14 0.11,-0.7 2.11,-1.82 4.85,-1.56 2.79,0 2.7,1.44 0.5,-0.22 0.73,-1.89 0.59,-5.48 4.97,0.19 2.27,0.68 1.7,2.05 1.9,0.66 9.51,1.28 7.1,-4 3.03,-2.6 0,0 z"
 title="Zamfara"
 fill="orange"
 stroke="#888888"
 stroke-width="2"
 id="NG-ZA" />
 fill="orange"
 stroke="#888888"
 stroke-width="2"
</svg>

<!-- Indicator Matrix -->
  <rect x="600" y="520" width="140" height="80" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <text x="630" y="540" font-family="Arial, sans-serif" font-size="12" fill="#000000">Indicator Matrix</text>
  <!-- Sample data for indicator matrix -->
  <rect x="640" y="550" width="20" height="20" fill="green" />
  <rect x="670" y="550" width="20" height="20" fill="yellow" />
  <rect x="700" y="550" width="20" height="20" fill="red" />
  <text x="635" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">Low</text>
  <text x="660" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">Medium</text>
  <text x="705" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">High</text>

  `;
};

const generateMotaEngilMap = () => {
  // Your dynamic SVG generation logic for Mota-Engil map goes here
  return `
  <div class="map-container">
  <svg width="800" height="610">   

  <rect x="10" y="10" width="740" height="900" fill="#f0f0f0" stroke="#ccc" stroke-width="2" />
  
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="20" fill="#000000" text-anchor="middle">Security Incident Map</text>

  <svg id="nigerian-map" x="20" y="20" width="750" height="650" viewBox="0 100 800 500">

 <path
 d="m 291.01165,491.65874 0.6,0.77 4.83,-0.89 2.71,0.27 2.05,1.34 0.33,1.46 0,0 0.07,4.36 -0.55,2.86 0.05,0.73 0.94,1.03 14.09,0.86 1.24,1.86 0.22,2.19 0.7,1.04 3.21,2.33 1.34,0.21 0,0 1.08,1.29 -0.59,3.72 0.15,3.78 1.37,4.63 0.73,1.68 1.71,2 0.76,2.55 -0.6,1.21 -3.42,-0.76 0,0 -2.69,-2.61 -2.54,-0.84 -2.76,-2.14 -0.58,-2.11 -1.19,-1.47 -3.4,-0.91 -2.42,0.14 -0.28,0.91 0.53,3.51 -1.84,5.1 0.32,0.45 2.23,-0.16 -0.7,2.44 -0.73,0.9 -6.08,-0.16 -1.1,0.98 -0.07,0.75 1.07,1.94 -1.21,5.81 -0.03,2.4 0.66,2.49 -1.17,2.89 -2.52,1.94 0.09,0.77 -0.47,0.64 0.22,1.47 0.59,0.67 0.02,1.17 -0.67,1.62 1.79,3.37 0.13,1.85 0,0 -2.36,-1.79 -2.94,-1.41 -1.8,0.43 -3.28,-1.22 -2.79,0.12 -1.11,0.64 -3.13,0.58 -1.8,-0.27 -1.45,-1.41 -0.59,-1.1 0.16,-1.1 1.37,-3.7 3.42,-4.33 2.39,-4.19 -0.05,-2.78 -0.66,-1.72 -0.54,-0.05 0,0 3.09,-10.25 2.1,-3.87 1.82,-1.68 1.18,-3.04 0.89,-0.9 0.43,-2.01 -0.36,-3.45 0.28,-2.05 -1.51,-2.44 1.23,-0.77 -0.38,-8.47 -0.47,-1.35 -1.04,-1.45 -5.34,-1.78 -2.01,-1.69 0,0 1.27,-2.22 1.36,-1.3 z"
 title="Abia"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-AB" />


<path
 d="m 682.64165,187.16874 -0.13,1.83 -0.82,1.76 -1.02,1.57 -1.1,0.83 -1.77,2.9 -1.36,4.89 -2.66,2.45 -0.48,1.1 -0.61,3.01 0.72,3.61 0.77,1.06 0,1.7 -1.61,1.66 -0.26,4.61 -0.97,1.67 0.13,3.45 -0.78,1.94 -2.05,2.57 -0.26,3.02 -1.61,1.04 -1.44,2.61 -5.87,1.16 -4.18,5.88 0.15,0.98 1.54,1.62 0.04,0.64 -1.15,2.74 -1.85,1.39 -0.03,1.77 0.69,1.6 2.69,1.33 1.01,1.59 -2.16,3.09 -0.13,2.25 -0.54,1.29 0.27,1.11 -1.08,1.47 0.33,0.78 -0.22,1.41 0.43,0.63 -0.74,2.2 -1.02,1.64 -0.97,-0.13 -1.7,1.32 -8.01,0.82 -2.75,2.16 -1.62,0.29 -3.76,3.39 -3.76,1.98 0.09,1.34 2.37,0.27 0.49,0.42 0.09,7.48 -0.73,0.69 -0.83,4.41 0.84,2.07 -1.16,4.03 0.3,1.32 -2.81,4.8 -2.64,2.3 -0.01,1 0.71,0.99 -0.82,2.05 1.27,3.92 -1.13,1.85 -1.09,0.38 -1.67,-0.23 -1.46,0.54 -0.57,1.1 -0.16,2.73 -0.98,0.74 -0.99,1.85 -2.18,0.19 -3.4,2.76 -0.83,0.12 -5.88,-1.64 -0.66,0.66 -0.24,1.71 -1.18,1.16 -0.81,3.05 -1.77,2.34 -2.33,0.14 -1.12,0.89 -2.47,-0.28 -1.85,1.21 -1.91,0.33 -0.72,0.82 -0.68,4.04 1.44,5.22 0.58,5.77 -0.06,1.04 -0.77,0.56 -2.43,4.51 0.62,2.51 0.22,3.73 -4.13,6.35 -3.49,3.09 -1.76,3.01 -0.48,2 -1.12,1.47 -0.41,3.45 -1.11,1.56 0.69,6.14 0.65,1.8 -2.93,1.48 -1.96,0.27 -2.75,3.14 0,0 -1.22,-0.88 0.05,-1.56 -1.94,-4.62 -0.38,-3.54 -0.74,-1.73 0.58,-5.49 -1.04,-2.02 -2.15,-2.6 -4.32,-3.84 -2.5,-3.15 -1.52,-1.12 -1.42,-0.43 -1.64,0.38 -2.83,4.01 -2.72,1.99 -2.71,-2.45 -2.91,-4.7 -2.52,-6.73 0.82,-1.58 4.14,-4.78 3.8,-3.22 5.08,-5.48 8.63,-11.52 6.12,-5.22 0.44,-2.08 -0.38,-5.78 5.99,-11.44 1,-3.62 -0.26,-1.81 -2.02,-3.84 -4.14,-1.47 -2.66,-2.94 -0.34,-3.84 0.46,-2.17 -5.26,-9.82 -2.08,-1.29 -4.65,-1.08 -1.46,-1.92 -5.45,-10.18 0,0 6.2,-0.91 3.37,-1.43 9.4,-5.66 5.75,-4 1.1,-2.33 -0.52,-3.7 0.68,-10.23 0,0 6.34,0.97 2.7,-0.19 4.57,-1.32 1.74,-1.07 1.7,-1.9 3.73,-5.55 6.2,-7.06 2.51,-0.87 6.29,-0.49 5.9,-2.22 2.44,-2.62 0.82,-2.66 3.32,-0.14 2.35,-1.14 2.22,-3.7 2.1,-2.16 2.51,-1.47 8.52,0.79 2.87,1.03 2.58,1.55 2.84,3.11 2.43,1.15 2.38,1.02 4.39,-0.01 1.14,-1.22 1.48,-7.76 2.71,-5.68 1.22,-3.64 0.88,-4.1 0.28,-8.01 3.09,-0.43 0.62,0.74 3.75,1.14 3.86,-0.29 5.62,-1.74 0,0 z"
 title="Adamawa"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-AD" />


<path
 d="m 302.91165,585.31874 0,0.01 0,0 -0.02,-0.02 0,0 0.02,0.01 z m 7.57,-0.7 0.97,0.5 0.92,-0.19 0.88,-0.14 0.33,0.28 -3.58,0.75 -0.49,-0.59 0.97,-0.61 z m 40.31,-7.56 0.88,2.09 -0.76,0.82 -1.07,0.22 -0.22,-1.24 0.56,-0.1 0.35,-0.9 0.26,-0.89 z m -51.56,-11.07 -0.12,-1.85 -1.79,-3.36 0.67,-1.63 -0.02,-1.17 -0.59,-0.67 -0.22,-1.47 0.47,-0.65 -0.09,-0.77 2.52,-1.94 1.18,-2.89 -0.66,-2.49 0.02,-2.41 1.21,-5.81 -1.07,-1.94 0.07,-0.75 1.1,-0.98 6.09,0.16 0.73,-0.9 0.7,-2.44 -2.23,0.16 -0.32,-0.45 1.84,-5.1 -0.53,-3.51 0.29,-0.91 2.42,-0.14 3.4,0.91 1.19,1.47 0.58,2.11 2.75,2.14 2.54,0.84 2.69,2.61 0,0 -0.85,0.1 -1.15,2.45 0.66,1.79 0.84,0.31 0.78,1.94 4.77,-0.56 4.96,2.68 0.4,2.1 -0.61,6.1 1.63,5.13 3.41,4.91 3.19,2.8 3.77,4.33 3.67,2.81 0.59,1.01 0,0 -0.43,2.16 0.79,0.44 0.03,2.5 -0.5,0.45 -0.41,-0.67 -0.07,0.58 1.19,1.17 -0.6,1.8 -0.74,0.19 0.1,1.03 -1.03,1.15 0.24,0.17 -1.05,2.38 -5.23,-0.63 -5.74,-0.07 -10.71,0.55 -12.05,1.68 -0.52,-0.46 -1.82,0.36 -0.93,-0.48 -0.88,0.36 -0.95,-0.09 -0.02,0.03 0.5,0.81 0.27,0.43 -3.32,1.32 -0.98,-1.7 -1.17,-0.65 -0.86,-0.19 -0.96,-1.06 0.38,-0.91 -0.09,-0.12 -0.53,0.5 -0.5,-0.38 0,0 -0.61,-1.17 0.04,-0.64 0.51,-0.32 -0.58,-4.55 0.96,-4.27 -0.63,-2.3 -1.98,-3.47 z"
 title="Akwa Ibom"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-AK" />


<path
 d="m 262.67165,444.90874 0.44,0.4 0.09,3.62 3.83,-0.13 2.44,1.41 2.05,0.08 3.73,1.7 0.36,0.79 -1.25,3.45 -0.75,1.08 -1.69,1.14 -1.85,2.48 0.24,0.96 -0.62,0.83 -0.43,2.35 0.39,0.54 3.85,1.16 1.42,1.8 1.34,3.64 1.31,1.85 -0.3,0.96 -0.82,0.29 0.41,1.37 -0.5,1.62 0.72,0.74 1.89,-1.13 0.61,0.13 0.59,2.58 1.33,0.63 -0.35,2.15 1.88,3.79 0.18,1.51 0.76,0.98 2.39,1.4 1.66,-0.96 1.08,0.09 1.12,0.74 -0.04,0.54 0.83,0.17 0,0 -4.4,2.31 -1.36,1.3 -1.27,2.22 0,0 -5.32,1.42 -5.38,-1.25 -6.31,1.16 -1.78,1.04 -0.93,3.55 -2.37,4.61 -2.68,0.27 -4.51,-1.92 -1.62,0.8 -3,3.83 -2.09,0.83 0,0 -2.4,-0.21 -1.11,-1.28 0,0 1.01,-1.17 1.92,-3.9 0.34,-2.64 1.77,-4.69 2.5,-4.55 0.38,-6.01 1.28,-3.65 -1.23,-3.77 -1.48,-7.29 0.08,-1.37 -1.13,-1.13 -2.13,-9.57 0,0 -0.07,-0.29 0,0 1.67,-0.77 3.59,0.66 1.43,-0.89 1.84,-2.51 0.06,-2.73 1.24,-4.12 2.24,-2.31 1.54,-0.86 z"
 title="Anambra"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-AN" />


<path
 d="m 491.94165,87.518745 7.74,6.19 1.14,2.93 0.77,7.079995 -0.19,1.81 3.16,4.66 0.21,6.74 0.33,2.7 0.95,2.71 0.2,3.87 8.35,20.91 -0.23,4.92 -1.05,2.72 -0.99,6.78 1.63,1.53 3.04,0.37 0,0 -0.8,0.24 -2.71,3.76 -6.04,3.28 -2.57,3.7 -2.01,1.75 -1.49,0.76 -3.91,0.88 -1.44,1.36 -1.38,2.03 -0.97,4.94 -2.61,7.43 -3.61,5.07 -0.2,1.38 7.38,2.99 1.14,1.71 0.87,7.15 0.88,1.15 7.2,2.62 2.08,4.94 -0.48,8.63 0.4,2.86 -0.83,1.76 -3.9,0.63 -1.99,0.92 -1.31,1.91 0.33,1.62 4.29,4.38 2.5,1.41 9.15,7.09 1.23,3.79 0.61,6.19 2.58,5.28 1.69,2.12 -0.13,0.95 -0.58,0.16 0,0 -3.99,-0.03 -6.44,-1.09 -10.59,4.85 -5.85,-0.78 -4.59,2.65 0,0 -6.36,-3.43 -6.18,-4.04 -11.07,-4.74 -9.26,-4.93 -2.57,-0.51 -7.6,-3.95 -3.03,1.78 -0.3,1.44 3.17,4.06 0.27,1.74 -0.5,1.67 -4.76,1.3 -2.89,5.21 -4.39,1.41 -10.04,0.59 -5.47,-1.48 -4.8,-0.27 -1.51,-0.53 -1.56,-1.34 -1.65,-4.07 -0.9,-1.16 -0.79,-0.71 -3.92,-1.42 -0.6,-0.85 0.09,-1.69 2.38,-4.47 0.23,-1.17 -0.26,-5.94 -0.97,-3.13 -1.8,-1.92 -1.06,-0.21 -10.97,2.19 0.04,-12.38 -0.78,-4.8 -2.61,-4.16 -2.78,-0.88 -3.18,-0.08 -1.53,0.49 0,0 -2.53,-2.71 -2.79,-1.75 -0.27,-0.73 2.35,-4.2 0.53,-3.96 0,0 0.99,-0.56 2.59,-4.09 1.33,-3.85 -0.08,-2 -0.77,-1.67 -3.86,-4.33 -0.45,-1.99 -0.4,-6.89 0.45,-3.5 1.6,-4.57 1.02,-0.43 2.7,0.16 2.04,-0.51 2.74,-3.21 2.65,-4.11 4.74,-4.17 0.67,-1.1 2.48,-1.57 1.69,-0.3 1.14,1.07 1.14,0.09 5.52,-2.17 0,0 1,-0.19 6,1.1 7.43,2.41 3.35,-1.46 2.3,0.73 1.78,3.67 3.13,0.21 7.7,-0.48 3.57,-0.91 1.14,0.3 2.67,4.9 0.54,2.15 -0.83,7.85 0.81,2.05 1.35,1.36 5.7,1.19 5.6,-1.39 1.56,0.17 1.86,1.36 2.46,0.62 1.86,-0.57 -1.11,-3.43 0.04,-1.8 1.53,-1.91 2.53,-1.36 4.04,-0.99 1.44,-0.78 1.85,-1.39 1.1,-2.72 -1.04,-1.46 -8.87,-0.56 -5.72,-1.27 -6.39,-0.77 -2.99,-1.85 -5.3,-7.42 -1.05,-2.5 -0.47,-2.57 -3.84,0.94 -1.18,-1.11 -0.55,-1.74 2.51,-5 -0.52,-4.32 -1.46,-4.42 -1.81,-0.5 -2.75,0.27 -2.12,1.03 -2.61,0.04 -1.35,-0.63 0.49,-4.26 3.22,-4.54 6.16,-0.46 5.47,-3.04 10.94,-3.73 6.23,-2.51 1.19,-0.94 -0.03,-2.25 -0.57,-1.88 6.71,-20.589995 4.54,-1.95 3.48,-0.55 0.99,0.82 0.83,1.64 0.12,1.39 z"
 title="Bauchi"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-BA" />
<path
 d="m 309.66165,367.75874 9.13,2.48 8.51,1.25 8.71,3.55 4.92,2.82 5.25,0.99 1.07,-0.14 3.32,2.8 5.33,2.23 1.14,-1.1 0.09,-1.36 -4.7,-11.64 -0.08,-2.52 1.02,-2.86 1.24,-1.41 3.95,-2.2 1.38,-0.28 2.59,-0.18 2.68,0.44 10.09,3.72 6.86,1.55 4.88,0.41 3.96,-0.22 0.01,-0.7 11.79,8.93 0,0 -3.79,5.97 1.9,0.57 6.12,-2.63 7.47,-0.95 8.18,0.48 7.48,1.77 5.14,4.9 4.44,5.65 8.37,7.57 -0.14,0.65 1.17,1.36 -0.26,1.04 0.56,1.78 -0.59,3.23 -2.38,5.89 0.29,5.92 -0.92,1.43 -3.09,1.94 -3.44,3.25 -3.31,6.16 -2.11,11.5 0.61,0.73 -0.33,1.08 -0.03,8.76 -1.9,8.19 0,0 -0.72,0.3 -2.12,-0.73 -0.78,1.42 0.1,2 -2.82,1.74 -1.79,0.22 -2.78,-0.44 0,0 -0.65,-1.55 -4.88,-6.63 -5.53,-5.73 -1.49,-0.72 -3.09,-0.22 -9.57,2.24 -4.38,-0.44 -1.21,-0.89 0.66,-4.77 -0.56,-1.64 -8.64,-5.38 -5.43,-1.69 -2.11,-0.07 -2.31,0.59 -2.11,0.67 -1.52,1.2 0.77,4.5 -3.14,1.92 -3.13,0.83 -3.84,-0.14 -2.06,-0.67 -1.92,0.45 -1.36,1.75 -2.36,1.96 -2.99,0.49 0,0 -1.7,-2.27 -0.84,-4.26 -1.76,-1.3 -1.02,2.31 -3.41,0.37 -1.77,2.88 -1.92,0.93 -2.95,-0.25 -3.45,0.4 -1.25,8.23 -0.99,2.05 -1.41,0.59 -1.78,-0.74 -4.01,-3.68 -0.65,-1.54 0.17,-0.91 0,0 2.28,-6.42 -0.9,-5.62 -1.42,-2.14 -1.52,-1.15 -2.81,-0.35 -2.21,2.11 -2.1,0.73 -2.92,-1.52 -3.58,-2.76 -2.89,-3.35 -2.74,-6.51 0.13,-0.53 0,0 0.41,-0.5 0.84,0.58 3.37,3.29 0.82,-0.1 1.35,1.05 1.76,0 0.34,-4.42 0.96,-1.44 6.44,-3.12 3.3,-3.11 1.94,-5.83 0.42,-3.93 0.47,-1.29 1.23,-1.21 0.36,-1.81 -1.48,-0.47 -3.31,0.32 -1.27,-1.05 -1.24,-5.53 -0.57,-6.81 -0.01,-6.9 -0.73,-1.85 -2.7,-2.61 -1.88,-3.22 -0.54,-5.87 z"
 title="Benue"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-BE" />
<path
 d="m 662.15165,11.078745 0.7,5.65 -0.83,3 3.49,6.26 -0.2,2.52 -0.46,0.49 0.28,-2.17 -1.04,1.33 -0.22,1.92 2.38,2.55 2.46,0.61 -0.65,0.67 0.28,0.54 0.78,0.19 4.46,7.53 2.83,3.08 1.05,0.22 1.72,0.96 1.63,1.2 3.87,0.75 0.26,0.86 -0.58,-0.01 -0.56,1.1 -0.2,-1.04 -0.66,0.58 -0.74,-0.04 1.44,1.6 0.27,1.76 3.88,-1.16 2.31,-2.61 2.47,-2.02 1.6,-0.67 -1.08,1.76 0.15,0.45 0.65,-0.19 0.57,2.34 -0.33,0.22 -0.67,-1.38 -0.85,0.48 -0.57,1.23 -2.02,0.57 0.67,1.88 -1.19,1.13 -1.86,3.73 0.41,0.77 1.37,-0.45 -0.07,2.44 -0.58,1.15 0.85,0.04 -0.34,1.36 -1.15,1.54 0.4,0.57 1.57,-0.43 0.29,0.55 -2.63,1.39 1.97,0.5 -0.15,0.89 1.2,0.05 -0.75,0.85 -1.32,0.33 0.12,0.42 1.24,-0.23 0.12,0.6 -0.48,0.44 -0.23,-0.37 -1.01,0.23 0.24,0.75 0.74,-0.12 -0.85,1.67 1.51,0.21 0.22,1.34 -0.57,0.74 0.26,1.25 0.97,0.22 0.53,1.21 -0.24,1.15 1.95,0.55 0.34,1.46 0.61,0.52 1.61,-0.95 0.46,0.2 0.71,1.91 1.22,0.71 0.31,1.08 2.16,0.77 -0.03,1.1 0.67,1 -0.37,1.19 0.71,0.64 1.11,0.55 1.41,-0.5 2,0.26 -0.27,1.04 0.83,0.06 0.39,-0.69 1.81,-0.07 1.47,-0.81 2.46,-0.08 0.17,1.22 1.07,0.09 -0.12,0.91 -1.25,0.32 0.22,0.53 -0.38,0.64 0.95,0.28 2.25,2.61 3.42,-0.53 1.03,-0.05 0.43,0.81 1.72,-0.87 2.93,0.87 3.5,-0.35 0.68,0.31 0.85,0.12 1.61,0.34 0.79,1.2 1.27,0.34 0.34,0.87 -0.67,0.02 0.08,1.119995 2.17,1.01 0.7,1.37 -0.72,1.39 2.99,0.77 0.76,1.5 -0.54,0.46 1.13,0.54 0.78,0.12 0.12,-0.49 0.97,-0.08 0.51,-0.51 1.33,2.51 -1.37,1.29 -0.32,1.8 -0.74,0.87 0.68,2 -1.72,1.16 -0.06,1.57 2.2,3.78 -1.21,1.74 0.23,1.35 -2.32,2.77 0.01,1.5 0.29,3.79 -0.7,1.23 -2.81,2.15 -0.06,0.55 1.26,1.72 2.01,1.13 2.16,2.18 0.44,2.16 -0.62,4.68 -1.26,0.93 -6.36,2.57 -3.88,0.9 -1.7,3.09 -8.09,3.17 -3.28,2.07 -1.93,2.65 -4.46,1.94 -2.32,0.04 -2.72,-2.37 -2.52,-0.44 -1.07,-0.83 -1.07,0.16 -0.61,0.76 -0.58,2.32 -2.08,2.36 -0.78,2.68 -0.72,1.05 -1.46,0.96 0.24,1.49 -0.65,0.21 -1.08,1.68 -2.32,2.04 -1.21,2.91 -3.24,1.61 -2.42,0.54 -0.77,0.75 -0.19,1.74 0,0 -5.62,1.74 -3.86,0.29 -3.75,-1.14 -0.62,-0.74 -3.09,0.43 -0.28,8.01 -0.88,4.1 -1.22,3.64 -2.71,5.68 -1.48,7.76 -1.14,1.22 -4.39,0.01 -2.38,-1.02 -2.43,-1.15 -2.84,-3.11 -2.58,-1.55 -2.87,-1.03 -8.52,-0.79 -2.51,1.47 -2.1,2.16 -2.22,3.7 -2.35,1.14 -3.32,0.14 -0.82,2.66 -2.44,2.62 -5.9,2.22 -6.29,0.49 -2.51,0.87 -6.2,7.06 -3.73,5.55 -1.7,1.9 -1.74,1.07 -4.57,1.32 -2.7,0.19 -6.34,-0.97 0,0 -3.91,-2.2 -1.81,-1.6 -3.13,-6.17 -5.66,-2.34 -1.83,-1.82 -2.43,-3.51 -0.81,-2.83 5.18,-7.56 0.62,-3.02 -1.35,-3.3 0,0 3.04,-0.69 3.41,-4.53 -0.28,-8.39 0.61,-2.77 1.72,-2.83 2.66,-1.92 11.21,-3.02 6.11,-3.65 2.09,-3.08 0.24,-2.94 -0.76,-4.15 -0.04,-2.97 0.9,-2.86 2.89,-3.35 3.3,-5.9 4.54,-4.43 0.99,-2.11 -0.84,-3.33 -3.13,-3.75 -4.91,0.21 -0.64,-0.36 -0.15,-1.94 4.72,-9.14 -1.69,-7.44 0.13,-3.5 2.54,-16.29 0.05,-5.789995 -1.72,-3.83 0.55,-2.2 7.06,-6.31 2.37,-3.08 1.84,-4.21 -0.48,-3.74 -4.8,-3.84 -1.45,-1.82 -1.23,-3.85 1.49,-8.02 0.08,-4.21 0,0 1.45,-0.12 4.38,0.88 0.03,-1.19 0.59,-0.41 0.07,-0.74 0.19,-1.71 1.48,-1.33 1.14,0.24 1.35,-0.73 -0.34,-1.16 0.73,-1.08 -0.23,-0.32 -0.89,-0.19 0.4,-1.13 0.77,-1.33 0.8,-1.78 0.64,-0.6 2.28,0.35 1.38,-0.87 0.96,0.09 0.61,0.74 0.96,-1.11 0.23,-1.44 1.34,-0.23 1.47,-0.29 0.29,-0.46 -0.34,-0.4 0.98,-1.17 2.11,-0.48 0.62,-1.24 1.37,-0.78 0.16,-0.79 0.58,-0.74 0.4,-0.74 -0.02,-0.86 1.1,-0.43 0.43,-1.02 -0.81,-0.31 0.57,-0.61 1.23,0.63 -0.29,-1.57 1.1,0.12 0.06,0.47 0.85,0.29 1.1,-0.14 1.87,-1.67 1.02,-0.37 0.32,0.38 1.98,-0.1 1.39,-1.33 1.02,0.49 0.05,-1.08 1.08,-0.36 1.02,0.09 -0.89,1.17 1.47,0.79 0.92,-1.31 1.35,1.04 -0.2,-1.31 1.48,-0.51 -0.31,2.08 0.92,0.12 0.45,-0.97 1.15,-0.25 0.92,1.39 0.96,-2.53 1.66,-0.84 0.02,-0.44 -0.55,-0.19 0.19,-0.71 1.19,0.2 0.64,-0.8 -0.64,-0.17 -0.4,-1.02 1.68,-1.6 -0.06,-0.58 1.49,-0.67 -0.05,-0.93 1.05,-1.06 1.24,-0.24 0.39,-1.06 z"
 title="Borno"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-BO" />
<path
 d="m 251.22165,579.30874 -0.21,-0.62 -0.68,0.1 -3.96,-2.6 -1.2,-4.38 -1.38,-1.87 -1.99,-0.02 -6.54,2.54 -1.04,-0.26 -0.35,-1.94 0.42,-1.46 -3.31,-1.44 -0.5,-0.83 0.07,-4.34 1.9,-2.67 0.76,-2.05 0.03,-1.27 -1.29,0.16 -0.84,-0.78 1.33,-4.44 4.49,-7.84 2.77,0.17 0.55,-0.5 0.75,-2.49 1.54,-0.79 -0.23,-1.81 1.58,-1.07 0.95,-1.48 -0.03,-1.94 -0.63,-1.54 -0.76,-0.58 -1.92,-0.83 -2.94,0.49 -1.04,-0.28 0.77,2.47 -1.2,0.85 -5.08,2.19 -3.49,-0.44 -2.74,0.49 -2.01,4.1 -2.11,0.52 -0.79,-0.6 -1.47,-0.08 -0.36,0.95 0.26,2.31 -2.83,1.56 -1.62,0.56 -3.01,-0.24 -1.23,1.99 -2.31,0.62 -1.89,-0.67 -0.99,-1.66 -2.11,-1.28 -0.75,0.5 -1.48,3.07 -3.3,1.64 -2.62,-0.42 -7.48,4.1 -0.94,-0.37 -2.32,0.4 -1,-1.1 -2.69,-1.6 -3.05,-0.71 -2.9,-1.66 -2.1,-2.1 -0.56,0.72 -0.72,-0.57 -1.43,0.53 -0.36,-0.5 -1.63,0.84 2.36,4.61 1.91,5.81 -0.34,0.79 0.95,1.52 0.35,1.86 4.06,6.77 0.19,1.44 0.94,0.55 0.01,0.17 0.05,1.1 7.5,10.38 1.19,0.62 -0.02,0.75 2.77,1.35 -0.27,0.41 1.05,0.75 0.12,0.65 2.56,1.59 0.19,-0.39 0.31,0.34 -0.22,0.24 0.02,0.34 2.61,2.16 0.48,-0.02 -0.14,-0.77 -0.45,-0.21 1.58,-0.46 -0.76,0.7 0.33,0.72 -0.26,0.27 0.07,0.51 2.32,1.7 5.07,2.36 0.19,-2 -0.79,-0.51 -0.55,-1.25 0.34,0.12 0.29,0.89 0.79,0.22 -0.12,-0.7 0.41,0.03 -0.02,0.7 0.52,0.17 0.26,0.77 -0.62,1.18 0.26,0.43 -0.34,1.3 0.4,0.29 5.18,1.32 0.19,-2.23 0.65,-0.58 0.38,3.84 8.34,-0.7 -0.64,-2.4 1.03,-3.05 0.65,-1.1 -0.29,-1.37 -1.91,-1.15 0.48,-0.05 1.19,0.27 0.96,1.58 0.6,-1.13 -0.55,-0.79 0.09,-2.14 -0.84,-1.35 0.31,-0.74 0.17,1.03 0.69,0.55 0.03,0.38 0.74,2.02 -0.1,3.1 2.72,-2.47 -0.58,-0.63 0.1,-1.94 1.91,-0.6 0.5,-0.63 0.69,1.61 0.12,1.29 -0.48,1.03 0.6,1.32 0.05,1.61 1.34,0.26 1.08,1.51 0.48,-0.05 -0.19,0.33 0.22,0.43 2.17,-0.48 0.19,0.34 -0.62,0.65 1.53,0.79 8.46,-0.91 0.02,-0.48 -0.4,-0.51 -0.07,-0.77 -0.1,-0.34 0.67,-0.86 0.6,-0.58 -0.52,2.04 0.22,0.39 2.03,1.76 0.96,-0.98 3.53,-0.38 -0.5,-2.47 -0.09,-0.38 -0.38,-1.13 -1.15,-0.75 -0.19,-0.99 0.02,-0.19 0.29,-1.06 -0.53,-2.25 -0.41,-0.55 0.35,-0.36 0.76,0.9 1.25,4.2 0.38,-0.58 -0.65,-5.23 1.7,-3.39 0.26,-1.83 z m -78.3,-19.41 0,0 0.01,0.01 -0.01,-0.01 z m 59.51,37.48 -8.22,0.99 -2.8,-0.1 -0.22,-0.7 1.36,-2.52 0.15,-0.02 0.45,0.04 0.14,-1.3 1.98,-2.19 0.12,-0.31 0.43,-0.89 0.45,-0.19 -0.59,-0.77 -0.18,-1.3 0.55,-0.35 1.03,-0.19 0.9,1.34 -0.5,1.33 0.78,1.62 -0.22,1.57 1.63,0.44 0.65,0.92 2.11,2.58 z"
 title="Bayelsa"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-BY" />
<path
 d="m 348.48165,451.12874 2.99,-0.49 2.36,-1.96 1.36,-1.75 1.92,-0.45 2.06,0.67 3.84,0.14 3.13,-0.83 3.14,-1.92 -0.77,-4.5 1.52,-1.2 2.11,-0.67 2.31,-0.59 2.11,0.07 5.43,1.69 8.64,5.38 0.56,1.64 -0.66,4.77 1.21,0.89 4.38,0.44 9.57,-2.24 3.09,0.22 1.49,0.72 5.53,5.73 4.88,6.63 0.65,1.55 0,0 -2.17,8.34 -5.15,-2.21 -0.78,1.84 -0.02,1.98 -0.58,0.73 -1.08,0.94 -2.8,4.86 -3.23,0.94 -1.63,1.19 -1.2,1.18 -0.95,2.5 -0.99,0.97 -8.72,7.77 -3.81,2.73 -1.12,0.33 -1.64,2.3 -1.69,0.87 -1.3,1.48 0.4,0.86 1.36,1.04 -1.05,1.48 0.4,0.83 -0.45,0.96 -1.47,1.87 -0.57,-0.58 0.05,1.5 5.1,5.64 0.31,1.76 -2.4,4.05 -0.64,2.4 -1.12,1.36 0.21,3.89 -1.81,5.88 0.15,6.56 -2.54,4.2 -1.89,0.77 -0.08,0.84 -1.34,1.04 -1.22,3.3 -1.25,1.04 0.97,1.02 -0.9,0.35 -0.98,1.24 0.05,0.57 -1.01,0.38 0.09,1.76 -1.97,0.75 -1.02,1.25 -0.02,0.96 1.2,1.14 0.34,1.53 -2.42,1.46 -1.09,-0.24 -0.68,-0.72 -1.03,0.82 -0.64,1.52 -0.75,0.53 -0.16,1.47 0.67,0.07 0.6,-1.75 0.26,2.51 -0.36,0.56 -0.43,-0.67 -0.6,0.14 0.58,1.44 -1.48,0.27 0.06,0.76 -1.78,0.29 -1.47,-0.6 0.51,-1.77 1.07,-0.12 -1.27,-1.61 -0.8,1.22 -1.16,0.48 -2.07,-0.46 -0.65,-1.15 0.77,-0.7 0.21,-0.16 -0.31,-0.91 -1.36,0.41 -1.13,-0.63 -2.38,2.18 0,0 -0.59,-1.01 -3.67,-2.81 -3.78,-4.34 -3.18,-2.8 -3.41,-4.91 -1.63,-5.13 0.61,-6.1 -0.39,-2.1 -4.96,-2.68 -4.77,0.56 -0.79,-1.94 -0.83,-0.31 -0.66,-1.79 1.15,-2.45 0.85,-0.1 0,0 3.42,0.76 0.6,-1.21 -0.76,-2.55 -1.71,-2 -0.73,-1.68 -1.37,-4.63 -0.15,-3.78 0.59,-3.72 -1.08,-1.29 0,0 0.38,-2.39 2.34,-3.11 -0.36,-2.66 1.46,-1.26 0.34,-1.35 1.98,-2.29 0.08,-2.42 -1.14,-1.8 0.19,-0.98 2.27,-1.08 2.62,-0.18 2.69,4.5 1.34,-2.08 2.16,-0.77 2.2,-1.71 0.28,-1.31 1.88,-0.29 2.18,1.26 0.84,-0.91 0.68,-2.3 0.1,-2.59 0.8,-1.47 6.92,-8.39 0.02,-1.4 -1.86,-2.6 -0.01,-1.6 1.65,-1.63 2.19,-0.37 0.83,-1.7 -0.24,-1.05 -1.38,-1 -0.41,-1.5 -0.52,-0.37 0.1,-1.94 -1.28,-1.12 -0.5,-1.71 -2.7,-1.87 -1.99,-2.62 z"
 title="Cross River"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-CR" />
<path
 d="m 252.45165,479.95874 -1.48,-7.29 0.08,-1.37 -1.13,-1.13 -2.13,-9.57 -1.88,2.04 -4.1,-0.38 -3.73,0.81 -8.19,5.12 -7.35,3.1 -4.03,4.53 -0.64,0.05 -2.58,-3.94 -1.01,-0.42 -1.67,-0.31 -1.78,1.58 -0.89,2.03 -0.15,2.37 0.4,0.75 1.46,0.81 0.54,4.82 2.03,3.59 1.96,2.42 1.88,1.46 2.23,0.81 0.29,1.75 -0.7,3.24 -1.55,1.91 -1.63,1.66 -3.08,2.03 -2.29,3.07 -2.78,1.99 -1.81,0.6 -5.23,1.04 -2.13,-0.56 0.7,-1.8 -1.6,-1.61 2.04,-4.03 -0.47,-0.83 -3.91,-2.35 -2,-2.83 -4.67,-2.62 -3.17,-1.25 -1.64,-1.34 -5.12,1.85 -1.85,2.38 -1.77,-0.4 -2.27,-1.98 -1.38,-0.29 -3.17,0.67 -2.98,-0.72 -0.99,0.31 -0.63,0.3 -0.06,1.03 0.89,1.57 -0.52,1.06 -4.1,3.22 -1.66,0.07 -0.05,-2.47 -0.66,-2.55 0.7,-2.93 -0.15,-1.43 -1.66,-1.67 -5.43,-2.8 -6.9,16.74 2.48,4.48 1.39,0.88 0.58,-1.6 1.31,-1.25 7.76,-4.22 1.26,-0.22 1.85,-1.28 1.13,-0.54 0.36,0.51 -0.02,0.17 -2,0.95 -1.01,1.6 -0.07,0.26 -0.83,-0.53 -2.25,0.98 -3.18,2.51 -0.34,0.75 -1.98,-0.45 -1.05,0.82 -0.79,3.14 0.26,1.54 2.63,4.5 3.18,3.14 1.12,-0.53 3.01,-1.34 2.97,0.41 0.74,-3.16 1.15,-2.15 -0.02,-0.38 0.4,-0.3 0,0.01 0.38,0.12 -0.23,0.14 -0.24,1.9 -1.12,2.27 1,2.13 1.91,0.63 1.63,-0.27 1.58,-3.18 1.6,0.1 0.19,-0.25 0,0.01 2.99,1.54 1.12,0.67 0.19,0.48 -1.19,-0.34 0.27,0.77 0.1,1.32 -1.33,-0.35 0.97,-0.67 -0.33,-1.34 -1.12,-0.72 -3.13,-0.29 -0.6,0.14 0.09,1.63 -0.55,1.13 -2.34,1.97 1,-1.58 -1.79,0.15 -2.1,-0.55 -4.44,-0.67 -1.96,0.19 -0.12,0.84 -1.62,1.08 -1.26,1.67 2.77,3.96 3.04,2.61 6.04,2.63 5.09,0.29 0.02,-0.65 -1.19,-1.39 -0.95,-2.9 -0.26,-0.45 0.07,-0.74 0.47,-0.12 -0.19,0.82 1,2.2 0.83,-0.6 0.36,0 -0.07,0.22 -0.95,1.08 0.26,0.5 2.65,1.12 0.57,-0.21 1.65,-4.8 0.84,-1.46 0.96,-0.62 -0.64,-0.33 3.2,0.12 0.48,0.15 1.05,-0.46 0.46,-1.13 0.74,-0.38 1.12,0.17 0.95,0.91 0.61,-0.66 0.09,0.23 -0.12,0.75 -0.89,0.04 -1.38,-0.94 -1.01,1.68 -1.58,0.79 -1.81,-0.12 0.22,0.86 -0.96,-0.98 -1.32,0.36 -0.55,3.02 0.27,1.32 0.58,1.08 0.45,0.72 3.36,1.09 -0.3,0.8 -1.55,-1.12 -0.65,0.36 -0.03,0.7 -0.07,0.22 -0.49,0.13 0.32,-1.47 -0.31,-0.12 -0.43,-0.34 -0.45,-0.46 -0.45,0.48 -0.74,0.5 -0.36,0.53 -0.79,0.12 -1.12,0.57 0.91,0.46 2.05,-0.1 -2.97,0.96 -0.4,0.63 -1,-1.61 -0.6,0.05 -0.28,-0.02 -2.53,0.15 -1.17,0.63 -0.07,-0.39 -0.69,-0.07 -0.41,-0.31 -0.67,0.22 -0.83,-0.43 0.05,2.44 1.91,7.63 -0.24,1.66 2.08,2.26 2.05,-0.88 2.65,-0.17 -0.89,-1.35 -0.09,-1.12 0.15,-0.24 0.5,-2.38 0.29,-0.03 -0.15,0.6 0.15,0.41 -0.52,2.69 0.88,0.55 -0.1,1.53 -0.8,0.31 2.1,2.1 2.9,1.66 3.05,0.71 2.69,1.6 1,1.1 2.32,-0.4 0.94,0.37 7.48,-4.1 2.62,0.42 3.3,-1.64 1.48,-3.07 0.75,-0.5 2.11,1.28 0.99,1.66 1.89,0.67 2.31,-0.62 1.23,-1.99 3.01,0.24 1.62,-0.56 2.83,-1.56 -0.26,-2.31 0.36,-0.95 1.47,0.08 0.79,0.6 2.11,-0.52 2.01,-4.1 2.74,-0.49 3.49,0.44 5.08,-2.19 1.2,-0.85 -0.77,-2.47 -0.57,-1.04 0.21,-0.44 3.52,-1.81 0.19,-5.3 0.7,-1.48 2.05,-1.42 0.89,-1.75 0.82,-3.18 -1.09,-3.54 0.23,-0.35 1.01,-1.17 1.92,-3.9 0.34,-2.63 1.76,-4.69 2.5,-4.55 0.38,-6.01 1.27,-3.65 -1.18,-3.74 z"
 title="Delta"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-DE" />
<path
 d="m 319.74165,453.93874 -0.17,0.91 0.65,1.54 4.01,3.68 1.78,0.74 1.41,-0.59 0.99,-2.05 1.25,-8.23 3.45,-0.4 2.95,0.25 1.92,-0.93 1.77,-2.88 3.41,-0.37 1.02,-2.31 1.76,1.3 0.84,4.26 1.7,2.27 0,0 0.49,2.89 1.99,2.62 2.7,1.87 0.5,1.71 1.28,1.12 -0.1,1.94 0.52,0.37 0.41,1.5 1.38,1 0.24,1.05 -0.83,1.7 -2.19,0.37 -1.65,1.63 0.01,1.6 1.86,2.6 -0.02,1.4 -6.92,8.39 -0.8,1.47 -0.1,2.59 -0.68,2.3 -0.84,0.91 -2.18,-1.26 -1.88,0.29 -0.28,1.31 -2.2,1.71 -2.16,0.77 -1.34,2.08 -2.69,-4.5 -2.62,0.18 -2.27,1.08 -0.19,0.98 1.14,1.8 -0.08,2.42 -1.98,2.29 -0.34,1.35 -1.46,1.26 0.36,2.66 -2.34,3.11 -0.38,2.39 0,0 -1.34,-0.21 -3.21,-2.33 -0.7,-1.04 -0.22,-2.19 -1.24,-1.86 -14.09,-0.86 -0.94,-1.03 -0.05,-0.73 0.55,-2.86 -0.07,-4.36 0,0 3.63,-1.01 1.99,1.7 0.77,0.09 2.11,2.51 0.73,0.07 0.65,-1.44 -0.8,-2.92 -0.15,-2.64 2.67,-2.73 0.8,-1.73 -0.99,-6.64 -0.62,-2.55 -1.08,-1.07 0.02,-1.23 2.74,-6.11 0.01,-5.82 -0.65,-1.15 -0.38,-3.29 -1.48,-4.9 6.45,0.55 z"
 title="Ebonyi"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-EB" />
<path
 d="m 208.35165,395.48874 0.77,0.64 1.75,-0.37 0.7,0.36 0.28,0.68 -0.38,0.89 0.46,0.65 2.18,-0.25 0.27,0.8 -0.96,1.85 -0.23,1.93 0.28,1.05 1.08,0.78 2.13,0.53 5.94,-2.93 1.56,2.1 0.65,-0.07 1.26,1.41 0.55,-0.06 1.96,2.23 2.26,-0.19 0.74,-0.51 2.56,0.15 1.06,2.01 0.07,1.22 0.85,0.61 0.48,1.74 0.74,0.56 -0.24,0.51 0.66,1.63 3.75,-0.84 0.43,0.38 1.46,-0.99 1.87,-0.41 1.75,1.41 0.55,2.12 1.45,1.08 0.79,2.01 0.15,3.41 -0.31,1.92 -1.62,3.94 0.06,4.16 -1.91,4.82 -2.16,3.55 1.28,2.15 -0.93,5.52 0.89,2.6 1.41,2.01 1.03,6.03 0,0 0.07,0.29 0,0 -1.88,2.03 -4.09,-0.38 -3.73,0.81 -8.19,5.11 -7.35,3.1 -4.03,4.53 -0.65,0.04 -2.58,-3.94 -1.01,-0.41 -1.66,-0.32 -1.79,1.59 -0.89,2.02 -0.15,2.37 0.4,0.75 1.46,0.81 0.54,4.82 2.03,3.58 1.96,2.42 1.88,1.46 2.23,0.81 0.28,1.74 -0.69,3.24 -1.55,1.91 -1.62,1.66 -3.08,2.03 -2.3,3.07 -2.77,1.99 -1.81,0.6 -5.24,1.04 -2.13,-0.57 0.7,-1.8 -1.6,-1.61 2.03,-4.03 -0.47,-0.83 -3.9,-2.35 -2,-2.83 -4.68,-2.62 -3.16,-1.25 -1.64,-1.34 -5.12,1.85 -1.85,2.38 -1.77,-0.4 -2.27,-1.98 -1.38,-0.29 -3.17,0.67 -2.97,-0.72 -0.99,0.31 -0.64,0.3 -0.06,1.03 0.89,1.57 -0.52,1.06 -4.09,3.23 -1.66,0.07 -0.05,-2.47 -0.66,-2.55 0.71,-2.93 -0.15,-1.43 -1.66,-1.67 -5.43,-2.79 0,0 0.39,-1.16 -1.23,-2.26 -1.33,-1.04 -1.56,-0.09 -1.65,-2.94 -1.94,-1.36 -0.7,-0.06 -0.44,-0.91 0.25,-0.59 -0.28,0.44 0.8,-0.7 0.96,-3.63 0.58,-0.61 2.95,-0.87 0.84,-3.74 1.74,-1.71 0.84,-1.96 0.35,-1.72 -0.57,-1.45 -1.4,-2.28 -1.23,-0.64 0,-2.84 0.81,-0.98 -0.1,-2.22 0.49,-0.96 1.75,-1.62 0.45,-1.03 1.73,-0.8 0.79,-2.27 0.96,-0.69 0.09,-1.95 0.45,-0.78 2.2,-1.01 2.13,0.4 2.28,-0.38 1.68,0.36 6.64,0.11 3.29,-0.38 1.64,0.34 1.74,2.08 -2.01,2.26 2.1,5.46 0.74,-0.03 3.77,-3.16 1.34,0.12 1.19,1.48 0.81,0.35 2.68,-1.02 1.51,-3.39 0.95,-4.96 0.25,-0.25 1.19,0.51 0.01,-1.63 0.88,-0.52 -0.15,-0.81 -1.18,-1.28 0.61,-4.64 1.24,-1.66 1.52,-0.73 0.37,-0.85 -0.32,-0.84 3.23,-6.89 -0.15,-1.39 0.47,-1.04 1.76,-1.83 2.15,-1.05 1.43,-3.54 -0.43,-0.28 -0.77,-2.48 0.87,-2.89 -2.01,-0.82 -0.4,-0.84 0.18,-1.39 1.41,-1.72 1.56,0.14 0.89,-0.6 z"
 title="Edo"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-ED" />
<path
 d="m 148.66165,367.10874 0.41,-0.17 0.61,1.67 1.03,0.49 4.48,-1.25 0.95,0.37 1.47,2.06 0.95,0.49 2.33,-0.23 2.3,0.62 1.95,-0.58 1.29,0.55 1.04,-2.16 -0.29,-0.63 0.82,-2.22 4.11,-1.34 5.76,-0.09 0,0 -1.09,0.42 -0.03,4.28 0.55,0.45 2.48,-1.42 3.67,-0.64 2.31,0.27 0.56,0.7 -0.28,1.37 -1.34,0.64 -2.29,3.01 -0.08,1.56 1.32,3.75 1.32,0.96 1.28,0.03 1.85,1.69 6.82,2.39 0,0 -1.52,2.4 -0.82,0.3 -1.5,-1.25 -1.86,0.39 -0.85,2.06 -2.18,1.45 -2.4,2.48 -1.13,2.14 -1.71,8.1 -1.7,3.92 -3.05,4.43 -5.53,3.49 -2.27,-0.59 -1.09,-2.68 0.16,-0.86 -1.04,-3.19 -1.42,-2.22 -1.55,-0.52 -6.97,0.31 -7.78,-0.44 -4.55,1.45 0,0 -0.83,-1.7 -0.84,-3.79 -2.85,-6.11 -0.69,-4.78 1.19,-3.99 -0.81,-2.81 0.12,-1.4 1.9,-4.25 1.62,-1.5 2.18,-0.94 1.99,-1.64 z"
 title="Ekiti"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-EK" />
<path
 d="m 262.67165,444.90874 2.73,-5.01 0.91,0.25 0.18,2.28 0.74,0.05 1.33,2.01 0.69,0.34 1.24,-0.33 4.97,-5.39 5.98,-3.86 6.18,-7.42 2.44,-0.91 2.14,-2.1 3.31,-0.76 2.44,0.75 1.11,1.62 0,0 -0.13,0.53 2.74,6.51 2.89,3.35 3.58,2.76 2.92,1.52 2.1,-0.73 2.21,-2.11 2.81,0.35 1.52,1.15 1.42,2.14 0.9,5.62 -2.28,6.42 0,0 -1.79,0.36 -6.45,-0.55 1.48,4.9 0.38,3.29 0.65,1.15 -0.01,5.82 -2.74,6.11 -0.02,1.23 1.08,1.07 0.62,2.55 0.99,6.64 -0.8,1.73 -2.67,2.73 0.15,2.64 0.8,2.92 -0.65,1.44 -0.73,-0.07 -2.11,-2.51 -0.77,-0.09 -1.99,-1.7 -3.63,1.01 0,0 -0.33,-1.46 -2.05,-1.34 -2.71,-0.27 -4.83,0.89 -0.6,-0.77 0,0 -0.83,-0.17 0.04,-0.54 -1.12,-0.74 -1.08,-0.09 -1.66,0.96 -2.39,-1.4 -0.76,-0.98 -0.18,-1.51 -1.88,-3.79 0.35,-2.15 -1.33,-0.63 -0.59,-2.58 -0.61,-0.13 -1.89,1.13 -0.72,-0.74 0.5,-1.62 -0.41,-1.37 0.82,-0.29 0.3,-0.96 -1.31,-1.85 -1.34,-3.64 -1.42,-1.8 -3.85,-1.16 -0.39,-0.54 0.43,-2.35 0.62,-0.83 -0.24,-0.96 1.85,-2.48 1.69,-1.14 0.75,-1.08 1.25,-3.45 -0.36,-0.79 -3.73,-1.7 -2.05,-0.08 -2.44,-1.41 -3.83,0.13 -0.09,-3.62 z"
 title="Enugu"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-EN" />
<path
 d="m 287.74165,288.29874 6.12,-0.63 3.2,0.32 1.52,0.85 1.13,-0.85 1.81,-3.04 1.06,-0.54 1.07,0.43 1.47,3.11 0.94,0.31 1.18,-0.79 0,0 -0.07,2.44 -0.42,0.62 -1.03,0.07 -0.53,0.61 -2.11,6.52 -0.08,5.62 0.51,2.19 -0.55,7 -1.98,5.27 -1.52,7.95 -0.79,0.36 -1.08,3.4 -1.04,1.64 -3.78,4.62 -6.96,3.64 -4.63,1.06 -2.91,1.2 -11.13,1.75 0,0 -1.4,0.46 -7.46,-0.15 0,0 -1.83,0.21 -1.42,-0.47 -1.95,-4.91 0.46,-1.37 -0.75,-30.21 0.36,-13.66 0.34,-0.38 2.68,-0.33 11.03,-0.47 1.76,0.63 9.19,8.1 0.94,-0.24 z"
 title="Federal Capital Territory"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-FC" />
<path
 d="m 517.00165,163.43874 0.91,-0.88 4.17,-1.51 4.04,0.17 2.98,1.01 2.18,1.29 8.49,6.26 4.75,6.4 3.42,3.58 -1,1.54 1.58,-1.02 3.68,3.38 0.67,4.87 -1.2,11.85 0.77,6.45 0.3,0.51 6.78,-0.01 0,0 1.35,3.3 -0.62,3.02 -5.18,7.56 0.81,2.83 2.43,3.51 1.83,1.82 5.66,2.34 3.13,6.17 1.81,1.6 3.91,2.2 0,0 -0.68,10.23 0.52,3.7 -1.1,2.33 -5.75,4 -9.4,5.66 -3.37,1.43 -6.2,0.91 0,0 -6.37,0.47 -12.46,-0.02 -5.9,0.6 -3.57,-0.71 0,0 0.58,-0.16 0.13,-0.95 -1.69,-2.12 -2.58,-5.28 -0.61,-6.19 -1.23,-3.79 -9.15,-7.09 -2.5,-1.41 -4.29,-4.38 -0.33,-1.62 1.31,-1.91 1.99,-0.92 3.9,-0.63 0.83,-1.76 -0.4,-2.86 0.48,-8.63 -2.08,-4.94 -7.2,-2.62 -0.88,-1.15 -0.87,-7.15 -1.14,-1.71 -7.38,-2.99 0.2,-1.38 3.61,-5.07 2.61,-7.43 0.97,-4.94 1.38,-2.03 1.44,-1.36 3.91,-0.88 1.49,-0.76 2.01,-1.75 2.57,-3.7 6.04,-3.28 2.71,-3.76 z"
 title="Gombe"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-GO" />
<path
 d="m 283.98165,497.48874 2.01,1.69 5.34,1.78 1.04,1.45 0.47,1.35 0.38,8.47 -1.23,0.77 1.51,2.44 -0.28,2.05 0.36,3.45 -0.43,2.01 -0.89,0.9 -1.18,3.04 -1.82,1.68 -2.1,3.87 -3.09,10.25 0,0 -2.57,0.95 -4.52,-1.13 -2.13,0.04 -4.15,1.06 -4.69,-1.11 -6.72,0.14 -2.14,-0.41 -2.16,-1.65 -1.72,-3.4 -1.84,-1.3 -0.26,-1.37 1.09,-2.76 0.52,-4.63 -0.45,-1.66 -2.12,-0.77 -3.46,0.67 -1.51,-0.44 2.75,-13.09 0,0 2.09,-0.83 3,-3.83 1.62,-0.8 4.51,1.92 2.68,-0.27 2.37,-4.61 0.93,-3.55 1.78,-1.04 6.31,-1.16 5.38,1.25 z"
 title="Imo"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-IM" />
<path
 d="m 434.10165,67.298745 1.79,1.18 6,0.73 3.14,-1.8 2.1,-3.99 5.32,-2.59 3.16,-0.63 2.82,-1.37 6.33,-1.96 2.21,1.25 2.13,4.78 0.69,4.35 1.46,2.53 1.12,-0.72 5.86,-1.86 4.99,2.22 2.03,-0.61 1.85,0.88 2.21,3.4 1.76,11.53 0.87,2.9 0,0 -11.06,6.93 -0.12,-1.39 -0.83,-1.64 -0.99,-0.82 -3.48,0.55 -4.54,1.95 -6.71,20.589995 0.57,1.88 0.03,2.25 -1.19,0.94 -6.23,2.51 -10.94,3.73 -5.47,3.04 -6.16,0.46 -3.22,4.54 -0.49,4.26 1.35,0.63 2.61,-0.04 2.12,-1.03 2.75,-0.27 1.81,0.5 1.46,4.42 0.52,4.32 -2.51,5 0.55,1.74 1.18,1.11 3.84,-0.94 0.47,2.57 1.05,2.5 5.3,7.42 2.99,1.85 6.39,0.77 5.72,1.27 8.87,0.56 1.04,1.46 -1.1,2.72 -1.85,1.39 -1.44,0.78 -4.04,0.99 -2.53,1.36 -1.53,1.91 -0.04,1.8 1.11,3.43 -1.86,0.57 -2.46,-0.62 -1.86,-1.36 -1.56,-0.17 -5.6,1.39 -5.7,-1.19 -1.35,-1.36 -0.81,-2.05 0.83,-7.85 -0.54,-2.15 -2.67,-4.9 -1.14,-0.3 -3.57,0.91 -7.7,0.48 -3.13,-0.21 -1.78,-3.67 -2.3,-0.73 -3.35,1.46 -7.43,-2.41 -6,-1.1 -1,0.19 0,0 -0.08,-2.24 1.08,-3.72 7.12,-6.88 -0.89,-1.15 -2.09,-0.53 -2.83,-2.64 -1.48,-2.75 -0.5,-2 -1.09,-0.99 -5.06,0.15 -0.2,-1.96 0.5,-2.09 3.36,-4.69 0.19,-2.05 1.06,-1.84 -0.19,-2.46 -2.28,-7.18 -1.25,0.53 -1.47,1.75 -2.32,1.42 -1.82,0.18 -1.37,-0.25 -0.01,-2.57 -0.57,-1.44 -3.14,0.25 -1.9,1.19 0,-1.03 -1.65,-0.72 0.53,-1.72 1.18,-1.39 0.08,-5.61 -0.8,-2.94 -0.92,-0.81 -1.85,-0.56 -5.44,-0.56 -0.83,-0.42 -1.02,-1.389995 0.57,-2.01 -1.1,-3.08 -3.81,-2.12 -1.13,-1.38 -0.45,-5.92 -7.78,-2.02 -3.77,0.35 -3.99,1.93 -1.73,1.35 -0.62,2.6 -1.87,3.61 -1.07,-1.12 -0.1,-1.96 -3.51,-6.28 0,0 -1.24,-2.62 -0.83,-0.7 -4.94,-0.12 -2.86,-0.93 -0.59,-0.72 -0.07,-3.85 0.75,-3.4 -0.02,-2.69 0.46,-0.3 10.39,-1.38 5.37,0.99 9.22,-0.78 1.17,1.23 1.41,4.68 0.68,0.94 2.66,1.67 1.99,0.52 2.62,-1.51 0.64,1.56 1.49,0.7 3.68,-0.55 4.18,-1.74 3.19,-2.58 1.03,-2.63 0.58,-0.75 2,-0.88 0.01,-0.86 0,0 1.27,-0.39 10.06,0.44 9.02,1.42 5.24,-0.75 6.06,0.78 10.03,0.45 z"
 title="Jigawa"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-JI" />
<path
 d="m 316.55165,159.39874 3.09,0.02 2.44,-0.67 4.18,-3.83 4.8,-2.84 1.65,0 4.08,-1.24 1.22,0.19 1.13,0.82 0.32,1.25 -2.11,4.02 0.53,2.57 1.04,1.18 3.53,1.83 3.75,1.23 3.51,4.13 1.53,0.55 2.78,-0.03 2.45,0.59 5.38,4.43 3.59,6.42 0.38,3.88 -1.01,2.44 -1.01,4.91 1.2,6.05 -0.2,1.73 -0.72,1.1 -3.55,0.96 -0.55,0.79 0.6,2.08 1.06,1.07 7.02,0.97 1.98,2.75 1.6,1.05 3,0.64 1.05,-0.29 0,0 -0.53,3.96 -2.35,4.2 0.27,0.73 2.79,1.75 2.53,2.71 0,0 -0.37,0.29 -0.21,2.9 -0.55,1.43 -1.32,1.56 -2.19,0.73 -1.9,1.4 -2.13,4.97 -0.22,2.71 1.36,2.82 0.75,3.52 -2.39,1.97 -0.34,1.1 0.18,1.97 -0.7,7.81 0.53,2.1 -0.42,1.07 -1.91,1.55 -0.4,3.08 -1.76,1.28 0.21,4.74 -1.05,1.4 0.1,1.16 3.26,5.28 2.57,3.08 1.71,1.21 1,2.09 0.12,3.41 -1.67,3.94 0,0 -1.09,0.57 -2.65,5.61 -3.31,5.4 -0.82,0.72 -1.61,0.42 -2.47,-0.13 -0.6,-1.9 -5.34,-5.91 -3.81,-0.24 -1.5,-1.25 -1.33,-0.22 -1.29,0.98 -0.89,1.9 -4.16,4.75 -2.35,1.6 -1.15,0.21 -1.34,-0.96 -0.4,-1.31 0.05,-9.7 -1.03,-1.61 -4.22,-2.44 -0.32,-3.25 -2.93,-2.67 -1.1,-0.39 -1.01,0.35 -1.65,2.12 -0.94,2.54 -2.31,2.1 -1.1,0 -1.75,-1.06 -1.34,0.25 -2.44,-1.79 -0.93,-0.14 -1.5,0.61 -0.7,-0.79 -0.6,-1.88 -0.75,-0.11 -1.34,1.02 0,0 -1.18,0.79 -0.94,-0.31 -1.47,-3.11 -1.07,-0.43 -1.06,0.54 -1.81,3.04 -1.13,0.85 -1.52,-0.85 -3.2,-0.32 -6.12,0.63 0,0 -1.23,-0.42 -2.46,0.6 1.38,-4.13 -3.39,-2.78 0.09,-2.32 0.56,-0.93 2.45,-1.29 0.79,-0.87 0.6,-2.79 3.09,-3.17 -0.58,-1.88 -3,-1.62 0.83,-3.02 -3.62,-1.36 -1.13,-0.77 -0.17,-0.91 0.29,-0.64 0.88,-0.42 3.23,-0.41 0.63,-1.51 -0.1,-3.09 -0.92,-3.88 -0.16,-5.06 -0.33,-1.01 -1.37,-0.67 -12.87,0.08 -6.67,-2.49 -1.71,-1.66 -1.03,-1.98 0.91,-1.24 2.17,-1.36 1.62,-1.68 0.85,-1.48 4.24,-2.6 1.02,-1.79 0.31,-1.98 -3.23,-1.75 -4.83,-1.66 1.35,-4.14 0.05,-2.57 -1.98,-3.8 -1.61,-0.44 -2.25,0.67 -1.39,-0.14 -0.28,-4.5 -0.48,-1.92 -0.61,-0.51 -4.73,-0.5 -1.18,1.2 0.67,2.39 -0.64,0.98 -3.97,-0.56 -7.63,2.86 -1.04,-2.66 -1.02,-1 -2.91,0.13 -2.1,0.61 -2.46,1.5 -5.59,4.5 -5.38,7.01 -1.41,0.89 -1.43,-0.6 -1.22,-3.52 -3.05,-2 -0.22,-1.37 0.33,-2.31 1.84,-1.8 -0.24,-3.81 0.74,-2 -0.14,-1.48 -1.44,-2.38 0.4,-4.79 3.04,-5.38 0,0 1.68,-0.12 1.28,-0.76 2.86,-4.16 5.27,-4.71 5.64,-0.95 7.94,0.57 4.71,-0.62 2.33,-1.51 3.04,-3.1 1.51,-3.23 0.64,-3.55 1.71,-3.41 0.85,-1.14 2.75,-1.77 2.34,-2.38 1.01,0.03 0,0 4.41,0.88 1.94,-0.18 1.36,0.9 0.79,1.74 -0.23,1.07 -2.89,2.69 -0.39,1.32 6.35,1.93 4.25,4.29 1.75,0.23 2.69,-1.52 1.38,-1.91 -1.81,-3.36 -0.12,-2.04 3.45,-1.09 1.95,0.11 2.77,1.1 1.4,-0.09 0.58,-0.54 -0.01,-1.39 1.2,-2.97 3.06,-2.59 1.39,-0.28 6.78,2.29 2.05,1.73 0.97,1.58 1.57,0.78 5.62,-2.24 0.84,-2.05 z"
 title="Kaduna"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KD" />
<path
 d="m 90.771651,42.718745 6.62,-0.14 1.86,0.74 4.629999,-1.58 0.76,0.31 1.65,2.12 3.19,1.82 1.06,1.1 9.56,3.12 2.95,2.07 3.06,0.68 1.82,-0.43 0.63,-0.56 2.49,-3.69 1.16,-0.31 1.08,0.88 0.4,1.25 -1.62,3.93 0.09,2.4 -1.42,2.98 -0.42,3.7 1.86,2.15 1.8,4.28 -0.18,3.32 -1.3,6.06 0.04,2.04 1.68,5.52 -0.24,8.02 -0.64,1.56 -1.02,0.04 -3.17,-2.04 -2.68,0.02 -3.95,1.18 -1.28,1.48 -1.01,3.779995 -0.14,9.94 0.79,13.05 -2.12,9.79 -2.61,5.63 -1.16,4.77 2.55,3.65 0.76,0.51 2.78,0.29 1.71,-1.35 2.4,-3 12,-5.45 1.69,-0.12 1.89,0.86 2.04,-0.72 0.77,1.75 0.94,0.07 1.62,-0.97 0,0 0.86,-0.48 1.82,0 4.11,2.25 6.34,-1.46 0.82,-2.32 1.06,-0.62 0.79,-0.15 0.91,0.64 2.09,0.31 3.61,-0.65 1.08,0.57 1.69,3.3 2.87,0.11 3.65,2.41 5.47,-0.76 3.79,0.5 2.49,-0.59 1.22,-0.81 4.85,0.62 4.35,1.77 1.41,2.15 -0.01,2.47 -2.05,6.49 0,1.2 5.38,2.71 1.93,3.01 1.38,7.58 0.21,5.48 0,0 -1.36,-1.1 -1.85,-0.36 -3.42,2.76 -1.28,2.2 -3.93,0.41 -12.1,5.08 -10.67,0.69 -1.64,-1.25 -0.36,-4.02 0.37,-4.81 -0.48,-1.78 -3.75,-2.47 -0.81,-1.26 -0.98,-6.51 -1.69,-1.6 -2.84,-0.71 -3.64,-0.04 -9.86,1.59 -7.87,1.83 -4.43,1.62 -4.85,2.59 -1.37,2.07 0.16,1.54 0.87,1.26 3.63,2.01 5.4,2.19 5.36,0.53 1.05,2.01 1.71,-0.03 0.78,0.74 1.12,6.56 -0.25,1.07 -2.18,1.45 -0.63,1.47 0.49,1.45 2.74,1.63 1.17,1.36 -0.07,2.07 -1.01,1.49 -3.8,0.97 -5.22,2.64 -5,-0.52 -1.55,0.42 -0.9,0.75 -0.04,9.59 -0.45,1.37 1.25,2.83 1.81,1.97 1.86,3.03 0.75,2.44 -0.28,1.53 -1.77,2.13 -2.64,1.57 -3.38,0.26 -7.42,2.5 -0.5,5.85 -0.56,0.48 -4.32,-0.46 -1.42,-0.99 -0.02,-2.28 1.03,-3.28 0.29,-3.94 -2.93,-2.66 -1.12,-2.41 0.18,-6.32 1.46,-3.26 1.84,-2 1.48,-1.01 3.92,-1.44 4.62,-4.43 2.43,-10.71 0.2,-4.05 -0.51,-0.74 -2.89,-1.06 -1.58,0.1 -8.4,-5.7 -5.24,-1.69 -2.94,0.07 -4.5,0.85 -6.189999,-0.36 -12.17,0.81 -1.86,-0.29 -3.49,-1.42 -11.04,-6.08 -2.89,-0.36 -0.89,0.52 0,0 -1.29,-0.01 -12.13,-10.28 4.33,-20.39 2.12,-4.71 4.89,-4.18 -0.82,-3.26 -2.42,-1.82 -0.57,-4.87 3.17,-3.84 -2.36,-8.76 0.39,-5.22 1.27,-4.3 -0.93,-15.849995 10.82,-9.33 7.73,-6.05 9.53,-14.62 2.08,-9.63 z"
 title="Kebbi"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KE" />
<path
 d="m 347.91165,83.288745 3.51,6.28 0.1,1.96 1.07,1.12 1.87,-3.61 0.62,-2.6 1.73,-1.35 3.99,-1.93 3.77,-0.35 7.78,2.02 0.45,5.92 1.13,1.38 3.81,2.12 1.1,3.08 -0.57,2.01 1.02,1.389995 0.83,0.42 5.44,0.56 1.85,0.56 0.92,0.81 0.8,2.94 -0.08,5.61 -1.18,1.39 -0.53,1.72 1.65,0.72 0,1.03 1.9,-1.19 3.14,-0.25 0.57,1.44 0.01,2.57 1.37,0.25 1.82,-0.18 2.32,-1.42 1.47,-1.75 1.25,-0.53 2.28,7.18 0.19,2.46 -1.06,1.84 -0.19,2.05 -3.36,4.69 -0.5,2.09 0.2,1.96 5.06,-0.15 1.09,0.99 0.5,2 1.48,2.75 2.83,2.64 2.09,0.53 0.89,1.15 -7.12,6.88 -1.08,3.72 0.08,2.24 0,0 -5.52,2.17 -1.14,-0.09 -1.14,-1.07 -1.69,0.3 -2.48,1.57 -0.67,1.1 -4.74,4.17 -2.65,4.11 -2.74,3.21 -2.04,0.51 -2.7,-0.16 -1.02,0.43 -1.6,4.57 -0.45,3.5 0.4,6.89 0.45,1.99 3.86,4.33 0.77,1.67 0.08,2 -1.33,3.85 -2.59,4.09 -0.99,0.56 0,0 -1.05,0.29 -3,-0.64 -1.6,-1.05 -1.98,-2.75 -7.02,-0.97 -1.06,-1.07 -0.6,-2.08 0.55,-0.79 3.55,-0.96 0.72,-1.1 0.2,-1.73 -1.2,-6.05 1.01,-4.91 1.01,-2.44 -0.38,-3.88 -3.59,-6.42 -5.38,-4.43 -2.45,-0.59 -2.78,0.03 -1.53,-0.55 -3.51,-4.13 -3.75,-1.23 -3.53,-1.83 -1.04,-1.18 -0.53,-2.57 2.11,-4.02 -0.32,-1.25 -1.13,-0.82 -1.22,-0.19 -4.08,1.24 -1.65,0 -4.8,2.84 -4.18,3.83 -2.44,0.67 -3.09,-0.02 0,0 -3.6,-2.68 -1.11,-2.26 -0.78,-3.61 1.52,-2.67 0.07,-2.21 1.82,-1.63 3.75,-1.03 2.45,-1.7 2.71,-0.07 0.95,-0.58 -3.14,-7.8 0.67,-4.06 -2.09,-4.58 0.86,-6.33 -0.7,-12.32 0.27,-2.89 2.18,-2.28 4.25,-2.369995 7.64,-2.38 3.68,-1.93 0.78,-0.85 1.13,-4.39 2.14,-4.61 1.28,-0.52 z"
 title="Kano"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KN" />
<path
 d="m 219.65165,323.91874 2.2,0.57 2.77,1.58 3.52,3.25 2.77,4.32 2.55,8.25 3.71,2.3 2.71,2.69 5.47,7.27 2.72,2.54 1.63,0.25 0.33,-0.35 0.62,-2.89 1.24,-2.53 0.19,-0.26 0.99,0.88 0.46,-0.09 0.06,-2.97 3.57,-1.74 1.12,-3.25 0,0 7.46,0.15 1.4,-0.46 0,0 -0.6,2.64 -1.55,2.66 0,0.86 0.82,1.69 2.19,2.66 0.54,6.17 -1.17,4.71 -0.04,4.69 -1.61,1.67 -0.85,2.12 -0.17,3.74 0.69,0.56 4.26,-2.95 9.26,-4.07 12.4,-3.37 7.07,-0.7 3.58,0.68 7.7,0.57 0,0 -0.32,2.84 0.54,5.87 1.88,3.22 2.7,2.61 0.73,1.85 0.01,6.9 0.57,6.81 1.24,5.53 1.27,1.05 3.31,-0.32 1.48,0.47 -0.36,1.81 -1.23,1.21 -0.47,1.29 -0.42,3.93 -1.94,5.83 -3.3,3.11 -6.44,3.12 -0.96,1.44 -0.34,4.42 -1.76,0 -1.35,-1.05 -0.82,0.1 -3.37,-3.29 -0.84,-0.58 -0.41,0.5 0,0 -1.11,-1.62 -2.44,-0.75 -3.31,0.76 -2.14,2.1 -2.44,0.91 -6.18,7.42 -5.98,3.86 -4.97,5.39 -1.24,0.33 -0.69,-0.34 -1.33,-2.01 -0.74,-0.05 -0.18,-2.28 -0.91,-0.25 -2.73,5.01 0,0 0,0 0,0 -1.34,1.87 -1.54,0.86 -2.24,2.31 -1.24,4.12 -0.06,2.73 -1.84,2.51 -1.43,0.89 -3.59,-0.66 -1.67,0.77 0,0 -1.03,-6.03 -1.41,-2.01 -0.89,-2.6 0.93,-5.52 -1.28,-2.15 2.16,-3.55 1.91,-4.82 -0.06,-4.16 1.62,-3.94 0.31,-1.92 -0.15,-3.41 -0.79,-2.01 -1.45,-1.08 -0.55,-2.12 -1.75,-1.41 -1.87,0.41 -1.46,0.99 -0.43,-0.38 -3.75,0.84 -0.66,-1.63 0.24,-0.51 -0.74,-0.56 -0.48,-1.74 -0.85,-0.61 -0.07,-1.22 -1.06,-2.01 -2.56,-0.15 -0.74,0.51 -2.26,0.19 -1.96,-2.23 -0.55,0.06 -1.26,-1.41 -0.65,0.07 -1.56,-2.1 -5.94,2.93 -2.13,-0.53 -1.08,-0.78 -0.28,-1.05 0.23,-1.93 0.96,-1.85 -0.27,-0.8 -2.18,0.25 -0.46,-0.65 0.38,-0.89 -0.28,-0.68 -0.7,-0.36 -1.75,0.37 -0.77,-0.64 0,0 -0.23,-0.78 -4.74,-4.17 -2.04,-2.7 0.71,-4.14 -2.51,-0.43 -4.62,0.88 0,0 -6.82,-2.39 -1.85,-1.69 -1.28,-0.03 -1.32,-0.96 -1.32,-3.75 0.08,-1.56 2.29,-3.01 1.34,-0.64 0.28,-1.37 -0.56,-0.7 -2.31,-0.27 -3.67,0.64 -2.48,1.42 -0.55,-0.45 0.03,-4.28 1.09,-0.42 0,0 0.75,-1.44 -0.82,-2.41 -4.76,-2.58 -0.13,-0.59 -2.42,-1.81 -0.07,-0.67 -2.41,-2.45 -1.92,-3.7 0.17,-0.99 2.14,-2.43 2.29,-3.91 3.71,-4.04 3.6,-2.29 1.77,2.62 2.17,1.76 7.04,3.01 1.84,0.08 2.76,1.08 3.71,-0.21 2.13,0.69 3.92,-0.12 6.3,1.52 3.03,-0.5 1.57,-3.76 0.64,-6.49 2.31,-7.79 z"
 title="Kogi"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KO" />
<path
 d="m 322.66165,35.138745 9.16,1.35 5.19,1.38 3.58,1.94 2.92,2.5 2.73,0.73 9.89,9.64 3.29,-0.88 2.92,0.38 3.03,1.55 2.29,1.75 1.85,2.11 1.04,2.44 2.96,1.37 5.26,1.27 12.11,3.92 0,0 -0.01,0.86 -2,0.88 -0.58,0.75 -1.03,2.63 -3.19,2.58 -4.18,1.74 -3.68,0.55 -1.49,-0.7 -0.64,-1.56 -2.62,1.51 -1.99,-0.52 -2.66,-1.67 -0.68,-0.94 -1.41,-4.68 -1.17,-1.23 -9.22,0.78 -5.37,-0.99 -10.39,1.38 -0.46,0.3 0.02,2.69 -0.75,3.4 0.07,3.85 0.59,0.72 2.86,0.93 4.94,0.12 0.83,0.7 1.24,2.62 0,0 -4.63,0.36 -1.28,0.52 -2.14,4.61 -1.13,4.39 -0.78,0.85 -3.68,1.93 -7.64,2.38 -4.25,2.369995 -2.18,2.28 -0.27,2.89 0.7,12.32 -0.86,6.33 2.09,4.58 -0.67,4.06 3.14,7.8 -0.95,0.58 -2.71,0.07 -2.45,1.7 -3.75,1.03 -1.82,1.63 -0.07,2.21 -1.52,2.67 0.78,3.61 1.11,2.26 3.6,2.68 0,0 -0.99,1.1 -0.84,2.05 -5.62,2.24 -1.57,-0.78 -0.97,-1.58 -2.05,-1.73 -6.78,-2.29 -1.39,0.28 -3.06,2.59 -1.2,2.97 0.01,1.39 -0.58,0.54 -1.4,0.09 -2.77,-1.1 -1.95,-0.11 -3.45,1.09 0.12,2.04 1.81,3.36 -1.38,1.91 -2.69,1.52 -1.75,-0.23 -4.25,-4.29 -6.35,-1.93 0.39,-1.32 2.89,-2.69 0.23,-1.07 -0.79,-1.74 -1.36,-0.9 -1.94,0.18 -4.41,-0.88 0,0 0.02,-2.33 1.25,-6.1 -0.9,-3.69 -1.91,-1.9 -0.16,-1.07 0.45,-3.76 1.56,-4.14 0.65,-4 1.5,-0.84 6.61,-0.13 1.28,0.87 4.88,-3.97 0.55,-3.2 3.34,0.81 1.89,-1.62 -0.5,-1.95 -1.16,-1.43 -2.68,-2.29 -2.53,-1.16 -1.26,-1.21 1.82,-3.63 1.09,-5.16 -0.95,-2.47 0.13,-1.68 -0.69,-3.05 -2.5,-5.199995 0.4,-3.57 -1.31,-3.21 -0.39,-4.75 -1,-5.17 0.07,-6.05 -0.99,-6.17 1.44,-10.82 0,0 4.86,-1.57 5.28,-5.36 8.7,0.78 3.58,-0.74 23.4,-14.15 1.28,-0.33 z"
 title="Katsina"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KT" />
<path
 d="m 62.361651,236.35874 5.38,-0.92 11.32,-0.35 3.62,0.93 13.98,15.86 1.99,3.1 5.609999,6.48 2.29,1.58 1.7,-0.18 1.04,0.48 0.27,2.94 -0.73,4.65 0.06,5.38 0.88,3.68 1.3,0.39 7.57,-0.79 0.84,0.74 0.43,1.62 -0.19,3.43 0.35,1.4 0.66,1.02 3.21,2.41 3.04,0.39 1.07,0.55 0.9,2.11 0.74,5.45 1.89,1.32 2,-0.01 9.16,-3.56 2.41,-0.16 6.35,3.01 1.42,1.1 6.35,7.23 2.25,0.69 3.96,-1.16 4.52,0.81 3.73,1.61 0.64,-0.27 11.77,7.32 5.19,3.67 0.93,1.49 1.46,0.71 1.84,0.6 4.92,0.32 3.39,-0.91 7.52,-0.31 8.26,1.71 0,0 -2.46,3.35 -2.31,7.79 -0.64,6.49 -1.57,3.76 -3.03,0.5 -6.3,-1.52 -3.92,0.12 -2.13,-0.69 -3.71,0.21 -2.76,-1.08 -1.84,-0.08 -7.04,-3.01 -2.17,-1.76 -1.77,-2.62 -3.6,2.29 -3.71,4.04 -2.29,3.91 -2.14,2.43 -0.17,0.99 1.92,3.7 2.41,2.45 0.07,0.67 2.42,1.81 0.13,0.59 4.76,2.58 0.82,2.41 -0.75,1.44 0,0 -5.76,0.09 -4.11,1.34 -0.82,2.22 0.29,0.63 -1.04,2.16 -1.29,-0.55 -1.95,0.58 -2.3,-0.62 -2.33,0.23 -0.95,-0.49 -1.47,-2.06 -0.95,-0.37 -4.48,1.25 -1.03,-0.49 -0.61,-1.67 -0.41,0.17 0,0 -0.39,-0.54 -1.67,0.8 -3.49,0.13 -1.48,-3.17 -2.18,-0.58 -4.74,1.7 -2.65,-0.38 0.08,0.88 -0.18,-0.85 -0.36,0.09 -3.55,1.61 -2.6,0.31 -8.27,-0.22 0,0 -0.49,-0.66 -1.45,-0.07 -0.71,-0.94 -1.9,-4.81 -0.39,-2.77 -0.78,-0.66 -0.03,-0.8 -3.46,-2.25 -2.95,-4.24 -1.22,-3.44 -0.09,-2.1 -0.79,-2.77 -1.97,-2.63 -2.999999,-7.11 -1.66,-1.91 -1.32,-5.29 -0.81,-1.58 1.03,-4.5 2.08,-1.55 0.35,-1.6 0.57,-0.59 3.159999,-2.09 2.34,-3.16 -0.16,-1.3 -1.31,-0.78 -2.829999,1.8 -2.21,0.08 -3.83,-1.08 -1.1,0.13 -2.4,-1.54 -5.7,-1.74 -3.25,-2.42 -1.69,-2.04 -0.54,-2.48 -4.08,-2.46 -2.04,0.09 -3.82,2.08 -1.69,3.71 -0.02,2.65 -0.45,1.11 -4.42,3.43 -6.64,2.92 -5.79,3.3 -2.49,1.94 -1.13,0.26 -3.01,2.21 -7,3.26 -0.93,0.15 -0.53,-0.75 -0.45,0.11 -0.91,-1.13 -0.69,-0.19 -2.57,0.27 -6.93,5.53 -1.66,0.66 -3.91,3.44 -0.19,0.99 -1.5,0.79 -4.08,0.72 -3.17,0.02 -3.19,2.78 0,0 0.56,-1.78 -0.59,-1.36 -0.01,-3.54 -0.71,-0.9 0.24,-1.44 0.55,-1.39 -0.39,-2.71 -0.97,-1.79 0.74,-1.4 1.43,-0.91 -0.4,-3.34 0.69,-0.23 0.34,-1.72 -0.2,-0.62 0.02,-0.88 0.69,-1.64 0.43,-1.56 -0.41,-0.76 -0.27,-0.77 -0.35,-0.78 0.13,-1.17 0.25,-1.73 0.16,-0.69 5.37,0.18 0.71,-0.16 1.05,-1.18 3.55,-0.56 0.66,0.82 1.24,0.45 1.49,-0.1 4.95,-1.73 0.25,-1.76 1.95,-3.88 0.17,-3.74 1.91,-1.88 -0.34,-5.82 -1.28,-4.01 0.31,-1.42 1.16,-1.88 2.47,-1.38 0.82,-1.83 2.59,-3.62 0.85,-3.1 1.04,-0.59 2.14,0.25 2.09,-1.73 0.1,-1.22 -1.34,-2.56 -0.32,-1.93 0.37,-1.34 1.11,-1.22 6.75,-2.7 3.39,0.24 1.14,-0.3 2.02,-2.06 0.12,-1.3 2.36,-2.59 0.57,-2.41 0.25,-4.97 0.85,-1.1 2.08,-0.86 z"
 title="Kwara"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-KW" />
<path
 d="m 3.411651,463.64874 1.25,0.4 3.41,-0.43 1.94,0.89 3.46,-2.44 0,-1.61 0.41,-0.11 3.55,0.53 13.71,-0.19 1.06,-1.01 0.77,-3.95 2.08,-1.65 0.09,-2.35 1.36,-2.51 1.85,0.25 3.41,1.43 1.2,0.8 0.81,1.43 4.57,-0.48 -0.51,-1.45 1.59,-1.06 37.58,0.39 1.07,0.21 0.54,0.9 -2.73,2.88 -0.23,0.94 0.73,1.24 0.04,1.46 2.19,1.09 3.22,-2.16 3.45,-0.41 1.06,1.48 0.12,0.95 -1.12,1.06 -2.8,1.31 -0.56,1.03 0.22,0.7 0.92,0.74 2.77,0.77 1.13,1.31 0.58,0.14 1.12,-0.58 5.269999,0.65 0.35,1.25 -0.36,2.36 0,0 -9.529999,-1.15 -2.19,-0.67 -12.02,-1.84 -8.59,-0.46 -9.91,0.94 -15.11,0.16 -0.57,0.31 -0.19,1.32 -0.53,-0.1 0.24,0.34 -5.42,-0.82 -6.02,0.01 -21.6,0.73 -9.49,1.1 -0.36,-3.11 z"
 title="Lagos"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-LA" />
<path
 d="m 307.24165,287.46874 1.34,-1.02 0.75,0.11 0.6,1.88 0.7,0.79 1.5,-0.61 0.93,0.14 2.44,1.79 1.34,-0.25 1.75,1.06 1.1,0 2.31,-2.1 0.94,-2.54 1.65,-2.12 1.01,-0.35 1.1,0.39 2.93,2.67 0.32,3.25 4.22,2.44 1.03,1.61 -0.05,9.7 0.4,1.31 1.34,0.96 1.15,-0.21 2.35,-1.6 4.16,-4.75 0.89,-1.9 1.29,-0.98 1.33,0.22 1.5,1.25 3.81,0.24 5.34,5.91 0.6,1.9 2.47,0.13 1.61,-0.42 0.82,-0.72 3.31,-5.4 2.65,-5.61 1.09,-0.57 0,0 1.69,1.65 2.42,0.11 2.08,0.85 0.63,4.48 1.93,3.41 2.16,0.98 5.32,0.56 3.7,0 2.77,-1.35 1.04,0.56 2.01,2.21 -0.79,2.93 -2.7,4.01 -2.11,1.98 -1.41,0.2 -1.46,1.05 -1.55,2.86 -1.55,1.36 -0.32,2.25 0.64,1.72 2.09,2.43 0.32,1.24 -0.3,5.41 1.44,2.07 5.15,2.71 3.66,1.3 8.19,-0.15 9.76,-2.79 10.36,4.33 2.52,2.07 1.46,2.68 0,0 -2.58,3.68 -2.74,0.82 -4.51,-0.95 -0.33,-0.41 -1.52,0.23 -1,-1.07 -1.73,-0.9 -1.86,0 -1.28,0.86 -1.33,2.14 -0.73,2.86 1.71,1.36 2.03,2.51 0.35,2.88 -0.54,0.65 1,2.68 -0.11,1.19 -11.23,7.21 -1.21,1.39 0,0 -11.79,-8.93 -0.01,0.7 -3.96,0.22 -4.88,-0.41 -6.86,-1.55 -10.09,-3.72 -2.68,-0.44 -2.59,0.18 -1.38,0.28 -3.95,2.2 -1.24,1.41 -1.02,2.86 0.08,2.52 4.7,11.64 -0.09,1.36 -1.14,1.1 -5.33,-2.23 -3.32,-2.8 -1.07,0.14 -5.25,-0.99 -4.92,-2.82 -8.71,-3.55 -8.51,-1.25 -9.13,-2.48 0,0 -7.7,-0.57 -3.58,-0.68 -7.07,0.7 -12.4,3.37 -9.26,4.07 -4.26,2.95 -0.69,-0.56 0.17,-3.74 0.85,-2.12 1.61,-1.67 0.04,-4.69 1.17,-4.71 -0.54,-6.17 -2.19,-2.66 -0.82,-1.69 0,-0.86 1.55,-2.66 0.6,-2.64 0,0 11.13,-1.75 2.91,-1.2 4.63,-1.06 6.96,-3.64 3.78,-4.62 1.04,-1.64 1.08,-3.4 0.79,-0.36 1.52,-7.95 1.98,-5.27 0.55,-7 -0.51,-2.19 0.08,-5.62 2.11,-6.52 0.53,-0.61 1.03,-0.07 0.42,-0.62 z"
 title="Nassarawa"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-NA" />
<path
 d="m 65.001651,173.89874 0.89,-0.52 2.89,0.36 11.04,6.08 3.49,1.42 1.86,0.29 12.17,-0.81 6.189999,0.36 4.5,-0.85 2.94,-0.07 5.24,1.69 8.4,5.7 1.58,-0.1 2.89,1.06 0.51,0.74 -0.2,4.05 -2.43,10.71 -4.62,4.43 -3.92,1.44 -1.48,1.01 -1.84,2 -1.46,3.26 -0.18,6.32 1.12,2.41 2.93,2.66 -0.29,3.94 -1.03,3.28 0.02,2.28 1.42,0.99 4.32,0.46 0.56,-0.48 0.5,-5.85 7.42,-2.5 3.38,-0.26 2.64,-1.57 1.77,-2.13 0.28,-1.53 -0.75,-2.44 -1.86,-3.03 -1.81,-1.97 -1.25,-2.83 0.45,-1.37 0.04,-9.59 0.9,-0.75 1.55,-0.42 5,0.52 5.22,-2.64 3.8,-0.97 1.01,-1.49 0.07,-2.07 -1.17,-1.36 -2.74,-1.63 -0.49,-1.45 0.63,-1.47 2.18,-1.45 0.25,-1.07 -1.12,-6.56 -0.78,-0.74 -1.71,0.03 -1.05,-2.01 -5.36,-0.53 -5.4,-2.19 -3.63,-2.01 -0.87,-1.26 -0.16,-1.54 1.37,-2.07 4.85,-2.59 4.43,-1.62 7.87,-1.83 9.86,-1.59 3.64,0.04 2.84,0.71 1.69,1.6 0.98,6.51 0.81,1.26 3.75,2.47 0.48,1.78 -0.37,4.81 0.36,4.02 1.64,1.25 10.67,-0.69 12.1,-5.08 3.93,-0.41 1.28,-2.2 3.42,-2.76 1.85,0.36 1.36,1.1 0,0 3.32,4.4 3.8,6.64 1.59,4.09 -0.07,0.84 0,0 -3.04,5.38 -0.4,4.79 1.44,2.38 0.14,1.48 -0.74,2 0.24,3.81 -1.84,1.8 -0.33,2.31 0.22,1.37 3.05,2 1.22,3.52 1.43,0.6 1.41,-0.89 5.38,-7.01 5.59,-4.5 2.46,-1.5 2.1,-0.61 2.91,-0.13 1.02,1 1.04,2.66 7.63,-2.86 3.97,0.56 0.64,-0.98 -0.67,-2.39 1.18,-1.2 4.73,0.5 0.61,0.51 0.48,1.92 0.28,4.5 1.39,0.14 2.25,-0.67 1.61,0.44 1.98,3.8 -0.05,2.57 -1.35,4.14 4.83,1.66 3.23,1.75 -0.31,1.98 -1.02,1.79 -4.24,2.6 -0.85,1.48 -1.62,1.68 -2.17,1.36 -0.91,1.24 1.03,1.98 1.71,1.66 6.67,2.49 12.87,-0.08 1.37,0.67 0.33,1.01 0.16,5.06 0.92,3.88 0.1,3.09 -0.63,1.51 -3.23,0.41 -0.88,0.42 -0.29,0.64 0.17,0.91 1.13,0.77 3.62,1.36 -0.83,3.02 3,1.62 0.58,1.88 -3.09,3.17 -0.6,2.79 -0.79,0.87 -2.45,1.29 -0.56,0.93 -0.09,2.32 3.39,2.78 -1.38,4.13 2.46,-0.6 1.23,0.42 0,0 -8.65,12.34 -0.94,0.24 -9.19,-8.1 -1.76,-0.63 -11.03,0.47 -2.68,0.33 -0.34,0.38 -0.36,13.66 0.75,30.21 -0.46,1.37 1.95,4.91 1.42,0.47 1.83,-0.21 0,0 -1.12,3.25 -3.57,1.74 -0.06,2.97 -0.46,0.09 -0.99,-0.88 -0.19,0.26 -1.24,2.53 -0.62,2.89 -0.33,0.35 -1.63,-0.25 -2.72,-2.54 -5.47,-7.27 -2.71,-2.69 -3.71,-2.3 -2.55,-8.25 -2.77,-4.32 -3.52,-3.25 -2.77,-1.58 -2.2,-0.57 0,0 -8.26,-1.71 -7.52,0.31 -3.39,0.91 -4.92,-0.32 -1.84,-0.6 -1.46,-0.71 -0.93,-1.49 -5.19,-3.67 -11.77,-7.32 -0.64,0.27 -3.73,-1.61 -4.52,-0.81 -3.96,1.16 -2.25,-0.69 -6.35,-7.23 -1.42,-1.1 -6.35,-3.01 -2.41,0.16 -9.16,3.56 -2,0.01 -1.89,-1.32 -0.74,-5.45 -0.9,-2.11 -1.07,-0.55 -3.04,-0.39 -3.21,-2.41 -0.66,-1.02 -0.35,-1.4 0.19,-3.43 -0.43,-1.62 -0.84,-0.74 -7.57,0.79 -1.3,-0.39 -0.88,-3.68 -0.06,-5.38 0.73,-4.65 -0.27,-2.94 -1.04,-0.48 -1.7,0.18 -2.29,-1.58 -5.609999,-6.48 -1.99,-3.1 -13.98,-15.86 -3.62,-0.93 -11.32,0.35 -5.38,0.92 0,0 0.49,-3.02 -1.96,-0.7 -2.1,-2.02 -1.75,-3.54 3.08,-6.97 -0.14,-1.69 0.89,-1.14 2.58,-1.33 6.08,3.19 1,-3.12 0.25,-2.99 2.82,-6.43 -0.66,-6.2 -2.69,-1.9 -2.97,-5.6 1.21,-4.6 0.13,-2.04 -1.23,-5.05 -2.13,-0.82 0.42,-1.95 -0.28,-1.95 0.51,-1.95 z"
 title="Niger"
 fill="blue"
 stroke="#888888"
 stroke-width="2"
 id="NG-NI" />
<path
 d="m 0.96165097,375.38874 5.97000003,-4.29 3.49,-0.21 1.9,0.93 1.24,1.79 0.41,1.43 0.15,6.48 0.56,2.36 1.31,2.17 0.84,0.13 0.94,-5.56 0.57,-1.25 0.47,-0.45 1.37,0 0.88,0.61 0.54,1.75 -0.16,3.09 -1.74,5.98 -0.41,-0.24 -0.51,0.57 0.52,3.66 2.12,2.51 3.05,2.47 1.02,3.04 3.2,4.51 3.01,2.36 2.34,1.13 4.05,0.28 1.74,-0.49 2.78,-3.97 1.14,-4.24 1.62,-1.48 2.6,0.29 1.75,4.34 1.59,1.13 1.02,-0.26 1.13,-1.11 2.47,-0.6 6.2,0.22 1.17,1.89 0.33,5.66 0.41,0.71 2.98,1.22 0.64,1.1 -0.1,2.22 1.1,2.7 0.41,2.87 -3.97,4.01 -0.33,1.13 0.37,0.28 6.09,-0.25 2.7,-0.58 3.04,0.13 3.18,-1.24 1.51,-1.37 5.89,-0.88 0,0 2.74,-1.08 1.4,-1.11 0.94,0.39 0.52,0.84 0.59,4.28 1.97,-0.01 3.85,-1.98 3.389999,0.59 2.97,7.11 3.06,-1.96 1.1,-0.02 1.15,0.69 2.12,-0.92 4.16,-0.26 0.31,0.13 -0.3,1.01 0,0 -0.75,5.5 -1.06,3.26 -2.35,2.1 -2.06,0.97 -3.63,3.28 -2.98,4.92 0.03,3.41 2.01,1.97 4.81,0.81 1.83,-0.13 1.42,-1.06 1.65,-2.27 1.76,-0.51 0.65,0.78 -0.02,4.47 0.85,3.57 -0.72,1.81 -2.44,0.66 -0.77,1.14 -1.12,0.68 -2.4,0.11 -1.32,1.34 0.98,0.43 2.79,-0.25 3.3,1.74 0.21,1.08 -0.82,1.72 -4.01,-0.28 0,0 -5,-2.24 -4.38,-0.93 0,0 0.36,-2.36 -0.35,-1.25 -5.269999,-0.65 -1.12,0.58 -0.58,-0.14 -1.13,-1.31 -2.77,-0.77 -0.92,-0.74 -0.22,-0.7 0.56,-1.03 2.8,-1.31 1.12,-1.06 -0.12,-0.95 -1.06,-1.48 -3.45,0.41 -3.22,2.16 -2.19,-1.09 -0.04,-1.46 -0.73,-1.24 0.23,-0.94 2.73,-2.88 -0.54,-0.9 -1.07,-0.21 -37.58,-0.39 -1.59,1.06 0.51,1.45 -4.57,0.48 -0.81,-1.43 -1.2,-0.8 -3.41,-1.43 -1.85,-0.25 -1.36,2.51 -0.09,2.35 -2.08,1.65 -0.77,3.95 -1.06,1.01 -13.71,0.19 -3.55,-0.53 -0.41,0.11 0,1.61 -3.46,2.44 -1.94,-0.89 -3.41,0.43 -1.25,-0.4 0,0 0.42,-3.28 1.13,-1.18 0.63,-1.54 -1.34,-3.74 1.3,-2.16 2.11,-1.8 0.2,-2.74 -0.21,-0.96 -2.14,-0.28 -0.78,-0.39 -0.41,-0.86 -0.17,-1.82 1.2,-1.9 -0.34,-1.07 0.48,-3.46 -0.22,-0.98 -1.3,-0.14 -0.54,-0.61 0.15,-2.86 1.4,-1.61 3.06,-1.78 -2.46,-2.23 -0.48,-0.96 1.87,-2.2 0.59,-1.92 -0.66,-4.66 -1.53,-1.66 -0.12,-9.69 2.37,-0.08 0.82,-0.48 0.04,-0.72 -0.42,-3.5 -2.68,-2.04 -0.22,-1.76 -0.98,-1.52 -0.3,-4.2 0.25,-8.96 -0.3,-0.95 -0.82,-0.35 -0.97,-2.58 -1.69000003,-2.17 z"
 title="Ogun"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-OG" />
<path
 d="m 194.92165,384.14874 4.62,-0.88 2.51,0.43 -0.71,4.14 2.04,2.7 4.74,4.17 0.23,0.78 0,0 -2.45,3.49 -0.9,0.6 -1.56,-0.14 -1.41,1.72 -0.18,1.38 0.4,0.84 2.02,0.82 -0.88,2.89 0.77,2.49 0.42,0.28 -1.43,3.54 -2.15,1.05 -1.76,1.83 -0.47,1.04 0.15,1.39 -3.23,6.89 0.32,0.83 -0.37,0.85 -1.51,0.73 -1.24,1.67 -0.62,4.63 1.18,1.28 0.16,0.82 -0.88,0.51 -0.01,1.63 -1.19,-0.51 -0.25,0.25 -0.95,4.96 -1.51,3.39 -2.68,1.03 -0.81,-0.36 -1.19,-1.48 -1.34,-0.12 -3.77,3.16 -0.74,0.03 -2.1,-5.46 2.01,-2.25 -1.74,-2.09 -1.64,-0.34 -3.29,0.39 -6.64,-0.11 -1.68,-0.36 -2.28,0.38 -2.12,-0.39 -2.2,1.01 -0.46,0.78 -0.09,1.96 -0.95,0.68 -0.79,2.27 -1.73,0.8 -0.45,1.04 -1.76,1.61 -0.49,0.96 0.09,2.22 -0.8,0.99 0,2.84 1.23,0.64 1.39,2.28 0.58,1.45 -0.36,1.72 -0.83,1.96 -1.74,1.71 -0.85,3.74 -2.94,0.86 -0.58,0.62 -0.96,3.62 -0.8,0.7 0.28,-0.44 -0.25,0.6 0.44,0.91 0.7,0.05 1.94,1.36 1.65,2.94 1.56,0.1 1.33,1.04 1.24,2.26 -0.39,1.16 0,0 -6.9,16.74 0,0 -4.86,-5.94 -9.17,-9.24 -14.82,-11.96 -2.7,-1.66 0,0 4,0.28 0.83,-1.73 -0.21,-1.07 -3.3,-1.74 -2.79,0.25 -0.98,-0.43 1.32,-1.35 2.4,-0.1 1.11,-0.68 0.78,-1.14 2.44,-0.66 0.72,-1.82 -0.84,-3.57 0.01,-4.47 -0.64,-0.78 -1.77,0.51 -1.65,2.27 -1.42,1.06 -1.83,0.13 -4.8,-0.81 -2.01,-1.96 -0.03,-3.41 2.98,-4.92 3.63,-3.28 2.06,-0.96 2.35,-2.1 1.07,-3.25 0.74,-5.51 0,0 2.67,-1.42 2.15,-4.97 4.29,-3.44 2.32,-0.02 2.51,1.24 2.91,2.22 1.81,0.03 0.64,-1.26 -0.23,-1.63 0.41,-2.11 -0.46,-3.98 1.56,-6.54 0.84,-0.57 5.86,-1.59 -0.62,-2.4 0,0 4.55,-1.45 7.78,0.43 6.97,-0.31 1.55,0.53 1.42,2.21 1.03,3.19 -0.16,0.86 1.09,2.69 2.28,0.59 5.53,-3.5 3.04,-4.43 1.71,-3.92 1.7,-8.1 1.13,-2.14 2.4,-2.48 2.18,-1.45 0.85,-2.06 1.86,-0.38 1.5,1.24 0.82,-0.3 1.49,-2.44 z"
 title="Ondo"
 fill="green"
 stroke="#888888"
 stroke-width="2"

 id="NG-ON" />
<path
 d="m 117.18165,366.88874 8.27,0.22 2.6,-0.31 3.55,-1.61 0.36,-0.09 0.18,0.85 -0.08,-0.88 2.65,0.38 4.74,-1.7 2.18,0.58 1.48,3.17 3.49,-0.13 1.67,-0.8 0.39,0.54 0,0 -1.52,5.3 -1.99,1.64 -2.18,0.94 -1.62,1.5 -1.9,4.25 -0.12,1.4 0.81,2.81 -1.19,3.99 0.69,4.78 2.85,6.11 0.84,3.79 0.83,1.7 0,0 0.62,2.41 -5.86,1.58 -0.84,0.58 -1.56,6.54 0.46,3.98 -0.4,2.11 0.23,1.63 -0.64,1.26 -1.81,-0.03 -2.91,-2.22 -2.51,-1.24 -2.32,0.01 -4.28,3.45 -2.15,4.96 -2.67,1.43 0,0 0.3,-1.01 -0.31,-0.13 -4.16,0.26 -2.12,0.92 -1.15,-0.69 -1.1,0.02 -3.06,1.96 -2.97,-7.11 -3.389999,-0.59 -3.85,1.98 -1.97,0.01 -0.59,-4.28 -0.52,-0.84 -0.94,-0.39 -1.4,1.11 -2.74,1.08 0,0 2.34,-9.84 0.43,-5.29 1.67,-8.72 -0.87,-0.49 -3.05,-4.88 -3.11,-2.33 -0.27,-0.93 -0.14,-0.88 1.15,-1.09 0.78,-1.76 0.87,-9.27 0.6,-0.28 4.3,1.34 2.32,-0.75 0.78,-0.99 0.13,-2.3 1.06,-0.57 2.81,-3.32 3.009999,1.84 3.59,5.56 2.13,-0.93 0.65,-1.43 2.05,-1.16 0.98,-1.39 0.28,0.39 1.83,-1.51 2.29,-0.76 0.25,0.38 0.99,-1.34 0.31,-1.28 z"
 title="Osun"
 fill="white"
 stroke="#888888"
 stroke-width="2"
 id="NG-OS" />
<path
 d="m 5.381651,335.88874 3.19,-2.78 3.17,-0.02 4.08,-0.72 1.5,-0.79 0.19,-0.99 3.91,-3.44 1.66,-0.66 6.93,-5.53 2.57,-0.27 0.69,0.19 0.91,1.13 0.45,-0.11 0.53,0.75 0.93,-0.15 7,-3.26 3.01,-2.21 1.13,-0.26 2.49,-1.94 5.79,-3.3 6.64,-2.92 4.42,-3.43 0.45,-1.11 0.02,-2.65 1.69,-3.71 3.82,-2.08 2.04,-0.09 4.08,2.46 0.54,2.48 1.69,2.04 3.25,2.42 5.7,1.74 2.4,1.54 1.1,-0.13 3.83,1.08 2.21,-0.08 2.829999,-1.8 1.31,0.78 0.16,1.3 -2.34,3.16 -3.159999,2.09 -0.57,0.59 -0.35,1.6 -2.08,1.55 -1.03,4.5 0.81,1.58 1.32,5.29 1.66,1.91 2.999999,7.11 1.97,2.63 0.79,2.77 0.09,2.1 1.22,3.44 2.95,4.24 3.46,2.25 0.03,0.8 0.78,0.66 0.39,2.77 1.9,4.81 0.71,0.94 1.45,0.07 0.49,0.66 0,0 0.53,3.2 -0.31,1.28 -0.99,1.34 -0.25,-0.38 -2.29,0.76 -1.83,1.51 -0.28,-0.39 -0.98,1.39 -2.05,1.16 -0.65,1.43 -2.13,0.93 -3.59,-5.56 -3.009999,-1.84 -2.81,3.32 -1.06,0.57 -0.13,2.3 -0.78,0.99 -2.32,0.75 -4.3,-1.34 -0.6,0.28 -0.87,9.27 -0.78,1.76 -1.15,1.09 0.14,0.88 0.27,0.93 3.11,2.33 3.05,4.88 0.87,0.49 -1.67,8.72 -0.43,5.29 -2.34,9.84 0,0 -5.89,0.88 -1.51,1.37 -3.18,1.24 -3.04,-0.13 -2.7,0.58 -6.09,0.25 -0.37,-0.28 0.33,-1.13 3.97,-4.01 -0.41,-2.87 -1.1,-2.7 0.1,-2.22 -0.64,-1.1 -2.98,-1.22 -0.41,-0.71 -0.33,-5.66 -1.17,-1.89 -6.2,-0.22 -2.47,0.6 -1.13,1.11 -1.02,0.26 -1.59,-1.13 -1.75,-4.34 -2.6,-0.29 -1.62,1.48 -1.14,4.24 -2.78,3.97 -1.74,0.49 -4.05,-0.28 -2.34,-1.13 -3.01,-2.36 -3.2,-4.51 -1.02,-3.04 -3.05,-2.47 -2.12,-2.51 -0.52,-3.66 0.51,-0.57 0.41,0.24 1.74,-5.98 0.16,-3.09 -0.54,-1.75 -0.88,-0.61 -1.37,0 -0.47,0.45 -0.57,1.25 -0.94,5.56 -0.84,-0.13 -1.31,-2.17 -0.56,-2.36 -0.15,-6.48 -0.41,-1.43 -1.24,-1.79 -1.9,-0.93 -3.49,0.21 -5.97000003,4.29 0,0 1.07000003,-2.08 0.73,-4.3 1.33,-4.15 -0.3,-1.12 0.37,-2.7 1.13,-2.26 0.36,-2.89 -2.44,-3.06 -1.17,-3.99 0.08,-2.02 1.05,-1.87 -0.44,-2.05 0.48,-0.7 1.25,-0.3 1.37,-2.88 -0.43,-0.44 0.73,-0.97 0.01,-1.07 z"
 title="Oyo"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-OY" />
<path
 d="m 379.00165,223.49874 1.53,-0.49 3.18,0.08 2.78,0.88 2.61,4.16 0.78,4.8 -0.04,12.38 10.97,-2.19 1.06,0.21 1.8,1.92 0.97,3.13 0.26,5.94 -0.23,1.17 -2.38,4.47 -0.09,1.69 0.6,0.85 3.92,1.42 0.79,0.71 0.9,1.16 1.65,4.07 1.56,1.34 1.51,0.53 4.8,0.27 5.47,1.48 10.04,-0.59 4.39,-1.41 2.89,-5.21 4.76,-1.3 0.5,-1.67 -0.27,-1.74 -3.17,-4.06 0.3,-1.44 3.03,-1.78 7.6,3.95 2.57,0.51 9.26,4.93 11.07,4.74 6.18,4.04 6.36,3.43 0,0 1.56,3.94 0.21,2.15 -0.51,4.08 0.76,5.96 2.3,3.86 1.05,6.02 -0.55,1.33 0.3,2.25 0.43,0 0.21,5.54 -1.78,3.08 -12.18,5.86 -1.9,-0.11 -9.52,2.1 -2.49,1.44 -2.06,4.19 -4.74,5.72 -7.11,3.76 -7.68,7.65 -2.43,1.19 -4.41,1.01 -4.11,0.54 -3.85,-0.25 0,0 -1.46,-2.68 -2.52,-2.07 -10.36,-4.33 -9.76,2.79 -8.19,0.15 -3.66,-1.3 -5.15,-2.71 -1.44,-2.07 0.3,-5.41 -0.32,-1.24 -2.09,-2.43 -0.64,-1.72 0.32,-2.25 1.55,-1.36 1.55,-2.86 1.46,-1.05 1.41,-0.2 2.11,-1.98 2.7,-4.01 0.79,-2.93 -2.01,-2.21 -1.04,-0.56 -2.77,1.35 -3.7,0 -5.32,-0.56 -2.16,-0.98 -1.93,-3.41 -0.63,-4.48 -2.08,-0.85 -2.42,-0.11 -1.69,-1.65 0,0 1.67,-3.94 -0.12,-3.41 -1,-2.09 -1.71,-1.21 -2.57,-3.08 -3.26,-5.28 -0.1,-1.16 1.05,-1.4 -0.21,-4.74 1.76,-1.28 0.4,-3.08 1.91,-1.55 0.42,-1.07 -0.53,-2.1 0.7,-7.81 -0.18,-1.97 0.34,-1.1 2.39,-1.97 -0.75,-3.52 -1.36,-2.82 0.22,-2.71 2.13,-4.97 1.9,-1.4 2.19,-0.73 1.32,-1.56 0.55,-1.43 0.21,-2.9 z"
 title="Plateau"
 fill="red"
 stroke="#888888"
 stroke-width="2"
 id="NG-PL" />
<path
 d="m 277.72165,584.56874 -1.46,1.39 0.02,0.77 -0.62,-0.24 0.22,-1.42 1.44,-0.82 0.4,0.32 z m -3.14,-1.84 -1.72,-0.98 -0.55,0.15 -0.55,0.15 -0.21,-0.69 0.86,-0.79 -0.31,-0.67 0.31,-0.65 -0.07,-1.05 -0.57,-0.81 -0.91,-0.17 -0.22,0.16 -0.71,-1.7 -0.27,-0.17 0.14,-0.46 -0.86,-0.86 -0.27,0.36 -0.96,0.15 -0.19,0.82 0.57,1.03 0.5,1.05 0.41,2.04 -0.48,-0.23 -0.45,0.63 1.07,3.48 -0.14,1.27 1.17,4.04 -0.24,0.22 0.77,0.46 2.06,-0.43 0.4,-0.45 0.13,-0.58 1.75,0.49 0.03,-2.23 0.67,-1.56 -1.16,-2.02 z m -3.8,-10.26 0.41,0.46 2.18,0.09 0.19,-0.91 -0.41,-0.31 -1.69,0.3 -0.68,0.37 z m 1.27,-2.46 0.36,1.13 0.52,0.19 -0.29,-1.9 -0.59,0.58 z m 7.2,9.74 -1.44,-2.86 -1,-0.7 -1.63,-0.81 -0.27,-0.12 -0.84,0.65 0.65,0.09 1.31,1.13 0.14,0.21 -0.23,0.46 0.52,0.93 0.12,1.92 1.29,1.2 0.91,0.17 0.67,-1.41 -0.2,-0.86 z m 5.92,6.12 -2.08,-2.62 -1.31,1.63 0.79,0.79 0.81,-0.24 0.38,0.91 0.76,0 0.22,0.62 1.17,-0.5 1.08,1.08 1.86,-1.49 -0.62,-0.55 -3.06,0.37 z m -19.91,-6.61 -1.12,0.53 -0.28,1.32 1.14,0.4 1.44,1.08 1.03,2.28 -0.29,-3.36 -0.36,-0.15 0.26,-1.49 -1.82,-0.61 z m 18.13,2.56 -2.37,-1.62 -1.55,-2.35 -0.03,-0.27 -0.48,-1.7 -0.48,0.43 -0.4,-0.36 0.43,-0.67 -0.03,-1.49 -0.12,-0.07 -0.57,1.85 -2.25,-0.7 -0.53,-0.1 -0.88,-1.08 -0.07,-1.52 -0.36,-0.29 -0.07,-0.46 -0.26,-0.17 -0.15,-0.65 0.5,-0.79 -0.98,-1.22 -0.81,0.53 -0.34,0.89 0.65,1.54 -2.06,0.77 -0.41,0.36 -0.93,0.38 -0.52,0.05 -1,0.77 -0.46,0.62 -0.09,-1.51 -0.58,0.74 -0.22,0.51 1,1.65 0.55,2.45 -1.31,0.45 -0.53,0.21 -1.38,-1.61 -0.71,-1.9 -1.45,-2.41 -1.5,-0.51 0.56,-1.55 -0.68,-2.22 0.98,-0.81 0.35,-0.48 -0.53,-0.67 -1.81,-0.24 -1.81,-1.11 -0.28,1.59 -0.89,0.57 -0.33,-0.77 -1.27,-0.14 -0.34,-0.34 -0.64,0.19 -0.77,0.03 -0.62,-0.87 -0.19,-0.14 -0.55,0.41 0.19,0.99 -0.14,0.33 0.46,0.31 1.27,1.27 -0.12,1.53 0.98,4.64 3.22,3.31 0.02,1.18 -1.81,1.46 -0.1,0.58 1.82,6.56 0.55,3.32 2.41,2.48 -0.29,0.33 -7.24,0.69 -2.24,-0.75 -0.09,-2.71 -0.24,-2.54 0.14,-0.46 -0.03,-0.17 -0.46,-2.71 -0.19,-0.75 1.94,-3.67 -0.19,-2.67 -0.67,0.15 -0.68,0.1 -3.96,-2.6 -1.2,-4.38 -1.38,-1.87 -1.99,-0.02 -6.54,2.54 -1.04,-0.26 -0.35,-1.94 0.42,-1.46 -3.31,-1.44 -0.5,-0.83 0.07,-4.34 1.9,-2.67 0.76,-2.05 0.03,-1.27 -1.29,0.16 -0.84,-0.78 1.33,-4.44 4.49,-7.84 2.77,0.17 0.55,-0.5 0.75,-2.49 1.54,-0.79 -0.23,-1.81 1.58,-1.07 0.95,-1.48 -0.03,-1.94 -0.63,-1.54 -0.76,-0.58 -1.92,-0.83 -2.94,0.49 -1.04,-0.28 -0.57,-1.04 0.21,-0.44 3.52,-1.81 0.19,-5.3 0.7,-1.48 2.05,-1.42 0.89,-1.75 0.82,-3.18 -1.09,-3.54 0.23,-0.35 1.11,1.28 2.4,0.21 -2.75,13.08 1.51,0.44 3.47,-0.67 2.12,0.78 0.44,1.66 -0.52,4.62 -1.09,2.76 0.26,1.37 1.84,1.3 1.72,3.41 2.16,1.65 2.14,0.41 6.72,-0.14 4.7,1.12 4.15,-1.07 2.13,-0.03 4.51,1.13 2.57,-0.95 0.55,0.05 0.66,1.72 0.06,2.78 -2.4,4.19 -3.41,4.33 -1.37,3.71 -0.16,1.09 0.6,1.11 1.45,1.41 1.8,0.27 3.13,-0.59 1.11,-0.64 2.79,-0.12 3.28,1.22 1.81,-0.42 2.94,1.4 2.35,1.79 1.95,3.49 0.63,2.3 -0.96,4.27 0.58,4.55 -0.51,0.32 -0.04,0.64 0.61,1.17 -1.22,0.77 -0.84,-0.72 -0.17,-0.98 -1.22,-0.27 -0.55,-0.26 -0.26,0.46 -1.39,1.18 -0.58,-0.24 -0.26,-0.36 -0.38,-0.02 -0.71,0.39 -1.5,-2.36 -1.27,0.96 -0.93,-0.36 -1.6,-0.5 -0.65,-1.03 -0.67,0.19 -0.74,-0.86 -0.62,0.51 -0.19,0.79 -0.89,0.33 0.34,1.08 0.27,1.03 0.24,0.6 0.78,0.6 0.77,-0.24 0.57,0.08 0.86,-0.31 -0.17,1.75 -1.77,0.17 -1.44,0.53 -0.74,-1.2 -0.1,-0.33 -1.05,-1.17 -0.15,-0.94 0.11,-0.22 z m 21.52,4.31 -0.69,-0.39 -0.43,-0.03 -0.88,-0.36 -0.02,-0.02 -0.4,-0.36 -0.42,0.46 -0.32,-0.13 0.35,-0.54 -0.88,-1.49 -0.9,0.53 -1.04,-0.9 -0.36,-0.34 -0.17,-0.51 -1.39,0.01 -0.26,0.28 -1.23,0.87 -1.33,-0.05 -0.46,0.04 -0.43,-0.23 -0.63,-0.63 -0.53,-0.31 -0.09,-0.81 -1.24,0.34 -1.03,0.02 0.02,-0.42 -1.25,-0.34 -0.91,-0.46 -1.34,-0.09 -0.48,0.24 -0.23,0.58 -0.02,0.79 1.72,0 0.09,0.08 1.17,1.07 0.23,0.67 0.36,1.37 0.84,0.31 0.16,-0.4 0.34,0.28 1.07,0.03 0.06,0.22 -1.84,0.74 -0.43,0.15 -0.69,2.4 5.47,0.77 4.18,-0.92 5.93,-0.14 -0.19,-1.22 0.52,-1.16 z m -48.68,-18.07 0.79,-0.17 0.92,-0.79 0.08,-1.12 1.29,0.9 1.6,0.63 -0.96,1.17 0.43,1.85 0.27,0.32 -0.03,0.58 -0.6,0.94 0.22,0.64 1.01,0.31 1.26,1.35 2.07,4.36 -0.93,0.61 -0.42,0.84 0.15,0.91 3.15,1.85 0.6,2.9 0.88,1.32 -0.12,1.39 0.48,1.61 1.48,1.13 -1.12,1.39 -0.96,0.36 -0.86,-0.5 -0.6,0.41 -6.38,-1.39 -0.81,-2.54 0.53,-0.62 -0.6,0.02 -1.36,-3.89 -0.81,-1.9 0.1,-2.06 1.63,-1.56 -0.17,-1.35 -1.81,-1.66 -1.69,-1.15 -0.76,-4.06 -0.29,-0.58 0.02,-1.82 -0.77,-1.08 1.24,-0.74 0.88,0.63 0.67,0 0.3,0.56 z"
 title="Rivers"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-RI" />
<path
 d="m 178.43165,0.2287449 12.88,5.68 20.53,7.2500001 4,2.35 4.64,-1.49 3.65,-0.02 8.54,4.12 15.88,15.56 5.98,10.42 0,0 -3.03,2.6 -7.1,4 -9.51,-1.28 -1.9,-0.66 -1.7,-2.05 -2.27,-0.68 -4.97,-0.19 -0.59,5.48 -0.73,1.89 -0.5,0.22 -2.7,-1.44 -2.79,0 -4.85,1.56 -2.11,1.82 -0.11,0.7 0.78,5.14 0.07,8.44 -1.35,1 -4.04,1.64 -10.02,0.79 -6.09,0.95 -5.83,8.58 -1.88,1.87 -3.07,1.91 0.06,2.88 1.43,4.64 0.65,4.25 -0.74,3.029995 -2.46,1.7 -6.11,0.53 -1.28,-0.29 -4.8,0.64 -2.64,-0.31 -4.47,0.33 -9.33,-1.67 -0.92,0.6 -0.93,4.51 0.1,18.21 -0.66,13.78 0,0 -1.62,0.97 -0.94,-0.07 -0.77,-1.75 -2.04,0.72 -1.89,-0.86 -1.69,0.12 -12,5.45 -2.4,3 -1.71,1.35 -2.78,-0.29 -0.76,-0.51 -2.55,-3.65 1.16,-4.77 2.61,-5.63 2.12,-9.79 -0.79,-13.05 0.14,-9.94 1.01,-3.779995 1.28,-1.48 3.95,-1.18 2.68,-0.02 3.17,2.04 1.02,-0.04 0.64,-1.56 0.24,-8.02 -1.68,-5.52 -0.04,-2.04 1.3,-6.06 0.18,-3.32 -1.8,-4.28 -1.86,-2.15 0.42,-3.7 1.42,-2.98 -0.09,-2.4 1.62,-3.93 -0.4,-1.25 -1.08,-0.88 -1.16,0.31 -2.49,3.69 -0.63,0.56 -1.82,0.43 -3.06,-0.68 -2.95,-2.07 -9.56,-3.12 -1.06,-1.1 -3.19,-1.82 -1.65,-2.12 -0.76,-0.31 -4.629999,1.58 -1.86,-0.74 -6.62,0.14 0,0 0.09,-16.44 4.14,-0.02 16.559999,-14.58 25.12,-5.0100001 2.41,2.14 5.71,0.48 6.45,-0.72 4.85,0.56 5.33,-0.16 5.25,-6.26"
 title="Sokoto"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-SO" />
<path
 d="m 488.91165,275.87874 4.59,-2.65 5.85,0.78 10.59,-4.85 6.44,1.09 3.99,0.03 0,0 3.57,0.71 5.9,-0.6 12.46,0.02 6.37,-0.47 0,0 5.45,10.18 1.46,1.92 4.65,1.08 2.08,1.29 5.26,9.82 -0.46,2.17 0.34,3.84 2.66,2.94 4.14,1.47 2.02,3.84 0.26,1.81 -1,3.62 -5.99,11.44 0.38,5.78 -0.44,2.08 -6.12,5.22 -8.63,11.52 -5.08,5.48 -3.8,3.22 -4.14,4.78 -0.82,1.58 2.52,6.73 2.91,4.7 2.71,2.45 2.72,-1.99 2.83,-4.01 1.64,-0.38 1.42,0.43 1.52,1.12 2.5,3.15 4.32,3.84 2.15,2.6 1.04,2.02 -0.58,5.49 0.74,1.73 0.38,3.54 1.94,4.62 -0.05,1.56 1.22,0.88 0,0 -4.94,5.48 -1.09,1.94 -0.89,2.92 0.38,5.92 0.92,3.32 1.33,2.12 -0.18,1.29 -0.98,0.73 -4.04,-0.35 -0.68,0.46 -2.06,0.06 -0.18,1.64 -1.72,0.75 -1.54,1.93 -1.91,0.43 -1.09,4.21 -2.12,0.65 -1.37,2.72 0.06,0.5 0.94,-0.05 0.46,0.44 0.09,1.77 0.88,0.11 0.19,0.89 -0.99,0.43 -0.62,1.15 0.94,1.52 -0.08,1.04 -1.92,1.11 -0.22,3.22 -1.46,1.44 -0.57,1.91 -1.81,0.78 -1.77,-0.83 -0.6,0.54 -1.24,0.15 -0.46,0.64 0.46,0.88 -0.18,1.73 -0.44,0.5 -3.75,0.68 -0.42,0.22 -0.2,1.37 -1.37,-0.18 -3.03,-2.03 -2.25,1.01 -0.67,-0.7 -3.01,-0.66 -1.42,-1.22 -0.58,0.05 -1.22,1.41 -2.03,-0.08 0.24,-8.73 -2.03,-2.16 -2.24,-0.11 -2.36,2.14 -2.84,-0.48 -1.86,-0.85 -1.43,-3.38 -1.18,-2.19 -1.22,-0.81 -1.17,-0.07 -1.31,-2.11 -0.12,-0.73 1.66,-4.79 -2.66,-1.84 -1.49,-0.2 -0.6,0.74 -1.69,-2.15 -1.03,-0.08 -1.5,-1.61 -0.77,-0.07 -0.36,-1.52 -1.25,-0.63 -0.4,0.46 -1.47,-0.36 -1.85,-1.58 0.52,-1.93 -0.4,-2.09 -1.65,-1.31 -0.76,4.76 0.08,2.89 -1.39,6.02 -0.88,1 -1.67,0.57 -0.34,0.87 -0.64,0.11 -0.94,-0.97 -15.69,1.52 -2.64,-3.08 0.62,-1.75 -0.85,-2.06 -0.19,-1.18 0.07,-0.81 -0.89,-0.32 -8.2,7.4 -0.64,1.12 -2.44,1.72 -1.12,1.84 -4.62,4.63 -1.34,-0.72 -2.2,-0.1 -1.6,-0.22 -0.8,-0.61 -0.9,2.13 0.3,0.79 -0.76,0.97 -0.38,1.8 0.36,2.03 -0.28,1.07 -0.6,0.37 -1.02,2.82 -1.35,5.37 -0.5,0.39 -0.68,-0.34 -1.32,0.37 -1.03,-1.32 -0.44,0.46 0,0 1.9,-8.19 0.03,-8.76 0.33,-1.08 -0.61,-0.73 2.11,-11.5 3.31,-6.16 3.44,-3.25 3.09,-1.94 0.92,-1.43 -0.29,-5.92 2.38,-5.89 0.59,-3.23 -0.56,-1.78 0.26,-1.04 -1.17,-1.36 0.14,-0.65 -8.37,-7.57 -4.44,-5.65 -5.14,-4.9 -7.48,-1.77 -8.18,-0.48 -7.47,0.95 -6.12,2.63 -1.9,-0.57 3.79,-5.97 0,0 1.21,-1.39 11.23,-7.21 0.11,-1.19 -1,-2.68 0.54,-0.65 -0.35,-2.88 -2.03,-2.51 -1.71,-1.36 0.73,-2.86 1.33,-2.14 1.28,-0.86 1.86,0 1.73,0.9 1,1.07 1.52,-0.23 0.33,0.41 4.51,0.95 2.74,-0.82 2.58,-3.68 0,0 3.85,0.25 4.11,-0.54 4.41,-1.01 2.43,-1.19 7.68,-7.65 7.11,-3.76 4.74,-5.72 2.06,-4.19 2.49,-1.44 9.52,-2.1 1.9,0.11 12.18,-5.86 1.78,-3.08 -0.21,-5.54 -0.43,0 -0.3,-2.25 0.55,-1.33 -1.05,-6.02 -2.3,-3.86 -0.76,-5.96 0.51,-4.08 -0.21,-2.15 z"
 title="Taraba"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-TA" />
<path
 d="m 526.42165,32.448745 12.45,0.19 9.56,1.2 10.76,4.18 11.69,2.55 2.73,1.51 6.09,5.17 4.78,3 1.58,0.14 0.3,-0.82 1,-0.28 1.65,0.65 0.62,-0.52 -0.55,-1.18 1.49,0.16 1.7,0.94 1.66,-0.42 0.83,0.71 0.63,1.07 1.04,-0.62 2.85,0.61 0.74,0.5 0.93,0.12 0.99,-0.01 0,0 -0.08,4.21 -1.49,8.02 1.23,3.85 1.45,1.82 4.8,3.84 0.48,3.74 -1.84,4.21 -2.37,3.08 -7.06,6.31 -0.55,2.2 1.72,3.83 -0.05,5.789995 -2.54,16.29 -0.13,3.5 1.69,7.44 -4.72,9.14 0.15,1.94 0.64,0.36 4.91,-0.21 3.13,3.75 0.84,3.33 -0.99,2.11 -4.54,4.43 -3.3,5.9 -2.89,3.35 -0.9,2.86 0.04,2.97 0.76,4.15 -0.24,2.94 -2.09,3.08 -6.11,3.65 -11.21,3.02 -2.66,1.92 -1.72,2.83 -0.61,2.77 0.28,8.39 -3.41,4.53 -3.04,0.69 0,0 -6.78,0.01 -0.3,-0.51 -0.77,-6.45 1.2,-11.85 -0.67,-4.87 -3.68,-3.38 -1.58,1.02 1,-1.54 -3.42,-3.58 -4.75,-6.4 -8.49,-6.26 -2.18,-1.29 -2.98,-1.01 -4.04,-0.17 -4.17,1.51 -0.91,0.88 0,0 -3.04,-0.37 -1.63,-1.53 0.99,-6.78 1.05,-2.72 0.23,-4.92 -8.35,-20.91 -0.2,-3.87 -0.95,-2.71 -0.33,-2.7 -0.21,-6.74 -3.16,-4.66 0.19,-1.81 -0.77,-7.079995 -1.14,-2.93 -7.74,-6.19 0,0 -0.87,-2.9 -1.76,-11.53 -2.21,-3.4 -1.85,-0.88 -2.03,0.61 -4.99,-2.22 -5.86,1.86 -1.12,0.72 -1.46,-2.53 -0.69,-4.35 -2.13,-4.78 -2.21,-1.25 -6.33,1.96 -2.82,1.37 -3.16,0.63 -5.32,2.59 -2.1,3.99 -3.14,1.8 -6,-0.73 -1.79,-1.18 0,0 7.38,-7.5 3.25,-4.6 4.08,-3.51 5.19,-5.85 3.98,-2.54 9.05,-4.06 16.06,-0.94 12.55,-4.7 19.58,-1.07 z"
 title="Yobe"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-YO" />
<path
 d="m 258.59165,50.268745 5.45,6.52 5.08,-0.11 3.34,-0.61 0,0 -1.44,10.82 0.99,6.17 -0.07,6.05 1,5.17 0.39,4.75 1.31,3.21 -0.4,3.57 2.5,5.199995 0.69,3.05 -0.13,1.68 0.95,2.47 -1.09,5.16 -1.82,3.63 1.26,1.21 2.53,1.16 2.68,2.29 1.16,1.43 0.5,1.95 -1.89,1.62 -3.34,-0.81 -0.55,3.2 -4.88,3.97 -1.28,-0.87 -6.61,0.13 -1.5,0.84 -0.65,4 -1.56,4.14 -0.45,3.76 0.16,1.07 1.91,1.9 0.9,3.69 -1.25,6.1 -0.02,2.33 0,0 -1.01,-0.03 -2.34,2.38 -2.75,1.77 -0.85,1.14 -1.71,3.41 -0.64,3.55 -1.51,3.23 -3.04,3.1 -2.33,1.51 -4.71,0.62 -7.94,-0.57 -5.64,0.95 -5.27,4.71 -2.86,4.16 -1.28,0.76 -1.68,0.12 0,0 0.07,-0.84 -1.59,-4.09 -3.8,-6.64 -3.32,-4.4 0,0 -0.21,-5.48 -1.38,-7.58 -1.93,-3.01 -5.38,-2.71 0,-1.2 2.05,-6.49 0.01,-2.47 -1.41,-2.15 -4.35,-1.77 -4.85,-0.62 -1.22,0.81 -2.49,0.59 -3.79,-0.5 -5.47,0.76 -3.65,-2.41 -2.87,-0.11 -1.69,-3.3 -1.08,-0.57 -3.61,0.65 -2.09,-0.31 -0.91,-0.64 -0.79,0.15 -1.06,0.62 -0.82,2.32 -6.34,1.46 -4.11,-2.25 -1.82,0 -0.86,0.48 0,0 0.66,-13.78 -0.1,-18.21 0.93,-4.51 0.92,-0.6 9.33,1.67 4.47,-0.33 2.64,0.31 4.8,-0.64 1.28,0.29 6.11,-0.53 2.46,-1.7 0.74,-3.029995 -0.65,-4.25 -1.43,-4.64 -0.06,-2.88 3.07,-1.91 1.88,-1.87 5.83,-8.58 6.09,-0.95 10.02,-0.79 4.04,-1.64 1.35,-1 -0.07,-8.44 -0.78,-5.14 0.11,-0.7 2.11,-1.82 4.85,-1.56 2.79,0 2.7,1.44 0.5,-0.22 0.73,-1.89 0.59,-5.48 4.97,0.19 2.27,0.68 1.7,2.05 1.9,0.66 9.51,1.28 7.1,-4 3.03,-2.6 0,0 z"
 title="Zamfara"
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
 id="NG-ZA" />
 fill="#ADD8E6"
 stroke="#888888"
 stroke-width="2"
</svg>

<!-- Indicator Matrix -->
  <rect x="600" y="520" width="140" height="80" fill="#ffffff" stroke="#000000" stroke-width="2" />
  <text x="630" y="540" font-family="Arial, sans-serif" font-size="12" fill="#000000">Indicator Matrix</text>
  <!-- Sample data for indicator matrix -->
  <rect x="640" y="550" width="20" height="20" fill="green" />
  <rect x="670" y="550" width="20" height="20" fill="yellow" />
  <rect x="700" y="550" width="20" height="20" fill="red" />
  <text x="635" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">Low</text>
  <text x="660" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">Medium</text>
  <text x="705" y="590" font-family="Arial, sans-serif" font-size="12" fill="#000000">High</text>
  `;
};

// Example usage:
const motaEngilMapSVG = generateMotaEngilMap();

const today = new Date();
const staff_no= "2347035517578"

const keySecurityIncidents = [
  {
    location: "Akwa Ibom",
    date: "August 22, 2023",
    details: "Gunmen suspected to be armed robbers intercepted a man along Uyo-Etinan Road in Etinan, Etinan LGA, and stole his saloon car."
  },


    {
      location: "Abuja",
      date: "August 21, 2023",
      details: "Gunmen suspected to be kidnappers reportedly abducted two persons at a residential estate in Sabon Lugbe along Airport Road, AMAC. No further details were available."
    },
    {
      location: "Benue",
      date: "August 21, 2023",
      details: "Gunmen belonging to rival groups suspected to be herdsmen reportedly engaged themselves in a gun battle at Chito village, Ukum LGA. Five persons were reportedly killed in the gun battle while others sustained gunshot injuries."
    },
    // Add more incidents here...
    {
      location: "Imo",
      date: "August 22, 2023",
      details: "The Nigerian Army reportedly engaged in a gun battle with armed men suspected to be separatist members along the Owerri-Onitsha expressway at Ukwuorji, Mbaitoli LGA, forcing the assailants to flee the area."
    },
  
  {
    location: "Edo",
    date: "August 23, 2023",
    details: "Gunmen suspected to be armed robbers reportedly attacked a patrol vehicle belonging to soldiers along Akpakpava street in Benin, Oredo LGA. The assailants reportedly injured one soldier."
  },
  {
    location: "Delta",
    date: "August 24, 2023",
    details: "Gunmen on motorcycles suspected to be cultists reportedly attacked a Police Division in Isiokolo community, Ethiope East LGA. The assailants reportedly killed one Policeman while another sustained gunshot injury."
  },
  {
    location: "Rivers",
    date: "August 22, 2023",
    details: "Suspected criminals vandalised a pipeline and siphoned fuel at a fuel dump in Rex Lawson Street in Borikiri town, Port Harcourt which resulted in an explosion and reportedly killed one person."
  },
  {
    location: "Rivers",
    date: "August 22, 2023",
    details: "Two factions of the National Union of Road Transport Workers (NURTW) reportedly clashed along the Port Harcourt-Aba Road in Oyigbo, Obior/Akpor LGA. No further details were available."
  },
  {
    location: "Rivers",
    date: "August 22, 2023",
    details: "Armed men suspected to be cultists reportedly attacked a student at his residence in Rumuolumeni Town, Obio/Akpor LGA. The assailants reportedly stabbed the victim with broken bottles."
  },
  {
    location: "Rivers",
    date: "August 23, 2023",
    details: "Armed robbers reportedly attacked the Rivers State University Girls Hostel at Eagles Island, Rumueme, Port Harcourt LGA. The assailants reportedly assaulted students with machetes, robbed, and dispossessed an unspecified number of the students of their cash and other valuables."
  },
  {
    location: "Rivers",
    date: "August 25, 2023",
    details: "Armed men suspected to be cultists reportedly shot and killed a Policeman on security escort duty along Olusegun Obasanjo Road in Oroworukwo area, Port Harcourt LGA."
  },
  {
    location: "Abia",
    date: "August 21, 2023",
    details: "Armed men suspected to be kidnappers, reportedly engaged in a shootout with government security forces at Ndiawa village, Umuneochi LGA. Three of the assailants were reportedly killed while others fled."
  },
  {
    location: "Ebonyi",
    date: "August 23, 2023",
    details: "Armed men suspected to be separatist members, reportedly engaged Soldiers in a gunshot battle at Effium community, Ohaukwu LGA. The assailants reportedly fled the scene. No further details were available."
  },
  {
    location: "Enugu",
    date: "August 21, 2023",
    details: "Armed men suspected to be kidnappers reportedly engaged Policemen in a shootout along Enugu-Port Harcourt Expressway, in Awkunanaw town, Enugu South LGA. Two of the assailants were reportedly killed in the gunfire, while others fled with gunshot injuries."
  },
  {
    location: "Enugu",
    date: "August 21, 2023",
    details: "Gunmen suspected to be kidnappers, reportedly shot at a vehicle along Old Enugu-Onitsha Road in Obioma town, Udi LGA, forcing the vehicle to stop. The assailants reportedly abducted one person while the other two occupants died from gunshot injuries."
  }
];


const fatalities = 70;
const injuries = 36;
const abductions = 51;

const formatDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formattedToday = formatDate(today);

const generate_security_report_PDF = () => {

  const svgMapContent = generateSVGMap();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const formattedStartDate = formatDate(lastWeek);
  const formattedEndDate = formattedToday;

  const incidentsData = {
    fatalities: 70,
    injuries: 36,
    abductions: 51,
    effectsOnAssets: "Some relevant data about effects on assets goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ex urna. Donec id tempus nulla. Duis eget nunc vitae elit interdum dapibus.",
    riskImpact: "Some relevant data about risk impact goes here. Vestibulum efficitur ligula et nisi semper, ac eleifend dolor mollis. Suspendisse potenti. Nulla facilisi. Integer vel lacus nec arcu gravida malesuada.",
    briefSummary: "Highlights of Week 4 incidents:\n- Increased security patrols in high-risk areas\n- Collaboration with local authorities for incident response\n- Implementation of new security protocols"
  };


  
  const fatalitiesPercentage = (incidentsData.fatalities / 100) * 100;
  const injuriesPercentage = (incidentsData.injuries / 100) * 100;
  const abductionsPercentage = (incidentsData.abductions / 100) * 100;

  const keySecurityIncidentsHTML = keySecurityIncidents.map((incident, index) => `
  <p>${index + 1}. ${incident.location}. ${incident.date}, ${incident.details}</p>
`).join('');


  const maxVal = Math.max(fatalities, injuries, abductions);
  const graphWidth = 400;
  const barWidth = 100;
  const barSpacing = 20;
  const graphHeight = 200;

  const fatalitiesHeight = (fatalities / maxVal) * graphHeight;
  const injuriesHeight = (injuries / maxVal) * graphHeight;
  const abductionsHeight = (abductions / maxVal) * graphHeight;


  const generatePieChart = (data) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    let startAngle = -90; // Start angle at 12 o'clock position

    let chartSVG = `<svg width="400" height="400">`;

    // Add heading for the pie chart
    chartSVG += `<text x="${centerX}" y="30" text-anchor="middle" font-size="16" font-weight="bold">Security Incidents Breakdown</text>`;

    data.forEach((item, index) => {
        const percent = (item.value / total) * 100;
        const angle = (percent / 100) * 360;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const endAngle = startAngle + angle;

        // Calculate coordinates for the arc
        const x1 = centerX + radius * Math.cos((startAngle / 180) * Math.PI);
        const y1 = centerY + radius * Math.sin((startAngle / 180) * Math.PI);
        const x2 = centerX + radius * Math.cos((endAngle / 180) * Math.PI);
        const y2 = centerY + radius * Math.sin((endAngle / 180) * Math.PI);

        // Calculate midpoint of the arc
        const midAngle = startAngle + angle / 2;
        const midX = centerX + (radius / 2) * Math.cos((midAngle / 180) * Math.PI);
        const midY = centerY + (radius / 2) * Math.sin((midAngle / 180) * Math.PI);

        // Draw the arc
        chartSVG += `
            <path d="M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z" fill="${item.color}"></path>
        `;

        // Add text for the indicator
        chartSVG += `<text x="${midX}" y="${midY}" text-anchor="middle" font-size="12">${item.label} (${item.value})</text>`;

        // Update start angle for the next segment
        startAngle = endAngle;
    });

    chartSVG += `</svg>`;

    return chartSVG;
};

// Example data
const dataPie = [
    { label: 'Terrorism', value: 25, color: '#FF5733' },
    { label: 'Violent Protests', value: 15, color: '#3498DB' },
    { label: 'Kidnapping', value: 20, color: '#27AE60' },
    { label: 'Other', value: 40, color: '#F39C12' }
];

const pieChartSVG = generatePieChart(dataPie);


  const graphSVG = `
    <svg width="${graphWidth}" height="${graphHeight + 60}">
      <rect x="${barSpacing}" y="${graphHeight - fatalitiesHeight}" width="${barWidth}" height="${fatalitiesHeight}" fill="#FF5733"></rect>
      <text x="${barSpacing + (barWidth / 2)}" y="${graphHeight + 20}" text-anchor="middle" font-size="12">${fatalities}</text>
      <text x="${barSpacing + (barWidth / 2)}" y="${graphHeight + 40}" text-anchor="middle" font-size="12">Fatalities</text>
      
      <rect x="${(2 * barSpacing) + barWidth}" y="${graphHeight - injuriesHeight}" width="${barWidth}" height="${injuriesHeight}" fill="#3498DB"></rect>
      <text x="${(2 * barSpacing) + barWidth + (barWidth / 2)}" y="${graphHeight + 20}" text-anchor="middle" font-size="12">${injuries}</text>
      <text x="${(2 * barSpacing) + barWidth + (barWidth / 2)}" y="${graphHeight + 40}" text-anchor="middle" font-size="12">Injuries</text>
      
      <rect x="${(3 * barSpacing) + (2 * barWidth)}" y="${graphHeight - abductionsHeight}" width="${barWidth}" height="${abductionsHeight}" fill="#27AE60"></rect>
      <text x="${(3 * barSpacing) + (2 * barWidth) + (barWidth / 2)}" y="${graphHeight + 20}" text-anchor="middle" font-size="12">${abductions}</text>
      <text x="${(3 * barSpacing) + (2 * barWidth) + (barWidth / 2)}" y="${graphHeight + 40}" text-anchor="middle" font-size="12">Abduction/Kidnap</text>
    </svg>
  `;
  const svgDataURI = `data:image/svg+xml;base64,${Buffer.from(svgMapContent).toString('base64')}`;

  const securityReportHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly Security Incident Report Nigeria</title>
        <style>
        
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }

            .container_security_report {
              max-width: 800px;
              margin: 20px auto; /* Adjust margins here */
              padding: 20px; /* Adjust padding here */
              background-color: #f8f9fa;
              border-radius: 10px;
          }
        
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .footer {
                text-align: right;
                margin-top: 20px;
                font-size: 14px;
            }
            .footer p {
                margin: 0;
            }
            .signature {
                text-align: center;
                margin-top: 40px;
            }
            .watermark {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(0, 0, 0, 0.1);
                font-size: 5em;
                z-index: -1;
            }
            .icon {
                width: 50px;
                height: 50px;
                display: inline-block;
                background-color: #007bff;
                border-radius: 50%;
                text-align: center;
                line-height: 50px;
                margin-right: 10px;
                color: #fff;
                font-size: 24px;
            }
        </style>
    </head>
    <body>

    <main>
    <!-- Your SVG content here -->
    <svg xmlns="http://www.w3.org/2000/svg" height="250" width="450" version="1.0" viewBox="-14.709615 -11.98125 127.48333 71.8875">
        <defs>
            <!-- Define the clip path -->
            <clipPath id="a">
                <path d="M0 841.89h1785.827V0H0z"/>
            </clipPath>
        </defs>
        <!-- Apply the clip path to the group -->
        <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 -1155.7275 543.7908)">
            <!-- Your existing paths and shapes here -->
            <path d="M924.582 415.8627h19.169v-19.17h-19.169z" fill="#f7a30a" fill-rule="evenodd"/>
            <path d="M943.751 435.0327h19.17v-19.169h-19.17z" fill="#005ec4" fill-rule="evenodd"/>
            <path d="M942.4095 435.0324h1.342v-19.169h-19.169v1.341h17.827zm1.3418-19.1694h19.17v-1.342h-17.827v-17.828h-1.343v17.828z" fill="#231f20"/>
            <path d="M956.972 409.0544h-.851c-.916-1.695-1.841-3.4-2.767-5.196-.832 1.796-1.674 3.501-2.516 5.196h-.972v-6.381h.748v5.195h.019c.252-.837 1.608-3.564 2.42-5.195h.366c.879 1.631 2.365 4.448 2.627 5.195h.019v-5.195h.907zm4.5322-5.9629c-1.691 0-2.271 1.523-2.271 2.771 0 1.196.654 2.553 2.271 2.553 1.618 0 2.272-1.357 2.272-2.553 0-1.248-.579-2.771-2.272-2.771m0-.637c2.021 0 3.273 1.504 3.273 3.408 0 1.788-1.383 3.192-3.273 3.192-1.889 0-3.271-1.404-3.271-3.192 0-1.904 1.251-3.408 3.271-3.408m19.9776 6.5969l-4.021.003v-6.385h4.426v.639l-3.511.002v2.052h3.058v.637h-3.058v2.414h3.106zm7.1982 0h-.752v-5.087h-.019c-.444.638-2.876 3.428-4.329 5.087h-.679v-6.382h.755v5.078h.018c.397-.555 2.858-3.418 4.29-5.078h.716zm5.9082-3.5732v-2.16c-.367-.174-.783-.229-1.339-.229-1.432 0-2.573 1.084-2.573 2.699 0 1.495.961 2.626 2.677 2.626.725 0 1.329-.247 1.725-.511l.377.528c-.396.319-1.15.62-2.111.62-2.377 0-3.678-1.668-3.678-3.282 0-1.75 1.207-3.318 3.555-3.318.839 0 1.64.21 2.282.428v2.599zm3.2888 3.5735h-.914v-6.382h.914zm1.4983-6.3821h3.658v.639h-2.744v5.743h-.914zm-31.3632.0039v5.742l2.139.001v.638h-5.297v-.639h2.203v-5.742z" fill="#636466" fill-rule="evenodd"/>
            <path d="M972.3656 409.0544l-2.607-6.381h.974l.945 2.689.225.639.671 1.91 1.987-5.238h1.102l-2.568 6.381z" fill="#636466"/>
            <path d="M972.2015 405.362h4.695V406h-4.466z" fill="#636466" fill-rule="evenodd"/>
            </g>
    </svg>
    <!-- Text added to the right -->
    <text x="430" y="40" font-family="Calibri, sans-serif" font-size="24" fill="#333333" font-weight="bold" text-anchor="end">Nigeria Weekly Report</text>
    <svg width="100%" height="1">
        <line x1="0" y1="0" x2="100%" y2="0" style="stroke: grey; stroke-width: 1;" />
    </svg>
</main>

<div class="container_security_report">
<div class="header">
    <h2 style="color: #00008B; font-size: 24px;">SECURITY ADVISORY</h2>
    <h3 style="color: #00008B;">WEEK: ${formattedStartDate} to ${formattedEndDate}</h3>
    <h3 style="color: #00008B;">Fatalities: ${incidentsData.fatalities} | Injuries: ${incidentsData.injuries} | Abduction/Kidnap: ${incidentsData.abductions}</h3>
</div>
<div class="content">
    <img src="${svgDataURI}" alt="" />
    <div id="map-container">${svgMapContent}</div>
    <h2 style="color: #00008B;">Security Risk Update:</h2>
    <p style="color: #444; font-family: 'Trebuchet MS', sans-serif; font-size: 12px;">${incidentsData.effectsOnAssets}</p>

    <div class="graph">
        ${graphSVG}
    </div>

    <h2 style="color: #00008B;">Risk Impact:</h2>
    <p style="color: #444; font-family: 'Trebuchet MS', sans-serif; font-size: 12px;">${incidentsData.riskImpact}</p>
    <h3 style="color: #00008B; font-size: 16px;">${incidentsData.briefSummary}</h3>
</div>
<div class="graph">
    ${graphSVG}
</div>

<h2 style="color: #00008B;">Key security incidents</h2>
<div style="color: #444; font-family: 'Trebuchet MS', sans-serif; font-size: 12px;">
    ${keySecurityIncidentsHTML}
</div>
<div class="graph">
    ${pieChartSVG} <!-- Insert the pie chart SVG here -->
</div>

<h2 style="color: #00008B;">Mota-Engil Operational Zones: Security Overview</h2>
${motaEngilMapSVG}
<!-- map here -->

<div class="footer">
        <p style="color: #333; font-size: 18px; font-weight: bold; line-height: 1.5;">Vitor Leite,</p>
        <p style="color: #444; font-family: 'Trebuchet MS', sans-serif; font-size: 12px; line-height: 1.5;">Security Manager,</p>
        <p style="color: #444; font-family: 'Trebuchet MS', sans-serif; font-size: 12px; line-height: 1.5;">Kama Railway Project</p>
    </div>
</div>
<div class="signature">
<p>______________________________</p>
<p>Signature</p>
</div>

    </body>
    </html>
  `;

  return securityReportHTML;
};

// /////////////////////////////////////////////////////////////////////////////yyyyyyyyyyyyyyyyyyyyyyyy
const formattedDateToday = formattedToday; // Make sure formattedToday is defined elsewhere
const gatePassDownloadsFolderPath = path.join(__dirname, '..', 'downloads');
const gatePassUniqueFilename =  `TailoredResume_${formattedDateToday}_UserName_Job_Title.pdf`;
const gatePassPdfPath = path.join(gatePassDownloadsFolderPath, gatePassUniqueFilename);

const signatureImagePath = 'C:/Users/Administrator/OneDrive/Desktop/Development tools/playground/backupVisitor-Movement Management/Visitor-Movement Management6/assets/signature1.png';

// // Function to get user job preferences without requiring a userId
// // const sessionSecret = crypto.randomBytes(64).toString('hex');
// app.use(session({
//   secret: sessionSecret, // Use the generated secure key
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // Set to true in production with HTTPS
// }));

app.use(session({
  secret: sessionSecret, // Use the generated secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

async function getUserPreferences() {
  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Connected to the database.');

    const database = client.db('olukayode_sage');
    const users = database.collection('Users_CV_biodata');

    console.log('Fetching user preferences...');
    const user = await users.findOne({});

    // console.log('User data fetched:', user);

    if (user) {
      // Accessing only the desired job title
      const desiredJobTitle = user.desiredJobTitle || 'default job title';
      
     console.log('Desired job title found:', desiredJobTitle);
      return desiredJobTitle;
    } else {
      console.log('No user document found.');
      return 'default job title'; // Default value in case no document is found
    }

  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return {};
  } finally {
    console.log('Closing the database connection.');
    await client.close();
    console.log('Database connection closed.');
  }
}


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

// Function to fetch data using Axios and Cheerio
const fetchDataWithAxios = async (query, startIndex = 0) => {
  const userAgent = selectRandomUserAgent();
  // const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&start=${startIndex}`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&start=${startIndex}`;  // Use Google to search within MyJobMag
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
        'Referer': 'https://www.google.com/',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const results = [];

    $('.g').each((index, element) => {
      const title = $(element).find('.yuRUbf h3').text() || '';
      const link = $(element).find('.yuRUbf a').attr('href') || '';
      const jobDate = $(element).find('.f').text().trim() || ''; // Adjust selector as needed
      results.push({ title, link, jobDate });
    });

    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// https://www.myjobmag.com/jobs-by-industry/ngo
// Function to fetch results from multiple pages
const fetchMultiplePagesWithAxios = async (query, pages = 3) => {
  const results = [];

  for (let i = 0; i < pages; i++) {
    const startIndex = i * 10;
    try {
      const pageResults = await fetchDataWithAxios(query, startIndex);
      results.push(...pageResults);
    } catch (error) {
      console.error(`Error fetching page ${i + 1}:`, error);
    }

    await new Promise(resolve => setTimeout(resolve, randomDelay())); // Random delay between requests
  }

  return results;
};

// Utility function for random delay
const randomDelay = () => Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 to 5 seconds


let roleBatchId; // Declare a global variable to store the batch ID


/////////////////////////////////////////////////////////
async function saveRoleToDB(role, collectionName, userResponse, serialNumber = null) {
  const { client, collection } = await connectToDatabase();
  try {
    // Check for existing entry with the same role title and URL
    const existingRole = await collection.findOne({
      role: role.title,
      url: role.link
    });

    if (existingRole) {
      console.log(`Role "${role.title}" with URL "${role.link}" already exists. Skipping insertion.`);

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
      console.log(`Role "${role.title}" updated.`);
    } else {
      // Check if roleBatchId is already set, otherwise generate a new one
      if (!roleBatchId) {
        roleBatchId = generateUniqueID(); // Generate ID once per batch
      }

      // Prepare the document with user's response and unique ID
      const document = {
        date: new Date().toLocaleDateString(), // current date
        role: role.title,
        url: role.link,
        userResponse: userResponse || 'no response', // Handle null or undefined responses
        serialNumber: serialNumber || null, // Add serial number if available
        uniqueId: "Job_role_" + roleBatchId, // Use the generated batch ID
      };

      // Insert the new document
      await collection.insertOne(document);
      console.log(`Role "${role.title}" added.`);
    }

    // Remove exact duplicates
    const duplicates = await collection.aggregate([
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

    // Consolidate unique entries
    const uniqueRoles = await collection.aggregate([
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

    console.log('Data cleaned and consolidated successfully');
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

// ////////////////////////////////////////working
const filterResults = async (results, rolesListing) => {
  const myJobMagResults = results.filter(result => {
    const isFromMyJobMag = result.link.includes('myjobmag.com');
    const isNotJobByTitle = !result.link.includes('jobs-by-title'); // Filter out "jobs-by-title" URLs

    return isFromMyJobMag && isNotJobByTitle;
  }).map(result => {
    const titleMatch = result.title.match(/^(.*?)\s*Jobs/i);
    const jobTitle = titleMatch ? titleMatch[1].trim() : result.title;
    return { title: jobTitle, link: result.link, jobDate: result.jobDate };
  });

  console.log('Filtered Results:', myJobMagResults);

  for (let i = 0; i < myJobMagResults.length; i++) {
    const role = myJobMagResults[i];

    // Check if the role with the same link or title already exists in the collection
    const existingRole = await rolesListing.findOne({ 
      $or: [{ link: role.link }, { title: role.title }] 
    });

    if (existingRole) {
      console.log(`Role with link ${role.link} or title ${role.title} already exists. Skipping...`);
      continue; // Skip saving the role and move to the next iteration
    } else {
      const serialNumber = i + 1; // Serial numbers starting from 1

      const document = {
        title: role.title,
        link: role.link,
        jobDate: role.jobDate,
        serialNumber: serialNumber,
        validated: false, // Add a field to mark if this role is validated
        label: "new", // Label the role as new
        timestamp: new Date(), // Add a timestamp of when the role is saved
      };

      // Save the document to the roles_listing collection
      await rolesListing.insertOne(document);
      console.log(`New role added: ${role.title}`);
    }
  }

  console.log('Filtered roles have been processed.');
  return myJobMagResults;
};

const main = async () => {
  const { client } = await connectToDatabase();
  try {
    await client.connect();
    console.log('Database connected successfully.');

    const database = client.db('olukayode_sage');
    const rolesListing = database.collection('roles_listing'); // Reference the roles_listing collection

    const userPreferences = await getUserPreferences();
    console.log('User Preferences:', userPreferences);

    const jobTitle = typeof userPreferences === 'string' ? userPreferences : (userPreferences && userPreferences.desiredJobTitle) || 'default job title';
    console.log(`Extracted desired job title: ${jobTitle}`);

    const query = `${jobTitle} site:myjobmag.com`;

    try {
      const results = await fetchMultiplePagesWithAxios(query, 6); // Fetch 6 pages of results
      console.log('All Results:', results); // Log all results before filtering

      // Filter results and save to database
      await filterResults(results, rolesListing);
    } catch (error) {
      console.error('Error fetching or processing results:', error);
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
};

// Start the process
main();

const apiKey = 'AIzaSyAAaq27xrkFhUSYAirdk5LSSm8LkKhySCE';
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getMaxListeners } = require('process');
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

const jobPost = `
*Very Urgent Vacancy!!!*
Thursday, 8th February.

*>>Position: Field Security Supervisors*

*>>Location: Lekki*

*>>Salary Range: 300k - 350k*

*>>The candidate should possess the following qualifications:*

   • Must have minimum of First Degree.
- Must have leadership and management skills. 
  • Must not be more than more than 45 years.
- Must have undergone relevant security training.
- Must be computer literate.
   • Must be a retired armed force personnel.

*Duties & Responsibilities*

• The field security officer should be able to assist the Security Manager in monitoring and ensuring compliance with existing security procedures and architecture.
• Conduct routine patrols for inspection of all site locations.
• Write and submit periodic security incident reports.
• Maintain law and order both within the Area of Responsibility (AOR) and in the Areas of Security Interest (AOSI).
• Monitoring and identification of emerging security threats to business, staff, and assets.
• Liaison with various members of government security agencies.
• Assist in the review of existing security policies, protocols, and procedures.
• Ensure that all security and safety systems like the burglar alarms, fire alarms, and CCTV are working properly.
• Respond to alarms and distress calls.
• Look out for suspicious persons, vandalism, or vulnerabilities and hazards.

*>>Note: Only qualified persons should come with a clear photocopy of their CVs to 36 Old Yaba Road. Top floor, same building with Lifeback Supermarket.*

*>> Qualified Persons Should Send their CVs to 08062856868, 08160121388 via WhatsApp. NO CALLS PLEASE 🙏 !*

*>>Interview Date*: Monday, 12th February 2024 and to be conducted at August Eye 👁️ office. 

*Time*: 11:00am

*Kindly note that this interview is for 2nd batch and not for those who applied before*

info@augusteyeltd.com
`;

// Function to summarize job vacancy post using AI model (Gemini AI)
async function summarizeJobPost(post) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(post);
        const summarizedText = result.response.text();
        console.log("Summarized text:", summarizedText); // Logging the summarized text
        return summarizedText;
    } catch (error) {
        console.error('Error summarizing job vacancy post:', error);
        throw error;
    }
}

// Function for further processing using NLP techniques
function furtherProcessing(summarizedPost) {
    // Helper function to extract the value from a sentence
    function extractValue(sentence) {
        const parts = sentence.split(':');
        if (parts.length > 1) {
            return parts[1].trim();
        }
        return null;
    }

    // Tokenize the summarized text into sentences
    const sentences = summarizedPost.split('\n').map(sentence => sentence.trim());

    // Initialize an object to store field-value pairs
    const jobData = {};
    jobData["Job Description"] = summarizedPost;

    // Helper function to extract email addresses from a string
    function extractEmails(text) {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        return text.match(emailRegex) || [];
    }

    // Helper function to extract phone numbers from a string
    function extractPhoneNumbers(text) {
        const phoneRegex = /\b\d{11}\b/g;
        return text.match(phoneRegex) || [];
    }

    // Iterate through the sentences to identify relevant information for each field
    sentences.forEach(sentence => {
        // Check for job title
        if (sentence.toLowerCase().includes("position:") || sentence.toLowerCase().includes("title:")) {
            jobData["Job Title"] = extractValue(sentence) || "Not stated";
        }
        // Check for job location
        else if (sentence.toLowerCase().includes("location:")) {
            jobData["Job Location"] = extractValue(sentence) || "Not stated";
        }
        // Check for expected salary
        else if (sentence.toLowerCase().includes("salary range:") || sentence.toLowerCase().includes("pay:")) {
            jobData["Expected Salary"] = extractValue(sentence) || "Not stated";
        }
        // Check for interview date
        else if (sentence.toLowerCase().includes("interview date:")) {
            jobData["Interview Date"] = extractValue(sentence) || "Not stated";
        }
        // Check for phone numbers
        else if (/\b\d{11}\b/.test(sentence)) {
            const phoneNumbers = sentence.match(/\b\d{11}\b/g);
            const phoneNumber = phoneNumbers ? phoneNumbers.join(", ") : "Not indicated";
            jobData["Contact Phone Number"] = phoneNumber;
        }
    });

    // Extract email addresses from the job description
    const emailAddresses = extractEmails(summarizedPost);
    if (emailAddresses.length > 0) {
        jobData["Contact Email"] = emailAddresses.join(", ");
    } else {
        jobData["Contact Email"] = "Not indicated";
    }

    // Log the final summary
    const finalSummary = Object.entries(jobData).map(([field, value]) => `${field}: ${value}`);
    console.log("Final Summary:");
    console.log(finalSummary);

    return jobData;
}

// Function to extract keywords from job description
function performOperations(jobData) {
    // Perform operations using jobData here
    console.log("Accessing Application Email from performOperations function:", jobData["Application Email"]);

    // Extract keywords from job description
    const jobDescription = jobData["Job Description"];

    // Tokenize the job description
    const tokenizer = require('simple-tokenizer');
    const tokens = tokenizer.tokenize(jobDescription);

    // Perform additional processing
    const processedTokens = tokens.map(token => {
        // Convert token to lowercase
        const normalizedToken = token.toLowerCase();
        // Stem the token
        const stemmedToken = require('porter-stemmer').stem(normalizedToken);
        return stemmedToken;
    });

    // Remove stop words
    const stopWords = new Set(["a", "an", "the", "and", "is", /* Add more stop words as needed */]);
    const filteredTokens = processedTokens.filter(token => !stopWords.has(token));

    // Count word frequency
    const frequency = {};
    filteredTokens.forEach(token => {
        if (!frequency[token]) {
            frequency[token] = 1;
        } else {
            frequency[token]++;
        }
    });

    // Sort keywords by frequency
    const sortedKeywords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);

    // Return top keywords (adjust as needed)
    const topKeywords = sortedKeywords.slice(0, 10);
    console.log("Top Keywords:", topKeywords);
}

// Summarize the hard-coded job post
summarizeJobPost(jobPost)
    .then(summarizedPost => {
        // Further processing using NLP techniques
        const jobData = furtherProcessing(summarizedPost);

        // Log the processed data
        console.log("Processed data:");
        console.log(jobData);

        // Accessing and logging each variable
        console.log("Job Title:", jobData["Job Title"]);
        console.log("Job Location:", jobData["Job Location"]);
        console.log("Expected Salary:", jobData["Expected Salary"]);
        console.log("Contact Phone Number:", jobData["Contact Phone Number"]);
        console.log("Interview Date:", jobData["Interview Date"]);
        console.log("Contact Email:", jobData["Contact Email"]);
        console.log("Job Description:", jobData["Job Description"]);

        // Perform keyword extraction
        performOperations(jobData);
    })
    .catch(error => {
        console.error('Error processing job post:', error);
    });

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
let jobData = {};

async function validateJobUrl(url) {
  try {
    // Check for invalid patterns in the URL
    if (url.includes("jobs-by-title/") || url.includes("jobs-by-field/") || url.includes("jobs-by-industry/")) {
      return { valid: false, expired: false, emailProvided: false }; // Directly mark as invalid if it matches the invalid pattern
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
        return { valid: false, expired: false, emailProvided: false }; // Mark as invalid if any keyword is missing
      }
      
      // Check if the job has expired
      if (pageText.includes("Oops! It seems this job has expired")) {
        return { valid: false, expired: true, emailProvided: false };
      }
      
      // Check for email address in the "Method of Application" section
      const applicationSection = $('h2#application-method').next().find('p').text().trim();
      const applicationEmailRegex = /CV to:\s*([^\s]+@[^\s]+)/i;
      const applicationEmailMatch = applicationSection.match(applicationEmailRegex);
      
      if (applicationEmailMatch) {
        console.log("Application Email:", applicationEmailMatch[1].trim());
        return { valid: true, expired: false, emailProvided: true };
      } else {
        console.log("Application not by email");
        return { valid: true, expired: false, emailProvided: false };
      }
    }
  } catch (error) {
    console.error("Error validating URL:", error);
    return { valid: false, expired: false, emailProvided: false };
  }
}

//////////////////////////////////////////////////////////////////
const fetchPageWithRetry = async (url, retries = 3) => {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': getRandomUserAgent() }
    });
    return response.data;
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
    return fetchPageWithRetry(url, retries - 1);
  }
};

// Function to get the salary range from the web page
async function fetchSalaryRangeFromUrl(url) {
  console.log(`Fetching salary range from URL: ${url}`);
  
  try {
    // Fetch the page content with retry and random user-agent
    const data = await fetchPageWithRetry(url);
    console.log('Page content fetched successfully.');

    // Load the page content into cheerio
    const $ = cheerio.load(data);

    // Extract text from the page
    const text = $('body').text();
    console.log('Page text extracted.');

    // Default salary range
    let salaryRange = '150k - 900k';
    
    // Split text into sentences
    const sentences = text.split('. ');
    console.log('Text split into sentences.');

    // Extract salary range from the text
    sentences.forEach(sentence => {
      if (sentence.toLowerCase().includes("salary range:") || sentence.toLowerCase().includes("pay:")) {
        const match = sentence.match(/(?:salary range:|pay:)\s*(.+)/i);
        if (match) {
          salaryRange = match[1].trim();
          console.log(`Salary range found: ${salaryRange}`);
        }
      }
    });

    console.log(`Final salary range: ${salaryRange}`);
    return salaryRange || '150k - 900k'; // Fallback to default if not found
  } catch (error) {
    console.error('Error fetching or parsing the page:', error);
    return '150k - 900k'; // Fallback to default on error
  }
}

  fetchJobUrlForUsers();

// //////////////////////////////////////////////////////////////////////////

async function fetchJobUrlForUsers() {
  console.log('Fetching job URLs from the roles_listing collection.');

  const { client } = await connectToDatabase();
  try {
    await client.connect();
    console.log('Database connected successfully.');

    const database = client.db('olukayode_sage');
    const rolesListing = database.collection('roles_listing');
    const validatedRoles = database.collection('validated_roles');

    // Fetch all job documents that have not been processed (status is null or doesn't exist)
    let jobs = await rolesListing.find({ status: { $exists: false } }).toArray();

    // Handle the case where no unprocessed jobs are found
    if (jobs.length === 0) {
      console.log('No unprocessed jobs found.');
      return null; // Return null explicitly
    }

    // Process each job document
    for (const job of jobs) {
      console.log(`Processing job document. Current job URL: ${job.link}`);

      if (job.link) {
        const jobUrl = job.link;
        console.log(`Job URL: ${jobUrl}`);

        const validation = await validateJobUrl(jobUrl);
        console.log(`Validation result for job URL:`, validation);

        if (validation.valid) {
          console.log(`Job URL ${jobUrl} is valid.`);

          // Fetch the 'title' value and log if it's set
          const title = job.title;
          console.log(`Job title fetched: ${title}`);

          // Fetch the salary range from the web page
          const salaryRange = await fetchSalaryRangeFromUrl(jobUrl);
          console.log(`Salary range fetched: ${salaryRange}`);

          // Create an object with detailed information for the validated role
          const validatedRoleDetails = {
            title: title, // Include the job title
            url: jobUrl,
            salaryRange: salaryRange, // Include the salary range
            accessedAt: new Date().toISOString() // Date and time in ISO format
          };

          // Log the validated role details
          console.log(`Validated Role Details:`, validatedRoleDetails);

          // Save the processed details to the validated_roles collection
          const result = await validatedRoles.insertOne(validatedRoleDetails);
          console.log(`Document inserted into validated_roles:`, result.insertedId);

          console.log(`Job URL processed and saved successfully.`);

          // Tag the processed document in roles_listing as validated and processed
          await rolesListing.updateOne(
            { _id: job._id },
            {
              $set: {
                status: 'validated',
                label: 'processed', // Change label from "new" to "processed"
                validated: true, // Set validated to true
              }
            }
          );
          console.log(`Processed job document tagged as validated and processed in roles_listing.`);
        } else {
          if (validation.expired) {
            console.log(`Job URL expired. Tagging as expired...`);
            await rolesListing.updateOne(
              { _id: job._id },
              { $set: { status: 'expired' } }
            );
          } else {
            console.log(`Job URL invalid. Tagging as invalid...`);
            await rolesListing.updateOne(
              { _id: job._id },
              { $set: { status: 'invalid' } }
            );
          }
          console.log(`Job document status updated in roles_listing.`);
        }
      } else {
        console.log(`No job URL found in the document.`);
      }
    }

    console.log('All valid job URLs processed.');
    return null; // Return null if no valid job URLs were found
  } catch (error) {
    console.error('Error fetching job URL:', error);
    throw error;
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}
//////////////////////////////////try
async function scrapeJobPage(url, callback) {
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
 
  // Extract the date posted
    const postedDate = $('#posted-date').text().replace('Posted:', '').trim();
    jobData["Date Posted"] = postedDate || 'Not provided';

    const deadlineRegex = /Deadline:([^<]+)/i;
    const deadlineMatch = jobData["Job Description"].match(deadlineRegex);
    jobData["Deadline"] = deadlineMatch ? deadlineMatch[1].trim() : 'Not specified';
    callback(null, jobData);
  } catch (error) {
    console.error("Error scraping job page:", error);
    callback(error, null);
  }
}
// ////////////////////////////////////////////////////////////////////////////////////////
const main2 = async () => {
  const { client } = await connectToDatabase(); // Connect to the database
  try {
    await client.connect();
    console.log('Database connected successfully.');

    const database = client.db('olukayode_sage');
    const validatedRoles = database.collection('validated_roles');
    const applicationProcessingFeeder = database.collection('application_processing_feeder');

    // Fetch all validated roles that have not been processed yet
    const jobs = await validatedRoles.find({ status: { $exists: false } }).toArray();

    if (jobs.length === 0) {
      console.log('No validated job URLs found.');
      return;
    }

    for (const job of jobs) {
      const jobUrl = job.url;
      console.log('Processing Job URL:', jobUrl);

      const validity = await validateJobUrl(jobUrl);

      if (validity.valid) {
        if (validity.emailProvided) {
          console.log("The page has a valid application email.");
        } else {
          console.log("The page does not provide an application email.");
        }

        // Scrape job page to extract detailed job data
        const jobData = await new Promise((resolve, reject) => {
          scrapeJobPage(jobUrl, (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

        console.log("Scraped Job Data:", jobData);

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
          postedDate: jobData["Date Posted"],
          deadline: jobData["Deadline"],
          processedAt: new Date().toISOString() // Add a timestamp for processing
        };

        console.log('Application Processing Details:', applicationProcessingDetails);

        // Insert into the application_processing_feeder collection
        try {
          const result = await applicationProcessingFeeder.insertOne(applicationProcessingDetails);
          console.log('Application processing data inserted into application_processing_feeder:', result.insertedId);
        } catch (insertError) {
          console.error('Error inserting application processing data:', insertError);
        }

        // Update the validated_roles collection to mark the job as processed
        await validatedRoles.updateOne(
          { _id: job._id },
          { $set: { status: 'processed' } }
        );
        console.log(`Job URL ${jobUrl} processed and marked as 'processed'.`);

        // Perform any additional operations needed with jobData
        performOperations(jobData);

      } else {
        console.log("The page is invalid or expired.");
      }
    }

    console.log('All validated job URLs processed.');

  } catch (error) {
    console.error('Error in main2 function:', error);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
};

// Start the process
main2();
///////////////////////////////////////////////////////////////////////////////////////////
function performOperations(jobData) {
  console.log("Accessing Application Email from performOperations function:", jobData["Application Email"]);

  const combinedText = `${jobData["Job Description"]} ${jobData["Key Responsibilities"]} ${jobData["Skills"]} ${jobData["Requirements"]}`;

  const tokens = tokenizer.tokenize(combinedText);

  const processedTokens = tokens.map(token => {
    const normalizedToken = token.toLowerCase();
    const stemmedToken = PorterStemmer.stem(normalizedToken);
    return stemmedToken;
  });

  const stopWords = new Set(["a", "an", "the", "and", "is", "of", "in", "to", "for", "with", "on", "as", "by", "at", "from", "this", "that", "or", "which", "be", "it", "are", "was", "were", "has", "have", "had", "will", "would", "can", "could", "should", "may", "might", "been", "being", "do", "does", "did", "doing", "than", "then", "there", "their", "if", "into", "but", "not", "all", "about", "some", "any", "such", "each", "many", "more", "most", "no", "nor", "too", "very", "either", "neither", "both", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]);
  const filteredTokens = processedTokens.filter(token => !stopWords.has(token));

  const frequency = {};
  filteredTokens.forEach(token => {
    if (!frequency[token]) {
      frequency[token] = 1;
    } else {
      frequency[token]++;
    }
  });

  const sortedKeywords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);

  const topKeywords = sortedKeywords.slice(0, 20);  // Increased to top 20 for more robustness
  console.log("Top Keywords:", topKeywords);
}
////////////////////////////////////extract keywords?///////////////////////
function extractKeywords(jobDescription) {
  // Tokenize the job description
  const tokens = tokenizer.tokenize(jobDescription);
  
  // Perform additional processing
  const processedTokens = tokens.map(token => {
      // Convert token to lowercase
      const normalizedToken = token.toLowerCase();
      // Stem the token
      const stemmedToken = PorterStemmer.stem(normalizedToken);
      return stemmedToken;
  });

  // Remove stop words
  const stopWords = new Set(["a", "an", "the", "and", "is", /* Add more stop words as needed */]);
  const filteredTokens = processedTokens.filter(token => !stopWords.has(token));

  // Count word frequency
  const frequency = {};
  filteredTokens.forEach(token => {
      if (!frequency[token]) {
          frequency[token] = 1;
      } else {
          frequency[token]++;
      }
  });

  // Sort keywords by frequency
  const sortedKeywords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
  
  // Return top keywords (adjust as needed)
  return sortedKeywords.slice(0, 10);
}

// Example usage
// const jobDescription = jobData;
// const jobDescription = jobData["Job Description"];
 const jobDescription = "We are looking for a software engineer with experience in Node.js and MongoDB";
const keywords = extractKeywords(jobDescription);
console.log(keywords);


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

// Function to get the first name of a user
async function getFirstName() {
  const { client, collection } = await connectToDatabase();
  
  try {
    const user = await collection.findOne();
    console.log("Fetched user:", user);  // Debugging: Log the fetched user

    if (user && user.name) {
      const firstName = user.name.split(' ')[0];
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
// // ///////////////////////////////////////////////////////////////////////////////////////////////
// // Function to fetch the job title from the database and mark the document as pblished
// // Function to fetch the job title from the database and mark the document as published
// async function getAccessedJobTitle() {
//   let client, database, collection;
//   try {
//     // Establish connection to the database
//     ({ client, database } = await connectToDatabase2());
//     console.log('Database connected successfully');

//     // Connect to the 'application_processing_feeder' collection
//     collection = database.collection('application_processing_feeder');

//     // Fetch a document from the collection that hasn't been published yet
//     const accessedRole = await collection.findOne({
//       url: { $ne: null }, // Check for documents where 'url' exists and is not null
//       published: { $ne: true }  // Ensure the document has not been published before
//     });

//     // If no valid unprocessed and unpublished document is found, return null
//     if (!accessedRole || !accessedRole.url || accessedRole.published) {
//       console.log('No unprocessed or unpublished document with a valid URL found in application_processing_feeder');
//       return null;
//     }

//     // Extract and clean the role and other details
//     const {
//       _id,
//       title,
//       url,
//       salaryRange,
//       jobLocation,
//       qualification,
//       experience,
//       jobField,
//       jobDescription,
//       keyResponsibilities,
//       skills,
//       requirements,
//       applicationEmail,
//       postedDate,
//       deadline
//     } = accessedRole;
    
//     const cleanedRole = cleanJobTitle(title); // Assuming cleanJobTitle is defined
//     console.log('Cleaned Role:', cleanedRole);
//     console.log('URL:', url);
//     console.log('Salary Range:', salaryRange || '150k - 900k'); // Default if not found
//     console.log('Job Location:', jobLocation ? jobLocation : 'Not provided');
//     console.log('Qualification:', qualification ? qualification : 'Not provided');
//     console.log('Experience:', experience ? experience : 'Not provided');
//     console.log('Job Field:', jobField ? jobField : 'Not provided');
//     console.log('Job Description:', jobDescription ? jobDescription : 'Not provided');
//     console.log('Key Responsibilities:', keyResponsibilities ? keyResponsibilities : 'Not provided');
//     console.log('Skills:', skills ? skills : 'Not provided');
//     console.log('Requirements:', requirements ? requirements : 'Not provided');
//     console.log('Application Email:', applicationEmail ? applicationEmail : 'Not provided');
//     console.log('Posted Date:', postedDate ? postedDate : 'Not provided');
//     console.log('Deadline:', deadline ? deadline : 'Not provided');

//     // After processing, mark the document as published by updating the 'published' field
//     await collection.updateOne(
//       { _id }, // Identify the document by its _id
//       // { $set: { published: true, publishedAt: new Date() } } // Mark as published and set a timestamp
//     );
//     console.log(`Document with _id: ${_id} was accessed`);

//     // Return the extracted and cleaned data
//     return {
//       _id,
//       role: cleanedRole,
//       url,
//       salaryRange: salaryRange || null, // Return `null` if not provided
//       jobLocation: jobLocation || null,
//       qualification: qualification || null,
//       experience: experience || null,
//       jobField: jobField || null,
//       jobDescription: jobDescription || null,
//       keyResponsibilities: keyResponsibilities || null,
//       skills: skills || null,
//       requirements: requirements || null,
//       applicationEmail: applicationEmail || null,
//       postedDate: postedDate || null,
//       deadline: deadline || null
//     };
//   } catch (error) {
//     console.error('Error fetching accessed role details:', error);
//     return null;
//   } finally {
//     if (client) {
//       await client.close();
//       console.log('Database connection closed');
//     }
//   }
// }
///////////////////////////////////////////////////////////////////////////////////
// Function to fetch the job title from the database and mark the document as published
// Function to fetch the job title from the database
// Function to fetch the job title from the database
async function getAccessedJobTitle() {
  let client, database, collection;
  try {
    // Establish connection to the database
    ({ client, database } = await connectToDatabase2());
    console.log('Database connected successfully');

    // Connect to the 'application_processing_feeder' collection
    collection = database.collection('application_processing_feeder');

    // Fetch a document from the collection that hasn't been published yet
    const accessedRole = await collection.findOne({
      url: { $ne: null }, // Check for documents where 'url' exists and is not null
      published: { $ne: true }  // Ensure the document has not been published before
    });

    // If no valid unprocessed and unpublished document is found, return null
    if (!accessedRole || !accessedRole.url || accessedRole.published) {
      console.log('No unprocessed or unpublished document with a valid URL found in application_processing_feeder');
      return null;
    }

    // Extract and clean the role and other details
    const cleanedRole = cleanJobTitle(accessedRole.title); // Assuming cleanJobTitle is defined

    // Return the extracted and cleaned data without marking it as published
    return {
      _id: accessedRole._id,
      role: cleanedRole,
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
      deadline: accessedRole.deadline || null
    };
  } catch (error) {
    console.error('Error fetching accessed role details:', error);
    return null;
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}


//////////////////////////////////working
async function getuserEmail() {
  let client, collection;
  try {
    ({ client, collection } = await connectToDatabase());
    console.log('Database connected successfully');

    // Fetch a user from the database, or use a different criterion if needed
    const user = await collection.findOne(); // Fetches any user document
    console.log('User fetched:', user);

    // Use a default value if name is not available
    return user?.email || 'application_suntrenia@gmail.com'; // Default to "Tomi" if name is not found
  } catch (error) {
    console.error('Error fetching user name:', error);
    return 'application.suntrenia@gmail.com'; // Default to "Tomi" if there is an error
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



async function promptuserbymail(callback){
  const recipientEmail =  await getuserEmail()
  // const recipientEmail = "akoredekayode@yahoo.com"; // You can replace this with your recipient email
  // // Set up the nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "testmyitproject@gmail.com", // Your email
      pass: "icuv lyjm lqaw qrdg", // Your email password or app-specific password
    },
  });
  
  // Helper function to generate HTML format of the message
  function generateHtmlMessage(textMessage) {
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

// Function to select a random subject line and inject the role title
function generateDynamicSubject(role) {
  const randomIndex = Math.floor(Math.random() * subjectTemplates.length);
  return subjectTemplates[randomIndex].replace("{Role}", role);
}



async function sendSelectedMessage() {
  try {
    // Pick a random message variant
    const randomIndex = Math.floor(Math.random() * messageVariants.length);
    const selectedMessage = await messageVariants[randomIndex]();

    // Fetch the specific job role data                                                       
    const accessedJobTitle = await getAccessedJobTitle();

    // Check if `accessedJobTitle` is null or undefined before destructuring
    if (!accessedJobTitle) {
      console.log('No valid accessed job title found. Cannot send the message.');
      return;
    }

    const { _id, role, url, processedAt } = accessedJobTitle;
    console.log("the is selectrole id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_id )

    // Ensure the accessed job title data exists before proceeding
    if (!_id || !role || !url) {
      console.log('Invalid accessed job title data found. Cannot send the message.');
      return;
    }

    // Generate a dynamic subject line using the role title
    const dynamicSubject = generateDynamicSubject(role);

    // Generate HTML version of the message
    const htmlMessage = generateHtmlMessage(selectedMessage);

    // Define mail options
    const mailOptions = {
      from: '"Suntrenia" <testmyitproject@gmail.com>', // sender address
      to: recipientEmail, // recipient email
      subject: dynamicSubject, // Dynamic subject line
      text: selectedMessage, // Plain text body (selected message)
      html: htmlMessage, // HTML body (formatted message)
    };

    console.log('Sending email to:', recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Connect to MongoDB
    await client.connect();
    const db = client.db('olukayode_sage'); // Replace with your database name
    const collection = db.collection('user_application_records'); // Replace with your collection name

    // Update the specific document using the _id
    const result = await collection.updateOne(
      { _id }, // Filter by the specific document's _id
      {
        $set: {
          role: role,
          subject: dynamicSubject,
          messageId: info.messageId,
          url: url,
          processedAt: processedAt,
          sentAt: new Date(), // timestamp of when the email was sent
        },
      },
      { upsert: true } // Insert a new document if none match the filter
    );

    console.log('Selected subject and job details saved to database:', result.upsertedId || 'Document updated');



    const collection3 = db.collection('application_processing_feeder');

    // Update the specific document using the _id
    const publish = await collection3.updateOne(
      { _id },
      {
        $set: {
          published: true,
          publishedAt: new Date(),
        },
      },
      { upsert: true }
    );

    if (publish.matchedCount > 0) {
      console.log('Document updated in application_processing_feeder');
    } else if (publish.upsertedId) {
      console.log('New document inserted in application_processing_feeder:', publish.upsertedId);
    } else {
      console.log('No changes made to the application_processing_feeder document');
    }

    // Close the MongoDB connection
    await client.close();


  } catch (error) {
    console.error('Error sending email:', error);
    if (client) await client.close();
  }
}
// Call the function to send the selected message
sendSelectedMessage();
}

  // IMAP configuration (Gmail example with rejectUnauthorized set to false)
  const config = {
    imap: {
      user: 'testmyitproject@gmail.com', // Your email address
      password: 'icuv lyjm lqaw qrdg', // Your email password or app password
      host: 'imap.gmail.com', // Gmail's IMAP server
      port: 993,
      tls: true,
      authTimeout: 3000,
      tlsOptions: { rejectUnauthorized: false } // Bypass self-signed certificate error
    },
  };
  
  // Function to check inbox for responses
  async function checkForResponses() {
    try {
      // Connect to IMAP server
      const connection = await imaps.connect(config);
      await connection.openBox('INBOX'); // Open the inbox
  
      // Search for unread emails in the inbox
      const searchCriteria = ['UNSEEN'];
      const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };
  
      // Fetch unseen messages
      const messages = await connection.search(searchCriteria, fetchOptions);
  
      if (messages.length === 0) {
        console.log('No new responses found.');
        return;
      }
  // Process each email response
  for (let message of messages) {
    const all = message.parts.find(part => part.which === 'TEXT');
    const id = message.attributes.uid;
    const rawMessage = all?.body; // Handle cases where 'all' might be undefined
  
    if (!rawMessage) {
      console.log('No message body found for this email.');
      continue; // Skip to the next email
    }
  
    // Parse the email content
    const parsedEmail = await simpleParser(rawMessage);
    const from = parsedEmail.from?.text || 'Unknown sender';
    const subject = parsedEmail.subject || 'No subject';
    const textBody = parsedEmail.text || 'No message body'; // Check if text exists
  
    console.log(`New response from: ${from}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message body:\n${textBody}`);
  
    // Response logic based on user's input
    if (lastProcessedMessageId === null || id > lastProcessedMessageId) {
      lastProcessedMessageId = id;
  
      let botReply;
  
      // Normalize text body for case-insensitive comparison
      let normalizedTextBody = textBody.toLowerCase();
  
      // Step 1: Remove HTML tags using a regex
      normalizedTextBody = normalizedTextBody.replace(/<\/?[^>]+(>|$)/g, "");
  
      // Step 2: Normalize white spaces (remove excessive spaces, tabs, newlines)
      normalizedTextBody = normalizedTextBody.replace(/\s+/g, ' ').trim();
  
      // Step 3: Look for the start of the quoted message, using common keywords
      const quotedMessageIndex = normalizedTextBody.search(/on .* wrote:/i);
    
      // If we find a quoted section (usually "on [date] at [time], [person] wrote:"), cut it off
      const userResponse = quotedMessageIndex !== -1 ? 
        normalizedTextBody.slice(0, quotedMessageIndex).trim() : 
        normalizedTextBody;
  
      if (
        userResponse.includes("proceed") || 
        userResponse.includes("okay") || 
        userResponse.includes("yes") || 
        userResponse.includes("ok") || 
        userResponse.includes("continue") || 
        userResponse.includes("thank you") || 
        userResponse.includes("sure") || 
        userResponse.includes("please do")
      ) {
  
            const responses = [
              "Thank you for considering our services. We're excited to move forward with your application. For more details about the job role and your application status, please visit the 'Manage Application' tab on your user dashboard.",
              "We appreciate your interest and are ready to proceed with your application. For further information about the job role and your application status, please check the 'Manage Application' tab on your user dashboard.",
              "Your decision to apply is noted. We'll handle your application with care. To learn more about the role and track your application status, please visit the 'Manage Application' tab on your user dashboard.",
              "Great choice! We're processing your application. For more details about the role and to check your application status, please go to the 'Manage Application' tab on your user dashboard.",
              "Thank you for your response. We’ll ensure everything is in place for your application. For additional information about the job role and to monitor your application status, please visit the 'Manage Application' tab on your user dashboard."
            ];
  
            botReply = responses[Math.floor(Math.random() * responses.length)];
  //////////////////////////////////since the user agrees, then generate the cv and send:
            // fetchDataAndProcess(); // This function fetches data and prepares the CV content
  
            // generateSecurityGatePass(updatedGatePassHTML, gatePassPdfPath)
            //     .then(pdfPath => {
            //         const pdfData = fs.readFileSync(pdfPath, { encoding: 'base64' });
            //         sendMessageToGroup(groupId, pdfData, gatePassUniqueFilename);
  
            //         if (recipientEmail) {
            //             sendEmailWithAttachment(pdfPath, recipientEmail);
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error generating PDF:', error);
            //     });
  
  
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
            async function fetchDataAndProcess() {
              const { client, collection } = await connectToDatabase();
            
              if (!collection) {
                  console.log('No collection found');
                  await client.close();
                  return;
              }
            
              try {
                  const data = await collection.find({}).toArray(); // Fetch all documents
                  console.log('Fetched data:', data);
            
                  // Process each document
                  const transformedCVs = data.map(doc => {
                      const name = `${doc.name}`;
                      const jobTitle = doc.jobTitle;
                      const dateOfBirth = doc.dateOfBirth;
                      const address = doc.address;
                      const phone_number = doc.phone_number;
                      const linkedin = doc.linkedin ? [cleanURL(doc.linkedin)] : [];
                      const email = doc.email;
                      const profileImage = cleanURL(doc.profileImage || 'https://via.placeholder.com/100'); // Default image
            
                      const skillsData = doc.skills.map(skill => ({ name: skill, barClass: '' }));
            
                      const educationData = doc.education.map(edu => ({
                          degree: edu.degree,
                          institution: edu.school,
                          period: `${edu.duration}`,
                          description: edu.description
                      }));
            
                      const experienceData = doc.workExperience.map(exp => ({
                          title: exp.title,
                          company: exp.company,
                          period: `${exp.duration}`,
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
                          profileImage, // Include profile image
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
            
                  console.log('Transformed CVs:', transformedCVs);
            
                  // Generate HTML for each CV
                  transformedCVs.forEach(cv => {
                      generateHTML(cv);
                  });
            
              } catch (error) {
                  console.error('Error fetching or processing data:', error);
              } finally {
                  await client.close();
              }
            }
            
            // Example usage:
            fetchDataAndProcess();
            
            
            // Function to generate a random gender
            function generateRandomGender() {
              const genders = ['Male', 'Female'];
              const randomIndex = Math.floor(Math.random() * genders.length);
              return genders[randomIndex];
            }
            /////////////////////////MAIL TO CV AND COVER LETTER TO RECRUITER////////////////////////////////////////////////////
            const recipientEmail= "akoredekayode2@gmail.com"
            // const recipientEmail= "abidemiakorede@gmail.com"
            function generateHTML(cv) {
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
            
                const determineCVFormat = (subscription) => {
                  let cvTemplate;
                  if (subscription === 'Premium') {
                   cvTemplate = premium_CV;
                  } else if (subscription === 'Standard') {
                    cvTemplate = standard_CV;
                  } else if (subscription === 'Basic') {
                    cvTemplate = basic_CV;
                  } else {
                    throw new Error('Invalid subscription type');
                  }
                  
                  return cvTemplate;
                };
                
                
                const userSubscription = 'Premium'; // This should be dynamically determined based on your logic
                const updatedGatePassHTML = determineCVFormat(userSubscription);
                
                const generateSecurityGatePass = async (content, filename) => {
                  const options = { format: 'A4', printBackground: true }; 
                  try {
                    // Convert HTML content to PDF2
                    const pdfBuffer = await html_to_pdf.generatePdf({ content }, options);
                    if (!fs.existsSync(gatePassDownloadsFolderPath)) {
                      fs.mkdirSync(gatePassDownloadsFolderPath, { recursive: true });
                    }
                    fs.writeFileSync(filename, pdfBuffer);
                    console.log(`PDF saved successfully to: ${filename}`);
                    return filename;
                  } catch (error) {
                    console.error('Error generating PDF:', error);
                    throw error;
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
                console.error('Error generating PDF:', error);
              });
            // Function to send PDF via WhatsApp
            
            
            
            const sendMessageToGroup = async (groupId, pdfData, pdfFilename) => {
              try {
                const pdfResponse = await axios.post(
                  'https://gate.whapi.cloud/messages/document',
                  {
                    to: groupId,
                    media: `data:application/pdf;base64,${pdfData}`,
                    filename: pdfFilename
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      //Authorization: `Bearer ${process.env.TOKEN7}`,
                      // Authorization: `Bearer ${process.env.TOKEN2}`,
                     // Authorization: `Bearer ${process.env.TOKEN}`,
                      //Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
                      // Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
                    },
                  }
                );
                console.log('PDF file sent successfully via WhatsApp:', pdfResponse.data);
              } catch (error) {
                console.error('Error sending message and PDF via WhatsApp:', error.message);
                throw error;
              }
            };

            ///////////////////////////////Job application email to the recruiter
            const email_cover_letter = [
              "Dear Hiring Manager,\n\nI hope this message finds you well. I'm excited to express my interest in the [Role Title] position at [Company]. I believe my skills and experience align well with the qualifications required for this role, and I’m confident I could contribute effectively to your team. Please find my resume attached for your consideration. I look forward to the possibility of discussing how I can bring value to your organization.\n\nBest regards,\n[Your Name]",
            
              "Dear Hiring Manager],\n\nI am writing to apply for the [Role Title] position, which I believe matches my expertise and professional background. Attached is my resume for your review. I am confident that my skills and experience position me as a strong candidate for this role. I would welcome the opportunity to further discuss how I can contribute to your team.\n\nKind regards,\n[Your Name]",
            
              "Dear Hiring Manager,\n\nI hope this message reaches you in good spirits. I am very interested in the [Role Title] position at [Company], and I am confident that my experience and skills make me a suitable candidate. Please find my resume attached for your review. I would be honored to contribute to your team and help achieve your company's goals.\n\nWarm regards,\n[Your Name]",
            
              "Dear Hiring Manager,\n\nPlease find my resume attached in response to the [Role Title] opening. I am confident that my qualifications and experience match the role’s requirements. I am eager to bring my strengths to your team and contribute to [Company]'s continued success. I look forward to the opportunity to discuss this further.\n\nSincerely,\n[Your Name]",
            
              "Dear Hiring Manager,\n\nI am excited to submit my application for the [Role Title] position at [Company]. My resume is attached for your review. I am confident that my experience and qualifications align well with the role’s requirements. I would love to discuss how I can contribute to your team and help drive [Company] forward.\n\nThank you for considering my application.\n\nBest regards,\n[Your Name]"
            ];

               
                      // async function getAccessedJobTitle() {
                      //   let client, database, collection;
                      //   try {
                      //     // Establish connection to the database
                      //     ({ client, database } = await connectToDatabase2());
                      //     console.log('Database connected successfully');

                      //     // Connect to the 'application_processing_feeder' collection
                      //     collection = database.collection('application_processing_feeder');

                      //     // Fetch a document from the collection that hasn't been processed or published yet
                      //     const accessedRole = await collection.findOne({
                      //       url: { $ne: null }, // Check for documents where 'url' exists and is not null
                      //       // processed: { $ne: true }, // Ensure the document has not been processed yet
                      //       published: { $ne: true }  // Ensure the document has not been published before
                      //     });

                      //     // If no valid unprocessed and unpublished document is found, return null
                      //     if (!accessedRole || !accessedRole.url || accessedRole.published) {
                      //       console.log('No unprocessed or unpublished document with a valid URL found in application_processing_feeder');
                      //       return null;
                      //     }

                      //     // Extract and clean the role and other details
                      //     const {
                      //       _id,
                      //       title,
                      //       url,
                      //       salaryRange,
                      //       jobLocation,
                      //       qualification,
                      //       experience,
                      //       jobField,
                      //       jobDescription,
                      //       keyResponsibilities,
                      //       skills,
                      //       requirements,
                      //       applicationEmail,
                      //       postedDate,
                      //       deadline
                      //     } = accessedRole;
                          
                      //     const cleanedRole = cleanJobTitle(title); // Assuming cleanJobTitle is defined
                      //     console.log('Cleaned Role:', cleanedRole);
                      //     console.log('URL:', url);
                      //     console.log('Salary Range:', salaryRange || '150k - 900k'); // Default if not found
                      //     console.log('Job Location:', jobLocation ? jobLocation : 'Not provided');
                      //     console.log('Qualification:', qualification ? qualification : 'Not provided');
                      //     console.log('Experience:', experience ? experience : 'Not provided');
                      //     console.log('Job Field:', jobField ? jobField : 'Not provided');
                      //     console.log('Job Description:', jobDescription ? jobDescription : 'Not provided');
                      //     console.log('Key Responsibilities:', keyResponsibilities ? keyResponsibilities : 'Not provided');
                      //     console.log('Skills:', skills ? skills : 'Not provided');
                      //     console.log('Requirements:', requirements ? requirements : 'Not provided');
                      //     console.log('Application Email:', applicationEmail ? applicationEmail : 'Not provided');
                      //     console.log('Posted Date:', postedDate ? postedDate : 'Not provided');
                      //     console.log('Deadline:', deadline ? deadline : 'Not provided');

                      //     // After processing, mark the document as published by updating the 'published' field
                      //     await collection.updateOne(
                      //       { _id }, // Identify the document by its _id
                      //       { $set: { published: true, publishedAt: new Date() } } // Mark as published and set a timestamp
                      //     );
                      //     console.log(`Document with _id: ${_id} marked as published`);
                      //     console.log("the is Accessedjobtitleid>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",_id )
                      //     // Return the extracted and cleaned data
                      //     return {
                      //       _id,
                      //       role: cleanedRole,
                      //       url,
                      //       salaryRange: salaryRange || null, // Return `null` if not provided
                      //       jobLocation: jobLocation || null,
                      //       qualification: qualification || null,
                      //       experience: experience || null,
                      //       jobField: jobField || null,
                      //       jobDescription: jobDescription || null,
                      //       keyResponsibilities: keyResponsibilities || null,
                      //       skills: skills || null,
                      //       requirements: requirements || null,
                      //       applicationEmail: applicationEmail || null,
                      //       postedDate: postedDate || null,
                      //       deadline: deadline || null
                      //     };
                      //   } catch (error) {
                      //     console.error('Error fetching accessed role details:', error);
                      //     return null;
                      //   } finally {
                      //     if (client) {
                      //       await client.close();
                      //       console.log('Database connection closed');
                      //     }
                      //   }
                      // }
////////////////////////////////////////////////////////////////////////////////////
async function getAccessedJobTitle() {
  let client, database, collection;
  try {
    // Establish connection to the database
    ({ client, database } = await connectToDatabase2());
    console.log('Database connected successfully');

    // Connect to the 'application_processing_feeder' collection
    collection = database.collection('application_processing_feeder');

    // Fetch a document from the collection that hasn't been published yet
    const accessedRole = await collection.findOne({
      url: { $ne: null }, // Check for documents where 'url' exists and is not null
      published: { $ne: true }  // Ensure the document has not been published before
    });

    // If no valid unprocessed and unpublished document is found, return null
    if (!accessedRole || !accessedRole.url || accessedRole.published) {
      console.log('No unprocessed or unpublished document with a valid URL found in application_processing_feeder');
      return null;
    }

    // Extract and clean the role and other details
    const cleanedRole = cleanJobTitle(accessedRole.title); // Assuming cleanJobTitle is defined

    // Return the extracted and cleaned data without marking it as published
    return {
      _id: accessedRole._id,
      role: cleanedRole,
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
      deadline: accessedRole.deadline || null
    };
  } catch (error) {
    console.error('Error fetching accessed role details:', error);
    return null;
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

//////////////////////////////////////////working
// const sendEmailWithAttachment = async (pdfPath, email) => {
//   try {
//     await client.connect();
//     // Fetch the job details (including role title) from the database
//     const accessedJob = await getAccessedJobTitle();

//     if (!accessedJob || !accessedJob.role) {
//       console.error('No valid role title found, aborting email sending.');
//       return; // Exit if there's no valid role title
//     }

//     // Check if the role has already been processed
//     const database = client.db('olukayode_sage');
//     const applicationProcessingFeeder = database.collection('application_processing_feeder');
//     const roleId = accessedJob._id;

//     const existingRole = await applicationProcessingFeeder.findOne({ _id: roleId });
    
//     if (existingRole && existingRole.role_processed) {
//       console.log('Role has already been processed, skipping email sending.');
//       return; // Exit if the role has already been processed
//     }

//     // Extract and clean the role and other details from accessedJob
//     const {
//       _id,
//       role: roleTitle, // Use the `role` property from accessedJob
//       url,
//       salaryRange,
//       jobLocation,
//       qualification,
//       experience,
//       jobField,
//       jobDescription,
//       keyResponsibilities,
//       skills,
//       requirements,
//       applicationEmail,
//       postedDate,
//       deadline
//     } = accessedJob;

//     // Select a random cover letter variant
//     const randomIndex = Math.floor(Math.random() * email_cover_letter.length);
//     const selectedMessage = email_cover_letter[randomIndex];

//     // Send email with the selected cover letter as the text
//     const info = await transporter.sendMail({
//       from: '"Olukayode" <testmyitproject@gmail.com>',
//       to: email, // Use the actual recipient's email
//       subject: `Application for the Role of ${roleTitle}`, // Use role title in the subject
//       text: selectedMessage, // Use the randomly selected cover letter
//       attachments: [
//         {
//           filename: path.basename(pdfPath),
//           path: pdfPath,
//         },
//       ],
//     });

//     console.log("Email sent with attachment: %s", info.messageId);
//     // Mark role as processed in the database
//     try {
//       await client.connect();
//       const database = client.db('olukayode_sage');
//       const applicationProcessingFeeder = database.collection('application_processing_feeder');

//       // Update the role in the `application_processing_feeder` collection
//       await applicationProcessingFeeder.updateOne(
//         { _id: roleId }, // Query for the specific role by `_id`
//         {
//           $set: {
//             role_processed: true,
//             status: 'Treated',
//             application: 'Approved',
//             // published: true,
//             processedAt: new Date(),
//           },
//         }
//       );
//       console.log("Role marked as treated.");
//       console.log("End email with attachment, role ID:", _id);
//     } catch (error) {
//       console.error('Error marking role as treated:', error);
//     } finally {
//       await client.close(); // Ensure the client is closed after operations
//     }

//   } catch (error) {
//     console.error('Error sending email with attachment:', error);
//     throw error; // Re-throw error if necessary
//   }
// };
const sendEmailWithAttachment = async (pdfPath, email) => {
  try {
    await client.connect();
    // Fetch the job details (including role title) from the database
    const accessedJob = await getAccessedJobTitle();

    if (!accessedJob || !accessedJob.role) {
      console.error('No valid role title found, aborting email sending.');
      return; // Exit if there's no valid role title
    }

    // Check if the role has already been processed
    const database = client.db('olukayode_sage');
    const applicationProcessingFeeder = database.collection('application_processing_feeder');
    const roleId = accessedJob._id;

    const existingRole = await applicationProcessingFeeder.findOne({ _id: roleId });
    
    if (existingRole && existingRole.role_processed) {
      console.log('Role has already been processed, skipping email sending.');
      return; // Exit if the role has already been processed
    }
    
    // Extract details from accessedJob
    const {
      _id,
      role: roleTitle,
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
      applicationEmail,
      postedDate,
      deadline
    } = accessedJob;

    // Select a random cover letter variant
    const randomIndex = Math.floor(Math.random() * email_cover_letter.length);
    const selectedMessage = email_cover_letter[randomIndex];

    // Send email with the selected cover letter as the text
    const info = await transporter.sendMail({
      from: '"Olukayode" <testmyitproject@gmail.com>',
      to: email, // Use the actual recipient's email
      subject: `Application for the Role of ${roleTitle}`, // Use role title in the subject
      text: selectedMessage, // Use the randomly selected cover letter
      attachments: [
        {
          filename: path.basename(pdfPath),
          path: pdfPath,
        },
      ],
    });

    console.log("Email sent with attachment: %s", info.messageId);

    // Mark role as processed and published in the database after the email is sent
    try {
      await applicationProcessingFeeder.updateOne(
        { _id: roleId }, // Query for the specific role by `_id`
        {
          $set: {
            role_processed: true,
            status: 'Treated',
            application: 'Approved',
            published: true, // Mark the role as published
            publishedAt: new Date(), // Set the publication timestamp
            processedAt: new Date(),
          },
        }
      );
      console.log("Role marked as treated and published.");
    } catch (error) {
      console.error('Error marking role as treated and published:', error);
    } finally {
      await client.close(); // Ensure the client is closed after operations
    }

  } catch (error) {
    console.error('Error sending email with attachment:', error);
    throw error; // Re-throw error if necessary
  }
};

}                
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          } else if (normalizedTextBody.includes("not interested") || normalizedTextBody.includes("not apply")) {
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

/////////////////////////mark the data as treated
              // Mark role as processed in the database
              try {
                await client.connect();
                const database = client.db('olukayode_sage');
                const applicationProcessingFeeder = database.collection('application_processing_feeder');
                const accessedJob = await getAccessedJobTitle();
                const roleId = accessedJob._id; // Ensure you have the role's `_id`

                // Update the role in the `application_processing_feeder` collection
                await applicationProcessingFeeder.updateOne(
                  { _id: roleId }, // Query for the specific role by `_id`
                  {
                    $set: {
                      role_processed: true,
                      status: 'Treated',
                      // published:true,
                      application: 'Declined',
                      processedAt: new Date(),
                    },
                  }
                );
                console.log("Role marked as treated.");
              } catch (error) {
                console.error('Error marking role as processed:', error);
              } finally {
                await client.close(); // Ensure the client is closed in all cases
              }
          } else {
            botReply = "I'm sorry, I couldn't understand your response. Could you please confirm if you'd like to proceed with the application?";
          }
  
          // Send the appropriate bot reply to the user
          await sendReplyToRecipient(from, botReply);
        }
      }
  
      // Close the connection
      connection.end();
  
    } catch (error) {
      console.error('Error fetching email responses:', error);
    }
  }
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "testmyitproject@gmail.com", // Your email
      pass: "icuv lyjm lqaw qrdg", // Your email password or app-specific password
    },
  });
  
  function generateHtmlMessage(textMessage) {
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
  
async function sendReplyToRecipient(recipientEmail, botReply) {
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
      from: '"Suntrenia" <testmyitproject@gmail.com>', // sender address
      to: "akoredekayode@yahoo.com",
      // to: recipientEmail,
      subject: `Re: ${subject}`, // Concatenate "Re: " with the fetched subject
      text: botReply, // Plain text body (bot reply)
      html: generateHtmlMessage(botReply), // HTML body (formatted bot reply)
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
setInterval(checkForResponses, 60 * 1000); // 60 * 1000 ms = 1 minute
///////////////////////////////////////////////////////////////
  // async function sendReplyToRecipient(recipientEmail, botReply) {
  //   try {
  //     // Define mail options
  //     const mailOptions = {
  //       from: '"Suntrenia" <testmyitproject@gmail.com>', // sender address
  //       to: "akoredekayode@yahoo.com",
  //       subject:'Re:Follow-Up on Your Job Opportunity', // Subject line
  //       text: botReply, // Plain text body (bot reply)
  //       html: generateHtmlMessage(botReply), // HTML body (formatted bot reply)
  //     };
  
  //     // Send email
  //     const info = await transporter.sendMail(mailOptions);
  //     console.log('Reply sent: %s', info.messageId);
  
  //   } catch (error) {
  //     console.error('Error sending reply:', error);
  //   }
  // }
  
  // // Periodically check for responses (every minute)
  // setInterval(checkForResponses, 60 * 1000); // 60 * 1000 ms = 1 minute
  ///////////////////////////////////////////////////////////////////////////////////////
 
  

const messageVariants = [
  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    console.log("First Name=",firstName,"role=",role,"Salary Range=",salaryRange,"name",name, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
      
    if (!firstName || !role) {
      return 'Error fetching user information';
    }

    // No need to clean the role again, it's already cleaned in getAccessedJobTitle
    const article = /^[aeiou]/i.test(role) ? 'an' : 'a';

    return `Hello ${firstName},\n\nI'm ${name} from Suntrenia. 😊 We have an exciting job opportunity that fits your expertise perfectly! 🌟\n\nIt’s ${article} ${role} role , with a competitive salary range of ${salaryRange}. 🚀\n\nInterested in proceeding with your application? Reply with "YES", "OKAY", "PROCEED", or "NOT INTERESTED", or click any button below. We'll handle the rest! 💼\n\nBest regards,\n${name}`;

    },

    async () => {
      const firstName = await getFirstName();
      const accessedJobTitle = await getAccessedJobTitle();
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
    // const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
const article = /^[aeiou]/i.test(role) ? 'an' : 'a';
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. 😊 We've spotted an exciting opportunity that could be perfect for you! 🌟\n\nThere's ${article} ${role} role with a competitive salary range of ${salaryRange} at a top company. 🚀\n\nYour skills match perfectly! Ready to take the next step? Just reply with "YES", "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll handle the rest. 💼\n\nBest,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. 🎉 There's a fantastic opportunity for ${article} ${role}role at a reputable company, offering a competitive salary of ${salaryRange}. 🚀\n\nYour expertise fits perfectly! Shall we proceed with the application? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll take care of everything. 💼\n\nBest,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. 😊 Hope you're having a great day! We found an incredible opportunity for you! 🌟\n\nA top company is looking for ${article} ${role}, offering a competitive salary range of ${salaryRange}. 🚀\n\nYou're the perfect fit! Shall we proceed with the application? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below and we'll handle the rest! 💼\n\nBest,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. 😊 We've found a job opportunity that could be perfect for you! 🌟\n\nA reputable company is hiring ${article} ${role} with a salary range of ${salaryRange}. 🚀\n\nYour skills make you a great fit! Shall we proceed with the application? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll take care of everything. 💼\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. 😊 We've come across an exciting job opportunity that we believe is perfect for you! 🌟\n\nIt's for ${article} ${role} role at a top company, with a competitive salary range of ${salaryRange}. 🚀\n\nYour qualifications are a great match! Shall we move forward with the application? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll take care of the rest. 💼\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hey ${firstName},\n\nThis is ${name} from Suntrenia. 😊 There's a job opening that could be just what you're looking for! 🌟\n\nA reputable company is looking for ${article} ${role}, offering a salary range of ${salaryRange}. 🚀\n\nYour experience makes you a perfect fit! Shall we apply on your behalf? Reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll take care of everything. 💼\n\nBest,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. 😊 I hope you're doing well! We've discovered a great opportunity that aligns with your skills. 🌟\n\nThe position is for ${article} ${role}, and the salary range is ${salaryRange}. 🚀\n\nYour qualifications are a perfect match. Shall we apply on your behalf? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below and we'll handle the rest! 💼\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hi ${firstName},\n\nThis is ${name} from Suntrenia. 😊 We have an exciting job opportunity that we think you'd be perfect for! 🌟\n\nThe role is ${article} ${role} with a salary range of ${salaryRange}. 🚀\n\nWe believe your skills and experience make you a great fit. Are you interested in applying? Reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below, and we'll handle the application process. 💼\n\nBest regards,\n${name}`;
  },

  async () => {
    const firstName = await getFirstName();
    const accessedJobTitle = await getAccessedJobTitle();
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
    return `Hello ${firstName},\n\nThis is ${name} from Suntrenia. 😊 We hope you're having a wonderful day! We've found ${article} ${role} role that matches your profile perfectly. 🌟\n\nThe role offers a salary range of ${salaryRange}. 🚀\n\nYour qualifications are a great match for this opportunity. Would you like us to proceed with the application? Just reply with "YES",  "OKAY", "PROCEED", or "NOT INTERESTED", or click a button below and we'll take care of it for you. 💼\n\nBest regards,\n${name}`;
  }
];
// /////////////working/////////////////////////////////////////////////////////////////////
// Initialize a counter for fallback to email
let fallBackEmailCounter = 0;

// Function triggered by specific fallback counter value (1 in this case)
function responseTriggeredByFallbackOne() {
  // console.log("This response is triggered by falling back error 1 onlymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  // Add any other logic you want to execute when fallBackEmailCounter is 1
  promptuserbymail();
}

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
        body: message,
        typing_time: 0,
        thread_id: threadId, // Include the thread ID in the message
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
            // Authorization: `Bearer ${process.env.TOKEN7}`, // Use the appropriate token
              //Authorization: `Bearer ${process.env.TOKEN}`, // Use the appropriate token
           //Authorization: `Bearer ${process.env.TOKEN2}`, // Use the appropriate token
        //'Authorization': 'Bearer S36GOqY9anD6SGA7KPynscPVxdju24fN',
          // Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
        },
      }
    );

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.message);

    // Increment the fallback email counter each time an error occurs
    fallBackEmailCounter += 1;

    // Log the fallback message with the counter
    console.log(`Falling back to email... ${fallBackEmailCounter}`);

    // Trigger the specific function when the counter hits 1
    if (fallBackEmailCounter === 1) {
      responseTriggeredByFallbackOne();
    }

    // send message via email if WhatsApp fails for any reason
    const recipientEmail = "akoredekayode@yahoo.com"; // You can replace this with your recipient email
    // Call promptuserbymail only if WhatsApp fails
    // promptuserbymail();
  }
};

async function sendMessage(userId, subscriber) {
  const randomVariantFunction = selectRandomMessageVariant();
  const message = await randomVariantFunction(userId);
  const threadId = generateThreadId();
  await sendMessageToSubscriber(subscriber, message, threadId);
}

// Call the function with a user ID and subscriber phone number
sendMessage('287c5d1af24af77785f5348f', '2349010400099');
// Function to select a random message variant
function selectRandomMessage() {
  const index = crypto.randomInt(0, messageVariants.length);
  return messageVariants[index];
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
const getUserResponseFromWhatsApp = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://gate.whapi.cloud/messages/list/?count=100',
      headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${process.env.TOKEN}`,
        //Authorization: `Bearer ${process.env.TOKEN2}`,
        //Authorization: `Bearer ${process.env.TOKEN7}`,
      //  Authorization: `Bearer ${process.env.WHAPI_TOKEN2}`,
       // Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
        // Authorization: `Bearer ${token}`,
        // 'Authorization': 'Bearer S36GOqY9anD6SGA7KPynscPVxdju24fN',
        // Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
      }
    };
   
    const response = await axios.request(options);
    const allMessages = response.data.messages;
    
    // Define the sender number to filter
    const senderNumber = '2349010400099'; // Sample sender number

    // Calculate the timestamp for 3 minutes ago
    const threeMinutesAgo = Math.floor(Date.now() / 1000) - 180; // 180 seconds = 3 minutes

    // Filter messages based on the sender number and timestamp
    const filteredMessages = allMessages.filter(message => {
      // Check if the message is sent from the specified sender number
      const sentFromSender = message.from === senderNumber;
      // Check if the message timestamp is within the last 3 minutes
      const sentWithinLastThreeMinutes = message.timestamp >= threeMinutesAgo;
      // Return true only if both conditions are met
      return sentFromSender && sentWithinLastThreeMinutes;
    });

    // console.log("Filtered Messages:", filteredMessages);
    return filteredMessages;
   
  } catch (error) {
    console.error('Error retrieving user response:', error.message);
    return [];
  }
};

///////////////working//////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Define recipient's email address
const recipientEmail = "akoredekayode@yahoo.com";
// const recipientEmail = "abidemiakorede@gmail.com";
const email = "akoredekayode@yahoo.com";
const transporter = nodemailer.createTransport({
  host:  "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "testmyitproject@gmail.com",
    pass: "icuv lyjm lqaw qrdg",
  },
});
const gatePassDownloadsFolderPath = path.join(__dirname, '..', 'downloads');
const gatePassUniqueFilename =  `TailoredResume_${formattedDateToday}_UserName_Job_Title.pdf`;
const gatePassPdfPath = path.join(gatePassDownloadsFolderPath, gatePassUniqueFilename);
app.use(express.json());
////////////////////////////////////////////////////////////////////

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
async function fetchDataAndProcess() {
  const { client, collection } = await connectToDatabase();

  if (!collection) {
      console.log('No collection found');
      await client.close();
      return;
  }

  try {
      const data = await collection.find({}).toArray(); // Fetch all documents
      console.log('Fetched data:', data);

      // Process each document
      const transformedCVs = data.map(doc => {
          const name = `${doc.name}`;
          const jobTitle = doc.jobTitle;
          const dateOfBirth = doc.dateOfBirth;
          const address = doc.address;
          const phone_number = doc.phone_number;
          const linkedin = doc.linkedin ? [cleanURL(doc.linkedin)] : [];
          const email = doc.email;
          const profileImage = cleanURL(doc.profileImage || 'https://via.placeholder.com/100'); // Default image

          const skillsData = doc.skills.map(skill => ({ name: skill, barClass: '' }));

          const educationData = doc.education.map(edu => ({
              degree: edu.degree,
              institution: edu.school,
              period: `${edu.duration}`,
              description: edu.description
          }));

          const experienceData = doc.workExperience.map(exp => ({
              title: exp.title,
              company: exp.company,
              period: `${exp.duration}`,
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
              profileImage, // Include profile image
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

      console.log('Transformed CVs:', transformedCVs);

      // Generate HTML for each CV
      transformedCVs.forEach(cv => {
          generateHTML(cv);
      });

  } catch (error) {
      console.error('Error fetching or processing data:', error);
  } finally {
      await client.close();
  }
}

// Example usage:
fetchDataAndProcess();


// Function to generate a random gender
function generateRandomGender() {
  const genders = ['Male', 'Female'];
  const randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
}
/////////////////////////////////////////////////////////////////////////////

function generateHTML(cv) {
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

    const determineCVFormat = (subscription) => {
      let cvTemplate;
      if (subscription === 'Premium') {
       cvTemplate = premium_CV;
      } else if (subscription === 'Standard') {
        cvTemplate = standard_CV;
      } else if (subscription === 'Basic') {
        cvTemplate = basic_CV;
      } else {
        throw new Error('Invalid subscription type');
      }
      
      return cvTemplate;
    };
    
    
    const userSubscription = 'Premium'; // This should be dynamically determined based on your logic
    const updatedGatePassHTML = determineCVFormat(userSubscription);
    
    const generateSecurityGatePass = async (content, filename) => {
      const options = { format: 'A4', printBackground: true }; 
      try {
        // Convert HTML content to PDF2
        const pdfBuffer = await html_to_pdf.generatePdf({ content }, options);
        if (!fs.existsSync(gatePassDownloadsFolderPath)) {
          fs.mkdirSync(gatePassDownloadsFolderPath, { recursive: true });
        }
        fs.writeFileSync(filename, pdfBuffer);
        console.log(`PDF saved successfully to: ${filename}`);
        return filename;
      } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
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
    console.error('Error generating PDF:', error);
  });
// Function to send PDF via WhatsApp



const sendMessageToGroup = async (groupId, pdfData, pdfFilename) => {
  try {
    const pdfResponse = await axios.post(
      'https://gate.whapi.cloud/messages/document',
      {
        to: groupId,
        media: `data:application/pdf;base64,${pdfData}`,
        filename: pdfFilename
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        //Authorization: `Bearer ${process.env.TOKEN7}`,
         // Authorization: `Bearer ${process.env.TOKEN2}`,
         // Authorization: `Bearer ${process.env.TOKEN}`,
           //  Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
          // Authorization: `Bearer ${process.env.WHAPI_TOKEN3}`,
        },
      }
    );
    console.log('PDF file sent successfully via WhatsApp:', pdfResponse.data);
  } catch (error) {
    console.error('Error sending message and PDF via WhatsApp:', error.message);
    throw error;
  }
};

// Function to send CV PDF via Email TO THE RECRUITER
const sendEmailWithAttachment = async (pdfPath, email) => {
  try {
    const info = await transporter.sendMail({
      from: '"Olukayode" <testmyitproject@gmail.com',
      to: email,
      subject: "Your Tailored Resume",
      text: "Please find attached your tailored resume.",
      attachments: [
        {
          filename: path.basename(pdfPath),
          path: pdfPath
        }
      ]
    });
    console.log("Email sent with attachment: %s", info.messageId);
  } catch (error) {
    console.error('Error sending email with attachment:', error);
    throw error;
  }
};

}
            } else if (
              userText.includes("not interested") || 
              userText.includes("not apply") ||
              userText.includes("no please") ||
              userText.includes("no") 
            ) {
              const randomResponseIndex = Math.floor(Math.random() * 7); // Generate a random number between 0 and 6
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
            } else {
              botReply = "I'm sorry, I couldn't understand your response. Could you please confirm if you'd like to proceed with the application?";
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

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Route to upload profile image and store session ID
app.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const kaydata = database.collection('Users_CV_biodata');

    const customId = crypto.randomBytes(12).toString('hex'); // Generate unique ID
    const profileImageCode = customId + "_" + req.file.location;

    const result = await kaydata.insertOne({
      _id: customId,
      profileImage: profileImageCode,
      'Profile Image': profileImageCode,
      sessionId: req.session.id // Save session ID in the document
    });

    console.log('Inserted document customId:', customId);
    console.log('Inserted document ID:', result.insertedId);

    // Store customId in session
    req.session.customId = customId;

    res.json({
      success: true,
      imageUrl: req.file.location,
      customId: customId
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false });
  } finally {
    await client.close();
  }
});

// Route to submit CV and update data based on session ID
app.post('/submit-cv', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata');

    const userData = req.body;
    const { name, jobTitle, dateOfBirth, address, email, phone_number, skills, workExperience, education, subscription, summary, projects, certifications, professionalBodies, languages } = userData;

    const customId = req.session.customId; // Retrieve customId from session

    if (!customId) {
      return res.status(400).send('Custom ID is required');
    }

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
      languages
    };

    const result = await collection.updateOne(
      { _id: customId }, // Use customId to update
      { $set: userDocument },
      { upsert: true }
    );

    if (result.matchedCount > 0) {
      res.status(200).send('CV updated successfully');
    } else if (result.upsertedCount > 0) {
      res.status(200).send('CV submitted successfully');
    } else {
      res.status(400).send('Failed to update or insert CV');
    }

  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error submitting CV');
  } finally {
    await client.close();
  }
});

// Route to fetch CV data
app.get('/fetch-cv-data', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata');

    // Fetch data based on session ID
    const data = await collection.find({ sessionId: req.session.id }).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching CV data:', error);
    res.status(500).send('Error fetching CV data');
  } finally {
    await client.close();
  }
});

// Route to update job preferences based on session ID
app.post('/update-job-preferences', upload.none(), async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db('olukayode_sage');
    const collection = database.collection('Users_CV_biodata');

    const { jobPreferences } = req.body;

    if (!jobPreferences || Object.keys(jobPreferences).length === 0) {
      return res.status(400).json({ message: 'Invalid job preferences data' });
    }

    const result = await collection.updateOne(
      { sessionId: req.session.id }, // Update based on session ID
      { $set: JSON.parse(jobPreferences) },
      { upsert: true }
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res.status(404).json({ message: 'User not found and no new document created' });
    }

    res.status(200).json({ message: 'Job preferences updated successfully', success: true });
  } catch (error) {
    console.error('Error updating job preferences:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  } finally {
    await client.close();
  }

 })

const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

//////////////////////////////////////////////////////





















