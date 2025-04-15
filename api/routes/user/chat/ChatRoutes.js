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
const { Message } = require('./../../../controllers/user/chat/ChatController');

router.route('/chat')
    .all(isUser)
    .post(Message);

module.exports = { ChatRoutes: router };