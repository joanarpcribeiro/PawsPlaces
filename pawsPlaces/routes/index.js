const express = require('express');
const router  = express.Router();
const Place = require("../models/Place");
const User = require('../models/User');
const {isConnected} = require('../middlewares')


//const { checkConnected, checkAdmin, checkRole } = require('../middlewares')

/* GET home page */
// router.get('/', (req, res, next) => {
//   Place.find()
//   .then(places =>{
//     res.render('index', {places});
//   })
// });

router.get('/', (req, res, next) => {
  res.render('paws/home-page')
})

router.get('/profile', (req, res, next) => {
  res.render('paws/profile-edit')
})

// router.post('/profile-edit', isConnected, (req, res, next) => {
//   User.create({
//     name: req.body.name,
//     password: req.body.password,
//   })
//     .then(() => {
//       res.redirect('/profile-edit')
//     })
//     .catch(next)
// })

// router.get('/sign-in', (req, res, next) => {
//   console.log('wat');
//   res.render('paws/sign-in')
// })

// router.get('/sign-out', (req, res, next) => {
//   res.render('paws/sign-out')
// })

// router.get('/sign-up', (req, res, next) => {
//   res.render('paws/sign-up')
// })

// Page to display all places


module.exports = router;
