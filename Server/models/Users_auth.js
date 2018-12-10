const mongoose = require('mongoose');

const userAuthSchema =  new mongoose.Schema({
    id: Number,
    username: String,
    password: String
});

module.exports = mongoose.model('User_Auth',userAuthSchema);
