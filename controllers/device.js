const User = require('../models/user');
const Profile = require('../models/profile');
const Device = require('../models/device');
const DeviceList = require('../models/deviceList');
var logger = require('../config/logger');

async function getDevice(req, res) {
    try {
        user = req.decoded.id;
        const device = await Device.find({ owner: user, }).populate('device').exec();

        if (device && device.length) {
            res.status(200).json({
                success: true,
                data: device
            });

        } else {
            res.status(200).json({
                success: true,
                data: []
            });
        }

    } catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function saveDevice(req, res) {

    try {

        const user = req.decoded.id;
        let devicecode = req.body.device;

        const device = await DeviceList.findOne({ device: device }).exec();


        if (device) {

            const devices = await Device.create({
                owner: user,
                device: device
            });

            return res.status(200).json({
                success: true,
                data: "Device added succesfullly"
            });

        } else {
            return res.status(400).send({
                success: false,
                data: 'Device not found'
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

module.exports = { getDevice, saveDevice }