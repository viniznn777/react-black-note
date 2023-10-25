const jwt = require("jsonwebtoken");

// Função para gerar um token jwt. Para colocar um tempo para expirar, basta adicionar o { expiresIn: "1h" }
// Recebe o parâmetro user, pois ao ser retornado para o Front end, será autenticado com o ID do usuário.
function generateToken(user) {
  return jwt.sign(
    { _id: user._id },
    // SecretKey
    "e9f6ffeceb68d556ecba3ec3b828d560db40ca10c2eb74e74d7f6c64d12a54c5"
  );
}

module.exports = generateToken;
