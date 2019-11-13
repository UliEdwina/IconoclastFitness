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

router.get('/signin', (req, res) => {
    if (req.isAuthenticated()) 
    res.redirect('/')
    res.render('auth/signin')
})

router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/signin',
    failureflash: true

}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/")
})
module.exports = router;
