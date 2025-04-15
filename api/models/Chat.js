/**
 * @name ChatModel
 * @file Chat.js
 * @throwsF
 * @description This file will define model of Users table.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const Chat = sequelize.define("Chat", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    from: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    to: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    timeStamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
    {
        tableName: "chats",
        timestamps: false
    });

module.exports = { Chat };