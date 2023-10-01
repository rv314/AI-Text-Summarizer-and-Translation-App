const axios = require('axios');
//const tk = process.env['ACCESS_TOKEN']

// Function to call Hugging Face API. Returns summarized text

async function summarizeText(text) {

  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    console.log("English summary request. Getting data");
    return response.data[0].summary_text;
  }
  catch (error) {
    console.log(error);
  }
}

// Summarize text and pass it to translate function for translation
async function summarizeTranslate(text) {

  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    console.log("Sending data for translation");
    const summary_text = response.data[0].summary_text;
    const translation_text = translate(summary_text);
    return translation_text;
  }
  catch (error) {
    console.log(error);
  }
}

// Translate summarized text
async function translate(summary_text) {

  let t_data = JSON.stringify({
    "inputs": summary_text
  });

  let t_config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-zh',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: t_data
  };

  try {
    const t_response = await axios.request(t_config);
    // console.log(JSON.stringify(response.data));
    console.log("Connection made for translation. Getting data");
    return t_response.data[0].translation_text;
  }
  catch (error) {
    console.log(error);
  }
}

// Make functions accessible
module.exports = {
  summarizeText,
  summarizeTranslate,
  translate
}
