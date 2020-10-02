const express = require('express');
const asyncHandler = require('express-async-handler');
const { Request, User } = require('../../db/models');
const { generateToken } = require('./security-utils');
const { Op } = require("sequelize");

const router = express.Router();

router.post('/request', asyncHandler(async function (req, res, next) {
    const { toUserId, fromUserId } = req.body

    const toUser = await User.findByPk(toUserId)
    const fromUser = await User.findByPk(fromUserId)

    const toUserName = toUser.userName;
    const fromUserName = fromUser.userName
    console.log(toUserName)
    console.log(fromUserName)

    const addFriend = await Request.create({fromUserId, toUserId, toUserName, fromUserName})
    // const user = await User.findByPk(userId)
    // const friend = await User.findByPk(friendId)
    const message = 'Your friend request was sent. Once they accept it, you will be able to chat, and see their posts on your feed.';

    res.json({ message })
    return
}));

router.post('/getRequests', asyncHandler(async function (req, res, next){
    const { id } = req.body;

    const requests = await Request.findAll({ where: { toUserId: id } })
    // const fromUserId = requests.fromUserId;

    res.json({requests})
}))

router.post('/acceptRequest', asyncHandler(async function (req, res, next) {
    const { userId, friendId } = req.body;
}))

module.exports = router;
