const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../socket/loginSocket')

router.get('/check', async(req, res) => {
    controller.isUserOnline(req, res);
});

module.exports = router;