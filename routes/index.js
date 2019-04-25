const express = require('express');
const multer  = require('multer');
const router = express.Router();
const Place = require("../models/Place");
const User = require('../models/User'); 
const uploadCloud = require('../config/cloudinary');


/* GET home page */
router.get('/', (req, res, next) => {
      res.render('paws/home-page');
})

router.get('/profile-edit', (req, res, next) => {
  res.render('paws/profile-edit', { user: req.user })
})

router.post('/profile-edit', (req, res, next) => {
  const { username,
    name,
    lastName,
    email,
    location,
    description,
    password,
    pet,
    numbPet,
    aboutPet} = req.body
		console.log("TCL: req.body", req.body)

    const updates = {username,
      name,
      lastName,
      email,
      location,
      description,
      password,
      pet,
      numbPet,
      aboutPet}

  User.findByIdAndUpdate(req.user._id, updates)
    .then(() => {
      res.redirect('/profile-view')
    })
    .catch(next)
})


// Display profile
router.get('/profile-view', (req, res, next) => {
  res.render('paws/profile-view', { user: req.user })
})

// Routes to display each place

router.get('/category/:category', (req, res, next) => {
  Place.find({ category: req.params.category, isValidated: true })
    .then((places) => {
      res.render('paws/places', {
        places,
        category: req.params.category
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


router.post('/upload', uploadCloud.single('photo'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    picture: req.file.url
  })
  .then(() =>{
    res.redirect('/profile-view')
  })
});


module.exports = router;
