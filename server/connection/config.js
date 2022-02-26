const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/simple_blog")
    .then(() => {
        console.log("connection successfully");
    })
    .catch((err) => {
        console.log(err);
    })