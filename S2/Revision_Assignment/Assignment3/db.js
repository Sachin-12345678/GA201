const mongoose  = require('mongoose');

const Connection = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = {Connection};