const express = require('express');
const router = express.Router();
const Drivers = require('../models/Drivers');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const twilio = require('twilio');

router.post('/driver-details', (req, res) => {
  const driverData = req.body;

  Drivers.create(driverData)
    .then((driver) => {
      sendGatePass(driver, res);
      sendWhatsAppMessage(driver);

      res.status(200).json({ message: 'Driver details uploaded successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while uploading the driver details' });
    });
});

// Function to send the gate pass to the HR officer
function sendGatePass(driver, res) {
  const doc = new PDFDocument();

  doc.fontSize(18).text('Gate Pass', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Driver: ${driver.name}`);
  doc.moveDown();
  doc.fontSize(12).text(`Passenger: ${driver.passenger}`);
  doc.moveDown();
  doc.fontSize(12).text(`Car Plate Number: ${driver.carPlateNumber}`);
  doc.moveDown();
  doc.fontSize(12).text(`Time: ${driver.time}`);
  doc.moveDown();
  doc.fontSize(12).text('Instructions: Allow access to the driver and follow the company policy.');
  doc.moveDown();
  doc.fontSize(12).text('HR Officer: HR Officer Name');
  doc.moveDown();
  doc.fontSize(10).text('Signature: ___________________');

  doc.end();
  const stream = doc.pipe(fs.createWriteStream('gate_pass.pdf'));
  stream.on('finish', () => {
    console.log('Gate pass PDF generated successfully');
    // Implement logic to send the gate pass PDF to the HR officer via email or any other method
  });
}

// Function to send the driver details to the WhatsApp group
function sendWhatsAppMessage(driver) {
  const message = `Driver: ${driver.name}\nPassenger: ${driver.passenger}\nCar Plate Number: ${driver.carPlateNumber}\nTime: ${driver.time}`;
  const phoneNumber = 'whatsapp:+1234567890'; // Replace with the WhatsApp group phone number

  const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
  const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to: phoneNumber,
    })
    .then((message) => console.log(`WhatsApp message sent. SID: ${message.sid}`))
    .catch((error) => console.error('Error sending WhatsApp message:', error));
}

module.exports = router;
