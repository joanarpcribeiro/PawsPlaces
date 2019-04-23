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
  Place.find()
    .then((places) => {
      res.render('paws/restaurants', {
      places
    })
  })
  .catch(next)
})

router.get('/admin', (req,res,next) => {
  res.render('paws/admin')
})
//router.post('/restaurants'),(req, res, next) => {
//  res.render('paws/restaurants')
//}



module.exports = router;
