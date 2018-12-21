const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

let BravoEmployee = new Schema ({

    SubmissionId : {
        type : String
    },
    EmployeeName : {
        type : String
    },
    EmployeeDepartment : {
        type : String
    },
    DollarValue :{
        type : Number
    }
    },{
        collection: 'BravoEmployee'
});

module.exports = mongoose.model('BravoEmployee',BravoEmployee);