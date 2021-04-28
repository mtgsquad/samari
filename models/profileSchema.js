const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    sCoins: { type: Number, default: 500},
    bank: { type: Number},
    role: {type: String, default: 'user'},
	warns: { type: Number, default: 0}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;