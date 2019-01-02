const express = require('express');
const mongoose = require('mongoose');
const router_user_auth_tb = express.Router();
const bodyParser = require('body-parser');
const UserAuthTB = require('../models/User_Auth_TB');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router_user_auth_tb.use(bodyParser.urlencoded({extended: true}));
router_user_auth_tb.use(bodyParser.json());

router_user_auth_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
  });
router_user_auth_tb.use(cors());

/* Start Authentication */
router_user_auth_tb.post('/register',  function(req,res,next){
    var user = new UserAuthTB({
      //_id: req.body._id,
      user_name: req.body.user_name,
      user_auth_psw: UserAuthTB.hashPassword(req.body.user_auth_psw),
      user_type_id: req.body.user_type_id
    });
  
    let promise = user.save();
  
    promise.then(function(doc){
      return res.status(201).json(doc);
    })
  
    promise.catch(function(err){
      return res.status(501).json({message: 'Error registering user.'})
    })
  })
  
  router_user_auth_tb.post('/login', function(req,res,next){
    console.log("username:"); 
    console.log(req.body.username);
     let promise = UserAuthTB.findOne({user_name:req.body.username}).exec();
  
     promise.then(function(doc){
      if(doc) {
        console.log("password:"); 
        console.log(req.body.password);
        if(doc.isValid(req.body.password)){
            // generate token
            let token = jwt.sign({user_name:doc.user_name},'secret', {expiresIn : '3h'});
            return res.status(200).json(token); //if login successful it will return these token
        } else {
          return res.status(501).json({message:' Invalid Credentials'});
        }
      } else {
        return res.status(501).json({message:'Username is not registered.'})
      }
     });
  
     promise.catch(function(err){
       return res.status(501).json({message:'Some internal error'});
     })
  })
  

  router_user_auth_tb.get('/username', verifyToken, function(req,res,next){
    console.log(decodedToken);
    return res.status(200).json(decodedToken.username);
  })
  
  var decodedToken='';
  function verifyToken(req,res,next){
    let token = req.query.token;
    //let token=req.headers.authorization;
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTQ0NjQ1MTE4LCJleHAiOjE1NDQ2NTU5MTh9.rpYl6TyKNFsnVcMxYreyUiykmBhtZKZxXmCF6UDcYhQ";
    console.log(req.headers.authorization); //If using postman to send token (get informatino form header)
    jwt.verify(token,'secret', function(err, tokendata){
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }
  
/* End Authentication */

/* Get All User Type */
router_user_auth_tb.get('/', function(req, res, next){
    UserAuthTB.find(function(err, user_all){
        if (err) return next(err);
        res.json(user_all)
    });
});

/* Get a Single User Type */
router_user_auth_tb.get('/:id', function(req, res, next){
    let id = require.params.id;
    console.log(req.params.id);
    router_user_auth_tb.findById(id, function(err, user_single){
        if (err) return next(err);
        res.json(user_single);
    });
});

/* Save User Type */
router_user_auth_tb.post('/', function(req, res, next){
    UserAuthTB.create(req.body, function(err, user_save){
        if(err) return next(err);;
        res.json(user_save);
    });
});

/* Update User Type*/
router_user_auth_tb.put('/:user_name_id', function(req, res, next){
    UserAuthTB.findByIdAndUpdate(req.params.id, req.body,{new: true}, 
        function(err, user_update){
             if (err) return next(err);
            res.json(user_update);
        });
});

/* Delete User Type */
router_user_auth_tb.delete('/:id', function(req, res, next){
    console.log("Try to delete user with id: " + req.params.id);
    UserAuthTB.findByIdAndRemove(req.params.id, function(err, user_delete){
        if (err) return next(err);
        res.json(user_delete);
    });
});

module.exports = router_user_auth_tb;

