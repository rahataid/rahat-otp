const axios = require('axios');
const config = require('config');

// Define the URL of the API route you want to call
const apiUrl = config.get('services.rumsanComms.url');
const contentSid = config.get('services.rumsanComms.contentSid');
const type = config.get('services.rumsanComms.type');

module.exports = async (phone, message, otp) => {
  const requestData = {
    phone,
    type,
    contentSid,
    contentVariables: {
      1: otp
    },
    body: message
  }
  axios.post(`${apiUrl}/v1/message-sender/send-otp`, requestData)
    .then(response => {
      console.log('Response from API:', response.data);
    })
    .catch(error => {
      console.error('Error calling API:', error);
    });
}



