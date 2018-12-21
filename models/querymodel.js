const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BravoQuery = new Schema({
    SubmissionId:{
        type : String
    },
    EmployeeName:{
        type : String
    },
    QueryType :{
        type  : String
    },   
    QueryDescription:{
        type : String
    }
},{
    collection: 'BravoQuery'
});

module.exports = mongoose.model('BravoQuery', BravoQuery);

