const express = require ('express'); 
const app     = express();
const submitquery = express.Router();

let SubmitQuery = require('../models/querymodel');

//post method
submitquery.route('/addQuery').post(function (req, res) {
    let adQuery = new SubmitQuery(req.body);
    console.log("adQuery",adQuery);
    console.log("reqbody",req.body);
    adQuery.save()
      .then(result => {
        console.log("saved");
        res.status(200).json({
          'adQuery': 'adQuery added successfully'
        });
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });


  //get method
  submitquery.route('/getQuery').get(function (req, res) {
    SubmitQuery.find(function (err, departments) {
    if (err) {
      console.log(err);
    } else {
      res.json(departments);
    }
  });
});
  
module.exports = submitquery;