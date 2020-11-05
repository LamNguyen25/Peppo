const functions = require('firebase-functions');
const express = require('express');
const app     = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.post('/login', require('./routes/accessCode'));

// const port = process.env.port || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// exports.app = functions.https.onRequest(app);
exports.app = functions.region('us-central1').https.onRequest(app);
