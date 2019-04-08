const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeviceSchema = new Schema({

    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    device: { type: Schema.Types.ObjectId, ref: 'DeviceList' }

});

var Device = mongoose.model('Device', DeviceSchema);

// make this available to our users in our Node applications
module.exports = Device;