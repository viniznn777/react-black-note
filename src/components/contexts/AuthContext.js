import React, { createContext, useState, useEffect } from "react";
import {
  alertMessage,
  errorMessage,
  successMessage,
} from "../utilities/toastMessages";
import { useNavigate } from "react-router-dom";
import { URL_AUTH } from "../utilities/Api/basesUrl";

const Context = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  // Chaves localizadas no localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  // Verificando se há um token no localStorage para setar se o usuário está autenticado
  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  // =============================== Registro ====================================
  const handleRegister = async (event, email, password, password2) => {
    event.preventDefault();
    try {
      if (!email || !password || !password2) {
        alertMessage("Todos os campos devem ser preenchidos!");
        return;
      } else if (password2 !== password) {
        alertMessage("As senhas não coincidem!");
        return;
      }
      const body = { email, password };

      const response = await URL_AUTH.post("/register", body);
      if (response.status === 400) {
        errorMessage("Este e-mail já está em uso!");
        return;
      }
      successMessage("Conta registrada com sucesso!");
      navigate("/signin");
    } catch (err) {
      console.error("Erro ao criar conta: ", err);
    }
  };
  // =============================== FIM ====================================
  // =============================== Login ====================================

  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    if (!email || !password) {
      alertMessage("Todos os campos devem ser preenchidos!");
      return;
    }

    const body = { email, password };

    try {
      const response = await URL_AUTH.post("/login", body);
      if (response.status === 200) {
        const data = await response.data;
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuthenticated(true);
        navigate("/");
      } else if (response.status === 400) {
        alertMessage("E-mail ou senha incorretos!");
        return;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  // =============================== FIM ====================================
  // =============================== LOGOUT =================================

  // Função para realizar o logout do usuário

  const handleLogout = () => {
    // setando o Autheticated como false para que o usuário não esteja mais autenticado
    setAuthenticated(false);
    // removendo o token de autenticação e o id do usuário do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // redirecionando para a página de login
    navigate("/signin");
  };

  // =============================== FIM ====================================

  // Evento que observa as chaves "token" e "user" no localStorage. Caso haja qualquer mudança não autorizada, será feito o logout do usuário e retornado no console o status 401 de acordo com o servidor, pois o servidor faz a validação do token jwt do usuário.
  window.addEventListener("storage", (e) => {
    if (e.key === "token" || e.key === "user") {
      handleLogout();
    }
  });

  return (
    <Context.Provider
      value={{
        authenticated,
        handleRegister,
        handleLogin,
        handleLogout,
        user,
        token,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
