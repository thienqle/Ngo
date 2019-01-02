const mongo = require('mongoose');

const UserTypeSchema = new mongo.Schema({
    _id: Number,
    user_type_nm: String
});

UserTypeSchema.virtual('user_type_id').get(function(){
    return this.id;
});

module.exports = mongo.model('User_Type_TB',UserTypeSchema);