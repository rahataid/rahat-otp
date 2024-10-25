const config = require('config');
const axios = require('axios');

const apiKey = config.get('services.textsms.apiKey');
const partnerId = config.get('services.textsms.partnerId');
const url = config.get('services.textsms.url');

module.exports = async (phone, message, otp) => {
  if (!phone) throw new Error('No receipent was specified');
  if (!message) throw new Error('No Message was specified');

  const otpmsg = `Here is your OTP to complete your transaction: ${otp}`;
  const data = await axios.post(url, {
    apiKey,
    partnerId,
    message: otpmsg,
    shortcode: 'TextSms',
    mobile: phone
  });
  console.log(data);
  return data;
};
