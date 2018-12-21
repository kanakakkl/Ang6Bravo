const express = require('express');
const app = express();
const addepartment = express.Router();

let AdDepartment = require('../models/adDepartment');

addepartment.route('/add').post(function (req, res) {
  let adDepartment = new AdDepartment(req.body);
  adDepartment.save()
    .then(result => {
      console.log("saved");
      res.status(200).json({
        'adDepartment': 'AdDepartment added successfully'
      });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

addepartment.route('/getDepartments').get(function (req, res) {
    AdDepartment.find(function (err, departments) {
    if (err) {
      console.log(err);
    } else {
      res.json(departments);
    }
  });
});

// // Defined edit route
// adUnitRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   AdUnit.findById(id, function (err, adUnit) {
//     res.json(adUnit);
//   });
// });

// //  Defined update route
// adUnitRoutes.route('/update/:id').post(function (req, res) {
//       AdUnit.findById(req.params.id, function (err, adUnit) {
//             if (!adUnit)
//               return next(new Error('Could not load Document'));
//             else {
//               adUnit.unit_name = req.body.unit_name;
//               adUnit.unit_price = req.body.unit_price;

//               adUnit.save().then(adUnit => {
//                     res.json('Update complete');
//                 });
//             }
//           });
//         });
        
//         // Defined delete | remove | destroy route
//         adUnitRoutes.route('/delete/:id').get(function (req, res) {
//             AdUnit.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
//                 if(err) res.json(err);
//                 else res.json('Successfully removed');
//             });
//         });
        
        module.exports = addepartment;