require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const path = require("path");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(require("morgan")("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {res.status(200).json("OK")})
app.use("/api/v1/upload", require("./routes/uploads.route"));

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

// Create HTTP server and integrate with Socket.IO
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)



io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chat:join", (data) => {
    const { username } = data;

    console.log(`${username} joined the chat`);

    socket.broadcast.emit("user-joined", {
      username,
      message: `${username} joined the chat`,
    });
  });

  socket.on("chat:message", (data) => {
    const { username, text } = data;

    console.log(`${username}: ${text}`);

    io.emit("chat:message", {
      username,
      text,
    });
  });

  socket.on("chat:typing", (data) => {
    const { username } = data;

    socket.broadcast.emit("chat:typing", {
      username,
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MONGODB Successfully");
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch(err => {
        console.log('Error MONGODB', err.message);
    })