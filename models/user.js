const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        typre: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);