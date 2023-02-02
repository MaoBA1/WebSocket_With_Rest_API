const mongoose = require('mongoose');
const Post = require('../models/Posts');


const postEvents = (socket) => {
    socket.on("create_post", (data) => {
        console.log(data);
        const {
            postAuthor,
            postContent,
            postMedia
        } = data;

        const new_post = new Post({
            _id: mongoose.Types.ObjectId(),
            postAuthor,
            postContent,
            postMedia
        })
        new_post.save();
        Post.find({})
        .then(posts => {
            if(posts) {
                socket.emit("recive_all_post", {all_posts: posts})
            }
            
        })
        
        
    })
}


module.exports = postEvents;