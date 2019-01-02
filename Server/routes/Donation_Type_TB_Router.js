const express = require('express');
const mongoose = require('mongoose');
const router_donation_type_tb = express.Router();
const bodyParser = require('body-parser');
const DonationTypeTB = require('../models/Donation_Type_TB');
const cors = require('cors');


router_donation_type_tb.use(bodyParser.urlencoded({extended: true}));
router_donation_type_tb.use(bodyParser.json());

router_donation_type_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router_donation_type_tb.use(cors());

/* Get All Dination Type */
router_donation_type_tb.get('/', function(req, res, next){
    DonationTypeTB.find(function(err, donation_all){
        if (err) return next(err);
        res.json(donation_all)
    });
});

/* Get a Single Donation Type */
router_donation_type_tb.get('/:id', function(req, res, next){
    let id = require.params.id;
    
    DonationTypeTB.findById(id, function(err, donation_single){
        if (err) return next(err);
        res.json(donation_single);
    });
});

/* Save Donation Type */
router_donation_type_tb.post('/', function(req, res, next){
    DonationTypeTB.create(req.body, function(err, donation_save){
        if(err) return next(err);;
        res.json(donation_save);
    });
});

/* Update Donation Type*/
router_donation_type_tb.put('/:donation_type_id', function(req, res, next){
    DonationTypeTB.findByIdAndUpdate(req.params.id, req.body,{new: true}, 
        function(err, donation_update){
            if (err) return next(err);
            res.json(donation_update);
        });
});

/* Delete Donation Type by ID */
router_donation_type_tb.delete('/:donation_type_id', function(req, res, next){
    DonationTypeTB.findByIdAndRemove(req.params.id, function(err, donation_delete){
        if (err) return next(err);
        res.json(donation_delete);
    });
});

module.exports = router_donation_type_tb;