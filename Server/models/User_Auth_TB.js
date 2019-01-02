const mongo = require('mongoose');
var bcrypt = require('bcrypt');

const UserTypeSchema = new mongo.Schema({
    //_id: String,
    user_auth_psw: String,
    /*user_type_id : {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User_Type_TB'},
    */
    user_type_id: Number,    
    user_name: String    
});

UserTypeSchema.virtual('user_name_id').get(function(){
    return this.id;
});

UserTypeSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

UserTypeSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.user_auth_psw);
}
module.exports = mongo.model('User_Auth_TB', UserTypeSchema);