const mongoose = require('mongoose');

const UserTypeSchema = mongoose.Schema({
    id: Number,
    user_type_nm: String
});

module.exports = mongoose.model('User_Type_TB',UserTypeSchema);