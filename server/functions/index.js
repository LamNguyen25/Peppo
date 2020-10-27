const functions = require('firebase-functions');
const express = require('express');
const app     = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use('/login', require('./routes/accessCode'));

// const port = process.env.port || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
app.get('/time', (req, res) => {
    res.send(`${Date.now()}`);
});

// exports.app = functions.https.onRequest(app);
exports.app = functions.region('us-east1').https.onRequest(app);
