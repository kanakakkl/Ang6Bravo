const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BravoValue = new Schema({
  value_id: {
    type: String
  },
  nemak_value: {
    type: String
  }
},{
    collection: 'BravoValue'
});

module.exports = mongoose.model('BravoValue', BravoValue);