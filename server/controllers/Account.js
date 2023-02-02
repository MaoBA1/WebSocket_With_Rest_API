const mongoose = require('mongoose');
const Post = require('../models/Posts');
const Account = require('../models/Account');
const { auth } = require('../firebase');
const { 
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification
} = require('firebase/auth');

const accountEvents = (socket) => {
    
    socket.on("create_account", async(data) => {
        const {
            email,
            password,
            fname,
            lname,
            profileImage
        } = data;
        console.log(data);
        await createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
    })
}


module.exports = accountEvents;