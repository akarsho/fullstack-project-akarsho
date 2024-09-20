# Akarsh's Chill Chat Room
### Deliverable for Onboarding at FullStack @ Brown University
*Message to Full Stack @ Brown: Please accept me!*

This is a simple real-time chat application built with **Node.js**, **Express**, **MongoDB**, and **Next.js**. It allows users to send and receive messages in real-time with random usernames assigned to each user. All messages are stored in a MongoDB database and retrieved when users connect. Backend is based on Node.js, Express, MongoDB for database, and Next.JS and React for
the frontent of the server.

## Features

- Real-time chat
- Each user is assigned a random username (`User{RandomNumber}`) upon connecting.
- Messages are stored in a MongoDB db
- Message format: `"Anon, at HH:MM:SS, said: message"`.
- Messages are broadcasted to all connected users
- Persistent message history that loads when users reconnect.

## Preview 
![image](./chat-app/app/images/test.png)

## So... how do I run it?
1) First of all, my ".env" file is in .gitignore, so you will not be able to access my database as my key has my credentials in it.
2) You should first navigate yourself to `chat-app/app` and execute the following:
    - `touch .env` or `cd > .env`
    -  Then, add your mongoDB authentication URL in this format:               
    ```js
    MONGO_URL=mongodb+srv://{username}:{password}@cluster0.xyz.mongodb.net/?retryWrites=true&w=majority&appName=ClusterName
    ```
    - Congrats, now you can start with the actual running.
3) Run `npm install` twice when being in both the chat-app and app directory
4) Navigate to chat-app/app, and run `node server.js`
5) Navigate to chat-app, run `npm run dev` to start the Next.js app
6) Go to https://localhost:3000 to enjoy your chat application.
7) OPTIONAL: Go to https://localhost:3001/test to test whether your server works

## What do I do if it isn't working?
1) Make sure you followed the steps above properly
2) Make sure your `.env` file is set up properly
3) Make sure your localhost ports  `3000` and `3001` are not in use
    - This is because I had to fiddle around with CORS authentication
  for these two ports specifically, you might need to change those around if you do
4) Make sure CORS is authenticated for communication between server and frontend
5) Message me at akarsh_ojha@brown.edu if needed!

## What's next?
Ideally, I wanted to make some updates to the UI and make it super Matrix-esque, but I didn't have enough time for that and I did not want to bother trying to mess with CSS for a whole two hours before everything is perfect, so... yeah.

So far, the usernames are not stored in the database directly through a socket emission, they are instead attached onto the message and then parsed and then added to the MongoDB database.

 ^ This is bad practice, don't do this :P

