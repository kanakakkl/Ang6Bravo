const express = require('express');
const fetchvalues = express.Router();

let AdValue = require('../models/fetchvaluemodel');

fetchvalues.route('/getValues').get(function (req, res) {
    AdValue.find(function (err, values) {
    if (err) {
      console.log(err);
    } else {
      res.json(values);
    }
  });
});

module.exports = fetchvalues;