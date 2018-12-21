const express = require('express');
const nodemailer = require('nodemailer');
var fs = require('fs');
var mailDetail = {};
var Q = require("q");

mailDetail.getDetails = function (req) {
    var deferred = Q.defer();
    var FormalMailOptionList = 'kanakakkl@gmail.com,mounikamm404@gmail.com,manikanta@tecordeonindia.com';
    var spotMailOptionList = 'kanakakkl@gmail.com';
    
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'webdevelopment@tecordeonindia.com',
            pass: '@lakshmi1992'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"NodeMailer Contact" <webdevelopment@tecordeonindia.com>', // sender address
        to: (req.body.RecognitionType == "Formal")?  FormalMailOptionList : spotMailOptionList,// list of receivers
        subject: 'Approval Request',
        text: 'Hi',
        html: getEmailTemplateForFeatures(req)
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    var MailstatusId = info.messageId;
    deferred.resolve(MailstatusId);
    return deferred.promise;
    });
}


var getEmailTemplateForFeatures = function(req) {
    let DollarValue;
    let tempStr = fs.readFileSync(process.cwd()+'/mailtemplates/approvaltemplate.html','utf8');
            DollarValue = (req.body.RecognitionType == "Formal")?  "$10" : "$5";
    return tempStr.replace('rewardedvalue', DollarValue).replace('RecognitionType', req.body.RecognitionType).replace('ReasonValue', req.body.Reason)
                  .replace('RecognitionDepartments', req.body.RecognitionDepartments)
                  .replace('RecognitionNames', req.body.RecognitionNames)
                  .replace('Submitter_name', req.body.Submitter_name);
}

module.exports = mailDetail;