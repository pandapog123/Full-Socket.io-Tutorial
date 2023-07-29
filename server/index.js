const express = require("express");
const http = require("http");
const { createSocket } = require("./socket");

async function main() {
  const expressApp = express();

  const httpServer = http.createServer(expressApp);

  createSocket(httpServer);

  expressApp.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
  });

  httpServer.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
  });
}

main();
