const express = require ('express'); 
const app     = express();
const addemployee = express.Router();

let AddEmployee = require('../models/addEmployee');

//get method

addemployee.route('/getemployee').get(function(req,res){
    AddEmployee.find(function(err,employees){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(employees);
        }
    });
});

module.exports = addemployee;