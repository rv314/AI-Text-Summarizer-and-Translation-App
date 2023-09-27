const express = require('express');
const app = express();
const port = 3000;
const summarize = require('./summarize.js');


// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Summarize endpoint
app.post('/summarize', (req, res) => {
  // get text from request body
  const text = req.body.text_to_summarize;
  // Check if translation is required (checkbox header)
  const translate = req.headers.translate;
  console.log("Sending data to backend");

  // call summarize function and pass text
  if (translate == 'Yes') {
    summarize.summarizeTranslate(text)
      .then(response => {
        res.send(response); //Send translated summary text as response to user
      })
      .catch(error => {
        console.log(error.message);
      });
  } else {
    summarize.summarizeText(text)
      .then(response => {
        res.send(response); //Send english summary text as response to user
      })
      .catch(error => {
        console.log(error.message);
      });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
