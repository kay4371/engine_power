require('dotenv').config();
const nodemailer = require('nodemailer');

// Test current configuration
console.log('Environment Variables:');
console.log(`EMAIL_HOST: ${process.env.EMAIL_HOST}`);
console.log(`EMAIL_PORT: ${process.env.EMAIL_PORT}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET'}`);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('\nTesting SMTP Connection...');
console.log(`Host: ${transporter.options.host}`);
console.log(`Port: ${transporter.options.port}`);
console.log(`User: ${transporter.options.auth.user}`);

transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ SMTP Connection Failed:');
    console.log(error);
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!');
    console.log('Server is ready to send emails');
    process.exit(0);
  }
});
