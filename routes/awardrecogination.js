const express = require('express');
const awardrecogination = express.Router();
var Q = require("q");
var maildetail = require('./nodemail');
let AdRecog = require('../models/awardrecoginationmodel');

awardrecogination.route('/getSubmissions').get(function (req, res) {
  AdRecog.find(function (err, values) {
    if (err) {
      console.log(err);
    } else {
      res.json(values);
    }
  }).sort({ "SubmitDate": -1 });
});

awardrecogination.route('/adSubmission').post(function (req, res) {
  let adSquad = new AdRecog(req.body);
  var promises = [];

  promises.push(maildetail.getDetails(req));
  Q.all(promises).then(function (response) {
    adSquad.save()
      .then(result => {
        res.status(200).json({
          'adSquad': 'AdSquad in added successfully'
        });
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
});

awardrecogination.delete('/:id', function (req, res, next) {
  AdRecog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


awardrecogination.put('/:id', function (req, res, next) {
  AdRecog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

awardrecogination.route('/updateuser').post(function (req, res){
  let conditions = { 'Approval_id': req.body.Approval_id };
  let update = {
    $set: {
      'Status': req.body.Status
    }
  };
  AdRecog.update(conditions, update, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.json(result);
  })
});

module.exports = awardrecogination;