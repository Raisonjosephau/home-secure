const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ThreatSchema = new Schema({

    device: { type: Schema.Types.ObjectId, ref: 'Device' },
    pic: { type: String },
    created_at: { type: Date, default: Date.now },

});

// we need to create a model using it
var Threat = mongoose.model('Threat', ThreatSchema);

// make this available to our users in our Node applications
module.exports = Threat;