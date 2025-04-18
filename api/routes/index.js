/**
 * @name index
 * @file index.js
 * @throwsF
 * @description This file will contain all routes.
 * @author Jaydev Dwivedi (Zignuts)
 */

const express = require('express');
const { UserRoutes } = require('./user');

const router = express.Router();

router.use('/user', UserRoutes);

module.exports = { router }