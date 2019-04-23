const express = require('express');
const router  = express.Router();
const Place = require("../models/Place");
const User = require('../models/User');
const { checkConnected, checkAdmin, checkRole } = require('../middlewares')

/* GET home page */
 router.get('/', (req, res, next) => {
   Place.find().limit(6)
   .then(places =>{
     res.render('paws/home-page', {places});
   })
 });

//router.get('/', (req, res, next) => {
//  res.render('paws/home-page')
//})

router.get('/profile-view', checkConnected, (req,res,next)=>{
  User.findById(req.user._id)
  .then( (userFromDB) => {
    res.render('paws/profile-view', {userFromDB})
  })
  .catch(next)
})


// router.post('/profile-edit', checkConnected, (req, res, next) => {
//   User.create({
//     name: req.body.name,
//     password: req.body.password,
//   })
//     .then(() => {
//       res.redirect('/profile-edit')
//     })
//     .catch(next)
// })

// router.get('/sign-out', (req, res, next) => {
//   res.render('paws/sign-out')
// })

// Routes to display each place

router.get('/restaurants', (req, res, next) => {
  Place.find({category: "Restaurant"})
    .then((places) => {
      res.render('paws/restaurants', {
      places
    })
  })
  .catch(next)
})

router.get('/gardens', (req, res, next) => {
  Place.find({category: "Garden"})
    .then((places) => {
      res.render('paws/gardens', {
      places
    })
  })
  .catch(next)
})

router.get('/accomodation', (req, res, next) => {
  Place.find({category: "Accomodation"})
    .then((places) => {
      res.render('paws/accomodation', {
      places
    })
  })
  .catch(next)
})

router.get('/shopping', (req, res, next) => {
  Place.find({category: "Shopping"})
    .then((places) => {
      res.render('paws/shopping', {
      places
    })
  })
  .catch(next)
})


module.exports = router;
