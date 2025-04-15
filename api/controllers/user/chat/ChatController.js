/**
 * @name AuthController
 * @file AuthController.js
 * @throwsF
 * @description The methods for sign up, log in and log out as a user.
 * @author Jaydev Dwivedi (Zignuts)
 */

const jwt = require('jsonwebtoken');
const { Chat } = require('./../../../models/index');
const Validator = require('validatorjs');
const { HTTP_STATUS_CODES } = require('./../../../config/constants');
const { io } = require('../../../config/socketHandler.js');

const Message = async (req, res) => {
    try {
        const { fromUserId, toUserId, message } = req.body;

        const result = await Chat.create({ fromUserId, toUserId, message });

        if (!result) {
            return res.status(400).json({
                status: HTTP_STATUS_CODES.CLIENT_ERROR,
                message: '',
                data: '',
                error: ''
            })
        }

        return res.status(200).json({
            status: HTTP_STATUS_CODES.SUCCESS,
            message: '',
            data: '',
            error: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: '',
            data: '',
            error: error.message
        })
    }
}

module.exports = { Message }