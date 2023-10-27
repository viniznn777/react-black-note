const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/Note");
const Note = mongoose.model("notes");
require("../../models/User");
const User = mongoose.model("users");
const isValidMongoId = require("../../utilities/isValidMongoId");
const verifyToken = require("../../utilities/verifyToken");

// Rota para retornar as notas de um usuário na qual será passado o ID no query me EX: http://localhost:8081/notes/my-notes?me=${ID}&key=${KEY} a "key" seria o token jwt
router.post("/my-notes", async (req, res) => {
  try {
    const { me, key } = req.query;
    // Verificando se o valor de "me" é válido como um ID do mongoDB
    if (!isValidMongoId(me)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }
    // Verificando se o token JWT passado na chave "key" é válido
    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findOne({ _id: me }).lean();
    if (user) {
      // Buscando todas as notas em que o valor de author é igual ao valor do id de usuário
      const notes = await Note.find({ author: user._id })
        .sort({ date: "desc" })
        .lean();
      return res.status(200).json(notes);
    } else {
      return res.status(404).json({ error: "This user does not exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

// Rota para criar uma nota
router.post("/new", async (req, res) => {
  try {
    const { me, key } = req.query;
    const { title, content, author } = req.body;
    // Verificando se o valor de "me" é válido como um ID do mongoDB
    if (!isValidMongoId(me)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }
    // Verificando se o token JWT passado na chave "key" é válido
    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const newNote = { title, content, author };

    await new Note(newNote).save();
    return res.status(201).json({ message: "Success creating the Note" });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "There was an error registering your Note " + err });
  }
});

module.exports = router;
