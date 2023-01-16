const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://tirthoraj:tirthoraj@cluster0.8in0lf2.mongodb.net/token?retryWrites=true&w=majority"
);

const tokenSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
});

const TokenModel = mongoose.model("token", tokenSchema);

module.exports = { TokenModel, connect };
