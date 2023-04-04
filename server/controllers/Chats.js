const mongoose = require('mongoose');
const Account = require('../models/Account');
const Chat = require('../models/Chats');
const { getUserSocketByAccountId } = require('./Account');

const getAllChatsOfAccountByHisId = async(accountId) => {
    return new Promise((resolve, reject) => {
        Chat.find({"participants": accountId})
          .populate("participants")
          .populate({
            path: "messages",
            populate: {
              path: "messageAuthor",
              model: "Account"
            }
          })
          .exec((err, chats) => {
            if (err) {
              reject(err);
              return;
            }
    
            resolve(chats);
        });
    });
}

const getChatById = async(chatId) => {
    return new Promise((resolve, reject) => {
        Chat.findById(chatId)
          .populate("participants")
          .populate({
            path: "messages",
            populate: {
              path: "messageAuthor",
              model: "Account"
            }
          })
          .exec((err, chats) => {
            if (err) {
              reject(err);
              return;
            }
    
            resolve(chats);
        });
    });
}


const mark_all_chat_messages_as_readed = async(chatId, currentUserAccountId) => {
    const chat = await getChatById(chatId);
    chat?.messages.map(c => {
        if(c?.messageAuthor?._id.toString() !== currentUserAccountId.toString()) {
            c.newMessage = false;
        }
        return c
    })
    return chat?.save()
    ?.then((chat) => { return chat; })
}

const chatEvents = (io, socket) => {

    socket.on("get_all_chats", async(data) => {
        const { accountId } = data;
        const chtas = await getAllChatsOfAccountByHisId(accountId);
        return socket.emit("get_all_chats", { accountChats: chtas });
    })

    // private chate between two accounts
    socket.on("send_first_private_message", async(data) => {
        const { accountId1, accountId2, message } = data;
        const newChat = new Chat({
            _id: mongoose.Types.ObjectId(),
            chatType: "private",
            participants: [ accountId1, accountId2 ],
            messages: [{
                _id: mongoose.Types.ObjectId(),
                messageAuthor: accountId1,
                message: message
            }]
        }) 
        return newChat.save()
        .then(async() => {
            const account1Chats = await getAllChatsOfAccountByHisId(accountId1);
            const account2Chats = await getAllChatsOfAccountByHisId(accountId2);
            const account2Socket = await getUserSocketByAccountId(io, accountId2);
            socket.emit("get_all_chats", { accountChats: account1Chats });
            socket.broadcast.to(account2Socket).emit("get_all_chats", { accountChats: account2Chats });
        })

    })

    socket.on("send_private_message", async(data) => {
        const { chatId, message, accountId1, accountId2 } = data;
        const chat = await getChatById(chatId);
        chat.messages.map(c => {
            if(c?.messageAuthor?._id.toString() === accountId2.toString()) {
                c.newMessage = false;
            }
            return c
        })
        chat.messages.push({
            _id: mongoose.Types.ObjectId(),
            messageAuthor: accountId1,
            message: message
        })
        return chat.save()
        .then(async() => {
            const account1Chats = await getAllChatsOfAccountByHisId(accountId1);
            const account2Chats = await getAllChatsOfAccountByHisId(accountId2);
            const account2Socket = await getUserSocketByAccountId(io, accountId2);
            socket.emit("get_all_chats", { accountChats: account1Chats });
            socket.broadcast.to(account2Socket).emit("get_all_chats", { accountChats: account2Chats });
        })
    })

   // group chat
    socket?.on("create_new_group_chat", (data) => {
        const { participants, creatorId, firstMessage } = data;

        const newChat = new Chat({
            _id: mongoose.Types.ObjectId(),
            chatType:"group",
            participants: [...participants, creatorId],
            messages: [
                {
                    _id: mongoose.Types.ObjectId(),
                    messageAuthor: creatorId,
                    message: firstMessage
                }
            ]
        })

        return newChat.save()
        .then(async(chat) => {
            participants.forEach(p => {
                getUserSocketByAccountId(io, p)
                .then(async currentUserSocket => {
                    if(currentUserSocket) {
                        const currentUserChats = await getAllChatsOfAccountByHisId(p);
                        socket.broadcast.to(currentUserSocket).emit("get_all_chats", { accountChats: currentUserChats });
                    }
                })
            })
            const currentUserChats = await getAllChatsOfAccountByHisId(creatorId);
            socket.emit("get_all_chats", { accountChats: currentUserChats });
        })
    })
    


    socket?.on("mark_all_chat_messages_as_readed", (data) => {
        const { chatId, currentUserAccountId } = data;
        mark_all_chat_messages_as_readed(chatId, currentUserAccountId)
        .then(async result => {
            if(result) {
                const firstAccountChats = await getAllChatsOfAccountByHisId(currentUserAccountId);
                return socket.emit("get_all_chats", { accountChats: firstAccountChats });
            }
        })
    })
}

module.exports = chatEvents;
