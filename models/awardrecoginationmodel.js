const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BravoSubmission = new Schema({
    Submission_id: {
        type: String
    },
    Approval_id:{
        type: String,
        ref: 'BravoComment'
    },
    Submitter_name: {
        type: String
    },
    RecognitionNames:{
        type: String
    },
    RecognitionDepartments:{
        type: String
    },
    Site: {
        type: String
    },
    Department: {
        type: String
    },
    Category: {
        type: String
    },
    Reason: {
        type: String
    },
    SubmitDate: {
        type: Date 
    },
    Comments: {
        type: String
    },
    RecognitionType:{
        type: String
    },
    ModifiedDate: {
        type: Date
    },
    ModifiedBy: {
        type: String
    },
    Status: {
        type: String,
        ref: 'BravoComment'
    },
    ValueId: {
        type: String
    },
    Value:{
        type : String
    },
    RecognitionEmployees:{
        type: Array
    }

}, {
        collection: 'BravoSubmission'
    });

module.exports = mongoose.model('BravoSubmission', BravoSubmission);