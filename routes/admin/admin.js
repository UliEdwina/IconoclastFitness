var express = require('express');
var router = express.Router();
const Admin = require('./models/Admin')
const passport = require('passport')
const signupValidation = require('../../routes/users/utils/signUpValidator')
const adminController = require('./controller/adminController')

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.send("resource");
});
router.get('/adminmain', (req, res) => {
   
    res.render('admin/adminmain', { error_msg: null})
})

router.post('/adminmain', 
passport.authenticate('local-login', {
    successRedirect: '/api/admin/adminmain',
    failureRedirect: '/api/admin/adminmain',
    failureflash: true
    
}))

router.get('/adminregister', (req, res, next) => {
    res.render('admin/adminregister')
})

router.post('/adminregister',  adminController.signup)

module.exports = router;