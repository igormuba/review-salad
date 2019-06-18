const express = require("express");
const connectDB = require("./config/db");
// var bodyParser = require('body-parser')
var cors = require("cors");
const path = require("path");

const app = express();

connectDB();

const port = process.env.PORT || 4000;

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/posts", require("./routes/api/posts"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));
