const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const hasher = require('../utils/hasher')

module.exports = {
    signup: (req, res, next) => {
        if (req.validationErrors()) {
            res.render('auth/signup')

            return
        }

        User.findOne({ email: req.body.email })
            .then( user => {
                if (user) {
                    req.flash('errors', 'User already exists')

                    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                    return res.redirect(301, '/api/users/signup')
                } else {
                    const newUser = new User
                    
                    newUser.email        = req.body.email
                    newUser.profile.name = req.body.name
                    newUser.profile.
                    
                    hasher.create(req.body.password)
                            .then( hash => {
                                newUser.password = hash

                                newUser
                                    .save()
                                    .then(user => {
                                        req.login(user, (err) => {
                                            if (err) {
                                                res.status(400).json({
                                                    confirmation: false,
                                                    message: err
                                                })
                                            } else {
                                                next()
                                                // res.redirect(301, '/')
                                            }
                                        })
                                    })
                                    .catch(err => {
                                        throw err
                                    })
                            })
                            .catch( err => {
                                throw err
                            })
                }
            } )
            .catch(err => {
                throw err
            })
    }
    
}