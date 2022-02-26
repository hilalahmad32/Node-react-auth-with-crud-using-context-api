const express = require('express');
const Post = require('../models/posts.js');
const postRouter = express.Router();


postRouter.get('/', async (req, res) => {
    const posts = await Post.find().populate();
    res.send({ posts: posts });
})

// create-post
postRouter.post('/', async (req, res) => {
    const { title, content, user_id, category } = req.body;
    const posts = new Post({
        title: title,
        content: content,
        user_id: user_id,
        category: category
    });
    const result = await posts.save();
    if (result) {
        res.send({
            status: 1,
            message: "post Create successfully"
        });
    } else {
        res.send({
            status: 0,
            message: "post Not Created successfully"
        });
    }
});

postRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Post.findByIdAndDelete({ _id: id });
    if (result) {
        res.send({
            status: 1,
            message: "Post Delete successfully"
        });
    } else {
        res.send({
            status: 0,
            message: "Post Not Deleted successfully"
        });
    }
});

// patch data by id
postRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Post.findOne({ _id: id });
    if (result) {
        res.send({
            status: 1,
            message: result,
        });
    } else {
        res.send({
            status: 0,
            message: "Post Not Deleted successfully"
        });
    }
});


postRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, category, content } = req.body;
    const result = await Post.findOneAndUpdate({ _id: id }, {
        title: title,
        content: content,
        category: category
    });
    if (result) {
        res.send({
            status: 1,
            message: "Post Update successfully"
        });
    } else {
        res.send({
            status: 0,
            message: "Post Not Updated successfully"
        });
    }
})

module.exports = postRouter;