const express = require("express");
const app = express();

//middleware
const createError = require("http-errors");
const helmet = require("helmet");

///////////////////////////////////////////////////
const debug = require("debug")("Break-It:server");
const http = require("http");

//get port from environment and store in Express
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//create HTTP server
const server = http.createServer(app);

//listen on provided port on all network interfaces
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//normalize port into a number, string, or false
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  } else if (port >= 0) {
    //port number
    return port;
  } else {
    return false;
  }
}

//listen for HTTP server error
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
}

///
//load file
const fs = require("fs");
let stream;
stream = fs.createReadStream("./config/config.json");
stream.on("data", function (data) {
  let chunk = data.toString();
  console.log(chunk);
});

///

///////////////////////////////////////////////////
//secure HTTP headers
app.use(helmet());

// || err handling
app.use(function (req, res, next) {
  if (req) {
    // console.log(req);
    // return next(createError(404, "Page not found"));
    next();
  }
});

//500 internal server error
//404 not found
//

//
// TO IMPLEMENT: load config.json
// fs.readFile("./json/config.json", function (err, buf) {
//   if (err) {
//     if (err.code === "ENOENT") {
//       let httpError = createError(404, { expose: false });
//     } else {
//       let httpError = createError(500, err);
//     }
//   }
// });
//
///////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/ ...`);
});
