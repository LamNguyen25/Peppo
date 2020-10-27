
const express = require('express');
const app     = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use('/login', require('./routes/accessCode'));
// app.use('/login', require('./routes/accessCode'));

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));


