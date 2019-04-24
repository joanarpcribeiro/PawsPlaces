const express = require('express');
const multer  = require('multer');
const Picture = require('../models/Picture');
const router = express.Router();
const Place = require("../models/Place");
const User = require('../models/User'); 
const { checkConnected, checkAdmin, checkRole } = require('../middlewares')


/* GET home page */
router.get('/', (req, res, next) => {
  Place.find().limit(6)
    .then(places => {
      res.render('paws/home-page', { places });
    })
});

router.get('/profile-edit', checkConnected, (req, res, next) => {
  User.findById(req.user._id)
    .then((userFromDB) => {
      res.render('paws/profile-edit', { userFromDB })
    })
    .catch(next)
})


router.post('/profile-edit', checkConnected, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    username: req.body.username,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    location: req.body.location,
    description: req.body.description,
    password: req.body.password,
    picture: req.body.picture,
    pet: req.body.pet,
    numbPet: req.body.numbPet,
    aboutPet: req.body.aboutPet
  })
    .then(() => {
      res.redirect('/profile-view')
    })
    .catch(next)
})

// Display profile
router.get('/profile-view', checkConnected, (req, res, next) => {
  User.findById(req.user._id)
    .then((userFromDB) => {
      res.render('paws/profile-view', { userFromDB })
    })
    .catch(next)
})

// Routes to display each place

router.get('/category/:category', (req, res, next) => {
  Place.find({ category: req.params.category })
    .then((places) => {
      res.render('paws/places', {
        places
      })
    })
    .catch(next)
})

//Routes to create a new place
router.get('/create-place', (req,res,next)=> {
  res.render('paws/add-place')

})

router.post('/create-place', (req, res, next) => {
  Place.create({
    name: req.body.name,
    address: req.body.address,
    postCode: req.body.postCode,
    description: req.body.description,
    neighbourhood: req.body.neighbourhood,
    pictureURL: req.body.pictureURL,
    contactNumb: req.body.contactNumb,
    websiteURL: req.body.websiteURL,
    category: req.body.category,
    group: req.body.group,
    warning: req.body.warning
  })
  .then(() => {
    console.log("The place was created, you are going to be redirected")
    res.redirect('/confirmation-place')
  })
})

router.get('/confirmation-place', (req,res,next)=> {
  res.render('paws/confirmation-place')
})

router.get('/admin', (req, res, next) => {
  Place.find()
    .then((places) => {
      //console.log(places)
      const filteredPlaces = places.filter(one => one.isValidated === false)
      //console.log(places)
      res.render('paws/admin', { filteredPlaces })
    })
    .catch(next)
})

router.get('/admin/:placeId/delete', (req,res,next)=> { 
  Place.findByIdAndDelete(req.params.placeId)
    .then(() => {
      res.redirect('/admin')
    })
    .catch(next)
})

router.get('/admin/:placeId/validate', (req,res,next)=> { 
  Place.findByIdAndUpdate(req.params.placeId, {isValidated: true})
    .then(() => {
      res.redirect('/admin')
    })
    .catch(next)
})

module.exports = router;
