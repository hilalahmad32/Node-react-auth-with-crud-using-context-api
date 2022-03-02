const express = require('express');
const app = express();
const PORT =process.env.PORT || 5000;
const cors = require('cors');
require('./connection/config.js');
app.use(cors());

app.use(express.urlencoded({ extends: true }))
app.use(express.json());
app.use('/api/users', require('./routes/user.js'));
app.use('/api/posts', require('./routes/post.js'));

app.listen(PORT, () => {
    console.log(`Port is runing on http://localhost:${PORT}`);
})
