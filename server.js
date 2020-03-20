const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Corona = require("./models/corona");
const coronaRouter = require("./routes/routes");
const bodyParser = require("body-parser");

var mongoDB = "mongodb://127.0.0.1/coronaDB-2";
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", function(error) {
  console.error(error);
});
db.once("open", function() {
  console.log("Database is connected.");
});

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use("/", coronaRouter);
app.set("view engine", "ejs");
app.listen(port, function() {
  console.log("Server is listening to port 3000");
});
