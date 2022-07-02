const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascarponeOrderSchema  = new Schema({
    orderID: {type: Number, required: true},
    userEmail: {type: String, required: true},
    coffee: {type: Number, required: true},
    tea: {type: Number, required: true},
    espresso: {type: Number, required: true},
    hamburger: {type: Number, required: true},
    iceCream: {type: Number, required: true},
    value: {type: Number, required: true},
})

module.exports = mongoose.model('MascarponeOrder', mascarponeOrderSchema)