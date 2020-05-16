const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const UserDB = require('../../DB/UserDb');

const secretOrKey = "secert";

router.route('/register').post(function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    UserDB.findOne( { email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'email already exist'});
            }else {
                let newUser = new UserDB({
                    email: req.body.email,
                    password: req.body.password
                });
//password hash before saving in DB
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));                
                    });
                });
            }
        });
});

router.route('/login').post(function (req, res) {

    const {errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let email = req.body.email;
    let password = req.body.password;

    UserDB.findOne({ email })
    .then(user => {
        if(!user){
            res.status(400).json({email: 'userid does not exist' });
        }
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch) {
               let payload = {
                   id: user.id
               };
                jwt.sign(
                    payload,
                    secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }   
        });             
    });
});   

module.exports=router;