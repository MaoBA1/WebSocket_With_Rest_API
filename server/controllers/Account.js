const mongoose = require('mongoose');
const Post = require('../models/Posts');
const Account = require('../models/Account');


const accountEvents = (socket) => {
    socket.on("create_account", (data) => {
        const {
            email,
            fname,
            lname,
            profileImage
        } = data;
        
    })
}


module.exports = accountEvents;