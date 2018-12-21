const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let BravoComment = new Schema({
    Approval_id: {
        type: String,
        ref: 'BravoSubmission'
    },
    Commented_by: {
        type: String
    },
    Comments: {
        type: String
    },
    Commented_date: {
        type: Date
    },
    Status: {
        type: String,
        ref: 'BravoSubmission'
    },
}, {
        collection: 'BravoComment'
    });

module.exports = mongoose.model('BravoComment', BravoComment); 