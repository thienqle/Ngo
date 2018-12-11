const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    user_id : Number, //Foreign key
    donation_type : String,
    amount : Number,
    monthly_reoccurence : Boolean
});

module.exports = mongoose.model('Donation',DonationSchema);