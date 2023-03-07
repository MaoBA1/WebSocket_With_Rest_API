const mongoose = require('mongoose');
const Account = require('../models/Account');
const Chat = require('../models/Chats');


const chatEvents = (io, socket) => {
    socket.on("create_new_private", async(data) => {
        const creatorAccountId = socket.userId;
        const { accountId, message } = data;
        const secondChatParticipantId = accountId;
        const creator = await Account.findById(creatorAccountId);

        const newChat = new Chat({
            _id: mongoose.Types.ObjectId(),
            chatType: "private",
            participants: [
                { _id: creatorAccountId },
                { _id: secondChatParticipantId }
            ],
            messages: [
                {
                    _id: mongoose.Types.ObjectId(),
                    messageAuthor: {
                        _id: creator._id,
                        fname: creator.fname,
                        lname: creator.lname,
                        profileImage: creator.profileImage
                    },
                    message: message
                }
            ]
        })

        return newChat.save()
        .then((chat) => {
            
        })
    })
}

module.exports = chatEvents;
