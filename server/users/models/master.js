const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    status: {type: String, required: true},
    Created_at:{type: Date,default:Date.now},
    Updated_at:{type: Date,default:Date.now},
});

const UserMaster = model('User', UserSchema);

module.exports = UserMaster; 