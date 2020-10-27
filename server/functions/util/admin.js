var admin = require('firebase-admin');
const config = require('./firebaseConfig');
var serviceAccount = require('./serviceAccount.json');

// admin.initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://peppo-4e1a1.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };