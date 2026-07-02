# 📦 gUploads, Docker & Socket.IO Chat

A small Express.js application demonstrating file uploads (local & Cloudinary), Docker containerization, and real-time communication using Socket.IO.

---

## 🚀 Features

### 📁 File Upload APIs

- Upload a single image to the local server.
- Upload a single image to Cloudinary.
- Image validation:
  - JPEG
  - PNG
  - WEBP
- Maximum file size: **5 MB**.
- Local uploads are served using `express.static` for direct browser access.

---

### 💬 Socket.IO Chat

The application includes a real-time chat system using Socket.IO.

Supported events:

| Event | Description |
|-------|-------------|
| `connection` | Triggered when a client connects. |
| `disconnect` | Triggered when a client disconnects. |
| `chat:join` | Broadcasts when a user joins the chat. |
| `chat:message` | Broadcasts chat messages to all connected users. |
| `chat:typing` | Shows a typing indicator to other users. |

---

### 🐳 Docker Support

The project is fully containerized using Docker.

Includes:

- Dockerfile
- Docker Compose
- Express API container
- MongoDB container
- Persistent MongoDB volume

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary
- Socket.IO
- Docker
- Docker Compose

---

# Project Structure

```
.
├── src
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── utils
│   ├── public
│   │   └── socket-test.html
│   └── app.js
│
├── uploads
│   └── images
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name

API_KEY_CLOUD=your_cloudinary_api_key

API_SECRET_CLOUD=your_cloudinary_api_secret
```

> **Note**
>
> Never commit your `.env` file.

---

# Installation

Clone the repository

```bash
git clone https://github.com/mustafa93rashid/small-express-app
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run watch
```

Production

```bash
npm start
```

---

# Running with Docker

Build and start containers

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

# API Endpoints

## Health Check

```
GET /api/health
```

---

## Upload Image (Local)

```
POST /api/v1/upload/local
```

Form Data

```
file : image
```

Response

```json
{
  "message": "File uploaded successfully",
  "fileName": "...",
  "url": "http://localhost:3000/uploads/images/..."
}
```

---

## Upload Image (Cloudinary)

```
POST /api/v1/upload/cloud
```

Form Data

```
file : image
```

Response

```json
{
  "message": "File uploaded successfully",
  "url": "https://res.cloudinary.com/..."
}
```

---

# Testing Upload APIs

You can test uploads using:

- Postman
- Bruno
- Insomnia

Use **multipart/form-data**

```
Key:
file

Type:
File
```

Supported formats

- JPEG
- PNG
- WEBP

Maximum size

```
5 MB
```

---

# Testing Socket.IO

Open two browser tabs:

```
http://localhost:3000/socket-test.html
```

Test the following:

- Join chat
- Send messages
- Typing indicator
- Disconnect

---

# Docker Services

The application runs two services:

| Service | Description |
|----------|-------------|
| api | Express application |
| mongo | MongoDB database |

MongoDB data is stored using a named Docker volume.

---

# Notes

- Local uploaded images are publicly accessible through Express Static.
- Cloud uploads are stored in Cloudinary.
- MongoDB is used as required by the Docker setup.
- Socket.IO uses an HTTP server (`http.createServer(app)`).

---

# Author

Mustafa Rashid Abbas

Computer Engineer • MERN Stack Developer