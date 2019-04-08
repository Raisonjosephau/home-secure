const User = require('../models/user');
const Firebase = require('../models/firebase');
var logger = require('../config/logger');

async function addFCMToken(req, res) {
    try {
        user = req.decoded.id;
        device = req.body.device;
        fcmtoken = req.body.fcm;

        if (device && fcmtoken) {

            let firebase = await Firebase.findOne({ device_id: device }).exec();
            if (firebase) {
                firebase.owner = user;
                firebase.fcm_token = fcmtoken;
                await firebase.save();
            } else {
                firebase = await Firebase.create({

                    owner: user,
                    device_id: device,
                    fcm_token: fcmtoken
                });
            }
            return res.status(200).json({
                success: true,
                data: "saved"
            });

        } else {
            return res.status(200).json({
                success: true,
                message: "Bad request"
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



module.exports = { addFCMToken }