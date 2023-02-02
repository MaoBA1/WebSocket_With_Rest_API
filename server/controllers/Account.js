const mongoose = require('mongoose');
const Post = require('../models/Posts');
const Account = require('../models/Account');
const { auth } = require('../firebase');
const { 
    createUserWithEmailAndPassword,
    sendEmailVerification
} = require('firebase/auth');

const accountEvents = (socket) => {
    
    socket.on("create_account", (data) => {
        const {
            email,
            password,
            fname,
            lname,
            profileImage
        } = data;
        const lowercaseEmail = email.toLowerCase();
        const formattedFname = fname[0].toUpperCase() + fname.substring(1, fname.length);
        const formattedLname = lname[0].toUpperCase() + lname.substring(1, lname.length);

        Account.findOne({ email: lowercaseEmail })
        .then(account => {
            if(account) {
                socket.emit("create_account", {message: "user has already exist"});
                return;
            } 
            const newAccount = new Account({
                _id: mongoose.Types.ObjectId(),
                email: lowercaseEmail,
                fname: formattedFname,
                lname: formattedLname,
                profileImage: profileImage
            })
            return newAccount.save()
            .then(async(new_account) => {
                await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    socket.emit("create_account", {
                        status: true,
                        account: new_account
                    });
                })
                .catch(error => {
                    socket.emit("create_account", {
                        status: false,
                        message: error.message
                    })
                })
            })
            
        })
        
    })
}


module.exports = accountEvents;