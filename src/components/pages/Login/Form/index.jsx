import React, { useState } from "react";
import ContainerForm from "./styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../contexts/AuthContext";

const FormLogin = () => {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ContainerForm className="container-fluid">
      <form
        method="post"
        onSubmit={(event) => handleLogin(event, email, password)}
      >
        <p className="fs-1 fw-bold text-light text-center">Login</p>
        <div className="container-input">
          <label htmlFor="email" className="mt-4 fw-bold">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="container-input">
          <label htmlFor="password" className="mt-4 fw-bold">
            Senha:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-2"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="container-link mt-3">
          <Link to="/signup">Não tenho uma conta.</Link>
        </div>
        <div className="container-button mt-3">
          <button>Login</button>
        </div>
      </form>
    </ContainerForm>
  );
};

export default FormLogin;
