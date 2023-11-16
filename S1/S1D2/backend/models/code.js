const mongoose = require("mongoose");

const ConversionSchema = mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  convertedCode: {
    type: String,
    required: true,
  }
});

const codeConversionModel = mongoose.model("Codes",ConversionSchema);

module.exports = { codeConversionModel };