const express = require('express');
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
  User.findByIdAndUpdate(req.params._id, {
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
    aboutPet: req.body.aboutPet,
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
router.get('/create-place', (req, res, next) => {
  res.render('paws/create-place')

})

router.post('/create-place', (req, res, next) => {
  Place.create({
    name: req.param.name,
    address: req.param.address,
    postCode: req.param.postCode,
    description: req.param.description,
    neighbourhood: req.param.neighbourhood,
    pictureURL: req.param.pictureURL,
    contactNumb: req.param.contactNumb,
    websiteURL: req.param.websiteURL,
    category: req.param.category,
    group: req.param.group,
    warning: req.param.warning
  })
    .then(createdPlace => {
      console.log("The place was created, you are going to be redirected")
      res.redirect('/create-place', {

      })
    })
})


module.exports = router;
