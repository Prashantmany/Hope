const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HopeSchema = new Schema({
    Blog_Header: {
        type:String,
        required: true
    },
    Blog_Body: {
        type:String,
        required: true
    },
    Blog_Date: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HopeDB', HopeSchema);