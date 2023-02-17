const mongoose = require('mongoose');
const Post = require('../models/Posts');
const Account = require('../models/Account');



const recive_all_post = (socket) => {
    Post.find({})
    .then(posts => {
        return socket.emit("recive_all_post", {posts: posts});
    })
}





const postEvents = (io, socket) => {
    
    
    socket.on("create_post", (data) => {
        const {
            postAuthor,
            postContent,
            postMedia
        } = data;
        const new_post = new Post({
            _id: mongoose.Types.ObjectId(),
            postAuthor: postAuthor,
            postContent: postContent,
            postMedia: postMedia
        })
        return new_post.save()
        .then(() => {
            Post.find({})
            .then(posts => {
                if(posts) {
                    io.emit("recive_all_post", {
                        status: true,
                        posts: posts
                    })
                }
            })
        })
        .catch(error => {
            console.log(error.message);
        })
    })


    socket.on("give_like_to_post", (data) => {
        const {
            postId,
            account
        } = data;

        Post.findById(postId)
        .then(post => {
            if(post) {
                post.likes.push(account);
                return post.save()
                .then(() => {
                    Post.find({})
                    .then((posts) => {
                        return io.emit("recive_all_post", {posts: posts});
                    })                    
                })                
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    })

    socket.on("unlike_post", (data) => {
        const {
            postId,
            accountId
        } = data;
        
        Post.findById(postId)
        .then(post => {
            if(post) {
                post.likes = post.likes.filter(l => l._id.toString() !== accountId.toString());
                return post.save()
                .then(() => {
                    Post.find({})
                    .then((posts) => {
                        return io.emit("recive_all_post", {posts: posts});
                    })                    
                }) 
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    })
}


module.exports = {
    postEvents,
    recive_all_post,
};