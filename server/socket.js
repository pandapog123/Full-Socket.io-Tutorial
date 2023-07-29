const uuid = require("uuid");
const { Server } = require("socket.io");

function createMessage(content, id) {
  if (typeof content !== "string") {
    throw new Error("Content must be a string");
  }

  if (content.length === 0) {
    throw new Error("Content cannot be empty");
  }

  if (typeof id !== "string") {
    throw new Error("ID must be a string");
  }

  return {
    content,
    userid: id,
    id: uuid.v4(),
  };
}

async function createSocket(httpServer) {
  let messages = [];

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.emit("messages", messages);

    socket.on("message", (content, id) => {
      try {
        const message = createMessage(content, id);

        messages = [message, ...messages];

        io.sockets.emit("messages", messages);

        return {
          message: "success",
        };
      } catch (error) {
        return {
          error: error.message || "Error occured when sending a message",
        };
      }
    });
  });
}

module.exports = {
  createSocket,
};
