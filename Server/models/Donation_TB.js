const mongoose = require('mongoose');


const DonationSchema = new mongoose.Schema({
    _id : Number,
    /*user_id : {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User_Type_TB'},
    */
    user_id: Number,  
    donation_type : String,
    amount : Number,
    monthly_reoccurence : Boolean
});

DonationSchema.virtual('donation_detail_id').get(function(){
    return this.id;
});

module.exports = mongoose.model('Donation_Detail_TB', DonationSchema);
/*
var Donation_Detail_TB = mongoose.model('Donation_Detail_TB', userSchema);

Donation_Detail_TB.findOne(function(err, doc) {
    console.log(doc.donation_detail_id);
});*/