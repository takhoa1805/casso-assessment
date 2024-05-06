var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("Viewing env file: ");
  // console.log(process.env.DOMAIN);
  // console.log(process.env.PORT);
  // console.log(process.env.PAYOS_CLIENT_ID);
  res.render('index', { title: 'ejs' });
});

router.get('/success',function(req,res,next){
  res.render('success',{title:'ejs'})
})

router.get('/cancel',function(req,res,next){
  res.render('cancel',{title:'ejs'})
})

module.exports = router;
