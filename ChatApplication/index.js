// Server-Side Implementation

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = socketIO(server);

// Database Connection
mongoose.connect(
  "mongodb+srv://sjethani651:Sjethani%4094@hatch.zcgjpl5.mongodb.net/SocketChatDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define Schema for Chat Messages
const chatMessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Create Model based on Schema
const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

// Socket.IO Connection Handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Retrieve Previous Messages from the Database
  ChatMessage.find()
    .sort({ timestamp: -1 })
    .limit(10)
    .then((messages) => {
      socket.emit("previous messages", messages.reverse());
    })
    .catch((err) => {
      console.error("Error retrieving previous messages:", err);
    });

  // Handle New Chat Messages
  socket.on("chat message", (data) => {
    const { user, message } = data;

    // Create a new ChatMessage instance
    const chatMessage = new ChatMessage({ user, message });

    // Save the message to the database
    chatMessage
      .save()
      .then((savedMessage) => {
        // Broadcast the new message to all connected clients
        io.emit("chat message", savedMessage);
      })
      .catch((error) => {
        console.error("Error saving message:", error);
      });
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
