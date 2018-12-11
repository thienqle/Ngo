const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name : String 
});

module.exports = mongoose.model('Donation',DonationSchema);