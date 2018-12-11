const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/users_auth');

router.use(bodyParser.urlencoded({extended:true})); //This will support to decode  for front end
router.use(bodyParser.json());

router.use(cors());
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET ALL */
router.get('/',function(req,res,next) {
    User.find(function (err,user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* SAVE */
router.post('/',function(req,res,next){
    User.create(req.body,function(err,user){
        if (err) return next(err);
        res.json(user);
    })
});

/* MODIFY */
router.put('/:id',function(req,res,next){
    User.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,user){
        if (err) return next(err);
        res.json(user);
    })
});

/* READ ONE  */
// The value will be pass through games then to res and we can do anything with res
router.get('/:id',function(req,res,next) {
    User.findById(req.params.id,function (err,user) {
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router;