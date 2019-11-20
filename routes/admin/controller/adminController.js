const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const hasher = require('../../users/utils/hasher')

module.exports = {
    signup: (req, res, next) => {
        if(req.validationErrors()){
            res.render('admin/adminregister')

            return
        }

        Admin.findOne({email: req.body.email})
            .then( admin => {
                if(admin) {
                    req.flash('errors', 'Admin User Already Exits')

                    return res.redirect( 301, '/api/admin/adminregister')
                } else {
                    const newAdmin = new Admin

                    newAdmin.email
                    = req.body.email
                    
                    newAdmin.profile.name = 
                    req.body.name

                    newAdmin.profile.picture = newAdmin.email

                    hasher.create(req.body.password)
                        .then( hash => {
                            newAdmin.password = hash

                            newAdmin    
                                .save()
                                .then( admin => {
                                    req.login(admin, (err) => {
                                        if(err){
                                            res.status(400).json({
                                                confirmation: false, 
                                            
                                                message: err
                                            })}else {
                                                    next()
                                            }
                                        })
                                    })

                                    .catch( err => {
                                        throw err
                                    })
                                
                                    
                                })
                                .catch( err => {
                                    throw err
                        })
                }
            }) 
            .catch( err => {
                throw err
        })
                
    },
    signin:(params) => {
        return new Promise((resolve, reject) => {
            Admin.findOne({email: params.email}) 
            
                .then(admin => {
                    if(admin){
                        bcrypt.compare(params.password, user.password)
                .then( result => {
                    if(!result){
                        let errors = {}
                        errors.message = 'Password Does Not match'

                        errors.status = 400

                        reject(errors)
                    }else {
                        resolve(admin)
                    }
                })
                    .catch(err => reject (err))
            }else {
                let errors = {}
                errors.message = 'No such Users'

                error.status = 400

                reject(errors)
            }

                    
                })
                .catch(err => reject(err))
            

        })

    }

}