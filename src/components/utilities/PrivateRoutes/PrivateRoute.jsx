import React from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import { useContext } from "react";

function PrivateRoute({ item }) {
  const { authenticated } = useContext(Context);

  return authenticated ? item : <Navigate to="/signin" />;
}

export { PrivateRoute };
