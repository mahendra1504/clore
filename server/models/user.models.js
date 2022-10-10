const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        first_name : {type : String, required : true},
        last_name : {type : String, required : true},
        phone : {type: String, required : true},
        email : {type : String, required : true, unique : true},
        password : {type : String, required : true},
        street : {type : String, default : null},
        city : {type : String, default : null},
        state : {type : String, default : null},
        pincode : {type : Number, maxLength: 6},
        created_at : {type : Date, required : true},
        updated_at : {type : Date, required : true},
        quote : {type : String},
    }, 
    {collection : 'auth_users'}
);

const model = mongoose.model('UserData', User)

module.exports = model