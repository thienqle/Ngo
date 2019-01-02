const mongo = require('mongoose');

const UserDetailSchema = new mongo.Schema({
    firstName: String,
    lastName: String,
    //user_type_id: Number,
    /*type: mongo.Schema.Types.ObjectId,
    ref: 'User_Type_TB'},*/
    type: Number,
    emailId: String,
    phone: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String,
    urbanization: Boolean
});

UserDetailSchema.virtual('user_detail_id').get(function(){
    return this.id;
});

module.exports = mongo.model('User_Detail_TB', UserDetailSchema);