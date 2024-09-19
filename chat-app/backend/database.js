import mongo from 'mongoose'
let isConnected = false;

export const connectToDatabase = async () => {
    if(isConnected) {
        return;
    }
    try {

    } catch (err) {
        console.log("Failed to connect to the database")
    }
}