const express = require("express");
const app = express();
const port = 3000;

const createError = require("http-errors");

//
app.use(function (req, res, next) {
  if (!req) {
    return next(createError(404, "Page not found"));
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

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/ ...`);
});
