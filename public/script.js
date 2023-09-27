const textArea = document.getElementById('text_to_summarize');
const submitButton = document.getElementById('submit-button');
const summarizedTextArea = document.getElementById('summary');
const checkBox = document.getElementById('translate');
var translate = '';

// Disable submit button as a default
submitButton.disabled = true;
checkBox.disabled = true;

function OnChangeCheckbox(checkbox) {
  if (checkbox.checked) {
    translate = 'Yes';
  } else {
    translate = 'No';
  }
  return check;
}
// Event listeners
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

// Define function to verify text length
function verifyTextLength(e) {

  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
    checkBox.disabled = false;
  } else {
    submitButton.disabled = true;
    checkBox.disabled = true;
  }
}

// Define function to handle submit button
function submitData(e) {

  submitButton.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("translate", translate);

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


  // Send the text to the server using fetch API

  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");

    })
    .catch(error => {
      console.log(error.message);
    });
}