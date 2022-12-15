
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb!')
});


// Routes
app.use('/api/auth', require('./Routes/AuthRouter'));
app.use('/api/users', require('./Routes/UserRouter'));
app.use('/api/posts', require('./Routes/PostRouter'));
app.use('/api/comments', require('./Routes/CommentRouter'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
})