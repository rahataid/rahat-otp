const config = require('config');

const msg = config.get('elmsg');

function createMessage(otp, phone,expiryTime) {
  if (!msg) {
    return false;
  }
  let message = msg;
  if (msg.includes('${phone}')) message = message.replace('${phone}', phone);
  if (msg.includes('${otp}')) message = message.replace('${otp}', otp);
  if (msg.includes('${expiryTime}')) message = message.replace('${expiryTime}', expiryTime);

  return message;
}

module.exports = { createMessage };
