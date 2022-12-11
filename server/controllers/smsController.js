// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);  

const sendWhatsapp = async (req, res) => {
    const { message, mobile } = req.body;
    if (typeof mobile !== "number") return res.sendStatus(400)
    if (mobile > 99999999 || mobile <9999999) return res.sendStatus(400)
    const messageInfo = { 
        body: message, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:+65${mobile}` 
    }
    client.messages 
    .create(messageInfo) 
    .then(message => console.log(message.sid)) 
    .done();
    return res.status(201).json(messageInfo)
    
}

module.exports = { sendWhatsapp }

