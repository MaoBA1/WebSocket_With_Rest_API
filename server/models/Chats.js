const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chatType: String,
    participants: [
        {_id: {type:mongoose.Schema.Types.ObjectId, ref:"Account"}}
    ],
    messages: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            messageAuthor:{
                _id: {type:mongoose.Schema.Types.ObjectId, ref:"Account"},
                fname: String,
                lname: String,
                profileImage: String,
            },
            message: String,
            creatAdt: {type: Date, default: Date.now},
        }
    ]
})


module.exports = mongoose.model('Chat', chatSchema);