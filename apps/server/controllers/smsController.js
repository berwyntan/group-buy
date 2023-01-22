// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);  
const validator = require('validator');
const { User } = require('../models/models');
const dayjs = require('dayjs')

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

const sendOTP = async (req, res) => {
    const { mobile } = req.body;
    
    if (!mobile) return res.status(400).json({ 'message': 'Mobile is required.'});
    if (!validator.isLength(mobile, {min: 8, max: 8})) 
        return res.status(400).json({ 'message': 'Mobile number has 8 numbers only.'});
    if (!validator.isNumeric(mobile, {no_symbols: true})) 
        return res.status(400).json({ 'message': 'Mobile number cannot have symbols.'});

    // check user exists 
    const foundUser = await User.findOne({where: { mobile: mobile }});
    if (!foundUser) return res.status(404).json({ 'message': 'User not found.'});
    // create OTP
    const otp = 998877;
    foundUser.OTP = otp;
    // create OTP expiry
    const OTPExpiry = dayjs().add(5, 'minute')
    foundUser.OTPExpiry = JSON.stringify(OTPExpiry)
    foundUser.save()
    
    const message = `Your GroupBuy OTP is: ${otp}`;
    const messageInfo = { 
        body: message, 
        from: 'whatsapp:+14155238886',       
        to: `whatsapp:+65${mobile}` 
    }
    client.messages 
    .create(messageInfo) 
    .then(message => console.log(message.sid)) 
    .done();
    return res.status(201).json({'message': 'OTP sent'})
}

module.exports = { sendWhatsapp, sendOTP }

