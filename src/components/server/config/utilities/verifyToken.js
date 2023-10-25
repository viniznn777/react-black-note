const jwt = require("jsonwebtoken");
const secretKey =
  "e9f6ffeceb68d556ecba3ec3b828d560db40ca10c2eb74e74d7f6c64d12a54c5";

async function verifyToken(token) {
  try {
    if (!token) {
      return false;
    }
    const decoded = jwt.verify(token, secretKey);
    console.log("Valid token. Token claims:", decoded);
    return true;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
}

module.exports = verifyToken;
