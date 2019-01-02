const express = require('express');
const router_user_auth_tb = express.Router();
const bodyParser = require('body-parser');
const UserAuthTB = require('../models/User_Auth_TB');
const UserDetailTB = require('../models/User_Detail_TB');
const cors = require('cors');

router_user_auth_tb.use(bodyParser.urlencoded({extended: true}));
router_user_auth_tb.use(bodyParser.json());

router_user_auth_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
  });
router_user_auth_tb.use(cors());

router_user_auth_tb.get('/authid/:id',function(req,res,next){
    let id = req.params.id;
    UserAuthTB.findById(id,function(err, user_single){
            if (err) return next(err);
            res.json(user_single); 
    });
})

router_user_auth_tb.get('/detailid/:id',function(req,res,next){
    let id = req.params.id;
    UserDetailTB.findById(id,function(err, user_single){
            if (err) return next(err);
            res.json(user_single); 
    });
})


router_user_auth_tb.get('/:id',function(req,res,next){
  let username = req.params.id;
  UserAuthTB.findOne({user_name: username}, function(err, user_single){
      if (err) return next(err);
      user = user_single;
      let user_type_id = user._id;
      UserAuthTB.findById(user_type_id,function(err, user_single){
          if (err) return next(err);
          res.json(user_single); 
      });
  });
})

module.exports = router_user_auth_tb;

