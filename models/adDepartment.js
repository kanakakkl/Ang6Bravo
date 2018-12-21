const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BravoDepartment = new Schema({
  dept_id: {
    type: String
  },
  dept_name: {
    type: String
  }
},{
    collection: 'BravoDepartment'
});

module.exports = mongoose.model('BravoDepartment', BravoDepartment);