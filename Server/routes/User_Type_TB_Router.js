const express = require('express');
const mongoose = require('mongoose');
const router_user_type_tb = express.Router();
const bodyParser = require('body-parser');
const UserTypeTB = require('../models/User_Type_TB');
const UserAuthTB = require('../models/User_Auth_TB');
const cors = require('cors');
module.exports = router_user_type_tb;

router_user_type_tb.use(bodyParser.urlencoded({extended: true}));
router_user_type_tb.use(bodyParser.json());

router_user_type_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router_user_type_tb.use(cors());

/* Get All User Type */
router_user_type_tb.get('/', function(req, res, next){
    UserTypeTB.find(function(err, user_all){
        if (err) return next(err);
        res.json(user_all)
    });
});

/* Get a Single User Type */
router_user_type_tb.get('/username/:id', function(req, res, next){
    let username = req.params.id;
    let user;
    UserAuthTB.findOne({user_name: username}, function(err, user_single){
        if (err) return next(err);
        user = user_single;
        let user_type_id = user.user_type_id;
        UserTypeTB.findById(user_type_id,function(err, user_single){
            if (err) return next(err);
            res.json(user_single); //Send one field value only
        });
    });
});

/* Get a Single User Type */
/*router_user_type_tb.get('/:user_type_id', function(req, res, next){
    console.log(req.params.id);
    console.log(id);
    router_user_type_tb.findById(id, function(err, user_single){
        if (err) return next(err);
        res.json(user_single);
    });
});
*/
/* Save User Type */
router_user_type_tb.post('/', function(req, res, next){
    UserTypeTB.create(req.body, function(err, user_save){
        if(err) return next(err);;
        res.json(user_save);
    });
});

/* Update User Type*/
router_user_type_tb.put('/:user_type_id', function(req, res, next){
    UserTypeTB.findByIdAndUpdate(req.params.id, req.body,{new: true}, 
        function(err, user_update){
            if (err) return next(err);
            res.json(user_update);
        });
});

/* Delete User Type */
router_user_type_tb.delete('/:user_type_id', function(req, res, next){
    UserTypeTB.findByIdAndRemove(req.params.id, function(err, user_delete){
        if (err) return next(err);
        res.json(user_delete);
    });
});

module.exports = router_user_type_tb;
