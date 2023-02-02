const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postAuthor:{
        authorId:{type:mongoose.Schema.Types.ObjectId, ref:"Account"},
        authorName:String
    },
    postContent: String,
    postMedia:{
        mdeia:{type: Boolean, default: false},
        mediaType:String,
        url: String
    },
    creatAdt: {type: Date, default: Date.now},
});


module.exports = mongoose.model('Post', postSchema);