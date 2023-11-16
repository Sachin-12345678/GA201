const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


const {Connection } = require('./configs/db');
const { router} = require('./routes/code.route');

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send("Code Conversion Generator");
});


app.use('/api',router);

// Start server
app.listen(port, async () => {
  try {
    console.log(`Server is running on port: ${port}`);
    await Connection;
    console.log(`Connected to DB`);
  } catch (error) {
    console.log(`Error in server: ${error.message}`);
  }
});