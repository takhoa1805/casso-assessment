var express = require('express');
var router = express.Router();

// CHECKOUT PAGE
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs' });
});

// SUCCESS PAGE
router.get('/success',function(req,res,next){
  res.render('success',{title:'ejs'})
})

// CANCEL PAGE
router.get('/cancel',function(req,res,next){
  res.render('cancel',{title:'ejs'})
})

module.exports = router;
