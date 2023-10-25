import React from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { useContext } from "react";

function UnauthenticatedRoute({ item }) {
  const { authenticated } = useContext(Context);

  // Verificação para que caso o usuário esteja autenticado, ele não consiga acessar a página de login ou registro da aplicação, levando ele direto para a página HOME
  return authenticated ? <Navigate to="/" /> : item;
}

export { UnauthenticatedRoute };
