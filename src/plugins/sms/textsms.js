const config = require('config');
const axios = require('axios');

const apikey = config.get('services.textsms.apikey');
const partnerID = config.get('services.textsms.partnerID');
const url = config.get('services.textsms.url');

module.exports = async (phone, message, otp) => {
  if (!phone) throw new Error('No receipent was specified');
  if (!message) throw new Error('No Message was specified');

  const otpmsg = `Here is your OTP to complete your transaction: ${otp}`;

  const { data } = await axios.post(url, {
    apikey,
    partnerID,
    message: otpmsg,
    shortcode: 'TextSMS',
    mobile: phone
  });
  console.log("sms sent", data);
  return data;


};
