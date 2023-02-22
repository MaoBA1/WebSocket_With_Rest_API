const express = require('express');
const router = express.Router();
const bycryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const Post = require('../models/Posts');
const Account = require('../models/Account');


const { auth } = require('../firebase');
const { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} = require('firebase/auth');


const register = (request, response) => {
    const {
        email,
        password,
        fname,
        lname,
        profileImage
    } = request.body;

    const lowercaseEmail = email.toLowerCase();
    const formattedFname = fname[0].toUpperCase() + fname.substring(1, fname.length);
    const formattedLname = lname[0].toUpperCase() + lname.substring(1, lname.length);


    Account.findOne({ email: lowercaseEmail })
        .then(account => {
            if(account) {
                return response.status(200).json({
                    status: false,
                    message: "user has already exist"
                });
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
                    sendEmailVerification(auth?.currentUser);
                    return response.status(200).json({
                        status: true,
                        account: new_account
                    });
                })
                .catch(error => {
                    return response.status(403).json({
                        status: false,
                        message: error.message
                    })
                })
            })
        })
}

const login = (request, response) => {
    const { email, password } = request.body;
        Account.findOne({email: email})
        .then(account => {
            if(account) {
                signInWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    // if(!auth?.currentUser?.emailVerified) {
                    //     return socket.emit("login", {
                    //         status:false,
                    //         message: `Your account is not verified`
                    //     })
                    // } 
                    // socket.account = account;
                    // recive_all_post(socket);
                    const token = await jwt.sign({id: account._id},"A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF");
                    return response.status(200).json({
                        status:true,
                        account: token
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    return response.status(200).json({
                        status:false,
                        message: "Wrong Password"
                    })
                })
            } else {
                return response.status(403).json({
                    status:false,
                    message: `There is no account like ${email}`
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

const forget_password = (request, response) => {
    const { email } = request.body;
        Account.findOne({ email: email })
        .then(account => {
            if(account) {
                sendPasswordResetEmail(auth, email)
                .then(() => {
                    return response.status(200).json({
                        status:true,
                        message: `Mail to reset your password was sent to ${email}`
                    })
                })
            } else {
                return response.status(403).json({
                    status:false,
                    message: `There is no account like ${email}`
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}



const { recive_all_post, recive_user_posts } = require('./Posts');

const accountEvents = (io, socket) => {
    
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
                return socket.emit("create_account", {
                    status: false,
                    message: "user has already exist"
                });
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
                    sendEmailVerification(auth?.currentUser);
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

    socket.on("login", (data) => {
        const { email, password } = data;
        Account.findOne({email: email})
        .then(account => {
            if(account) {
                signInWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    // if(!auth?.currentUser?.emailVerified) {
                    //     return socket.emit("login", {
                    //         status:false,
                    //         message: `Your account is not verified`
                    //     })
                    // } 
                    socket.account = account;
                    recive_all_post(socket);
                    return socket.emit("login", {
                        status:true,
                        account: account
                    })
                })
                .catch(error => {
                    return socket.emit("login", {
                        status:false,
                        message: "Wrong Password"
                    })
                })
            } else {
                return socket.emit("login", {
                    status:false,
                    message: `There is no account like ${email}`
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    })

    socket.on("forget_password", (data) => {
        const { email } = data;
        Account.findOne({ email: email })
        .then(account => {
            if(account) {
                sendPasswordResetEmail(auth, email)
                .then(() => {
                    return socket.emit("forget_password", {
                        status:true,
                        message: `Mail to reset your password was sent to ${email}`
                    })
                })
            } else {
                return socket.emit("forget_password", {
                    status:false,
                    message: `There is no account like ${email}`
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    })

    socket.on("change_profile_image", (data) => {
        const accountId = data.account._id;
        const newImageUrl = data.newImageUrl;

        Account.findById(accountId)
        .then(account => {
            account.lastProfileImage = account.profileImage;
            account.profileImage = newImageUrl;
            return account.save()
            .then(account_updated => {
                return socket.emit("auth_user", { account: account_updated });        
            })
            .catch(error => {
                console.log(error.message);
            })
        })
        .catch(error => {
            console.log(error.message);
        })
    })

    socket.on("cancel_change_profile_image", (data) => {
        const accountId = data.account._id;
        Account.findById(accountId)
        .then(account => {
            account.profileImage = account.lastProfileImage;
            return account.save()
            .then(account_updated => {
                return socket.emit("auth_user", { account: account_updated });        
            })
            .catch(error => {
                console.log(error.message);
            })
        })
        .catch(error => {
            console.log(error.message);
        })
    })
    
}


module.exports = {
    accountEvents,
    register,
    login,
    forget_password
};