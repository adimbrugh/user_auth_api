const mongosse = require('mongoose');
//const { token } = require('morgan');
const validator = require('validator');
const userRoles = require('../utils/userRoles');



const userSchema = new mongosse.Schema ({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'filed must be a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        default:"uploads/profile.png"
    }

});


module.exports = mongosse.model('User', userSchema);