const User = require('../models/user');
const Profile = require('../models/profile');
var logger = require('../config/logger');

async function getProfile(req, res) {
    try {
        user = req.decoded.id;
        const profile = await Profile.findOne({ user: user, }).populate('user').exec()
        if (profile) {
            res.status(200).json({
                success: true,
                data: profile
            });
        } else {
            res.status(200).json({
                success: true,
                data: []
            });
        }

    } catch (eroor) {
        logger.error(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function createProfile(req, res) {
    try {
        const user = req.decoded.id;
        let email = req.body.email;
        let location = req.body.location;

        if (email && location) {


            let updatedProfile
            const profile = await Profile.findOne({ user: user }).exec();
            if (profile) {
                profile.email = email;
                profile.skill = skill;
                profile.location = location;
                updatedProfile = await profile.save();
            } else {
                updatedProfile = await Profile.create({
                    user: user,
                    email: email,
                    skill: skill,
                    location: location
                });
            }

            return res.status(200).json({
                success: true,
                data: updatedProfile
            });

        } else {
            return res.status(400).send({
                success: false,
                message: 'Bad request'
            });
        }

    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function addDevice(req, res) {

    try {

        user = req.decoded.id;
        device = req.body.device;

        const profile = await Profile.findOne(user = user).exec();

        if (profile) {
            let devices = profile.device;
            deivces.push(device);
            profile.device = devices;

            let savedProfile = await profile.save();
            res.status(200).json({
                success: true,
                data: "data saved"
            });

        } else {

            const savedProfile = await Profile.create({
                user: user,
                device: [device]
            });
            res.status(200).json({
                success: true,
                data: "data saved"
            });

        }

    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}


module.exports = { getProfile, createProfile }