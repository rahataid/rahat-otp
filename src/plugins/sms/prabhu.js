const config = require('config');
const axios = require('axios');
const querystring = require('querystring');

const url = config.get('services.prabhu.url');
const token = config.get('services.prabhu.token');
const msg = config.get('msg')

module.exports = async (phone, message,otp) => {
  if (!phone) throw new Error('No receipent was specified');
  if (!message) throw new Error('No Message was specified');

  if(phone.toString().slice(0,4) === '+977') phone = phone.toString().slice(4).trim();
  // return axios.post(`${url}?token=${token}`, [
  //   {
  //     Message: message,
  //     MobileNumber: phone
  //   }
  // ]);
  const otpmsg = createMessage(otp)
  const params = querystring.stringify({ to: phone, content: otpmsg, token });
  return axios.get(`${url}?${params}`);
};

const createMessage = async(otp) =>{
  if(!msg) return false;

  let message = msg;
  if (msg.includes('${otp}')) message = message.replace('${otp}', otp);
  return message;

}
