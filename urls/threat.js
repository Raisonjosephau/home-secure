const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/threat')


router.post('/save', async(req, res) => {
    controller.saveThreats(req, res);
});

router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getThreats(req, res);
});

module.exports = router;