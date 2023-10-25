const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const generateToken = require("../../utilities/generateToken");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ message: "Email is already in use!" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    // Gerando um token JWT e enviando para o front end
    const token = generateToken(user);
    return res.status(201).json({ user: user._id, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in registration" });
  }
});

// Rota para realizar o login do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      // Caso não exista será mostrado uma mensagem de erro
      if (!user) {
        return res.status(400).json({ message: "Email not registered" });
      }
      // Se existir, será comparado a senha passada pelo usuário com a senha que consta no banco de dados
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        // Se a senha passada bate com senha do banco de dados, será retornado o usuário
        if (isMatch) {
          // Gerando um token JWT e enviando para o front end
          const token = generateToken(user);
          return res.status(200).json({ user: user._id, token }); // Senha correta e usuário autenticado
        } else {
          // Caso não bate com a senha do banco de dados, será mostrado uma mensagem de erro e retornado o status 400
          return res.status(400).json({ message: "Invalid credentials!" });
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in registration" });
  }
});

module.exports = router;
