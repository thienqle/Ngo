const express = require('express');
const mongoose = require('mongoose');
const router_order_tb = express.Router();
const bodyParser = require('body-parser');
const OrderTB = require('../models/Order_TB');
const cors = require('cors');
module.exports = router_order_tb;

router_order_tb.use(bodyParser.urlencoded({extended: true}));
router_order_tb.use(bodyParser.json());

router_order_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router_order_tb.use(cors());

/* Get All User Detail */
router_order_tb.get('/', function(req, res, next){
    OrderTB.find(function(err, user_all){
        if (err) return next(err);
        res.json(user_all)
    });
});


/* Get a Single User Detail */
router_order_tb.get('/:id', function(req, res, next){
    let id = require.params.id;
    OrderTB.findById(id, function(err, user_single){
        if (err) return next(err);
        res.json(user_single);
    });
});

/* Save User Detail */
router_order_tb.post('/', function(req, res, next){
    OrderTB.create(req.body, function(err, user_save){
        if(err) return next(err);;
        res.json(user_save);
    });
});

router_order_tb.put('/:id', function(req, res, next){
    OrderTB.findByIdAndUpdate(req.params.id,req.body,{new: true}, 
        function(err, user_update){
            if (err) return next(err);
            res.json(user_update);
        });
});

/* Delete User Detail */
router_order_tb.delete('/:id', function(req, res, next){
    OrderTB.findByIdAndRemove(req.params.id, function(err, user_delete){
        if (err) return next(err);
        res.json(user_delete);
    });
});

module.exports = router_order_tb;