/**
 * @name AuthRoutes
 * @file AuthRoutes.js
 * @throwsF
 * @description This file will route all authentication APIs.
 * @author Jaydev Dwivedi (Zignuts)
 */

const express = require('express');
const router = express.Router();
const { isUser } = require('../../../middlewares/isUser');
const { SignUp, LogIn, LogOut } = require('../../../controllers/user/auth/AuthController');

router.route('/signup')
    .post(SignUp);

router.route('/login')
    .post(LogIn)

router.route('/logout')
    .all(isUser)
    .post(LogOut);

module.exports = { AuthRoutes: router };