const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./config/routes/auth/index");
const notes = require("./config/routes/notes/index");
const PORT = process.env.PORT || 8081;

// Configurações
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blacknote")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB " + err);
  });

app.get("/", (req, res) => {
  res.send("Rodando");
});

app.use("/api/auth", auth);
app.use("/notes", notes);

app.listen(PORT, () => {
  console.log(`Server started successfuly. http://localhost:${PORT}`);
});
