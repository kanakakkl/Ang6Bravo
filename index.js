// index.js
const cron = require("cron-scheduler");
const express = require("express");
let nodemailer = require("nodemailer");

app = express();

// create mail transporter
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

// sending emails at periodic intervals
cron({on: "*/1 * * * *"}, function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from:'webdevelopment@tecordeonindia.com',
    to: "kanakakkl@gmail.com",
    subject: `Not a GDPR update ;)`,
    text: `Hi there, this email was automatically sent by us`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});
