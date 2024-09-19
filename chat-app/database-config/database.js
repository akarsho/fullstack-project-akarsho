require('dotenv').config()
const mongo = require('mongoose');
let isConnected = false;

export const connectToDatabase = async () => {
    if(isConnected) {
        return;
    }
    try {
        await mongo.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Connected to MongoDB 'Cluster 0' database");
    } catch (err) {
        console.log("ERROR! Did not to connect to the database");
    }
};

// We can define a Schema/database for MongoDB to use
const messageSchema = new mongo.Schema({
    text: String,
    postedAt: {type: Date, default: Date.now},
});
export const Message = mongo.model.Message || mongo.model('Message', messageSchema);