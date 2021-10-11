const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({

    customerid:{
        type: Number,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    mobileno:{
        type: Number
    }
});
module.exports = mongoose.model("Customers", customerSchema)