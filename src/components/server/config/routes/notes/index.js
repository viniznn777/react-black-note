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

    if (!me || !key) {
      return res.status(400).json({
        message:
          "There was an error processing your request: Required parameters are missing",
      });
    }

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
    return res.status(200).json({ message: "Success creating the Note" });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "There was an error registering your Note " + err });
  }
});

// Rota para retornar uma nota através do seu id
router.get("/note/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { me, key } = req.query;

    if (!id || !me || !key) {
      return res.status(400).json({
        message:
          "There was an error processing your request: Required parameters are missing",
      });
    }

    if (!isValidMongoId(me) || !isValidMongoId(id)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(400).json({ message: "This note does not exist" });
    }
    return res.status(200).json([note]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal error", err });
  }
});
// ======================================================================================================
// Rota para favoritar uma nota
router.put("/favorite/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { me, key, favorite_value } = req.query;
    // ======================= Validação e autenticação de tokens e ids =======================
    if (!id || !me || !key) {
      return res.status(400).json({
        message:
          "There was an error processing your request: Required parameters are missing",
      });
    }

    if (!isValidMongoId(me) || !isValidMongoId(id)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // ======================= Validação e autenticação de tokens e ids =======================

    const note = await Note.findByIdAndUpdate(
      id,
      { favorite: favorite_value },
      { new: true }
    );

    if (!note) {
      if (!note) {
        return res.status(400).json({ message: "This note does not exist" });
      }
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ error: "Internal error", err });
  }
});
// Rota para desfavoritar uma nota
router.put("/unfavorite/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { me, key, favorite_value } = req.query;

    if (!id || !me || !key) {
      return res.status(400).json({
        message:
          "There was an error processing your request: Required parameters are missing",
      });
    }

    if (!isValidMongoId(me) || !isValidMongoId(id)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { favorite: favorite_value },
      { new: true }
    );

    if (!note) {
      if (!note) {
        return res.status(400).json({ message: "This note does not exist" });
      }
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ error: "Internal error", err });
  }
});
// ==========================================================================================

// Rota para listar todas as notas favoritadas de um usuário
router.get("/favorites", async (req, res) => {
  const { me, key } = req.query;
  if (!me || !key) {
    return res.status(400).json({
      message:
        "There was an error processing your request: Required parameters are missing",
    });
  }
  try {
    if (!isValidMongoId(me)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);

    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findOne({ _id: me });

    if (user) {
      const notes = await Note.find({ author: me, favorite: true })
        .lean()
        .sort({ date: "desc" });
      return res.status(200).json(notes);
    } else {
      return res.status(400).json({ message: "This user does not exist!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

// Rota para deletar uma nota
router.delete("/delete-note/:id", async (req, res) => {
  const { id } = req.params;
  const { me, key } = req.query;

  if (!me || !key || !id) {
    return res.status(400).json({
      message:
        "There was an error processing your request: Required parameters are missing",
    });
  }

  try {
    if (!isValidMongoId(me) || !isValidMongoId(id)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const note = await Note.findById(id);
    if (note) {
      await Note.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "Note deleted successfully!", note });
    } else {
      return res.status(400).json({ message: "This note does not exist!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

// Rota para editar uma nota
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { me, key } = req.query;
  const { title, content } = req.body;

  if (!me || !key || !id) {
    return res.status(400).json({
      message:
        "There was an error processing your request: Required parameters are missing",
    });
  }

  try {
    if (!isValidMongoId(me) || !isValidMongoId(id)) {
      return res.status(400).json({ message: "This ID format is not valid!" });
    }

    const validToken = await verifyToken(key);
    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const note = await Note.findById(id);
    if (note) {
      await Note.findByIdAndUpdate(
        { _id: id },
        { title, content },
        { new: true }
      );

      return res.status(200).json({ message: "Note edited successfully!" });
    } else {
      return res.status(400).json({ message: "This note does not exist!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;
