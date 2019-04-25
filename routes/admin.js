const express = require('express');
const multer  = require('multer');
const router = express.Router();
const Place = require("../models/Place");
const User = require('../models/User'); 
const uploadCloud = require('../config/cloudinary')

router.get('/', (req, res, next) => {
  Place.find({isValidated: false})
    .then((places) => {
      res.render('paws/admin', { filteredPlaces: places })
    })
    .catch(next)
})

router.get('/:placeId/delete', (req,res,next)=> { 
  Place.findByIdAndDelete(req.params.placeId)
    .then(() => {
      res.redirect('/admin')
    })
    .catch(next)
})

router.get('/:placeId/validate', (req,res,next)=> { 
  Place.findByIdAndUpdate(req.params.placeId, {isValidated: true})
    .then(() => {
      res.redirect('/admin')
    })
    .catch(next)
})

module.exports = router;
