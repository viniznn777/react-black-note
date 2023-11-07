import axios from "axios";

// Url base para autenticação de login e registro
export const URL_AUTH = axios.create({
  baseURL: "http://localhost:8081/api/auth",
  // Como default o axios só vem configurado para tratar status de maior que 200 e até 300
  // Então foi definido para tratamentos de status NESTA ROTA de até 404
  validateStatus: function (status) {
    return status >= 200 && status <= 404;
  },
});

// Url base para rota de notas
export const URL_NOTES = axios.create({
  baseURL: "http://localhost:8081/notes",
});
