const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FirebaseSchema = new Schema({

    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    device_id: { type: String },
    fcm_token: { type: String }

});

var Firebase = mongoose.model('Firebase', FirebaseSchema);

// make this available to our users in our Node applications
module.exports = Firebase;