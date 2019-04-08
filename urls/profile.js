const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/profile')

/**
 * Request for first time registeration
 *
 * @param {!string} email
 * @param {!string} location 
 * @param {!string} skill 
 * 
 * Note that the token it return will expire in 5m
 */
router.post('/create', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.createProfile(req, res);
});


/**
 * Request to get profile 
 * 
 */

router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getProfile(req, res);
});



module.exports = router;