const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String },
    location: { type: String }

});

var Profile = mongoose.model('Profile', ProfileSchema);

// make this available to our users in our Node applications
module.exports = Profile;