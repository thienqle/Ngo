const express = require('express');
const mongoose = require('mongoose');
const router_donation_tb = express.Router();
const bodyParser = require('body-parser');
const DonationDetailTB = require('../models/Donation_TB');
const cors = require('cors');


router_donation_tb.use(bodyParser.urlencoded({extended: true}));
router_donation_tb.use(bodyParser.json());

router_donation_tb.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  router_donation_tb.use(cors());

/* Get All Dination_Detail */
router_donation_tb.get('/', function(req, res, next){
    DonationDetailTB.find(function(err, donation_all){
        if (err) return next(err);
        res.json(donation_all)
    });
});

/* Get a Single Donation_Detail */
router_donation_tb.get('/:donation_detail_id', function(req, res, next){
    let id = require.params.id;
    console.log(req.params.id);
    router_donation_tb.findById(id, function(err, donation_single){
        if (err) return next(err);
        res.json(donation_single);
    });
});

/* Save Donation Detail */
router_donation_tb.post('/', function(req, res, next){
    DonationDetailTB.create(req.body, function(err, donation_save){
        if(err) return next(err);;
        res.json(donation_save);
    });
});

/* Update Donation Detail*/
router_donation_tb.put('/:donation_detail_id', function(req, res, next){
    DonationDetailTB.findByIdAndUpdate(req.params.id, req.body,{new: true}, 
        function(err, donation_update){
            if (err) return next(err);
            res.json(donation_update);
        });
});

/* Delete Donation Detail */
router_donation_tb.delete('/:donation_detail_id', function(req, res, next){
    DonationDetailTB.findByIdAndRemove(req.params.id, function(err, donation_delete){
        if (err) return next(err);
        res.json(donation_delete);
    });
});

module.exports = router_donation_tb;

