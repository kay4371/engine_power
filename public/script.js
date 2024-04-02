// const express = require('express');
// const mongoose = require('mongoose');

// var cors = require('cors');
// var logger = require('morgan');
// const unirest = require ('unirest')
// const cheerio = require ('cheerio')
// var express = require('express');
// var bodyParser = require('body-parser');
// var logger = require('morgan');
// var methodOverride = require('method-override');


// const uri = 'mongodb+srv://OlukayodeUser:Kayode4371@cluster0.1ejsr.mongodb.net/olukayode_sage?retryWrites=true&w=majority'
// const client = new MongoClient(uri);
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


// const app = express();
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(cors());

// const port = process.env.PORT || 3001;

// mongoose.connect(uri).then(() => console.log('db connected'))

// // Create a schema for the data
// const MyDataSchema = new mongoose.Schema({
//   field1: String,
//   field2: Number,
//   // Add more fields as needed
// });

// const MyData = mongoose.model('MyData', MyDataSchema);


// // const MyModel = mongoose.model('MyModel', {
// //   name: String,
// //   email: String,
// //   message: String
// // });

// // app.post('/upload', upload.none(), async (req, res) => {
// //   const data = new MyModel({
// //     name: req.body.name,
// //     email: req.body.email,
// //     message: req.body.message
// //   });

// //   try {
// //     await data.save();
// //     res.send('Data uploaded successfully');
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).send('Server error');
// //   }
// // });



// app.post('/view', async function (req, res) {
//   try {
//     await client.connect();
//     const database = client.db('olukayode_sage');
//     const kaydata = database.collection('olukayode_collection');

//     // Create a new document to insert into the collection
//     const newDocument = {
//       name: "req.body.name",
//       email: "req.body.email",
//       message: "req.body.message"
//     };

//     // Insert the new document into the collection
//     const result = await kaydata.insertOne(newDocument);

//     console.log('Inserted document with ID:', result.insertedId);

//     res.send('Data saved successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while saving data');
//   } finally {
//     await client.close();
//   }
// });


// // Define an array of questions
// const questions = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     options: [
//       { id: 1, text: "London" },
//       { id: 2, text: "Paris" },
//       { id: 3, text: "Berlin" },
//       { id: 4, text: "Madrid" },
//     ],
//     // answer: 2,
//     answer: "Paris",
//   },
//   {
//     id: 2,
//     question: "What is the largest planet in our solar system?",
//     options: [
//       { id: 1, text: "Venus" },
//       { id: 2, text: "Saturn" },
//       { id: 3, text: "Jupiter" },
//       { id: 4, text: "Mars" },
//     ],
//     // answer: 3,
//     answer: "Jupiter"
//   },
//   {
//     id: 1,
//     question: "What is the name of Nigerian Presidet?",
//     options: [
//       { id: 1, text: "Buhari" },
//       { id: 2, text: "Saturn" },
//       { id: 3, text: "Jupiter" },
//       { id: 4, text: "Mars" },
//     ],
//     // answer: 3,
//     answer: "Buhari"
//   },

//   {
//     id: 3,
//     question: "Rivers Niger and River Benue met at?",
//     options: [
//       { id: 1, text: "Buhari" },
//       { id: 2, text: "Lokoja" },
//       { id: 3, text: "Jupiter" },
//       { id: 4, text: "Mars" },
//     ],
//     // answer: 3,
//     answer: "Lokoja"
//   },

//   {
//     id: 1,
//     question: "What is a noun?",
//     options: [
//       { id: 1, text: "name" },
//       { id: 2, text: "Lokoja" },
//       { id: 3, text: "Jupiter" },
//       { id: 4, text: "Mars" },
//     ],
//     // answer: 3,
//     answer: "name"
//   },

// ];

// // Define a route to get all the questions
// app.get('/questions', (req, res) => {
//   res.json(questions);
// });


// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });





document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const pasteForm = document.getElementById('pasteForm');
    const manualForm = document.getElementById('manualForm');
    const output = document.getElementById('output');
  
    // Handle file upload
    uploadForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const fileInput = document.getElementById('quizFile');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('quizFile', file);
  
      fetch('/', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        output.textContent = JSON.stringify(data, null, 2);
        alert(JSON.stringify(data, null, 2));
        res.data
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while processing the file.');
      });
    });
  
    // Handle copy and paste
    pasteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const quizData = document.getElementById('quizData').value;
      const questions = quizData.split('\n\n');
      const data = {
        questions: []
      };
      questions.forEach(function(question, index) {
        const parts = question.split('\n');
        const q = {
          id: index + 1,
          question: parts[0],
          options: [
            parts[1],
            parts[2],
            parts[3],
            parts[4]
          ],
          answer: parts[5],
          explanation: parts[6]
        };
        data.questions.push(q);
      });
      output.textContent = JSON.stringify(data, null, 2);
      alert(JSON.stringify(data, null, 2));
      res.data
    });
  
    // Handle manual entry
    manualForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const question = document.getElementById('question').value;
      const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
      ];
      const answer = document.getElementById('answer').value;
      const explanation = document.getElementById('explanation').value;
      const data = {
        questions: [
          {
            id: 1,
            question: question,
            options: options,
            answer: answer,
            explanation: explanation
          }
        ]
      };
      output.textContent = JSON.stringify(data, null, 2);
      alert(JSON.stringify(data, null, 2));
      res.data
    });
  });
  


// $(document).ready(function() {
//     // Handle file upload
//     $('#uploadForm').submit(function(event) {
//       event.preventDefault();
//       var fileInput = $('#quizFile')[0];
//       var file = fileInput.files[0];
//       var formData = new FormData();
//       formData.append('quizFile', file);
//       $.ajax({
//         url: '/',
//         method: 'POST',
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function(response) {
//           $('#output').text(response);
//         },
//         error: function(xhr, status, error) {
//           console.error(error);
//         }
//       });
//     });
  
//     // Handle copy and paste
//     $('#pasteForm').submit(function(event) {
//       event.preventDefault();
//       var quizData = $('#quizData').val();
//       var questions = quizData.split('\n\n');
//       var data = {
//         questions: []
//       };
//       questions.forEach(function(question, index) {
//         var parts = question.split('\n');
//         var q = {
//           id: index + 1,
//           question: parts[0],
//           options: [
//             parts[1],
//             parts[2],
//             parts[3],
//             parts[4]
//           ],
//           answer: parts[5],
//           explanation: parts[6]
//         };
//         data.questions.push(q);
//       });
//       $('#output').text(JSON.stringify(data, null, 2));
//     });
  
//     // Handle manual entry
//     $('#manualForm').submit(function(event) {
//       event.preventDefault();
//       var question = $('#question').val();
//       var options = [
//         $('#option1').val(),
//         $('#option2').val(),
//         $('#option3').val(),
//         $('#option4').val()
//       ];
//       var answer = $('#answer').val();
//       var explanation = $('#explanation').val();
//       var data = {
//         questions: [
//           {
//             id: 1,
//             question: question,
//             options: options,
//             answer: answer,
//             explanation: explanation
//           }
//         ]
//       };
//       $('#output').text(JSON.stringify(data, null, 2));
//     });
//   });
  