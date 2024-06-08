const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    country: {
        type: String
    },
    postalCode: {
        type: String
    },
    isDefault: {
    	type: Boolean,
        default: false
    },
    pinLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    }
});

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'First Name is required']
    },
    lastName:{
        type: String,
        required: [true, 'Last Name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    userImage: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile Number is required']
    },
    addresses: [addressSchema] // Array of addresses
});

module.exports = mongoose.model("User", userSchema);