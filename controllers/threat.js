const User = require('../models/user');
const Threats = require('../models/threats');
const Device = require('../models/device');
var logger = require('../config/logger');
const uploadUtil = require('../util/_newsfeedUpload');

async function getThreats(req, res) {
    try {

        user = req.decoded.id;
        device = req.query.device;

        if (device) {

            let threats = await Threats.findOne({ _id: device }).populate('device').exec();

            return res.status(200).json({
                success: true,
                data: threats
            });

        } else {
            return res.status(200).json({
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

async function saveThreats(req, res) {

    try {
        uploadUtil.upload(req, res, async(err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
                });
            }

            let device = req.query.device;
            device = device.toLowerCase();
            const deviceOwn = await Device.find({ device: device }).exec();

            if (device) {
                const itemList = await ItemList.create({
                    device: deviceOwn,
                    pic: `media/${req.files[0].filename}`
                });


                res.status(200).json({
                    success: true,
                    data: itemList
                });

            } else {

                return res.status(400).send({
                    success: false,
                    message: 'Bad request'
                });
            }
        });

    } catch (error) {
        logger.error(error.message, error);

        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

module.exports = { getThreats, saveThreats }