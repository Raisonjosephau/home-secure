const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeviceListSchema = new Schema({

    device: { type: String }

});

var DeviceList = mongoose.model('DeviceList', DeviceListSchema);

// make this available to our users in our Node applications
module.exports = DeviceList;