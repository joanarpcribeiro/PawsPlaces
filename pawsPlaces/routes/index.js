const express = require('express');
const router  = express.Router();
const Place = require("../models/Place");
//const { checkConnected, checkAdmin, checkRole } = require('../middlewares')

/* GET home page */
router.get('/', (req, res, next) => {
  Place.find()
  .then(places =>{
    res.render('index', {places});
  })
});

// Page to display all places


module.exports = router;
