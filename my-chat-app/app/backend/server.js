require('dotenv').config();
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const mongo = require('mongoose');
const path = require('path');

// First things first, we first should probably set up Express
// We will use a Socket to actually create a connection between the users so that we can connect them to a server
const app = express();
const server = http.createServer(app);
const io = socket(server);

// We're gonna be saving the chat messages in a MongoDB database so that we can add the M part of MERN lol

mongo.connect(process.env.MONGO_URL).then(() => console.log("Mongo connected!")).catch(e => console.log(e));
const chatSchema = new mongo.Schema({
    contents: String,
    created: {type: Date, default: Date.now}
});

const Message = mongo.model('Message', chatSchema);

// Get every single message in the MongoDB database to be displayed in our browser

app.get('/api/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

// Handle connections from users
io.on('connection', async (message) => {
    const message = new Message({contents: message});
    
});




