const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    content: {
        required: true,
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
    },
    category: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;