import React, { useEffect } from "react";
import Container from "./styles";
import FormNewNote from "./Form";

const NewNote = () => {
  useEffect(() => {
    document.title = "BlackNote | Criar Nota";
  }, []);

  return (
    <Container className="container-fluid">
      <div className="container">
        <p className="fs-1 fw-bold text-light text-center">Criar nota ➕</p>
        <FormNewNote />
      </div>
    </Container>
  );
};

export default NewNote;
