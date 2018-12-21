const express = require('express');
const division = express.Router();

let AdDivision = require('../models/divisionmodel');

division.route('/getDivisions').get(function (req, res) {
    AdDivision.find(function (err, divisions) {
    if (err) {
      console.log(err);
    } else {
      res.json(divisions);
    }
  });
});

module.exports = division;