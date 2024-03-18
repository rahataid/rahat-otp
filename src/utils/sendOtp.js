const axios = require('axios');
const config = require('config');

// Define the URL of the API route you want to call
const apiUrl = config.get('otpProvider');


function sendOtp(toEmail, otp) {
  const requestData = {
    body: `Your OTP is ${otp}`,
    type: "EMAIL",
    toEmail,
    subject: "Rahat OTP"
  };
  axios.post(apiUrl, requestData)
    .then(response => {
      console.log('Response from API:', response.data);
    })
    .catch(error => {
      console.error('Error calling API:', error);
    });
}

module.exports = sendOtp


