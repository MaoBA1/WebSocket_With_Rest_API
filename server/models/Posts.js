const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postAuthor:{
        _id: {type:mongoose.Schema.Types.ObjectId, ref:"Account"},
        email: String,
        fname: String,
        lname: String,
        profileImage: String
    },
    postContent: String,
    postMedia:{
        mediaExist:{type: Boolean, default: false},
        media: [
            {
                mediaType:String,
                downloadUrl: String,
                name: String
            }
        ]
    },
    likes: [
        {
            _id: {type:mongoose.Schema.Types.ObjectId, ref:"Account"},
            email: String,
            fname: String,
            lname: String,
            profileImage: String
        }
    ],  
    comments: [
        {
            comment: String,
            commentAuthor: {
                _id: {type:mongoose.Schema.Types.ObjectId, ref:"Account"},
                email: String,
                fname: String,
                lname: String,
                profileImage: String
            },
            creatAdt: {type: Date, default: Date.now}
        }
    ],
    creatAdt: {type: Date, default: Date.now},
    
});


module.exports = mongoose.model('Post', postSchema);