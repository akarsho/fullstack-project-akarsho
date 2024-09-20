require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

let isConnected = false;

// connection loop for mongo...
const connectToDatabase = async () => {
    if (isConnected) {
        return ;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Connected to \'Cluster 0\' from MongoDB!");
    } catch (err) {
        console.log("", err, ": Did not connect to MongoDB!");
    }
};

// creating message schema to insert in the db
const messageSchema = new mongoose.Schema({
    text: String,
    postedAt: {type: Date, default: Date.now},
});

const Message = mongoose.model('Message', messageSchema);

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }));
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

app.get('/test', (req, res) => {
    res.send('Server is running!');
});
// let's first connect to MongoDB
connectToDatabase();

// then, let's start handling user connections
io.on('connection', (socket) => {
    console.log("A new user has connected to the server!");

    // Send all messages to the client (the NextJs app)
    Message.find().then((messages) => {
        socket.emit('loadMessages', messages);
    });
    // Listen for new messages from the NexJS client, update the database accordingly
    socket.on('sendMessage',  async (msg) => {
        console.log('Received message:', msg);
        try {
            console.log('hello hello hello');
            const newMessage = new Message({text: msg});
            await newMessage.save();
            // this will push the Schema into the database
            io.emit('sendMessage', newMessage); //broadcasts to nextJs to be updated over there
        } catch (err) {
            console.log("Error saving/sending the message to client", err);
        }
    });

    // Handle any disconnections
    socket.on('disconnect', () => {
        console.log('A User has disconnected');
    });

});

const PORT = 3001;
server.listen(PORT, () => {console.log("Server running on port:", PORT)});