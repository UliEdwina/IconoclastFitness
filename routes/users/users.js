var express = require('express');
var router = express.Router();
const passport = require('passport')

let userController = require('./controller/userController')
const User = require('./models/Users')
const signupValidation = require('./utils/signUpValidator')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signup', (req, res) => {
    if(req.isAuthenticated()) return res.redirect('/')
    res.render('auth/signup', { error_msg: null})
})
router.post('/signup', signupValidation, userController.signup)


module.exports = router;
