const mongoosh = require('mongoose');

const userSchema = new mongoosh.Schema({

    name : {
        type : String,
        require : true
    },

    email : {
        type : String,
        require : true,
        unique : true
    },

    password : {
        type : String,
        require : true
    }
},{timestamps:true});

const User = mongoosh.model('user',userSchema);
module.exports = User;