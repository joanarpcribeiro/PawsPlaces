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

router.get('/profile-edit', (req, res, next) => {
  res.render('paws/profile-edit')
});

router.post('/profile-edit', checkConnected, (req, res, next) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
  })
    .then(() => {
      res.redirect('/profile-edit')
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

router.post('/create-place', (req,res,next)=> {
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
  .then(createdPlace => {
    console.log("The place was created, you are going to be redirected")
    res.redirect('paws/confirmation-place', {
      createdPlace
    })
  })
})


module.exports = router;
