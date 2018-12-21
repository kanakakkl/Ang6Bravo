const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BravoDivision = new Schema({
  div_id: {
    type: String
  },
  div_name: {
    type: String
  }
},{
    collection: 'BravoDivision'
});

module.exports = mongoose.model('BravoDivision', BravoDivision); 