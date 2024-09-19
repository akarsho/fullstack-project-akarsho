const mongoose = require('mongoose');

let isConnected = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        return ;
    }

    try {

    } catch (err) {
        console.log("", error, ": Did not connect to MongoDB!");
    }
}