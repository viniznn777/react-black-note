import React, { useState } from "react";
import ContainerRegister from "./styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../contexts/AuthContext";

const Form = () => {
  const { handleRegister } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <ContainerRegister className="container-fluid">
      <form
        method="post"
        onSubmit={(event) => handleRegister(event, email, password, password2)}
      >
        <p className="fs-1 fw-bold text-light text-center">Registrar agora!</p>
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
        <div className="container-input">
          <label htmlFor="password" className="mt-4 fw-bold">
            Repetir Senha:
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            className="mt-2"
            placeholder="Digite sua senha novamente"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
        </div>
        <div className="container-link mt-3">
          <Link to="/signin">Já tenho uma conta.</Link>
        </div>
        <div className="container-button mt-3">
          <button>Registrar</button>
        </div>
      </form>
    </ContainerRegister>
  );
};

export default Form;
