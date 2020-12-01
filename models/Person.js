const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    fullname: { type:String, default:''},
    entries: {type: Number, default:0},
    seller: { type:String, default:''}
 });


 module.exports = mongoose.model('Person',personSchema);