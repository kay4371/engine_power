// // // const axios = require('axios'); 

// // // Imports
// // const axios = require('axios');

// // // API credentials
// // const token = "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX";

// // // API endpoint  
// // const apiUrl = `https://gate.whapi.cloud/messages/text?token=${token}`;

// // // Message details
// // const to = "2348058417918@s.whatsapp.net";
// // const message = "Hello Olukay! This is a test message sent from the WHAPI APIs";  

// // // Create main async function
// // const main = async () => {

// //     try {
        
// //         // Make API request
// //         const response = await axios.post(apiUrl, {
// //             to,
// //             body: message, 
// //             view_once: true  
// //         });

// //         // Log response  
// //         console.log(response.data);

// //     } catch (error) {
// //         console.log(error);
// //     }

// // };

// // // Invoke main function
// // main();



// // const security_unit_number="2349010400099"
// // const sendMessageToSecurity_unit = async (phoneNumber, message) => {
// //   try {

// //     const response = await axios.post(
// //       'https://gate.whapi.cloud/messages/text',
// //       {
// //         // to: `${cleanAndFormatPhoneNumber(phoneNumber)}@s.whatsapp.net`,
// //         to: `${security_unit_number}@s.whatsapp.net`,
// //         body: securityUnitMessage ,
// //         typing_time: 0,
// //       },
// //       {
// //         headers: {
// //           Accept: 'application/json',
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     console.log(`Message sent to ${security_unit_number} successfully:`, response.data);
// //   } catch (error) {
// //     console.error(`Error sending message to ${security_unit_number}:`, error.message);
// //   }
// // };






// // // const fs = require('fs');
// // // const qrcode = require('qrcode-terminal');
// // // const { Client, LegacySessionAuth } = require('whatsapp-web.js');

// // // // Path where the session data will be stored
// // // const SESSION_FILE_PATH = './session.json';

// // // // Load the session data if it has been previously saved
// // // let sessionData;
// // // if (fs.existsSync(SESSION_FILE_PATH)) {
// // //     sessionData = require(SESSION_FILE_PATH);
// // //     console.log('Loaded session data:', sessionData); // Log session data
// // // }


// // // // Use the saved values
// // // const client = new Client({
// // //     authStrategy: new LegacySessionAuth({
// // //         session: sessionData
// // //     })
// // // });

// // // // Handle authentication failure
// // // client.on('auth_failure', (msg) => {
// // //     console.error('Authentication failure:', msg);
// // // });

// // // client.on('qr', (qr) => {
// // //     // Generate and scan this code with your phone
// // //     qrcode.generate(qr, { small: true });
// // //     console.log('QR RECEIVED', qr);
// // // });

// // // client.on('ready', () => {
// // //     console.log('Client is ready!');
// // //     client.getChats().then(chats => {
// // //       const myGroup=chats.find((chat)=>chat.name==="Test Whatsapp group"
// // //       );
// // //         client.sendMessage(myGroup.id._serialized,"Hello This Is A Test Message")
// // //     });
// // // });

// // // // client.on('ready', () => {
// // // //   console.log('Client is ready!');
// // // //   client.getChats().then(chats => {
// // // //         console.log(chats[0]);
// // // //       //  console.log(myGroup);     
// // // //   });
// // // // });


// // // // Save session values to the file upon successful auth
// // // client.on('authenticated', (session) => {
// // //     sessionData = session;
// // //     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
// // //         if (err) {
// // //             console.error(err);
// // //         }
// // //     });
// // // });

// // // client.on('message', msg => {
// // //     if (msg.body == '!ping') {
// // //         msg.reply('pong');
// // //     }
// // // });

// // // // Handle other events and errors
// // // client.on('disconnected', (reason) => {
// // //     console.log('Client disconnected:', reason);
// // //     // You might want to handle reconnection here
// // // });

// // // client.initialize();



// // // const { Client, Location, Poll, List, Buttons, LocalAuth } = require('whatsapp-web.js');

// // // const client = new Client({
// // //     authStrategy: new LocalAuth(),
// // //     // proxyAuthentication: { username: 'your_proxy_username', password: 'your_proxy_password' },
// // //     puppeteer: { 
// // //         // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
// // //         headless: false
// // //     }
// // // });

// // // client.initialize();

// // // client.on('loading_screen', (percent, message) => {
// // //     console.log('LOADING SCREEN', percent, message);
// // // });

// // // client.on('qr', (qr) => {
// // //     // NOTE: This event will not be fired if a session is specified.
// // //     console.log('QR RECEIVED', qr);
// // // });

// // // client.on('authenticated', () => {
// // //     console.log('AUTHENTICATED');
// // // });

// // // client.on('auth_failure', msg => {
// // //     // Fired if session restore was unsuccessful
// // //     console.error('AUTHENTICATION FAILURE', msg);
// // // });

// // // client.on('ready', () => {
// // //     console.log('READY');
// // // });

// // // client.on('message', async msg => {
// // //     console.log('MESSAGE RECEIVED', msg);

// // //     if (msg.body === '!ping reply') {
// // //         // Send a new message as a reply to the current one
// // //         msg.reply('pong');

// // //     } else if (msg.body === '!ping') {
// // //         // Send a new message to the same chat
// // //         client.sendMessage(msg.from, 'pong');

// // //     } else if (msg.body.startsWith('!sendto ')) {
// // //         // Direct send a new message to a specific id
// // //         let number = msg.body.split(' ')[1];
// // //         let messageIndex = msg.body.indexOf(number) + number.length;
// // //         let message = msg.body.slice(messageIndex, msg.body.length);
// // //         number = number.includes('@c.us') ? number : `${number}@c.us`;
// // //         let chat = await msg.getChat();
// // //         chat.sendSeen();
// // //         client.sendMessage(number, message);

// // //     } else if (msg.body.startsWith('!subject ')) {
// // //         // Change the group subject
// // //         let chat = await msg.getChat();
// // //         if (chat.isGroup) {
// // //             let newSubject = msg.body.slice(9);
// // //             chat.setSubject(newSubject);
// // //         } else {
// // //             msg.reply('This command can only be used in a group!');
// // //         }
// // //     } else if (msg.body.startsWith('!echo ')) {
// // //         // Replies with the same message
// // //         msg.reply(msg.body.slice(6));
// // //     } else if (msg.body.startsWith('!preview ')) {
// // //         const text = msg.body.slice(9);
// // //         msg.reply(text, null, { linkPreview: true });
// // //     } else if (msg.body.startsWith('!desc ')) {
// // //         // Change the group description
// // //         let chat = await msg.getChat();
// // //         if (chat.isGroup) {
// // //             let newDescription = msg.body.slice(6);
// // //             chat.setDescription(newDescription);
// // //         } else {
// // //             msg.reply('This command can only be used in a group!');
// // //         }
// // //     } else if (msg.body === '!leave') {
// // //         // Leave the group
// // //         let chat = await msg.getChat();
// // //         if (chat.isGroup) {
// // //             chat.leave();
// // //         } else {
// // //             msg.reply('This command can only be used in a group!');
// // //         }
// // //     } else if (msg.body.startsWith('!join ')) {
// // //         const inviteCode = msg.body.split(' ')[1];
// // //         try {
// // //             await client.acceptInvite(inviteCode);
// // //             msg.reply('Joined the group!');
// // //         } catch (e) {
// // //             msg.reply('That invite code seems to be invalid.');
// // //         }
// // //     }
// // //     // Add more custom commands as needed...
// // // });

// // // // Add other event handlers...

// // // client.on('disconnected', (reason) => {
// // //     console.log('Client was logged out', reason);
// // // });

// // // // Add more event handlers as needed...





// // const { Client, Location, Poll, List, Buttons, LocalAuth } = require('whatsapp-web.js');

// // const client = new Client({
// //     authStrategy: new LocalAuth(),
// //     // proxyAuthentication: { username: 'your_proxy_username', password: 'your_proxy_password' },
// //     puppeteer: { 
// //         // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
// //         headless: false
// //     }
// // });

// // client.initialize();

// // client.on('loading_screen', (percent, message) => {
// //     console.log('LOADING SCREEN', percent, message);
// // });

// // client.on('qr', (qr) => {
// //     // NOTE: This event will not be fired if a session is specified.
// //     console.log('QR RECEIVED', qr);
// // });

// // client.on('authenticated', () => {
// //     console.log('AUTHENTICATED');
// // });

// // client.on('auth_failure', msg => {
// //     // Fired if session restore was unsuccessful
// //     console.error('AUTHENTICATION FAILURE', msg);
// // });

// // client.on('ready', () => {
// //     console.log('READY');
// // });

// // client.on('message', async msg => {
// //     console.log('MESSAGE RECEIVED', msg);

// //     if (msg.body === '!ping reply') {
// //         // Send a new message as a reply to the current one
// //         msg.reply('pong');

// //     } else if (msg.body === '!ping') {
// //         // Send a new message to the same chat
// //         client.sendMessage(msg.from, 'pong');

// //     } else if (msg.body.startsWith('!sendto ')) {
// //         // Direct send a new message to a specific id
// //         let number = msg.body.split(' ')[1];
// //         let messageIndex = msg.body.indexOf(number) + number.length;
// //         let message = msg.body.slice(messageIndex, msg.body.length);
// //         number = number.includes('@c.us') ? number : `${number}@c.us`;
// //         let chat = await msg.getChat();
// //         chat.sendSeen();
// //         client.sendMessage(number, message);

// //     } else if (msg.body.startsWith('!subject ')) {
// //         // Change the group subject
// //         let chat = await msg.getChat();
// //         if (chat.isGroup) {
// //             let newSubject = msg.body.slice(9);
// //             chat.setSubject(newSubject);
// //         } else {
// //             msg.reply('This command can only be used in a group!');
// //         }
// //     } else if (msg.body.startsWith('!echo ')) {
// //         // Replies with the same message
// //         msg.reply(msg.body.slice(6));
// //     } else if (msg.body.startsWith('!preview ')) {
// //         const text = msg.body.slice(9);
// //         msg.reply(text, null, { linkPreview: true });
// //     } else if (msg.body.startsWith('!desc ')) {
// //         // Change the group description
// //         let chat = await msg.getChat();
// //         if (chat.isGroup) {
// //             let newDescription = msg.body.slice(6);
// //             chat.setDescription(newDescription);
// //         } else {
// //             msg.reply('This command can only be used in a group!');
// //         }
// //     } else if (msg.body === '!leave') {
// //         // Leave the group
// //         let chat = await msg.getChat();
// //         if (chat.isGroup) {
// //             chat.leave();
// //         } else {
// //             msg.reply('This command can only be used in a group!');
// //         }
// //     } else if (msg.body.startsWith('!join ')) {
// //         const inviteCode = msg.body.split(' ')[1];
// //         try {
// //             await client.acceptInvite(inviteCode);
// //             msg.reply('Joined the group!');
// //         } catch (e) {
// //             msg.reply('That invite code seems to be invalid.');
// //         }
// //     }
// //     // Add more custom commands as needed...
// // });

// // // Add other event handlers...

// // client.on('disconnected', (reason) => {
// //     console.log('Client was logged out', reason);
// // });

// // // Add more event handlers as needed...












// // // const fs = require('fs');
// // // const qrcode = require('qrcode-terminal');
// // // const { Client, LegacySessionAuth } = require('whatsapp-web.js');

// // // // Path where the session data will be stored
// // // const SESSION_FILE_PATH = './session.json';

// // // // Load the session data if it has been previously saved
// // // let sessionData;
// // // if (fs.existsSync(SESSION_FILE_PATH)) {
// // //     sessionData = require(SESSION_FILE_PATH);
// // //     console.log('Loaded session data:', sessionData); // Log session data
// // // }


// // // // Use the saved values
// // // const client = new Client({
// // //     authStrategy: new LegacySessionAuth({
// // //         session: sessionData
// // //     })
// // // });

// // // // Handle authentication failure
// // // client.on('auth_failure', (msg) => {
// // //     console.error('Authentication failure:', msg);
// // // });

// // // client.on('qr', (qr) => {
// // //     // Generate and scan this code with your phone
// // //     qrcode.generate(qr, { small: true });
// // //     console.log('QR RECEIVED', qr);
// // // });

// // // client.on('ready', () => {
// // //     console.log('Client is ready!');
// // //     client.getChats().then(chats => {
// // //       const myGroup=chats.find((chat)=>chat.name==="Test Whatsapp group"
// // //       );
// // //         client.sendMessage(myGroup.id._serialized,"Hello This Is A Test Message")
// // //     });
// // // });

// // // // client.on('ready', () => {
// // // //   console.log('Client is ready!');
// // // //   client.getChats().then(chats => {
// // // //         console.log(chats[0]);
// // // //       //  console.log(myGroup);     
// // // //   });
// // // // });


// // // // Save session values to the file upon successful auth
// // // client.on('authenticated', (session) => {
// // //     sessionData = session;
// // //     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
// // //         if (err) {
// // //             console.error(err);
// // //         }
// // //     });
// // // });

// // // client.on('message', msg => {
// // //     if (msg.body == '!ping') {
// // //         msg.reply('pong');
// // //     }
// // // });

// // // // Handle other events and errors
// // // client.on('disconnected', (reason) => {
// // //     console.log('Client disconnected:', reason);
// // //     // You might want to handle reconnection here
// // // });

// // // client.initialize();








// // //message to a group
// // const axios = require('axios');

// // // API credentials
// // const token = "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX";

// // // API endpoints
// // const groupsEndpoint = `https://gate.whapi.cloud/groups?count=100`;
// // const sendMessageEndpoint = `https://gate.whapi.cloud/messages/text`;

// // // Function to get groups and return the selected group ID
// // const getGroupId = async () => {
// //   try {
// //     const response = await axios.get(groupsEndpoint, {
// //       headers: {
// //         Accept: 'application/json',
// //       },
// //     });

// //     // Assuming you select the first group from the list
// //     const selectedGroup = response.data.groups[0];

// //     if (selectedGroup) {
// //       return selectedGroup.id;
// //     } else {
// //       throw new Error('No groups found.');
// //     }
// //   } catch (error) {
// //     throw new Error(`Error getting groups: ${error.message}`);
// //   }
// // };

// // // Function to send a message to the selected group
// // const sendMessageToGroup = async (groupId, message) => {
// //   try {
// //     const response = await axios.post(sendMessageEndpoint, {
// //       to: `${groupId}@g.us`,
// //       body: message,
// //       typing_time: 0,
// //     }, {
// //       headers: {
// //         Accept: 'application/json',
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });

// //     console.log('Message sent successfully:', response.data);
// //   } catch (error) {
// //     console.error('Error sending message:', error.message);
// //   }
// // };

// // // Example usage
// // const main = async () => {
// //   try {
// //     const groupId = await getGroupId();
// //     const message = 'Hello, this is a test message!';

// //     if (groupId) {
// //       await sendMessageToGroup(groupId, message);
// //     }
// //   } catch (error) {
// //     console.error(error.message);
// //   }
// // };

// // // Invoke the main function
// // main();



// // //individual number
// // //////////////////////////////////////////////////////
// // const cleanAndFormatPhoneNumber = (phoneNumber) => {
// //     // Remove non-numeric characters
// //     const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
// //     // Add '234' as a prefix if not present
// //     const formattedNumber = cleanedNumber.startsWith('234') ? cleanedNumber : `234${cleanedNumber}`;
  
// //     return formattedNumber;
// //   };
  
// //   app.post('/upload_visitor_details', async (req, res) => {
// //     const fullName = req.body.name;
// //     const firstName = fullName.split(' ')[0]; // Extract the first word
  
// //     const visitorDetails = {
// //       registrationDate: new Date(),
// //       name: firstName,
// //       company: req.body.company,
// //       whomToSee: req.body.whomToSee,
// //       purposeOfVisit: req.body.purposeOfVisit,
// //       phoneNumber: cleanAndFormatPhoneNumber(req.body.phone_number),
// //       datetime: new Date(req.body.datetime)
// //     };
  
// //     try {
// //       await client.connect();
// //       const database = client.db('olukayode_sage');
// //       const collection = database.collection('Visitors_details_Database');
  
// //       // Save the visitor details to the database
// //       const result = await collection.insertOne(visitorDetails);
  
// //       // Notify SSE clients with a message
// //       const message = {
// //         type: 'visitor_upload',
// //         visitorDetails,
// //       };
// //       sendSSEMessage('sse_visitor_upload', message);
// //       console.log('Sending SSE message:', message);
  
// //       // API credentials
// //       const token = "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX";
  
// //       // API endpoint  
// //       const apiUrl = `https://gate.whapi.cloud/messages/text?token=${token}`;
  
// //       // Message details
// //       const to = cleanAndFormatPhoneNumber(req.body.phone_number); // Clean and format the phone number
// //       const accessCode = "2368"; // Dynamically fetch from visitorDetails
// //       const password = "Pink Horse"; // Dynamically fetch from visitorDetails
  
// //       // Calculate validity period (maximum of 1 hour after the provided datetime)
// //       const validityPeriod = new Date(visitorDetails.datetime.getTime() + (60 * 60 * 1000));
// //       const validityPeriodFormatted = validityPeriod.toLocaleDateString() + ' ' + validityPeriod.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
// //       const whatsappMessage = `Hi ${firstName},
  
// //   Your access code for Mota-Engil Lagos office is "${accessCode}" and the password is "${password}." Kindly use this information at the security checkpoint. Access is valid until ${validityPeriodFormatted}.
  
// //   Regards,
// //   Mota Engil Security`;
  
// //       // Make API request
// //       const response = await axios.post(apiUrl, {
// //         to,
// //         body: whatsappMessage,
// //         view_once: true
// //       });
  
// //       // Log response
// //       console.log(response.data);
  
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).send('An error occurred while uploading visitor details');
// //     } finally {
// //       await client.close();
// //     }
// //   });
  





// // // // whatsappSender.js

// // const express = require('express');
// // const axios = require('axios');

// // const app = express();
// // const port = 3000; // You can change this port if needed

// // // API credentials
// // const token = "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX";

// // // API endpoints
// // const groupsEndpoint = `https://gate.whapi.cloud/groups?count=100`;
// // const sendMessageEndpoint = `https://gate.whapi.cloud/messages/text`;


// // const groupId = '120363194020948049@g.us';
// // // Function to get groups and return the selected group ID
// // const getGroupId = async () => {
// //   try {
// //     const response = await axios.get(groupsEndpoint, {
// //       headers: {
// //         Accept: 'application/json',
// //       },
// //     });

// //     // Assuming you select the first group from the list
// //     const selectedGroup = response.data.groups[0];

// //     if (selectedGroup) {
// //       return selectedGroup.id;
// //     } else {
// //       throw new Error('No groups found.');
// //     }
// //   } catch (error) {
// //     throw new Error(`Error getting groups: ${error.message}`);
// //   }
// // };

// // // Function to send a message to the selected group
// // const sendMessageToGroup = async (groupId, message) => {
// //   try {
// //     const response = await axios.post(sendMessageEndpoint, {
// //       to: `${groupId}@g.us`,
// //       body: message,
// //       typing_time: 0,
// //     }, {
// //       headers: {
// //         Accept: 'application/json',
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });

// //     console.log('Message sent successfully:', response.data);
// //   } catch (error) {
// //     console.error('Error sending message:', error.message);
// //   }
// // };

// // // // Express route to send a test message
// // // app.get('/', async (req, res) => {
// // //   try {
// // //     const groupId = await getGroupId();
// // //     const message = 'Hello, this is a test message!';

// // //     if (groupId) {
// // //       await sendMessageToGroup(groupId, message);
// // //       res.send('Test message sent!');
// // //     }
// // //   } catch (error) {
// // //     console.error(error.message);
// // //     res.status(500).send('Error sending test message');
// // //   }
// // // });

// // // Start the Express server
// // app.listen(port, () => {
// //   console.log(`Server is running at http://localhost:${port}`);
// // });







// // whatsappSender.js

// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// // // API credentials
// // const token = "S36GOqY9anD6SGA7KPynscPVxdju24fN";
// // const token = "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX"
// // API endpoints



// // const options = {
// //   method: 'GET',
// //   url: 'https://gate.whapi.cloud/groups?count=100',
// //   headers: {
// //     accept: 'application/json',
// //     // authorization: "notWeiRdf4mmY2CWf1Lk1Iz1W7hysaCX",
// //     authorization: "S36GOqY9anD6SGA7KPynscPVxdju24fN"
// //   },
// // };

// // axios
// //   .request(options)
// //   .then(function (response) {
// //     console.log(response.data);
// //   })
// //   .catch(function (error) {
// //     console.error(error);
// //   });








// // const axios = require('axios');

// // const options = {
// //   method: 'POST',
// //   url: 'https://gate.whapi.cloud/messages/text',
// //   headers: {accept: 'application/json', 'content-type': 'application/json'},
// //   data: {
// //     to:  '120363191337721032@g.us',
// //     // to: '1234567891@s.whatsapp.net',
// //     quoted: 'string',
// //     ephemeral: 0,
// //     edit: 'string',
// //     body: 'string',
// //     typing_time: 0,
// //     no_link_preview: true,
// //     mentions: ['string'],
// //     view_once: true
// //   }
// // };

// // axios
// //   .request(options)
// //   .then(function (response) {
// //     console.log(response.data);
// //   })
// //   .catch(function (error) {
// //     console.error(error);
// //   });
  




// const options = {
//   method: 'POST',
//   url: 'https://gate.whapi.cloud/messages/text',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     authorization: 'Bearer S36GOqY9anD6SGA7KPynscPVxdju24fN', // Replace with your actual token
//   },
//   data: {
//     to: '120363191337721032@g.us',
//     body: 'This message is a sample message',
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });




// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });







const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('./config.js');

process.on('unhandledRejection', err => {
    console.log(err)
});

const COMMANDS = {
    TEXT: 'Simple text message',
    IMAGE: 'Send image',
    DOCUMENT: 'Send document',
    VIDEO: 'Send video',
    CONTACT: 'Send contact',
    PRODUCT: 'Send product',
    GROUP_CREATE: 'Create group',
    GROUP_TEXT: 'Simple text message for the group',
    GROUPS_IDS: 'Get the id\'s of your three groups'
}

const FILES = {
    IMAGE: './files/file_example_JPG_100kB.jpg',
    DOCUMENT: './files/file-example_PDF_500_kB.pdf',
    VIDEO: './files/file_example_MP4_480_1_5MG.mp4',
    VCARD: './files/sample-vcard.txt'
}

/**
 * Send request to Whapi.Cloud
 * @param endpoint - endpoint path
 * @param params - request body
 * @param method - GET, POST, PATCH, DELETE
 * @returns {Promise<object>}
 */
async function sendWhapiRequest(endpoint, params= {}, method = 'POST') {
    let options = {
        method: method,
        headers: {
            Authorization: `Bearer ${config.token}`
        },
    };
    if (!params.media) options.headers['Content-Type'] = 'application/json';
    let url = `${config.apiUrl}/${endpoint}`;
    if(params && Object.keys(params).length > 0) {
        if(method === 'GET')
            url += '?' + new URLSearchParams(params);
        else
            options.body = params?.media ? toFormData(params) : JSON.stringify(params);
    }
    const response = await fetch(url, options);
    let json = await response.json();
    console.log('Whapi response:', JSON.stringify(json, null, 2));
    return json;
}

/**
 * Convert object to FormData
 * @param obj
 * @returns {FormData}
 */
function toFormData(obj) {
    const form = new FormData();
    for (let key in obj) {
        form.append(key, obj[key]);
    }
    return form;
}

async function setHook() {
    if (config.botUrl) {
        /** type {import('./whapi').Settings} */
        const settings = {
            webhooks: [
                {
                    url: config.botUrl,
                    events: [
                        // default event for getting messages
                        {type: "message", method: "post"}
                    ],
                    mode: "method"
                }
            ]
        }
        await sendWhapiRequest('settings', settings, 'PATCH');
    }
}

async function handleNewMessages(req, res){
    try {
        /** type {import('./whapi').Message[]} */
        const messages = req?.body?.messages;
        for (let message of messages) {
            if (message.from_me) continue;
            /** type {import('./whapi').Sender} */
            const sender = {
                to: message.chat_id
            }
            let endpoint = 'messages/text';
            const command = Object.keys(COMMANDS)[+message.text?.body?.trim() - 1];

            switch (command) {
                case 'TEXT': {
                    sender.body = 'Simple text message';
                    break;
                }
                case 'IMAGE': {
                    sender.caption = 'Text under the photo.';
                    sender.media = fs.createReadStream(FILES.IMAGE);
                    endpoint = 'messages/image';
                    break;
                }
                case 'DOCUMENT': {
                    sender.caption = 'Text under the document.';
                    sender.media = fs.createReadStream(FILES.DOCUMENT);
                    endpoint = 'messages/document';
                    break;
                }
                case 'VIDEO': {
                    sender.caption = 'Text under the video.';
                    sender.media = fs.createReadStream(FILES.VIDEO);
                    endpoint = 'messages/video';
                    break;
                }
                case 'CONTACT': {
                    sender.name = 'Whapi Test';
                    sender.vcard = fs.readFileSync(FILES.VCARD).toString();
                    endpoint = 'messages/contact';
                    break;
                }
                case 'PRODUCT': {
                    /* you can get real product id using endpoint  https://whapi.readme.io/reference/getproducts */
                    endpoint = `business/products/${config.product}`;
                    break;
                }
                case 'GROUP_CREATE': {
                    /* Warning : you can create group only with contacts from phone contact list */
                    const res = await sendWhapiRequest(`groups`, {subject: 'Whapi.Cloud Test', participants: [message.chat_id.split('@')[0]]});
                    sender.body = res.group_id ? `Group created. Group id: ${res.group_id}` : 'Error';
                    break;
                }
                case 'GROUP_TEXT': {
                    /*To get group id, use /groups endpoint */
                    sender.to = config.group;
                    sender.body = 'Simple text message for the group';
                    break;
                }
                case 'GROUPS_IDS': {
                    const {groups} = await sendWhapiRequest('groups', {count: 3}, 'GET');
                    sender.body = groups && groups.reduce((prevVal, currVal, i) => {
                        return i === 0 ? `${currVal.id} - ${currVal.name}` : prevVal + ',\n ' + `${currVal.id} - ${currVal.name}`;
                    }, '') || 'No groups';
                    break;
                }
                default: {
                    sender.body = 'Hi. Send me a number from the list. Don\'t forget to change the actual data in the code!  \n\n' +
                        Object.values(COMMANDS).map((text, i) => `${i + 1}. ${text}`).join('\n');
                }
            }
            await sendWhapiRequest(endpoint, sender);
        }
        res.send('Ok');
    } catch (e) {
        res.send(e.message);
    }
}

// Create a new instance of express
const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Bot is running');
});

app.post('/messages', handleNewMessages);

setHook().then(() => {
    const port = config.port || (config.botUrl.indexOf('https:') === 0 ? 443 : 80)
    app.listen(port, function () {
        console.log(`Listening on port ${port}...`);
    });
});
