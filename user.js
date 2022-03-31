// Model created for user object. Mongoose library is used to facilate easier coding.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   userName: String,
   email: String,
   password: String,
   verifyPassword: String,
   accountType: String,
   phone: String
});

module.exports = mongoose.model('User', userSchema);