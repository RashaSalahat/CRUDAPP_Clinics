const mongoose = require('mongoose');

var schema = new mongoose.Schema({  //to define a shape and content of the doc
    name : {
        type : String,
        required: true
    },
    doctor : {
        type: String,
        required: true,
        
    },
    information: String,
    status : String
})

const Clinicdb = mongoose.model('clinicdb', schema);

module.exports = Clinicdb;
//user =>clinic