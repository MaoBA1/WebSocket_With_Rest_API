const mongoose = require('mongoose');
const Account = require('../models/Account');
const Chat = require('../models/Chats');
const { getUserSocketByAccountId } = require('./Account');

const getAllChatsOfAccountByHisId = async(accountId) => {
    const account = await Account.findById(accountId);
    const accountChats = await Chat.find({ 
        participants: { 
            $in:  [
                {
                    _id: mongoose.Types.ObjectId(account?._id),
                    fname: account?.fname,
                    lname: account?.lname,
                    profileImage: account?.profileImage
                } 
            ] 
        }
    });
    return accountChats;
}


const mark_all_chat_messages_as_readed = async(firstAccount, secondAccount) => {
        const formattedSender = {
            _id: mongoose.Types.ObjectId(firstAccount._id),
            fname: firstAccount.fname,
            lname: firstAccount.lname,
            profileImage: firstAccount.profileImage
        }
        const formattedReciver = {
            _id: mongoose.Types.ObjectId(secondAccount?._id),
            fname: secondAccount.fname,
            lname: secondAccount.lname,
            profileImage: secondAccount.profileImage
        }
        const option1 = await Chat.findOne({ participants: [ formattedSender, formattedReciver] });
        const option2 = await Chat.findOne({ participants: [ formattedReciver, formattedSender] });
        const chat = option1 || option2;
        if(chat) {
            chat.messages.map(c => {
                if(c?.messageAuthor?._id.toString() === secondAccount._id.toString()) {
                    c.newMessage = false;
                }
                return c
            })
            return chat.save()
            .then((chat) => { return chat; })
        } return {};
        
}

const chatEvents = (io, socket) => {

    
    
    socket.on("get_all_chats", async(data) => {
        const { accountId } = data;
        const chtas = await getAllChatsOfAccountByHisId(accountId);
        return socket.emit("get_all_chats", { accountChats: chtas });
    })

    // private chate between two accounts

    socket.on("send_message", async(data) => {
        const {
            sender,
            reciver,
            message
        } = data;
        const formattedSender = {
            _id: mongoose.Types.ObjectId(sender._id),
            fname: sender.fname,
            lname: sender.lname,
            profileImage: sender.profileImage
        }
        const formattedReciver = {
            _id: mongoose.Types.ObjectId(reciver._id),
            fname: reciver.fname,
            lname: reciver.lname,
            profileImage: reciver.profileImage
        }
        const option1 = await Chat.findOne({ participants: [ formattedSender, formattedReciver] });
        const option2 = await Chat.findOne({ participants: [ formattedReciver, formattedSender] });
        const chat = option1 || option2;
        if(!chat) {
            const newChat = new Chat({
                _id: mongoose.Types.ObjectId(),
                chatType: "private",
                participants: [
                    formattedSender,
                    formattedReciver
                ],
                messages: [
                    {
                        _id: mongoose.Types.ObjectId(),
                        messageAuthor: {
                            _id: sender._id,
                            fname: sender.fname,
                            lname: sender.lname,
                            profileImage: sender.profileImage
                        },
                        message: message
                    }
                ]
            })
            return newChat.save()
            .then(async() => {
                const senderChats = await getAllChatsOfAccountByHisId(sender._id);
                const reciverChats = await getAllChatsOfAccountByHisId(reciver._id);
                const reciverSocket = await getUserSocketByAccountId(io, reciver._id);
                socket.emit("get_all_chats", { accountChats: senderChats });
                socket.broadcast.to(reciverSocket).emit("get_all_chats", { accountChats: reciverChats });
                
            })
        } else {
            chat.messages.map(c => {
                if(c?.messageAuthor?._id.toString() === reciver._id.toString()) {
                    c.newMessage = false;
                }
                return c
            })
            chat.messages.push({
                _id: mongoose.Types.ObjectId(),
                messageAuthor: {
                    _id: sender._id,
                    fname: sender.fname,
                    lname: sender.lname,
                    profileImage: sender.profileImage
                },
                message: message
            })
            return chat.save()
            .then(async() => {
                const senderChats = await getAllChatsOfAccountByHisId(sender._id);
                const reciverChats = await getAllChatsOfAccountByHisId(reciver._id);
                const reciverSocket = await getUserSocketByAccountId(io, reciver._id);
                socket.emit("get_all_chats", { accountChats: senderChats });
                socket.broadcast.to(reciverSocket).emit("get_all_chats", { accountChats: reciverChats });
            })
        }
    })

    socket?.on("mark_all_chat_messages_as_readed", (data) => {
        const { firstAccount, secondAccount } = data;
        mark_all_chat_messages_as_readed(firstAccount, secondAccount)
        .then(async result => {
            if(result) {
                const firstAccountChats = await getAllChatsOfAccountByHisId(firstAccount._id);
                return socket.emit("get_all_chats", { accountChats: firstAccountChats });
            }
        })
    })


    // group chat

    socket?.on("create_new_group_chat", (data) => {
        const { participants, creator, firstMessage } = data;

        const newChat = new Chat({
            _id: mongoose.Types.ObjectId(),
            chatType:"group",
            participants: participants,
            messages: [
                {
                    _id: mongoose.Types.ObjectId(),
                    messageAuthor: {
                        _id: creator._id,
                        fname: creator.fname,
                        lname: creator.lname,
                        profileImage: creator.profileImage
                    },
                    message: firstMessage
                }
            ]
        })

        return newChat.save()
        .then(async() => {
            participants.forEach(p => {
                getUserSocketByAccountId(p._id)
                .then(async currentUserSocket => {
                    if(currentUserSocket) {
                        const currentUserChats = await getAllChatsOfAccountByHisId(p._id);
                        socket.broadcast.to(currentUserSocket).emit("get_all_chats", { accountChats: currentUserChats });
                    }
                })
            })
            const currentUserChats = await getAllChatsOfAccountByHisId(creator._id);
            socket.emit("get_all_chats", { accountChats: currentUserChats });
        })
    })
    
}

module.exports = chatEvents;
