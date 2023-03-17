const mongoose = require('mongoose');
const Account = require('../models/Account');
const Chat = require('../models/Chats');
const { getUserSocketByAccountId } = require('./Account');

const getAllChatsOfAccountByHisId = async(accountId) => {
    const accountChats = await Chat.find({ participants: { $in:  [ {_id: mongoose.Types.ObjectId(accountId)} ] }});
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
        .then(async() => {
            // return () => {
                const firstUserchats = await getAllChatsOfAccountByHisId(creatorAccountId);
                const secondUserChats = await getAllChatsOfAccountByHisId(secondChatParticipantId);
                const socket1 = await getUserSocketByAccountId(io, creatorAccountId);
                const socket2 = await getUserSocketByAccountId(io, secondChatParticipantId);
                socket.to(socket1).emit("get_all_chats", { accountChats: firstUserchats });
                socket.broadcast.to(socket2).emit("get_all_chats", { accountChats: secondUserChats });
            // }
        })
    })

    
    socket.on("get_all_chats", async(data) => {
        const { accountId } = data;
        const chtas = await getAllChatsOfAccountByHisId(accountId);
        return socket.emit("get_all_chats", { accountChats: chtas });
    })
}

module.exports = chatEvents;
