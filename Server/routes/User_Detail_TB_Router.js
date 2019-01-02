const express = require('express');
const mongoose = require('mongoose');
const router_user_detail_tb = express.Router();
const bodyParser = require('body-parser');
const UserDetailTB = require('../models/User_Detail_TB');
const UserAuthTB = require('../models/User_Auth_TB');
const cors = require('cors');
module.exports = router_user_detail_tb;

router_user_detail_tb.use(bodyParser.urlencoded({extended: true}));
router_user_detail_tb.use(bodyParser.json());

router_user_detail_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router_user_detail_tb.use(cors());

/* Get All User Detail */
router_user_detail_tb.get('/', function(req, res, next){
    UserDetailTB.find(function(err, user_all){
        if (err) return next(err);
        res.json(user_all)
    });
});

/* Get a Single User Detail using username */
router_user_detail_tb.get('/username/:id', function(req, res, next){
    let username = req.params.id;
    let userDetail;
    UserAuthTB.findOne({user_name: username}, function(err, user_single){
        if (err) return next(err);
        userDetail = user_single;
        let user_type_id = userDetail._id;
        UserDetailTB.findById(user_type_id,function(err, user_single){
            if (err) return next(err);
            res.json(user_single); 
        });
    });
});

/* Get a Single User Detail */
router_user_detail_tb.get('/:id', function(req, res, next){
    let id = require.params.id;
    router_user_detail_tb.findById(id, function(err, user_single){
        if (err) return next(err);
        res.json(user_single);
    });
});

/* Save User Detail */
router_user_detail_tb.post('/', function(req, res, next){
    UserDetailTB.create(req.body, function(err, user_save){
        if(err) return next(err);;
        res.json(user_save);
    });
});

router_user_detail_tb.put('/alldetail/:id', function(req, res, next){
    UserDetailTB.findByIdAndUpdate(req.params.id,req.body,{new: true}, 
        function(err, user_update){
            if (err) return next(err);
            res.json(user_update);
        });
});

/* Update User Detail*/
router_user_detail_tb.put('/:id', function(req, res, next){
    UserDetailTB.findByIdAndUpdate(req.params.id, { $set: {firstName: req.body.firstName,
                                                           lastName: req.body.lastName,
                                                           type:req.body.type,
                                                           emailId:req.body.emailId,
                                                           phone:req.body.phone  }},{new: true}, 
        function(err, user_update){
            if (err) return next(err);
            res.json(user_update);
        });
});

/* Delete User Detail */
router_user_detail_tb.delete('/:id', function(req, res, next){
    UserDetailTB.findByIdAndRemove(req.params.id, function(err, user_delete){
        if (err) return next(err);
        res.json(user_delete);
    });
});

module.exports = router_user_detail_tb;