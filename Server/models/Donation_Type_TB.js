const mongo = require('mongoose');

const DonationTypeSchema = new mongo.Schema({
    _id: Number,
    donation_type_nm: String
});

DonationTypeSchema.virtual('donation_type_id').get(function(){
    return this.id;
});

module.exports = mongo.model('Donation_Type_TB', DonationTypeSchema);  