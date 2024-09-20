# Akarsh's Chill Chat Room
### Deliverable for Onboarding at FSAB

This is a simple real-time chat application built with **Node.js**, **Express**, **MongoDB**, and **Next.js**. It allows users to send and receive messages in real-time with random usernames assigned to each user. All messages are stored in a MongoDB database and retrieved when users connect. Backend is based on Node.js, Express, MongoDB for database, and Next.JS and React for
the frontent of the server.

## Features

- Real-time chat using **WebSockets**.
- Each user is assigned a random username (`User{RandomNumber}`) upon connecting.
- Messages are stored in a MongoDB database.
- Message format: `"Anon, at HH:MM:SS, said: message"`.
- Messages are broadcasted to all connected users.
- Persistent message history that loads when users reconnect.

## Test Picture
![image](chat-app\app\images\test.png)