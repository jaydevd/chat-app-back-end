/**
 * @name index
 * @file index.js
 * @throwsF
 * @description This file will contain all routes.
 * @author Jaydev Dwivedi (Zignuts)
 */

const express = require('express');
const { AuthRoutes } = require('./auth/AuthRoutes');
const { ChatRoutes } = require('./chat/ChatRoutes');

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/chat', ChatRoutes);

module.exports = { UserRoutes: router }