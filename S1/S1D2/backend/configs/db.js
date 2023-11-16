const mongoose  = require('mongoose');


const Connection = mongoose.connect("mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/code_converter?retryWrites=true&w=majority");

module.exports = {Connection};