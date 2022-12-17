
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {Server} = require('socket.io');
const SocketServer = require('./socketServer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket
const http = require('http').createServer(app);
//const io = require('socket.io')(http);
const io = new Server(http, {
    cors:{
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PATCH']
    }
});

io.on('connection', socket => {
    SocketServer(socket);
});

//Database
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
app.use('/api/notify', require('./Routes/NotifyRouter'));


http.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
})