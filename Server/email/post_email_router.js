const express = require('express');
const router_email = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com', //Your email 
    pass: 'yourpassword'    //Your password
  }
});

router_email.use(bodyParser.urlencoded({extended: true}));
router_email.use(bodyParser.json());

router_email.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
  });
router_email.use(cors());

router_email.post('/',function(req,res,next){
    let email = {
        from: req.body.fromEmail,
        to: req.bodyToEmails,
        subject: req.body.subject,
        text: req.body.text
    }
    transporter.sendMail(email, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})



module.exports = router_email;

