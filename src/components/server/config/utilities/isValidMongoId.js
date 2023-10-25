const { ObjectId } = require("mongodb");

// Função para verificar se um ID é válido
function isValidMongoId(id) {
  try {
    const objectId = new ObjectId(id);
    // Se chegou aqui, o ID é válido.
    return true;
  } catch (error) {
    // Se ocorreu um erro, o ID não é válido.
    return false;
  }
}

module.exports = isValidMongoId;
