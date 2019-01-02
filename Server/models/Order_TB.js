const mongo = require('mongoose');


const OrderSchema = new mongo.Schema({
    fullname: String,
    date: String,    
    amount: Number,
    donationType: String,
    monthly: Boolean    
});


module.exports = mongo.model('Order_TB', OrderSchema);