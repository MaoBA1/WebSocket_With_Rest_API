const mongoose = require('mongoose');
const Account = require('../models/Account');
const Chat = require('../models/Chats');
const { getUserSocketByAccountId } = require('./Account');

const getAllChatsOfAccountByHisId = async(accountId) => {
    const accountChats = await Chat.find({ participants: { $in: [  mongoose.Types.ObjectId(accountId) ] }});
    return accountChats;
}

const chatEvents = (io, socket) => {
    socket.on("create_new_private_chat", async(data) => {
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
        .then(() => {
            return () => {
                socket.broadcast.to(getUserSocketByAccountId(creatorAccountId)).emit("get_all_chats", getAllChatsOfAccountByHisId(creatorAccountId));
                socket.broadcast.to(getUserSocketByAccountId(secondChatParticipantId)).emit("get_all_chats", getAllChatsOfAccountByHisId(secondChatParticipantId));
            }
        })
    })

    socket.on("get_all_chats", (data) => {
        const { accountId } = data;
        return socket.broadcast.to(getUserSocketByAccountId(accountId)).emit("get_all_chats", getAllChatsOfAccountByHisId(accountId));
    })
}

module.exports = chatEvents;
