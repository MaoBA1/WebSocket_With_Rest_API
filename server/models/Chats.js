const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chatType: String,
    participants: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }],
    messages: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            messageAuthor:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Account"
            },
            newMessage: { type: Boolean, default: true },
            message: String,
            creatAdt: {type: Date, default: Date.now},
        }
    ]
})


module.exports = mongoose.model('Chat', chatSchema);