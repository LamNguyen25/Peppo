const { db } = require("../util/admin");
const express   = require('express');
const router    = express.Router();
const jwt = require('jsonwebtoken');
// Get Twilio accountID, authToekn and phone number
const config = require('./TwilioConfig.json');

// Send verification code using twilio
const client = require('twilio')(
    config.accountSid,
    config.authToken
  );
  
// Generate a random 6-digit access code then save that access code to the provided phone number
router.post('/createNewAccessCode', async (req, res) => {
    const randomAccessCode = Math.floor(100000 + Math.random() * 900000);
    var phoneNumber = '+1'.concat(req.body.phoneNumber);
    console.log(phoneNumber);
    console.log(randomAccessCode);

    await db.collection("PhoneNumbers")
        .doc(`${phoneNumber}`)
        .set({
            accessCode: randomAccessCode.toString()
    })
    .then(function() {
        console.log("Access Code was successfully saved in the database!");
        // Send SMS message
        client.messages.create({
            from: config.twilioPhoneNumber,
            to: phoneNumber,
            body: randomAccessCode.toString()
          }).then((message) => console.log(message.sid));
          
        const token = jwt.sign(
            { phoneNumber: phoneNumber },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            token: token
          });

        // return res.json({ message: "Access Code was successfully saved in the database!" });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ general: "Something went wrong, please try again" });
    })
})

router.post('/ValidateAccessCode', async (req, res) => {

    var phoneNumber = '+1'.concat(req.body.phoneNumber);
    await db.collection("PhoneNumbers")
        .doc(phoneNumber)
        .get()
        .then((doc) =>  {
            console.log(Object.values(doc.data())[0]);
            var storedAccessCode = Object.values(doc.data())[0];
            if(storedAccessCode == req.body.accessCode) { // Compare two Access codes
                db.collection("PhoneNumbers")
                .doc(phoneNumber)
                .update({ accessCode: ""})
                .then(() => {
                    return res.json({ message: "true" });
                })
                .catch((err) => {
                    return res.json({message: "false"})
                })
                
            }
            else{
                return res.json({ message: "false" });
            }
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
})

module.exports = router;