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