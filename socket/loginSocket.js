const User = require('../models/user');
const Profile = require('../models/profile');
const Device = require('../models/device');
const DeviceList = require('../models/deviceList');


let loggedInUsers = {};
let loggedUsersWithoutSocket = []

/* 
to emit to the requesting socket
socket.emit()
to emit to others socket.to(id) 
*/

async function challengeSocket(io) {

    io.on('connection', function(socket) {

        socket.on('disconnect', async function() {
            console.log('disconnect!', socket.id);

            if (loggedInUsers[socket.id])
                delete loggedInUsers[socket.id]

        });


        // on play button click
        socket.on('login', async(data) => {

            const userId = data.user;
            // const user = await User.findById(userId).exec();
            loggedInUsers[socket.id] = userId;
            loggedUsersWithoutSocket.push(userId);
            console.log('user', userId)

        });

        socket.on('complete', async(data) => {

            const pairid = data.quizroom;

        });

    });
}

async function isUserOnline(req, res) {

    let device = req.query.device;
    device = device.toLowerCase();
    let userFound = false;

    const deviceList = await DeviceList.findOne({ device: device }).exec();
    const deviceOwn = await Device.find({ device: deviceList }).exec();


    for (let element of deviceOwn) {

        console.log(loggedUsersWithoutSocket[0], element.owner, loggedUsersWithoutSocket.includes(element.owner + ''))
        if (loggedUsersWithoutSocket.includes(element.owner + ''))
            userFound = true;

    }

    if (userFound) {
        console.log("Hi");
        return res.status(200).json({
            success: true,
            data: "sd"
        });

    } else {
        return res.status(200).json({
            success: true,
            data: "sd - not"
        });
    }


}


module.exports = { challengeSocket, isUserOnline }