import React from "react";
import { Link } from "react-router-dom";
import Container from "./styles";

const PageNotFound = () => {
  return (
    <Container className="container">
      <p className="fs-1 text-center text-light">Página não encontrada!</p>
      <br />
      <p className="fs-3 text-center text-light">
        Desculpe, a página que você está tentando acessar não existe!
      </p>
      <p className="fs-1 text-danger fw-bold text-center">
        <abbr title="O erro 404 é um código de resposta HTTP que indica que o cliente pôde comunicar com o servidor, mas o servidor não pôde encontrar o que foi pedido.">
          404 Not Found
        </abbr>
      </p>
      <Link to="/">
        <button className="btn btn-info">Voltar para o início</button>
      </Link>
    </Container>
  );
};

export default PageNotFound;
