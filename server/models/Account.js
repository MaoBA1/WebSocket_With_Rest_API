const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    fname: String,
    lname: String,
    profileImage: { type: String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" },
    lastProfileImage: { type: String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" },

    friends: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            status: String
        }
    ]
})

module.exports = mongoose.model('Account', accountSchema);