'use strict';

const UserModel = require('../models/UserModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Register',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partial-signup',
            nav: 'partial-nav'
        }
    })
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Login',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partial-login',
            nav: 'partial-nav'
        }
    })
});


router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');

})


router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(); //default 10 rounds
    const hash = bcrypt.hashSync(password, salt);
    const response = await UserModel.addUser(name, email, hash);
    if (!!response.id) {
        res.redirect('/users/login')
    } else {
        res.status(500).send('ERROR: Please try again.')
    };
    
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = new UserModel(null, null, email, password);
    const response=await user.login();
    if (!!response.isValid) {
        const {isValid, user_id, name, email} = response;

        req.session.is_logged_in = isValid;
        req.session.user_id = user_id;
        req.session.name = name;
        req.session.email = email;
        console.log(req.session)
        res.redirect('/todos')
    } else {
        res.sendStatus(403);
    }
    
});

module.exports = router