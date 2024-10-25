const controller = require('./src/controller');
const sms = require('./src/plugins/sms');

// const test = async () => {
//   console.log('Sending test message');
//   const d = await sms('+254702257506', 'Test message', '1234');
//   //console.log({ d })
// };

controller.listen();
