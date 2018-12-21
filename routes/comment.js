const express = require('express');
const comment = express.Router();

var awardrecogRouter = require('../routes/awardrecogination');
let AdCommnent = require('../models/BravoComment');
let AdRecog = require('../models/awardrecoginationmodel');

comment.route('/getComments').get(function (req, res) {
  AdCommnent.find(function (err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});


comment.route('/addComments').post(function (req, res) {

  const io = req.app.get('io');
  const adCom = new AdCommnent(req.body);
  const adrecog = new AdRecog(req.body);
  
  adCom.save()
    .then(result => {
      console.log("saved");
      io.emit('newTaskAdded');
      res.status(200).json({
              'adCom': ' adCom added successfully'
      });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


module.exports = comment;